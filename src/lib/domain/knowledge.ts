/**
 * Apanhado de conhecimento da Biblioteca (PLE).
 *
 * Este modulo so tem tipos, taxonomias e funcoes puras. Os dados ficam em
 * `knowledge-bank.ts` para poderem crescer sem mexer na logica de busca.
 *
 * Regra de ouro do cartao: PT em cima, EN logo abaixo e "como se fala"
 * em seguida. A dica de L1 e uma ponte revisavel, nunca um rotulo do aluno.
 */
import type {
  CefrLevel,
  ContentType,
  Register,
  SkillCode,
} from '@/lib/types'

/** A0 e pre-nivel pedagogico (Pre-A1); C2 fica reservado para conteudo futuro. */
export const KNOWLEDGE_LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type KnowledgeLevel = (typeof KNOWLEDGE_LEVELS)[number]

export const KNOWLEDGE_LEVEL_LABELS: Record<KnowledgeLevel, string> = {
  A0: 'A0 · primeiros passos',
  A1: 'A1 · iniciante',
  A2: 'A2 · elementar',
  B1: 'B1 · intermediário',
  B2: 'B2 · fluência funcional',
  C1: 'C1 · avançado',
  C2: 'C2 · domínio',
}

/** Eixos de conhecimento da língua — o professor filtra por eles. */
export const KNOWLEDGE_TYPES = [
  'grammar',
  'lexicon',
  'phonetics',
  'pragmatics',
  'culture',
  'teaching',
] as const
export type KnowledgeType = (typeof KNOWLEDGE_TYPES)[number]

export const KNOWLEDGE_TYPE_LABELS: Record<KnowledgeType, string> = {
  grammar: 'Gramática',
  lexicon: 'Léxico',
  phonetics: 'Fonética e pronúncia',
  pragmatics: 'Pragmática e registro',
  culture: 'Cultura e variação',
  teaching: 'Ensino e estratégias',
}

/** Formato da entrada. "Perguntas comuns" e o que o professor mais usa. */
export const KNOWLEDGE_KINDS = ['question', 'rule', 'contrast', 'tip'] as const
export type KnowledgeKind = (typeof KNOWLEDGE_KINDS)[number]

export const KNOWLEDGE_KIND_LABELS: Record<KnowledgeKind, string> = {
  question: 'Pergunta comum',
  rule: 'Regra / explicação',
  contrast: 'Contraste com L1',
  tip: 'Dica de aula',
}

export const L1_CODES = ['en', 'es', 'fr', 'de', 'it', 'ja', 'zh', 'ar'] as const
export type L1Code = (typeof L1_CODES)[number]

export const L1_LABELS: Record<L1Code, string> = {
  en: 'Inglês',
  es: 'Espanhol',
  fr: 'Francês',
  de: 'Alemão',
  it: 'Italiano',
  ja: 'Japonês',
  zh: 'Chinês',
  ar: 'Árabe',
}

export interface KnowledgeEntry {
  /** Slug estavel, usado como chave de busca e de ligacao com materiais. */
  id: string
  level: KnowledgeLevel
  type: KnowledgeType
  kind: KnowledgeKind
  /** A pergunta que o aluno realmente faz na aula. */
  question: string
  /** Frase em portugues — sempre a primeira linha do cartao. */
  pt: string
  /** Ponte de compreensao em ingles — nunca substitui o PT. */
  en: string
  /** Pronuncia aproximada, escrita para o professor ler em voz alta. */
  spoken: string
  /** Resposta curta e direta para o professor usar na aula. */
  answer: string
  /** Hipoteses de transferencia por idioma materno. */
  l1Hints: Partial<Record<L1Code, string>>
  grammarTags: string[]
  lexicalTags: string[]
  themeTags: string[]
  skills: SkillCode[]
  register: Register
  /** Chave do topico do curriculo a que esta entrada esta ligada. */
  sourceTopic?: string
  /** Sinonimos, erros tipicos e termos que o professor pode digitar. */
  keywords: string[]
  reviewed: boolean
}

export interface KnowledgeFilters {
  query?: string
  level?: KnowledgeLevel | 'all'
  type?: KnowledgeType | 'all'
  kind?: KnowledgeKind | 'all'
  l1?: L1Code | 'all'
  theme?: string | 'all'
}

export interface KnowledgeHit {
  entry: KnowledgeEntry
  score: number
}

