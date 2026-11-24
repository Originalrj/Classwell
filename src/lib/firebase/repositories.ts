import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { getFirebaseDb } from './client'
import { emptySkillVector, levelIndex } from '@/lib/domain/levels'
import { resolveTone } from '@/lib/domain/tone'
import type {
  Assessment,
  AssessmentAnswer,
  AssessmentResult,
  CefrLevel,
  Content,
  ContentStatus,
  ContentType,
  GoalCode,
  MediaRef,
  Register,
  SkillCode,
  Student,
  StudentProfile,
  TeacherSettings,
  UserDoc,
} from '@/lib/types'

const students = () => collection(getFirebaseDb(), 'students')
const users = () => collection(getFirebaseDb(), 'users')

function toDate(value: unknown): Date {
  if (value instanceof Date) return value
  if (value && typeof value === 'object' && 'toDate' in value) {
    return (value as { toDate: () => Date }).toDate()
  }
  return new Date()
}

function mapStudent(id: string, data: Record<string, unknown>): Student {
  return {
    id,
    teacherId: data.teacherId as string,
    authUid: data.authUid as string | undefined,
    name: data.name as string,
    email: data.email as string,
    inviteStatus: (data.inviteStatus as Student['inviteStatus']) ?? 'pending',
    inviteToken: data.inviteToken as string | undefined,
    goal: data.goal as GoalCode,
    goalDetail: (data.goalDetail as string) ?? '',
    targetCefr: data.targetCefr as CefrLevel,
    targetDate: (data.targetDate as string | undefined) ?? undefined,
    weeklyHours: (data.weeklyHours as number) ?? 3,
    sessionMinutes: (data.sessionMinutes as number) ?? 60,
    currentCefr: (data.currentCefr as CefrLevel) ?? 'A1',
    skillVector: (data.skillVector as Student['skillVector']) ?? emptySkillVector(),
    lastAssessmentId: data.lastAssessmentId as string | undefined,
    profile: (data.profile as StudentProfile) ?? ({} as StudentProfile),
    toneOverride: data.toneOverride as Student['toneOverride'],
    status: (data.status as Student['status']) ?? 'active',
    createdAt: toDate(data.createdAt),
    lastActiveAt: toDate(data.lastActiveAt),
  }
}

// ------------------------------------------------------------------ users

export async function createUser(
  uid: string,
  data: Omit<UserDoc, 'uid' | 'createdAt'>,
): Promise<void> {
  await setDoc(doc(getFirebaseDb(), 'users', uid), {
    // O uid PRECISA estar no documento: e dele que a UI tira o dono do aluno
    // no createStudent. Sem esse campo o Firestore rejeita a escrita com
    // "Unsupported field value: undefined (found in field teacherId)".
    uid,
    ...data,
    createdAt: serverTimestamp(),
  })
}

export async function getUser(uid: string): Promise<UserDoc | null> {
  const snap = await getDoc(doc(getFirebaseDb(), 'users', uid))
  if (!snap.exists()) return null
  const data = snap.data() as UserDoc
  // Contas criadas antes do uid ser gravado nao tem o campo; o id do documento
  // e a fonte da verdade, entao usamos ele como fallback.
  return { ...data, uid: data.uid ?? uid }
}

