import {
  SKILLS,
  type CefrLevel,
  type GoalCode,
  type SkillCode,
  type SkillVector,
} from '@/lib/types'
import {
  GOAL_LABELS,
  GOAL_SKILL_WEIGHTS,
  PRODUCTIVE_SKILLS,
  RECEPTIVE_SKILLS,
  SKILL_LABELS,
  levelAt,
  levelGap,
  levelIndex,
} from './levels'

const LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const AVG_SESSIONS_PER_LEVEL = 1.5

export interface RampBlueprintInput {
  skillVector: SkillVector
  overall: CefrLevel
  ceiling: CefrLevel
  goal: GoalCode
  goalDetail: string
  targetCefr: CefrLevel
  targetDate?: string
  weeklyHours: number
  sessionMinutes: number
}

export interface BlueprintStep {
  tempId: string
  title: string
  goal: string
  skills: SkillCode[]
  primaryFocus: SkillCode
  levelFrom: CefrLevel
  levelTo: CefrLevel
  why: string
  grammarPoints: string[]
  lexicalSets: string[]
  prerequisiteTempIds: string[]
  estimatedSessions: number
  milestone: boolean
  kind: 'receptive' | 'productive' | 'foundation' | 'anchor' | 'exam' | 'leveling'
}

export interface RampBlueprint {
  positioningStatement: string
  steps: BlueprintStep[]
  sessionsPerWeek: number
  totalSessionsEstimate: number
  totalWeeksEstimate: number
  overCapacity: boolean
  warnings: string[]
}

interface SkillTarget {
  skill: SkillCode
  from: CefrLevel
  to: CefrLevel
  critical: boolean
}

/**
 * SPEC 8.2 — regras deterministicas. Rodam ANTES da IA.
 * O modelo de linguagem trabalha dentro dos limites definidos aqui.
 *
 * 1. carga semanal real, a partir das horas que o aluno de fato tem
 * 2. recepcao antes de producao nas primeiras etapas
 * 3. trilha obrigatoria de estrategia de prova quando o objetivo e certificado
 * 4. ancoragem na competencia mais forte, para avanco percebido imediato
 * 5. serrilha: no maximo um nivel por etapa dentro da mesma skill
 * 6. marco no fim de cada nivel fechado
 * 7. contingencia: se o prazo nao cabe, avisa em vez de gerar o impossivel
 */