/** Remove acentos para "cacilha" encontrar "ça" e "pronuncia" encontrar "pronúncia". */
export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function haystack(entry: KnowledgeEntry): string {
  return fold(
    [
      entry.question,
      entry.pt,
      entry.en,
      entry.spoken,
      entry.answer,
      entry.id,
      KNOWLEDGE_LEVEL_LABELS[entry.level],
      KNOWLEDGE_TYPE_LABELS[entry.type],
      KNOWLEDGE_KIND_LABELS[entry.kind],
      ...entry.grammarTags,
      ...entry.lexicalTags,
      ...entry.themeTags,
      ...entry.keywords,
      ...Object.values(entry.l1Hints),
    ].join(' '),
  )
}

/**
 * Busca com todos os termos (AND) e pontuacao simples: quanto mais campos
 * casam, mais alto o item aparece. Sem consulta, mantem a ordem do acervo.
 */
export function searchKnowledge(
  entries: KnowledgeEntry[],
  filters: KnowledgeFilters = {},
): KnowledgeHit[] {
  const terms = fold(filters.query ?? '').split(/\s+/).filter(Boolean)
  const hits: KnowledgeHit[] = []

  for (const entry of entries) {
    if (filters.level && filters.level !== 'all' && entry.level !== filters.level) continue
    if (filters.type && filters.type !== 'all' && entry.type !== filters.type) continue
    if (filters.kind && filters.kind !== 'all' && entry.kind !== filters.kind) continue
    if (filters.l1 && filters.l1 !== 'all' && !entry.l1Hints[filters.l1]) continue
    if (filters.theme && filters.theme !== 'all' && !entry.themeTags.includes(filters.theme)) {
      continue
    }

    if (terms.length === 0) {
      hits.push({ entry, score: 0 })
      continue
    }

    const text = haystack(entry)
    const title = fold(`${entry.question} ${entry.pt} ${entry.en}`)
    const tags = fold([...entry.grammarTags, ...entry.lexicalTags, ...entry.keywords].join(' '))
    let score = 0
    let matchesAll = true
    for (const term of terms) {
      if (!text.includes(term)) {
        matchesAll = false
        break
      }
      if (title.includes(term)) score += 3
      if (tags.includes(term)) score += 2
      score += 1
    }
    if (matchesAll) hits.push({ entry, score })
  }

  if (terms.length === 0) return hits
  return hits.sort((a, b) => b.score - a.score)
}

export function knowledgeCounts(entries: KnowledgeEntry[]) {
  const levels: Record<string, number> = { all: entries.length }
  const types: Record<string, number> = { all: entries.length }
  const kinds: Record<string, number> = { all: entries.length }
  for (const entry of entries) {
    levels[entry.level] = (levels[entry.level] ?? 0) + 1
    types[entry.type] = (types[entry.type] ?? 0) + 1
    kinds[entry.kind] = (kinds[entry.kind] ?? 0) + 1
  }
  return { levels, types, kinds }
}

// -------------------------------------------------- ponte para a biblioteca

export const CONTENT_DRAFT_KEY = 'rampa:content-draft'

export interface ContentDraft {
  title: string
  type: ContentType
  body: string
  cefrMin: CefrLevel
  cefrMax: CefrLevel
  skills: SkillCode[]
  grammarTags: string[]
  lexicalTags: string[]
  themeTags: string[]
  register: Register
  estMinutes: number
}

/** A0 nao existe em `contents` ainda: o rascunho entra como A1 e avisa no corpo. */
function toContentLevel(level: KnowledgeLevel): CefrLevel {
  if (level === 'A0') return 'A1'
  return level
}

export function contentDraftFromEntry(entry: KnowledgeEntry): ContentDraft {
  const l1 = Object.entries(entry.l1Hints)
    .map(([code, text]) => `**${L1_LABELS[code as L1Code] ?? code}:** ${text}`)
    .join('\n- ')

  const blocks = [
    `## Pergunta\n${entry.question}`,
    [
      '## Cartão',
      `**Português:** ${entry.pt}`,
      `**Inglês (ponte):** ${entry.en}`,
      `**Como se fala:** ${entry.spoken}`,
    ].join('\n'),
    `## Resposta para a aula\n${entry.answer}`,
  ]
  if (l1) blocks.push(`## Dicas por idioma materno (hipóteses revisáveis)\n- ${l1}`)
  if (entry.level === 'A0') {
    blocks.push(
      '> Pré-nível A0: o material foi criado como A1 porque a biblioteca ainda não tem A0.',
    )
  }
  if (entry.sourceTopic) blocks.push(`> Tópico do currículo: \`${entry.sourceTopic}\``)
  const body = blocks.join('\n\n')

  const level = toContentLevel(entry.level)
  return {
    title: entry.question,
    type: 'explanation',
    body,
    cefrMin: level,
    cefrMax: level,
    skills: entry.skills,
    grammarTags: entry.grammarTags,
    lexicalTags: entry.lexicalTags,
    themeTags: entry.themeTags,
    register: entry.register,
    estMinutes: 15,
  }
}
