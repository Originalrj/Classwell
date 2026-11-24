// Tipos de dominio. Espelham o SPEC.md (secoes 6 a 12).
// Regra: nada aqui depende de Firebase ou React.

export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type CefrLevel = (typeof CEFR_LEVELS)[number]

export const SKILLS = [
  'listening',
  'speaking',
  'reading',
  'writing',
  'grammar',
  'vocabulary',
  'pronunciation',
  'pragmatics',
] as const
export type SkillCode = (typeof SKILLS)[number]

export const GOALS = [
  'travel',
  'work',
  'study',
  'social',
  'exam',
  'relationship',
  'general',
] as const
export type GoalCode = (typeof GOALS)[number]

export const PERSONALITY_TAGS = [
  'shy',
  'anxious',
  'talkative',
  'analytical',
  'visual',
  'auditory',
  'kinesthetic',
  'perfectionist',
  'impatient',
  'curious',
  'structured',
  'freeform',
] as const
export type PersonalityTag = (typeof PERSONALITY_TAGS)[number]

export const CONFIDENCES = [
  'saw_produce',
  'saw_recognize',
  'asked',
  'not_assessed',
] as const
export type Confidence = (typeof CONFIDENCES)[number]

export const STEP_STATUSES = [
  'locked',
  'available',
  'in_progress',
  'done',
  'skipped',
] as const
export type StepStatus = (typeof STEP_STATUSES)[number]

export const TASK_STATUSES = [
  'assigned',
  'in_progress',
  'submitted',
  'graded',
  'returned',
  'expired',
] as const
export type TaskStatus = (typeof TASK_STATUSES)[number]

export const TASK_TYPES = [
  'exercise',
  'essay',
  'speak',
  'read',
  'project',
  'exam',
  'self_check',
] as const
export type TaskType = (typeof TASK_TYPES)[number]

export type Role = 'teacher' | 'student' | 'admin'

export type SkillVector = Record<SkillCode, CefrLevel>

export type StudentStatus = 'active' | 'paused' | 'archived' | 'finished'

export interface StudentProfile {
  age: number
  l1: string
  country: string
  city?: string
  occupation: string
  occupationDomain?: string
  priorStudyYears: number
  priorLanguagesStudied: string[]
  personality: PersonalityTag[]
  interests: string[]
  familyStatus?: string
  previousLivingAbroad?: boolean
  freeNotes?: string
}

export interface Student {
  id: string
  teacherId: string
  authUid?: string
  name: string
  email: string
  inviteStatus: 'pending' | 'accepted'
  inviteToken?: string

  goal: GoalCode
  goalDetail: string
  targetCefr: CefrLevel
  targetDate?: string
  weeklyHours: number
  sessionMinutes: number

  currentCefr: CefrLevel
  skillVector: SkillVector
  lastAssessmentId?: string

  profile: StudentProfile
  toneOverride?: Partial<Tone>

  status: StudentStatus
  createdAt: Date
  lastActiveAt: Date
}

export type Formality = 'tu' | 'você' | 'misto'
export type Humor = 'none' | 'light' | 'playful'
export type Depth = 'minimal' | 'standard' | 'deep'
export type ExampleCulture = 'target' | 'learnerL1' | 'both'
export type Pace = 'slow' | 'medium' | 'fast'
export type Scaffolding = 'high' | 'medium' | 'low'
export type ErrorCorrection = 'immediate' | 'delayed' | 'at_end'

export interface Tone {
  formality: Formality
  addressStyle: 'firstName' | 'formal'
  humor: Humor
  explanationDepth: Depth
  exampleCulture: ExampleCulture
  tempoPace: Pace
  scaffolding: Scaffolding
  errorCorrection: ErrorCorrection
  challengeTone: 'encouraging' | 'direct' | 'playful'
}

export interface DiagnosticItem {
  id: string
  skill: SkillCode
  prompt: string
  descriptors: Partial<Record<CefrLevel, string>>
  order: number
  pillar?: 'canDo' | 'grammar' | 'lexis' | 'phonology' | 'pragmatics'
  tags: string[]
  active: boolean
}

export interface AssessmentAnswer {
  itemId: string
  level: CefrLevel | 'unknown'
  confidence: Confidence
  note?: string
}

export interface Gap {
  skill: SkillCode
  from: CefrLevel
  to: CefrLevel
  criticality: 'critical' | 'important' | 'nice_to_have'
  reason: string
}

export interface AssessmentResult {
  skillVector: SkillVector
  overall: CefrLevel
  ceiling: CefrLevel
  floor: CefrLevel
  profileSkew: boolean
  gaps: Gap[]
  summaryText: string
}

export interface Assessment {
  id: string
  studentId: string
  teacherId: string
  status: 'draft' | 'submitted' | 'superseded'
  method: 'trial_class' | 'followup' | 'self_assessment' | 'imported'
  items: AssessmentAnswer[]
  freeNotes: string
  teacherDeclaredLevel?: CefrLevel
  studentDeclaredLevel?: CefrLevel
  result?: AssessmentResult
  createdAt: Date
  submittedAt?: Date
}

export interface RampStep {
  id: string
  rampId: string
  studentId: string
  order: number
  title: string
  goal: string
  canDo: string[]
  why: string
  skills: SkillCode[]
  levelFrom: CefrLevel
  levelTo: CefrLevel
  primaryFocus:
    | 'grammar'
    | 'vocabulary'
    | 'listening'
    | 'speaking'
    | 'reading'
    | 'writing'
    | 'pronunciation'
    | 'culture'
  grammarPoints: string[]
  lexicalSets: string[]
  culturalNotes?: string
  contentIds: string[]
  suggestedTaskId?: string
  prerequisiteStepIds: string[]
  estimatedSessions: number
  estimatedMinutes: number
  status: StepStatus
  progress: number
  startedAt?: Date
  completedAt?: Date
  editedByTeacher: boolean
  generated: boolean
}