export function planRamp(input: RampBlueprintInput): RampBlueprint {
  const warnings: string[] = []

  // ---- Regra 1: carga semanal ----
  const sessionsPerWeek = Math.max(
    1,
    Math.round((input.weeklyHours * 60) / input.sessionMinutes),
  )

  const targets = buildSkillTargets(input)
  const ordered = orderForPedagogy(targets)

  const steps: BlueprintStep[] = []
  const chainBySkill = new Map<SkillCode, string[]>()
  let counter = 0

  // ---- Regras 2 + 5: ordem pedagogica, uma escada por skill ----
  for (const target of ordered) {
    const chain: string[] = []
    let cursor = target.from

    while (levelGap(cursor, target.to) > 0) {
      const to = levelAt(levelIndex(cursor) + 1)
      const tempId = `s${++counter}`
      const isLastOfSkill = levelGap(to, target.to) <= 0
      const position = steps.length

      steps.push({
        tempId,
        title: buildTitle(target.skill, cursor, to, isLastOfSkill),
        goal: `O aluno demonstra ${SKILL_LABELS[target.skill].toLowerCase()} em nível ${to}.`,
        skills: [target.skill],
        primaryFocus: target.skill,
        levelFrom: cursor,
        levelTo: to,
        why: buildWhy(target, input, isLastOfSkill),
        grammarPoints: [],
        lexicalSets: [],
        prerequisiteTempIds: [...chain],
        estimatedSessions: AVG_SESSIONS_PER_LEVEL,
        milestone: isLastOfSkill && target.critical,
        kind: kindFor(target.skill, target.critical),
      })

      chain.push(tempId)
      chainBySkill.set(target.skill, chain)
      cursor = to
      void position
    }
  }

  // ---- Regra 4: ancoragem na competencia mais forte ----
  const anchorStep = findAnchorStep(input, steps)
  if (anchorStep) {
    const copy: BlueprintStep = {
      ...anchorStep,
      tempId: `s${++counter}`,
      title: `Ancoragem: ${SKILL_LABELS[anchorStep.primaryFocus]}`,
      goal: `Lever a competencia mais forte (${SKILL_LABELS[anchorStep.primaryFocus].toLowerCase()}) do nível ${anchorStep.levelFrom} para ${anchorStep.levelTo}, com material de apoio em vez de conteúdo novo.`,
      why: `O aluno já demonstrou ${input.ceiling} aqui. Começar por aqui dá avanço visível nas primeiras aulas e protege a confiança antes de atacar os gargalos.`,
      prerequisiteTempIds: [],
      estimatedSessions: 1,
      milestone: false,
      kind: 'anchor',
    }
    steps.splice(Math.min(3, steps.length), 0, copy)
    warnings.push(
      `Etapa de ancoragem inserida em ${SKILL_LABELS[anchorStep.primaryFocus]} — é onde o aluno tem mais tração.`,
    )
  }

  // ---- Regra 3: trilha de estrategia de prova ----
  if (input.goal === 'exam' && steps.length >= 2) {
    steps.splice(Math.floor(steps.length / 2), 0, {
      tempId: `s${++counter}`,
      title: 'Estratégia de prova',
      goal: 'O aluno conhece o formato da prova, administra tempo e reconhece quando está perdendo pontos.',
      skills: ['reading', 'writing'],
      primaryFocus: 'grammar',
      levelFrom: input.overall,
      levelTo: input.overall,
      why: `O objetivo é certificação. Perder pontos por estratégia custa caro tanto quanto perder por conteúdo.`,
      grammarPoints: [],
      lexicalSets: [],
      prerequisiteTempIds: [],
      estimatedSessions: 1,
      milestone: false,
      kind: 'exam',
    })
  }

  // ---- Regra 7: contingencia de prazo ----
  const totalSessions = steps.reduce((acc, s) => acc + s.estimatedSessions, 0)
  const totalWeeks = Math.max(1, Math.ceil(totalSessions / sessionsPerWeek))
  const weeksAvailable = weeksUntil(input.targetDate)

  let overCapacity = false
  if (weeksAvailable !== undefined && totalWeeks > weeksAvailable) {
    overCapacity = true
    const needed = Math.ceil(totalSessions / weeksAvailable)
    warnings.push(
      `A rampa pede ~${totalWeeks} semanas, mas o prazo é de ${weeksAvailable}. ` +
        `Ou o prazo estica, ou a carga sobe para ${needed} sessões por semana ` +
        `(${needed * input.sessionMinutes} min por semana).`,
    )
  }

  return {
    positioningStatement: buildPositioning(input, targets),
    steps,
    sessionsPerWeek,
    totalSessionsEstimate: totalSessions,
    totalWeeksEstimate: totalWeeks,
    overCapacity,
    warnings,
  }
}

// ---------------------------------------------------------------- helpers

function buildSkillTargets(input: RampBlueprintInput): SkillTarget[] {
  const goalSkills = GOAL_SKILL_WEIGHTS[input.goal] ?? []

  return SKILLS.map((skill) => {
    const from = input.skillVector[skill]

    // Se o aluno ja esta na meta nessa skill, nao ha trabalho ali.
    if (levelIndex(from) >= levelIndex(input.targetCefr)) {
      return { skill, from, to: from, critical: false }
    }

    // Um degrau por vez, mas nunca abaixo do gargalo geral do aluno:
    // comeca pelo minimo entre "gargalo + 1" e "nivel atual + 1".
    const floor = Math.max(levelIndex(input.overall), levelIndex(from) + 1)
    const to = levelAt(Math.min(floor, levelIndex(input.targetCefr)))

    return {
      skill,
      from,
      to,
      critical: levelGap(from, input.overall) >= 2 || goalSkills.includes(skill),
    }
  })
}

