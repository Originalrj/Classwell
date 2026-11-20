/**
 * Material-base da Biblioteca, derivado de `src/lib/domain/curriculum.ts`.
 *
 * Dado de seed, nao dominio: so o `scripts/seed-biblioteca.ts` consome.
 *
 * Regra do corpo: 300+ palavras com explicacao, exemplos, erro comum e
 * tarefa curta. Abaixo disso o scoreContent tira 0.25 e o material nao
 * passa do limiar de publicacao.
 */
import type { Register, SkillCode } from '@/lib/types'

export interface SeedLesson {
  /** Liga com CurriculumTopic.key. */
  topicKey: string
  type: 'explanation' | 'exercise' | 'worksheet'
  title: string
  cefrMin: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  cefrMax: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  skills: SkillCode[]
  primarySkill: SkillCode
  register: Register
  estMinutes: number
  grammarTags: string[]
  lexicalTags: string[]
  dialectTags: string[]
  body: string
  answerKey?: string
}