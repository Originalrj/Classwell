import {
  CEFR_LEVELS,
  SKILLS,
  type AssessmentAnswer,
  type CefrLevel,
  type Confidence,
  type DiagnosticItem,
  type Gap,
  type GoalCode,
  type SkillCode,
  type SkillVector,
} from '@/lib/types'
import {
  GOAL_SKILL_WEIGHTS,
  SKILL_LABELS,
  emptySkillVector,
  levelAt,
  levelGap,
  levelIndex,
  maxLevel,
  minLevel,
} from './levels'

const CONFIDENCE_PENALTY: Record<Confidence, number> = {
  saw_produce: 0,
  saw_recognize: 0.2,
  asked: 0.3,
  not_assessed: 0.4,
}

/** Mediana de indices de nivel. Estavel contra outliers (um item C2 isolado). */
function medianIndex(indices: number[]): number {
  if (indices.length === 0) return 0
  const sorted = [...indices].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

export interface ComputeResult {
  skillVector: SkillVector
  overall: CefrLevel
  ceiling: CefrLevel
  floor: CefrLevel
  profileSkew: boolean
  assessedCount: number
  unassessedSkills: SkillCode[]
}

/**
 * SPEC 7.3 — motor de diagnostico. TypeScript puro, sem I/O.
 *
 * 1. resolve por skill usando a MEDIANA dos niveis marcados
 * 2. penaliza por confianca (% de itens nao avaliados)
 * 3. detecta skew (diferenca >= 3 niveis entre skills)
 * 4. overall = min(skills)  (o gargalo: o que ele CONSEGUE fazer)
 *    ceiling = max(skills)  (o que ele ja tocou: gancho de motivacao)
 */
export function computeDiagnosis(
  answers: AssessmentAnswer[],
  _items: DiagnosticItem[] = [],
): ComputeResult {
  const bySkill = new Map<SkillCode, AssessmentAnswer[]>()

  for (const skill of SKILLS) bySkill.set(skill, [])

  for (const answer of answers) {
    if (answer.level === 'unknown') continue
    const itemSkill = skillFromAnswer(answer, _items)
    bySkill.get(itemSkill)?.push(answer)
  }

  const vector = emptySkillVector('A1')
  const unassessedSkills: SkillCode[] = []
  const assessedSkills: SkillCode[] = []
  let assessedCount = 0

  for (const skill of SKILLS) {
    const list = bySkill.get(skill) ?? []
    const rated = list.filter((a) => a.level !== 'unknown')

    if (rated.length === 0) {
      unassessedSkills.push(skill)
      continue
    }

    assessedCount += rated.length
    assessedSkills.push(skill)

    const observed = medianIndex(rated.map((a) => levelIndex(a.level as CefrLevel)))
    const notAssessed = rated.filter((a) => a.confidence === 'not_assessed').length
    const penalty = CONFIDENCE_PENALTY.not_assessed * (notAssessed / rated.length)

    const resolved = levelAt(Math.round(observed - penalty))
    vector[skill] = resolved
  }

  // overall/ceiling sao calculados SO sobre as skills avaliadas. Sem isso,
  // as skills sem item ficam em A1 e o piso e sempre A1 — a entrevista
  // inteira valeria zero. Nenhuma skill avaliada cai no vetor cheio.
  const scope: SkillCode[] = assessedSkills.length > 0 ? assessedSkills : [...SKILLS]
  const floor = scope.reduce<CefrLevel>((acc, s) => minLevel(acc, vector[s]), 'C2')
  const ceiling = scope.reduce<CefrLevel>((acc, s) => maxLevel(acc, vector[s]), 'A1')
  const skew = levelGap(floor, ceiling) >= 3

  return {
    skillVector: vector,
    overall: floor,
    ceiling,
    floor,
    profileSkew: skew,
    assessedCount,
    unassessedSkills,
  }
}

/**
 * Descobre a skill do item answered. Se o banco de itens nao foi fornecido
 * (ex.: chamada durante seeding), cai para o primeiro item com o id conhecido
 * ou, na falta, para `listening`.
 */
function skillFromAnswer(answer: AssessmentAnswer, items: DiagnosticItem[]): SkillCode {
  const found = items.find((i) => i.id === answer.itemId)
  return found?.skill ?? 'listening'
}

const GAP_REASON: Record<SkillCode, string> = {
  listening: 'sem ouvir, não há entrada para a aula',
  speaking: 'é por onde o aluno faz o próprio progresso visível',
  reading: 'destrava o estudo autodidata e o material escrito',
  writing: 'é onde a gramática vira prova de que foi aprendido',
  grammar: 'necessário para os exercícios escritos e para o exame',
  vocabulary: 'sem léxico, cada frase custa effort demais',
  pronunciation: 'se o aluno não se entende, a confiança trava',
  pragmatics: 'evita constrangimento na interação real',
}

/**
 * SPEC 7.4 — lacunas. Um skill e `critical` se estiver 2+ niveis abaixo do
 * overall, ou se estiver Involucrado no objetivo do aluno.
 */
export function computeGaps(
  vector: SkillVector,
  goal: GoalCode,
  overall: CefrLevel,
): Gap[] {
  const goalSkills = GOAL_SKILL_WEIGHTS[goal] ?? []
  const gaps: Gap[] = []

  for (const skill of SKILLS) {
    const from = vector[skill]
    const target = levelAt(levelIndex(overall) + 1)

    if (levelGap(from, target) <= 0) continue

    const farBehind = levelGap(from, overall) >= 2
    const goalRelated = goalSkills.includes(skill)

    gaps.push({
      skill,
      from,
      to: target,
      criticality: farBehind || goalRelated ? 'critical' : 'important',
      reason: goalRelated
        ? `necessário para o objetivo do aluno (${goal}); ${GAP_REASON[skill]}`
        : GAP_REASON[skill],
    })
  }

  return gaps.sort((a, b) => {
    const rank = { critical: 0, important: 1, nice_to_have: 2 } as const
    if (rank[a.criticality] !== rank[b.criticality]) {
      return rank[a.criticality] - rank[b.criticality]
    }
    return levelGap(b.from, b.to) - levelGap(a.from, a.to)
  })
}

/** Resumo curto para o professor ler em 10 segundos. */
export function diagnosisHeadline(result: ComputeResult): string {
  const { overall, ceiling, profileSkew } = result
  if (ceiling === overall) {
    return `Nível geral ${overall}, uniforme entre as competências.`
  }
  const spread = CEFR_LEVELS.filter(
    (l) => levelIndex(l) > levelIndex(overall) && levelIndex(l) <= levelIndex(ceiling),
  )
  const base = `Gargalo em ${overall}, mas já tocou ${ceiling} em ${spread.join(', ')}.`
  return profileSkew ? `${base} Perfil irregular — vale nivelar antes de avançar.` : base
}

/** Skills mais fracas primeiro, para gerar as primeiras etapas. */
export function weakestSkills(vector: SkillVector, count = 3): SkillCode[] {
  return [...SKILLS]
    .sort((a, b) => levelIndex(vector[a]) - levelIndex(vector[b]) || SKILL_LABELS[a].localeCompare(SKILL_LABELS[b]))
    .slice(0, count)
}

/** Skills mais fortes — âncoras para aulas motivadoras. */
export function strongestSkills(vector: SkillVector, count = 2): SkillCode[] {
  return [...SKILLS]
    .sort((a, b) => levelIndex(vector[b]) - levelIndex(vector[a]))
    .slice(0, count)
}