function orderForPedagogy(targets: SkillTarget[]): SkillTarget[] {
  const bucket = (s: SkillCode) =>
    RECEPTIVE_SKILLS.includes(s) ? 0 : PRODUCTIVE_SKILLS.includes(s) ? 1 : 2

  return targets
    .filter((t) => levelGap(t.from, t.to) > 0)
    .sort((a, b) => {
      if (bucket(a.skill) !== bucket(b.skill)) return bucket(a.skill) - bucket(b.skill)
      const gapA = levelGap(a.from, a.to)
      const gapB = levelGap(b.from, b.to)
      if (gapA !== gapB) return gapB - gapA
      return Number(b.critical) - Number(a.critical)
    })
}

/** A skill mais forte que ainda tem caminho ate a meta. */
function findAnchorStep(
  input: RampBlueprintInput,
  steps: BlueprintStep[],
): BlueprintStep | undefined {
  const best = [...SKILLS]
    .filter((s) => levelIndex(input.skillVector[s]) > levelIndex(input.overall))
    .sort((a, b) => levelIndex(input.skillVector[b]) - levelIndex(input.skillVector[a]))[0]

  if (!best) return undefined
  if (levelGap(input.overall, input.ceiling) < 2) return undefined
  if (steps.length <= 3) return undefined

  return steps.find((s) => s.skills.includes(best))
}

function kindFor(skill: SkillCode, critical: boolean): BlueprintStep['kind'] {
  if (critical) return 'leveling'
  if (RECEPTIVE_SKILLS.includes(skill)) return 'receptive'
  if (PRODUCTIVE_SKILLS.includes(skill)) return 'productive'
  return 'foundation'
}

function buildTitle(
  skill: SkillCode,
  from: CefrLevel,
  to: CefrLevel,
  isLast: boolean,
): string {
  const label = SKILL_LABELS[skill].toLowerCase()
  return isLast ? `${label}: consolidando ${to}` : `${label}: ${from} → ${to}`
}

function buildWhy(
  target: SkillTarget,
  input: RampBlueprintInput,
  isLast: boolean,
): string {
  if (target.critical) {
    return `${SKILL_LABELS[target.skill]} é gargalo para o objetivo "${GOAL_LABELS[input.goal].toLowerCase()}". ${input.goalDetail || 'Ajuste esse trecho com o motivo real do aluno.'}`
  }
  if (isLast) {
    return `Consolida ${SKILL_LABELS[target.skill].toLowerCase()} até ${target.to}, alinhando com a meta ${input.targetCefr}.`
  }
  return `Ponte de ${target.from} para ${target.to} em ${SKILL_LABELS[target.skill].toLowerCase()}.`
}

function buildPositioning(input: RampBlueprintInput, targets: SkillTarget[]): string {
  const weak = targets.filter((t) => t.critical).map((t) => SKILL_LABELS[t.skill].toLowerCase())
  const weakText =
    weak.length > 0
      ? weak.slice(0, 3).join(', ')
      : SKILLS.slice(0, 3).map((s) => SKILL_LABELS[s].toLowerCase()).join(', ')

  const anchor = levelGap(input.overall, input.ceiling) >= 2
    ? ` Já tocou ${input.ceiling} em alguma competência: isso vira âncora de motivação.`
    : ''

  return (
    `Aluno em ${input.overall}, meta ${input.targetCefr} para ${GOAL_LABELS[input.goal].toLowerCase()}. ` +
    `Gargalos: ${weakText}.${anchor}`
  )
}

function weeksUntil(targetDate?: string): number | undefined {
  if (!targetDate) return undefined
  const diffMs = new Date(targetDate).getTime() - Date.now()
  if (Number.isNaN(diffMs)) return undefined
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))
}

export function levelsUpTo(target: CefrLevel): CefrLevel[] {
  return LEVELS.slice(0, LEVELS.indexOf(target) + 1)
}