export interface Ramp {
  id: string
  studentId: string
  teacherId: string
  status: 'draft' | 'published' | 'completed' | 'abandoned'
  version: number
  sourceVector: SkillVector
  goal: GoalCode
  goalDetail: string
  targetCefr: CefrLevel
  targetDate?: string
  totalWeeksEstimate: number
  totalSessionsEstimate: number
  stepIds: string[]
  publishedAt?: Date
  createdAt: Date
}

export interface Task {
  id: string
  studentId: string
  teacherId: string
  stepId?: string
  title: string
  instructions: string
  type: TaskType
  suggestedContents: string[]
  dueAt?: Date
  estimatedMinutes?: number
  status: TaskStatus
  createdAt: Date
  returnedAt?: Date
}

export interface LessonSession {
  id: string
  studentId: string
  teacherId: string
  stepId?: string
  scheduledAt: Date
  durationMinutes: number
  status: 'scheduled' | 'done' | 'no_show' | 'cancelled'
  topicsCovered: string[]
  whatWorked: string
  whatToReview: string[]
  nextFocus: string
  studentMood?: 'great' | 'good' | 'neutral' | 'tired' | 'frustrated'
}

export interface UserDoc {
  uid: string
  role: Role
  /**
   * Professores novos nascem `pending` e so ganham acesso apos aprovacao do
   * admin. Contas antigas sem o campo sao tratadas como aprovadas nas regras.
   */
  approval?: 'pending' | 'approved'
  displayName: string
  email: string
  photoUrl?: string
  locale: string
  createdAt: Date
  onboardingStep?: number
}

// ------------------------------------------------------------ biblioteca

export const CONTENT_TYPES = [
  'explanation',
  'exercise',
  'quiz',
  'audio',
  'video',
  'reading',
  'infographic',
  'worksheet',
  'checklist',
] as const
export type ContentType = (typeof CONTENT_TYPES)[number]

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  explanation: 'Explicação',
  exercise: 'Exercício',
  quiz: 'Quiz',
  audio: 'Áudio',
  video: 'Vídeo',
  reading: 'Leitura',
  infographic: 'Infográfico',
  worksheet: 'Folha de trabalho',
  checklist: 'Checklist',
}

export const REGISTERS = ['informal', 'neutro', 'formal'] as const
export type Register = (typeof REGISTERS)[number]

export const REGISTER_LABELS: Record<Register, string> = {
  informal: 'Informal',
  neutro: 'Neutro',
  formal: 'Formal',
}

export const CONTENT_STATUSES = [
  'draft',
  'in_review',
  'published',
  'rejected',
  'deprecated',
] as const
export type ContentStatus = (typeof CONTENT_STATUSES)[number]

export const CONTENT_STATUS_LABELS: Record<ContentStatus, string> = {
  draft: 'Rascunho',
  in_review: 'Em revisão',
  published: 'Publicado',
  rejected: 'Rejeitado',
  deprecated: 'Descontinuado',
}

/** Temas do `themeTags`. O primeiro grupo casa 1:1 com os `goal` do aluno. */
export const CONTENT_THEMES = [
  'viagem',
  'trabalho',
  'estudo',
  'social',
  'corpo',
  'casa',
  'tecnologia',
  'cultura',
] as const
export type ContentTheme = (typeof CONTENT_THEMES)[number]

export interface MediaRef {
  path: string
  kind: 'audio' | 'video' | 'image' | 'pdf'
  url?: string
  bytes?: number
  mime?: string
}

/**
 * Material da plataforma (SPEC 10.2). Material nao pertence a aluno: o
 * `authorId` e credito, nao propriedade — por isso o documento nao tem
 * `teacherId` e as rules liberam leitura para qualquer professor.
 */
export interface Content {
  id: string
  title: string
  slug: string
  type: ContentType
  bodyFormat: 'markdown' | 'blocks' | 'media-only'
  body?: string
  media: MediaRef[]
  answerKey?: string

  cefrMin: CefrLevel
  cefrMax: CefrLevel
  skills: SkillCode[]
  primarySkill: SkillCode
  grammarTags: string[]
  lexicalTags: string[]
  themeTags: string[]
  /** obrigatorio para PLE: english != portugues em formalidade */
  register: Register
  countryTags: string[]
  dialectTags: string[]
  estMinutes: number

  source: 'human' | 'ai' | 'ai_reviewed'
  authorId: string
  status: ContentStatus
  qualityScore: number
  usageCount: number
  ratingAvg?: number
  ratingCount: number
  reportCount: number
  version: number
  createdAt: Date
  publishedAt?: Date
}

// ---------------------------------------------------------- configuracoes

export interface TeacherSettings {
  uid: string
  displayName: string
  email: string
  /** Defaults aplicados a todo aluno novo (SPEC secao de cadastro). */
  defaultSessionMinutes: number
  defaultWeeklyHours: number
  defaultGoal: GoalCode
  /** Gera a rampa automaticamente assim que o diagnostico fecha. */
  autoRampOnDiagnosis: boolean
  /** Professor ve conteudo in_review dos outros na aba Revisar. */
  showReviewQueue: boolean
  /** Minimo de palavras para o check automatico de qualidade. */
  minWordsForExplanation: number
  createdAt: Date
}