/** Professores cadastrados, para a tela de aprovacoes do admin. */
export async function listTeachers(): Promise<UserDoc[]> {
  const q = query(users(), where('role', '==', 'teacher'), orderBy('displayName'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => {
    const data = d.data() as UserDoc
    return { ...data, uid: data.uid ?? d.id }
  })
}

/** So o admin pode aprovar — as regras negam qualquer outra tentativa. */
export async function approveTeacher(uid: string): Promise<void> {
  await updateDoc(doc(users(), uid), { approval: 'approved' })
}

export async function ensureTeacherDoc(
  uid: string,
  data: Record<string, unknown>,
): Promise<void> {
  await setDoc(
    doc(getFirebaseDb(), 'teachers', uid),
    { uid, ...data, createdAt: serverTimestamp() },
    { merge: true },
  )
}

// --------------------------------------------------------------- students

export interface CreateStudentInput {
  name: string
  email: string
  goal: GoalCode
  goalDetail: string
  targetCefr: CefrLevel
  targetDate?: string
  weeklyHours: number
  sessionMinutes: number
  profile: StudentProfile
}

/**
 * Lista alunos. Sem `teacherId` traz a lista compartilhada da plataforma —
 * professores aprovados veem os alunos uns dos outros.
 */
export async function listStudents(teacherId?: string, max = 100): Promise<Student[]> {
  const constraints = [orderBy('createdAt', 'desc'), limit(max)]
  const q = query(
    students(),
    ...(teacherId ? [where('teacherId', '==', teacherId)] : []),
    ...constraints,
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => mapStudent(d.id, d.data() as Record<string, unknown>))
}

export async function getStudent(studentId: string): Promise<Student | null> {
  const snap = await getDoc(doc(getFirebaseDb(), 'students', studentId))
  return snap.exists() ? mapStudent(studentId, snap.data() as Record<string, unknown>) : null
}

export async function createStudent(
  teacherId: string,
  input: CreateStudentInput,
): Promise<string> {
  const ref = await addDoc(students(), {
    teacherId,
    name: input.name,
    email: input.email,
    inviteStatus: 'pending',
    inviteToken: crypto.randomUUID().replace(/-/g, ''),
    goal: input.goal,
    goalDetail: input.goalDetail,
    targetCefr: input.targetCefr,
    targetDate: input.targetDate ?? null,
    weeklyHours: input.weeklyHours,
    sessionMinutes: input.sessionMinutes,
    currentCefr: 'A1' as CefrLevel,
    skillVector: emptySkillVector('A1'),
    profile: input.profile,
    // Tom resolvido no cadastro; o professor sobrescreve o que quiser.
    resolvedTone: resolveTone(input.profile),
    status: 'active',
    createdAt: serverTimestamp(),
    lastActiveAt: serverTimestamp(),
  })

  return ref.id
}

export async function updateStudent(
  studentId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  await updateDoc(doc(getFirebaseDb(), 'students', studentId), {
    ...patch,
    lastActiveAt: serverTimestamp(),
  })
}

export async function deleteStudent(studentId: string): Promise<void> {
  await deleteDoc(doc(getFirebaseDb(), 'students', studentId))
}

// ------------------------------------------------------------ assessments

export interface SaveAssessmentInput {
  student: Student
  teacherId: string
  items: AssessmentAnswer[]
  freeNotes: string
  result: AssessmentResult
}

/**
 * Grava a avaliacao e atualiza o aluno no MESMO writeBatch: ou os dois
 * acontecem, ou nenhum. Sem isso o professor poderia ver "diagnostico
 * salvo" com o vetor ainda em A1 no radar.
 *
 * O `teacherId` vai no documento porque e ele que as security rules usam
 * para decidir posse (a listagem por papel vazaria dados).
 */
export async function saveAssessment(input: SaveAssessmentInput): Promise<string> {
  const db = getFirebaseDb()
  const assessmentRef = doc(collection(db, 'assessments'))
  const batch = writeBatch(db)

  batch.set(assessmentRef, {
    id: assessmentRef.id,
    studentId: input.student.id,
    teacherId: input.teacherId,
    authUid: input.student.authUid ?? null,
    status: 'submitted',
    method: 'trial_class',
    items: input.items,
    freeNotes: input.freeNotes,
    result: input.result,
    createdAt: serverTimestamp(),
    submittedAt: serverTimestamp(),
  })

  batch.update(doc(db, 'students', input.student.id), {
    currentCefr: input.result.overall,
    skillVector: input.result.skillVector,
    lastAssessmentId: assessmentRef.id,
    lastActiveAt: serverTimestamp(),
  })

  await batch.commit()
  return assessmentRef.id
}

export async function listAssessments(
  studentId: string,
  max = 20,
): Promise<Assessment[]> {
  const q = query(
    collection(getFirebaseDb(), 'assessments'),
    where('studentId', '==', studentId),
    orderBy('createdAt', 'desc'),
    limit(max),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Assessment)
}

// -------------------------------------------------------------- conteudo

/**
 * Check automatico de qualidade do SPEC 10.4. Roda no cliente porque a
 * revisao humana vem depois; publicar exige score >= 0.7.
 *
 * Cada penalidade vale 0.1. Os dois itens que mais derrubam o score sao os
 * que o SPEC chama de obrigatorios: `register` preenchido e `answerKey` em
 * exercise/quiz.
 */
export function scoreContent(input: {
  body?: string
  type: ContentType
  cefrMin: CefrLevel
  cefrMax: CefrLevel
  skills: SkillCode[]
  primarySkill: SkillCode
  themeTags: string[]
  register: Register
  answerKey?: string
  /** Vem de TeacherSettings.minWordsForExplanation; o default do check e 300. */
  minWords?: number
}): { score: number; issues: string[] } {
  const issues: string[] = []
  let score = 1

  // Falha critica derruba 0.25, cosmética 0.10. Com peso igual, um material
  // sem gabarito NEM sem tema tirava so 0.3 e parava em 0.7 exato — que e o
  // proprio limiar de publicacao, entao passaria.
  const drop = (amount: number, message: string) => {
    issues.push(message)
    score -= amount
  }

  // O limite vem da configuracao do professor e e em PALAVRAS. Antes o check
  // contava caracteres, o que deixava passar um texto de 300 caracteres
  // (cerca de 50 palavras) como se fosse explica��ao.
  const minWords = input.minWords ?? 300
  const words = (input.body ?? '').trim().split(/\s+/).filter(Boolean).length
  if (!input.body || input.body.trim().length < 100 || words < minWords) {
    drop(
      0.25,
      `Explicação curta demais (${words} de ${minWords} palavras)`,
    )
  }
  if ((input.type === 'exercise' || input.type === 'quiz') && !input.answerKey) {
    drop(0.25, 'Exercicio sem gabarito')
  }
  if (!input.register) drop(0.25, 'Registro vazio: obrigatorio para PLE')
  if (levelIndex(input.cefrMax) < levelIndex(input.cefrMin)) {
    drop(0.25, 'Faixa de nivel invertida')
  }

  if (input.skills.length === 0) drop(0.1, 'Nenhuma competencia marcada')
  if (!input.skills.includes(input.primarySkill)) {
    drop(0.1, 'A competencia principal nao esta na lista de competencias')
  }
  if (input.themeTags.length === 0) drop(0.1, 'Nenhum tema marcado')

  return { score: Math.max(0, Math.round(score * 10) / 10), issues }
}

function mapContent(id: string, data: Record<string, unknown>): Content {
  return {
    id,
    title: (data.title as string) ?? 'Sem título',
    slug: (data.slug as string) ?? id,
    type: (data.type as ContentType) ?? 'explanation',
    bodyFormat: (data.bodyFormat as Content['bodyFormat']) ?? 'markdown',
    body: data.body as string | undefined,
    media: (data.media as MediaRef[]) ?? [],
    answerKey: data.answerKey as string | undefined,
    cefrMin: (data.cefrMin as CefrLevel) ?? 'A1',
    cefrMax: (data.cefrMax as CefrLevel) ?? 'A1',
    skills: (data.skills as SkillCode[]) ?? [],
    primarySkill: (data.primarySkill as SkillCode) ?? 'speaking',
    grammarTags: (data.grammarTags as string[]) ?? [],
    lexicalTags: (data.lexicalTags as string[]) ?? [],
    themeTags: (data.themeTags as string[]) ?? [],
    register: (data.register as Register) ?? 'neutro',
    countryTags: (data.countryTags as string[]) ?? [],
    dialectTags: (data.dialectTags as string[]) ?? [],
    estMinutes: (data.estMinutes as number) ?? 10,
    source: (data.source as Content['source']) ?? 'human',
    authorId: (data.authorId as string) ?? '',
    status: (data.status as ContentStatus) ?? 'draft',
    qualityScore: (data.qualityScore as number) ?? 0,
    usageCount: (data.usageCount as number) ?? 0,
    ratingAvg: data.ratingAvg as number | undefined,
    ratingCount: (data.ratingCount as number) ?? 0,
    reportCount: (data.reportCount as number) ?? 0,
    version: (data.version as number) ?? 1,
    createdAt: toDate(data.createdAt),
    publishedAt: data.publishedAt ? toDate(data.publishedAt) : undefined,
  }
}

export async function listContents(
  filter: { status?: ContentStatus; max?: number } = {},
): Promise<Content[]> {
  const base = collection(getFirebaseDb(), 'contents')
  const q = filter.status
    ? query(base, where('status', '==', filter.status), orderBy('createdAt', 'desc'), limit(filter.max ?? 100))
    : query(base, orderBy('createdAt', 'desc'), limit(filter.max ?? 100))
  const snap = await getDocs(q)
  return snap.docs.map((d) => mapContent(d.id, d.data() as Record<string, unknown>))
}

export async function getContent(id: string): Promise<Content | null> {
  const snap = await getDoc(doc(getFirebaseDb(), 'contents', id))
  return snap.exists() ? mapContent(id, snap.data() as Record<string, unknown>) : null
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export interface CreateContentInput {
  title: string
  type: ContentType
  body?: string
  answerKey?: string
  cefrMin: CefrLevel
  cefrMax: CefrLevel
  skills: SkillCode[]
  primarySkill: SkillCode
  grammarTags: string[]
  lexicalTags: string[]
  themeTags: string[]
  register: Register
  countryTags: string[]
  dialectTags: string[]
  estMinutes: number
  /** Limite de palavras do check automatico, herdado de TeacherSettings. */
  minWords?: number
}

export async function createContent(
  authorId: string,
  input: CreateContentInput,
  submitForReview: boolean,
): Promise<{ id: string; score: number; issues: string[] }> {
  const { score, issues } = scoreContent(input)
  const ref = doc(collection(getFirebaseDb(), 'contents'))

  await setDoc(ref, {
    id: ref.id,
    title: input.title.trim(),
    slug: slugify(input.title),
    type: input.type,
    // Upload de midia ainda nao existe; enquanto isso todo conteudo nasce
    // como markdown. Vira 'media-only' quando o Storage entrar.
    bodyFormat: 'markdown' as const,
    body: input.body?.trim() ?? null,
    media: [],
    answerKey: input.answerKey?.trim() || null,
    cefrMin: input.cefrMin,
    cefrMax: input.cefrMax,
    skills: input.skills,
    primarySkill: input.primarySkill,
    grammarTags: input.grammarTags,
    lexicalTags: input.lexicalTags,
    themeTags: input.themeTags,
    register: input.register,
    countryTags: input.countryTags,
    dialectTags: input.dialectTags,
    estMinutes: input.estMinutes,
    source: 'human',
    authorId,
    // Submeter direto so faz sentido com material passavel no check; um
    // rascunho fraco fica como draft para o autor terminar.
    status: submitForReview && score >= 0.7 ? 'in_review' : 'draft',
    qualityScore: score,
    usageCount: 0,
    ratingCount: 0,
    reportCount: 0,
    version: 1,
    createdAt: serverTimestamp(),
  })

  return { id: ref.id, score, issues }
}

export async function updateContentStatus(
  id: string,
  status: ContentStatus,
): Promise<void> {
  await updateDoc(doc(getFirebaseDb(), 'contents', id), {
    status,
    publishedAt: status === 'published' ? serverTimestamp() : null,
  })
}

export async function reportContent(contentId: string, reason: string): Promise<void> {
  await addDoc(collection(getFirebaseDb(), 'contentReports'), {
    contentId,
    reason,
    createdAt: serverTimestamp(),
  })
}

// ---------------------------------------------------------- configuracoes

const TEACHER_DEFAULTS = {
  defaultSessionMinutes: 60,
  defaultWeeklyHours: 3,
  defaultGoal: 'travel' as GoalCode,
  autoRampOnDiagnosis: true,
  showReviewQueue: true,
  minWordsForExplanation: 300,
}

export async function getTeacherSettings(
  uid: string,
  email: string,
  displayName: string,
): Promise<TeacherSettings> {
  const snap = await getDoc(doc(getFirebaseDb(), 'teachers', uid))
  const data = snap.exists() ? (snap.data() as Partial<TeacherSettings>) : {}
  return {
    uid,
    displayName: data.displayName ?? displayName,
    email: data.email ?? email,
    ...TEACHER_DEFAULTS,
    ...data,
    createdAt: data.createdAt ? toDate(data.createdAt) : new Date(),
  }
}

export async function saveTeacherSettings(
  settings: TeacherSettings,
): Promise<void> {
  const db = getFirebaseDb()
  const ref = doc(db, 'teachers', settings.uid)

  // createdAt precisa ser gravado uma vez so. Mandar serverTimestamp() a cada
  // save fazia o documento parecer recem-criado toda vez que o professor mexia
  // em qualquer preferencia. O guard olha o CAMPO e nao o documento: o doc do
  // professor ja nasce no cadastro (ensureTeacherDoc), entao exists() era
  // sempre true e createdAt nunca era preenchido.
  const snap = await getDoc(ref)
  const payload: Record<string, unknown> = {
    displayName: settings.displayName,
    email: settings.email,
    defaultSessionMinutes: settings.defaultSessionMinutes,
    defaultWeeklyHours: settings.defaultWeeklyHours,
    defaultGoal: settings.defaultGoal,
    autoRampOnDiagnosis: settings.autoRampOnDiagnosis,
    showReviewQueue: settings.showReviewQueue,
    minWordsForExplanation: settings.minWordsForExplanation,
    updatedAt: serverTimestamp(),
  }
  if (!snap.exists() || snap.data()?.createdAt == null) {
    payload.createdAt = serverTimestamp()
  }

  const batch = writeBatch(db)
  batch.set(ref, payload, { merge: true })
  // O header e o painel leem o nome de users/{uid}, nao de teachers/{uid}.
  // Sem esta linha o professor salvava o nome e a UI continuava mostrando o
  // antigo ate recarregar a pagina.
  batch.set(
    doc(db, 'users', settings.uid),
    { displayName: settings.displayName },
    { merge: true },
  )
  await batch.commit()
}

/** Escrita em lote — usada pelo seed. */
export async function batchWrite(
  writes: Array<{ path: string; data: Record<string, unknown> }>,
): Promise<void> {
  const batch = writeBatch(getFirebaseDb())
  const db = getFirebaseDb()
  for (const w of writes) {
    // O spread precisa vir tipado como tupla nao-vazia para o overload de
    // doc() aceitar; string[] puro nao casa com a assinatura.
    const segments = w.path.split('/') as [string, ...string[]]
    batch.set(doc(db, ...segments), w.data)
  }
  await batch.commit()
}
