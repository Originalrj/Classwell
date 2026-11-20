import {
  CEFR_LEVELS,
  SKILLS,
  type CefrLevel,
  type SkillCode,
  type SkillVector,
} from '@/lib/types'

// As paginas importam CEFR_LEVELS e SKILLS daqui, nao de @/lib/types,
// para nao misturar dominio com dominio.
export { CEFR_LEVELS, SKILLS }

export const SKILL_INDEX: Record<SkillCode, number> = {
  listening: 0,
  speaking: 1,
  reading: 2,
  writing: 3,
  grammar: 4,
  vocabulary: 5,
  pronunciation: 6,
  pragmatics: 7,
}

export function levelIndex(level: CefrLevel): number {
  return CEFR_LEVELS.indexOf(level)
}

export function levelAt(index: number): CefrLevel {
  const i = Math.min(Math.max(index, 0), CEFR_LEVELS.length - 1)
  return CEFR_LEVELS[i]
}

export function compareLevels(a: CefrLevel, b: CefrLevel): number {
  return levelIndex(a) - levelIndex(b)
}

export function maxLevel(a: CefrLevel, b: CefrLevel): CefrLevel {
  return levelIndex(a) >= levelIndex(b) ? a : b
}

export function minLevel(a: CefrLevel, b: CefrLevel): CefrLevel {
  return levelIndex(a) <= levelIndex(b) ? a : b
}

/** Quantos "meios niveis" faltam de `from` ate `to`. */
export function levelGap(from: CefrLevel, to: CefrLevel): number {
  return levelIndex(to) - levelIndex(from)
}

export const SKILL_LABELS: Record<SkillCode, string> = {
  listening: 'Ouvir',
  speaking: 'Falar',
  reading: 'Ler',
  writing: 'Escrever',
  grammar: 'Gramática',
  vocabulary: 'Vocabulário',
  pronunciation: 'Pronúncia',
  pragmatics: 'Registro',
}

export const LEVEL_LABELS: Record<CefrLevel, string> = {
  A1: 'Iniciante',
  A2: 'Elementar',
  B1: 'Intermediário',
  B2: 'Intermediário avançado',
  C1: 'Avançado',
  C2: 'Domínio',
}

export const LEVEL_ORDER_LABEL: Record<CefrLevel, string> = {
  A1: 'nível 1',
  A2: 'nível 2',
  B1: 'nível 3',
  B2: 'nível 4',
  C1: 'nível 5',
  C2: 'nível 6',
}

export const GOAL_LABELS = {
  travel: 'Viajar',
  work: 'Trabalho',
  study: 'Estudar',
  social: 'Fazer amigos',
  exam: 'Certificação',
  relationship: 'Relacionamento',
  general: 'Interesse geral',
} as const

/** Skills de recepcao entram antes das de producao nas primeiras etapas. */
export const RECEPTIVE_SKILLS: SkillCode[] = ['listening', 'reading']
export const PRODUCTIVE_SKILLS: SkillCode[] = ['speaking', 'writing']

/** Skills implicadas em cada objetivo (SPEC secao 7.4). */
export const GOAL_SKILL_WEIGHTS: Record<string, SkillCode[]> = {
  travel: ['speaking', 'listening'],
  work: ['writing', 'pragmatics', 'speaking', 'listening'],
  study: ['writing', 'reading', 'grammar'],
  social: ['speaking', 'listening', 'pragmatics'],
  exam: ['grammar', 'writing', 'listening', 'reading'],
  relationship: ['speaking', 'listening', 'pragmatics'],
  general: ['speaking', 'listening'],
}

export function emptySkillVector(base: CefrLevel = 'A1'): SkillVector {
  return {
    listening: base,
    speaking: base,
    reading: base,
    writing: base,
    grammar: base,
    vocabulary: base,
    pronunciation: base,
    pragmatics: base,
  }
}

/** Menor nivel do vetor — o gargalo, o que o aluno CONSEGUE fazer. */
export function vectorFloor(vector: SkillVector): CefrLevel {
  return SKILLS.reduce<CefrLevel>((acc, s) => minLevel(acc, vector[s]), 'C2')
}

/** Maior nivel do vetor — o que ele ja tocou, gancho de motivacao. */
export function vectorCeiling(vector: SkillVector): CefrLevel {
  return SKILLS.reduce<CefrLevel>((acc, s) => maxLevel(acc, vector[s]), 'A1')
}
