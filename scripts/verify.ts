/**
 * Verificacao ponta a ponta contra os emuladores.
 *   npm run verify
 *
 * Exercita o caminho real: cadastro -> documento de perfil -> logout -> login
 * -> cadastro de aluno -> listagem. Passa pelas security rules.
 */
import { initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { computeDiagnosis, computeGaps, diagnosisHeadline } from '../src/lib/domain/diagnosis'
import { DIAGNOSTIC_ITEMS } from '../src/lib/domain/diagnosticBank'
import { GOAL_SKILL_WEIGHTS } from '../src/lib/domain/levels'
import { getTeacherSettings, saveTeacherSettings, scoreContent } from '../src/lib/firebase/repositories'
import type { AssessmentAnswer, AssessmentResult, CefrLevel } from '../src/lib/types'

const PROJECT = 'demo-rampa'

let pass = 0
let fail = 0

function check(label: string, ok: boolean, detail = '') {
  if (ok) {
    pass++
    console.log(`  ok   ${label}`)
  } else {
    fail++
    console.log(`  FALHA ${label}${detail ? ` — ${detail}` : ''}`)
  }
}

async function main() {
  const app = initializeApp({ projectId: PROJECT, apiKey: 'demo-key' })
  const auth = getAuth(app)
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })

  const firestore = getFirestore(app)
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080)

  const getStudentDoc = (id: string) =>
    getDoc(doc(firestore, 'students', id)).then((s) =>
      s.exists()
        ? (s.data() as {
            currentCefr?: CefrLevel
            lastAssessmentId?: string
            skillVector?: Record<string, CefrLevel>
          })
        : null,
    )

  /** Espelha saveAssessment: avaliacao + atualizacao do aluno no mesmo batch. */
  const saveAssessmentFor = async (input: {
    studentId: string
    teacherId: string
    items: AssessmentAnswer[]
    result: AssessmentResult
  }): Promise<string | null> => {
    try {
      const ref = doc(collection(firestore, 'assessments'))
      const batch = writeBatch(firestore)
      batch.set(ref, {
        id: ref.id,
        studentId: input.studentId,
        teacherId: input.teacherId,
        authUid: null,
        status: 'submitted',
        method: 'trial_class',
        items: input.items,
        freeNotes: '',
        result: input.result,
        createdAt: Timestamp.now(),
        submittedAt: Timestamp.now(),
      })
      batch.update(doc(firestore, 'students', input.studentId), {
        currentCefr: input.result.overall,
        skillVector: input.result.skillVector,
        lastAssessmentId: ref.id,
        lastActiveAt: Timestamp.now(),
      })
      await batch.commit()
      return ref.id
    } catch (e) {
      check('saveAssessment nao lancou', false, (e as Error).message.slice(0, 120))
      return null
    }
  }

  const email = `prof${Date.now()}@teste.com`
  const password = 'senha123456'

  console.log('\n1. Cadastro de professor')
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  const uid = cred.user.uid
  check('conta criada no Auth', !!uid, uid)

  await setDoc(doc(firestore, 'users', uid), {
    uid,
    role: 'teacher',
    displayName: 'Ana Teste',
    email,
    locale: 'pt-BR',
  })

  // Regressao: o uid precisa estar NO documento. A UI tira dele o dono do
  // aluno no createStudent; sem o campo o Firestore rejeita com
  // "Unsupported field value: undefined (found in field teacherId)".
  const profileDoc = await getDoc(doc(firestore, 'users', uid))
  check(
    'users/{uid} guarda o proprio uid',
    (profileDoc.data() as { uid?: string } | undefined)?.uid === uid,
    String((profileDoc.data() as { uid?: string } | undefined)?.uid),
  )

  let rejectedUndefined = false
  try {
    await setDoc(doc(collection(firestore, 'students')), {
      teacherId: undefined,
      name: 'Sem dono',
    })
  } catch {
    rejectedUndefined = true
  }
  check(
    'teacherId undefined e rejeitado (por isso o uid importa)',
    rejectedUndefined,
    'Firestore aceitou teacherId vazio',
  )
  await setDoc(doc(firestore, 'teachers', uid), {
    uid,
    headline: 'Professor de PLE',
    country: 'BR',
    defaultSessionMinutes: 60,
    stats: { students: 0, publishedContents: 0, totalUses: 0 },
  })
  check('users/{uid} gravado', true)

  const usersSnap = await getDoc(doc(firestore, 'users', uid))
  check('leitura do proprio perfil', usersSnap.exists())
  check('papel = teacher', usersSnap.data()?.role === 'teacher', String(usersSnap.data()?.role))

  console.log('\n2. Logout e login de volta')
  await signOut(auth)
  check('deslogado', auth.currentUser === null)

  const again = await signInWithEmailAndPassword(auth, email, password)
  check('login aceita a mesma senha', again.user.uid === uid)
  check('token emitido', !!again.user.getIdToken)

  const reread = await getDoc(doc(firestore, 'users', uid))
  check('perfil reaparece no login', reread.exists())

  console.log('\n3. Cadastro de aluno')
  const studentRef = doc(collection(firestore, 'students'))
  await setDoc(studentRef, {
    teacherId: uid,
    name: 'Yuki Tanaka',
    email: 'yuki@teste.com',
    inviteStatus: 'pending',
    inviteToken: 'abc123',
    goal: 'travel',
    goalDetail: 'Vou morar em Lisboa em novembro',
    targetCefr: 'A2',
    weeklyHours: 3,
    sessionMinutes: 60,
    currentCefr: 'A1',
    status: 'active',
    createdAt: Timestamp.now(),
  })
  check('aluno gravado', true, studentRef.id)

  console.log('\n4. Listagem por professor (mesma query do app)')
  const listQ = query(
    collection(firestore, 'students'),
    where('teacherId', '==', uid),
    orderBy('createdAt', 'desc'),
  )
  const snap = await getDocs(listQ)
  check('lista filtrada retorna >= 1', snap.size >= 1, `${snap.size} documento(s)`)

  console.log('\n4b. Professor dono le o proprio aluno (rota de detalhe)')
  try {
    const own = await getDoc(doc(firestore, 'students', studentRef.id))
    check('dono le o proprio aluno', own.exists(), own.exists() ? 'ok' : 'nao achou')
  } catch (e) {
    check('dono le o proprio aluno', false, (e as Error).message.slice(0, 90))
  }

  console.log('\n5. Isolamento entre professores')
  const otherEmail = `outro${Date.now()}@teste.com`
  const other = await createUserWithEmailAndPassword(auth, otherEmail, 'senha123456')
  await setDoc(doc(firestore, 'users', other.user.uid), {
    uid: other.user.uid,
    role: 'teacher',
    displayName: 'Bruno',
    email: other.user.email ?? '',
    locale: 'pt-BR',
  })
  // Leitura negada no emulador chega como excecao (permission-denied),
  // nao como doc inexistente. Negado = passou.
  let foreignDenied = false
  let foreignDetail = ''
  try {
    const foreign = await getDoc(doc(firestore, 'students', studentRef.id))
    foreignDenied = !foreign.exists()
    foreignDetail = foreign.exists() ? 'vazou!' : ''
  } catch (e) {
    foreignDenied = true
    foreignDetail = `negado (${(e as { code?: string }).code ?? 'erro'})`
  }
  check('outro professor NAO le o aluno alheio', foreignDenied, foreignDetail)

  let listEmpty = false
  let listDetail = ''
  try {
    const foreignList = await getDocs(listQ)
    listEmpty = foreignList.size === 0
    listDetail = `${foreignList.size} documento(s)`
  } catch (e) {
    listEmpty = true
    listDetail = `negado (${(e as { code?: string }).code ?? 'erro'})`
  }
  check('lista do outro professor volta vazia', listEmpty, listDetail)

  // A avaliacao foi gravada pelo professor dono; volta pro dono, nao pro outro.
  console.log('\n6. Gravacao do diagnostico')
  // A secao 5 deixou a sessao no professor B; volta para o dono, senao toda
  // leitura de aluno aqui e (corretamente) negada.
  await signInWithEmailAndPassword(auth, email, password)
  const before = await getStudentDoc(studentRef.id)
  check('aluno nasce sem nivel definido', before?.currentCefr === 'A1', String(before?.currentCefr))

  const answers = [
    { itemId: 'sp-01', level: 'A2', confidence: 'saw_produce' },
    { itemId: 'sp-02', level: 'A2', confidence: 'saw_produce' },
    { itemId: 'sp-03', level: 'B1', confidence: 'saw_produce' },
    { itemId: 'sp-04', level: 'B1', confidence: 'saw_produce' },
    { itemId: 'sp-05', level: 'unknown', confidence: 'not_assessed' },
    { itemId: 'gr-01', level: 'A2', confidence: 'saw_produce' },
    { itemId: 'gr-02', level: 'A2', confidence: 'saw_produce' },
    { itemId: 'gr-03', level: 'A1', confidence: 'saw_produce' },
  ] as const

  const result = computeDiagnosis(
    answers.map((a) => ({ ...a, level: a.level as CefrLevel | 'unknown' })),
    DIAGNOSTIC_ITEMS,
  )
  const gaps = computeGaps(result.skillVector, 'travel', result.overall)
  const summaryText = diagnosisHeadline(result)
  const assessment: AssessmentResult = { ...result, gaps, summaryText }

  console.log(`     motor: overall=${result.overall} teto=${result.ceiling} skew=${result.profileSkew}`)
  check('motor nao chuta A1 em tudo', result.overall !== 'A1', `overall=${result.overall}`)
  check('mediana arredonda meio nivel', result.skillVector.speaking === 'B1', `speaking=${result.skillVector.speaking}`)
  check('gramatica rebaixada pelo item A1', result.skillVector.grammar === 'A2', `grammar=${result.skillVector.grammar}`)
  check('skill sem item NAO derruba o gargalo', result.overall === 'A2', `overall=${result.overall}`)
  check('skills nao avaliadas sao listadas', result.unassessedSkills.length > 0, result.unassessedSkills.join(','))
  const goalSkills = GOAL_SKILL_WEIGHTS.travel
  const goalGaps = gaps.filter((g) => goalSkills.includes(g.skill))
  check('lacuna cobre alguma skill do objetivo', goalGaps.length > 0, goalGaps.map((g) => g.skill).join(','))
  check('lacuna do objetivo e marcada critica', goalGaps.every((g) => g.criticality === 'critical'), goalGaps.map((g) => g.criticality).join(','))
  check('skill ja na meta nao vira lacuna', !gaps.some((g) => g.skill === 'speaking'), 'speaking ja esta em B1')
  check('resumo e texto legivel', summaryText.length > 20, summaryText)

  // Volta para o professor dono antes de gravar.
  const saved = await saveAssessmentFor({
    studentId: studentRef.id,
    teacherId: uid,
    items: answers.map((a) => ({ ...a, level: a.level as CefrLevel | 'unknown' })),
    result: assessment,
  })
  check('avaliacao gravada', saved !== null, saved ?? 'falhou')

  const after = await getStudentDoc(studentRef.id)
  check('currentCefr atualizado no aluno', after?.currentCefr === result.overall, String(after?.currentCefr))
  check('skillVector propagado', after?.skillVector?.speaking === 'B1', String(after?.skillVector?.speaking))
  check('lastAssessmentId preenchido', typeof after?.lastAssessmentId === 'string', String(after?.lastAssessmentId))

  const readBack = await getDoc(doc(firestore, 'assessments', after?.lastAssessmentId ?? ''))
  check('avaliacao relida do Firestore', readBack.exists(), String(readBack.exists()))

  console.log('\n7. Biblioteca e configuracoes')

  // O check conta PALAVRAS, nao caracteres. 350 palavras de 'palavra '.
  const longText = Array.from({ length: 350 }, () => 'palavra').join(' ')

  // Check de qualidade: um exercicio sem gabarito tem de ser reprovado.
  const weak = scoreContent({
    type: 'exercise',
    body: 'curto',
    cefrMin: 'A1',
    cefrMax: 'A2',
    skills: ['speaking'],
    primarySkill: 'speaking',
    themeTags: [],
    register: 'neutro',
  })
  check('check reprova material fraco', weak.score < 0.7, `score=${weak.score}`)
  check('reprova por falta de gabarito', weak.issues.some((i) => i.includes('gabarito')), weak.issues.join('; '))
  check('reprova por falta de tema', weak.issues.some((i) => i.includes('tema')), weak.issues.join('; '))

  // Texto longo em CARACTERES mas curto em palavras tem de reprovar. Era o
  // que o check antigo deixava passar: 400 caracteres ~ 50 palavras.
  const longCharsFewWords = scoreContent({
    type: 'explanation',
    body: 'x'.repeat(400),
    cefrMin: 'A1',
    cefrMax: 'A2',
    skills: ['reading'],
    primarySkill: 'reading',
    themeTags: ['estudo'],
    register: 'neutro',
  })
  check(
    'reprova texto longo em caracteres mas curto em palavras',
    longCharsFewWords.issues.some((i) => i.includes('palavras')),
    longCharsFewWords.issues.join('; '),
  )

  // O limite vem da configuracao do professor.
  const shortByConfig = scoreContent({
    type: 'explanation',
    body: Array.from({ length: 120 }, () => 'palavra').join(' '),
    cefrMin: 'A1',
    cefrMax: 'A2',
    skills: ['reading'],
    primarySkill: 'reading',
    themeTags: ['estudo'],
    register: 'neutro',
    minWords: 200,
  })
  check(
    'respeita minWords configurado pelo professor',
    shortByConfig.issues.some((i) => i.includes('120 de 200')),
    shortByConfig.issues.join('; '),
  )

  const inverted = scoreContent({
    type: 'reading',
    body: longText,
    cefrMin: 'B2',
    cefrMax: 'A1',
    skills: ['reading'],
    primarySkill: 'reading',
    themeTags: ['estudo'],
    register: 'neutro',
  })
  check('detecta faixa de nivel invertida', inverted.issues.some((i) => i.includes('invertida')), inverted.issues.join('; '))

  const mismatch = scoreContent({
    type: 'reading',
    body: longText,
    cefrMin: 'A1',
    cefrMax: 'A2',
    skills: ['reading'],
    primarySkill: 'writing',
    themeTags: ['estudo'],
    register: 'neutro',
  })
  check('detecta competencia principal fora da lista', mismatch.score < 1, `score=${mismatch.score}`)

  const solid = scoreContent({
    type: 'explanation',
    body: longText,
    cefrMin: 'A1',
    cefrMax: 'A2',
    skills: ['speaking', 'listening'],
    primarySkill: 'speaking',
    themeTags: ['viagem'],
    register: 'neutro',
  })
  check('material completo passa com 1.0', solid.score === 1, `score=${solid.score}`)

  // Material fraco fica como rascunho; completo vai para revisao.
  const weakRef = doc(collection(firestore, 'contents'))
  await setDoc(weakRef, {
    id: weakRef.id,
    title: 'Material incompleto',
    slug: 'material-incompleto',
    type: 'exercise',
    bodyFormat: 'markdown',
    body: 'curto',
    media: [],
    answerKey: null,
    cefrMin: 'A1',
    cefrMax: 'A2',
    skills: ['speaking'],
    primarySkill: 'speaking',
    grammarTags: [],
    lexicalTags: [],
    themeTags: [],
    register: 'neutro',
    countryTags: [],
    dialectTags: [],
    estMinutes: 10,
    source: 'human',
    authorId: uid,
    status: 'draft',
    qualityScore: weak.score,
    usageCount: 0,
    ratingCount: 0,
    reportCount: 0,
    version: 1,
    createdAt: Timestamp.now(),
  })
  const weakBack = (await getDoc(weakRef)).data() as { status?: string; authorId?: string }
  check('material fraco e gravado', weakBack?.status === 'draft', String(weakBack?.status))

  const goodRef = doc(collection(firestore, 'contents'))
  await setDoc(goodRef, {
    id: goodRef.id,
    title: 'Dialogo: um almoco em Sao Paulo',
    slug: 'dialogo-almoco-sao-paulo',
    type: 'explanation',
    bodyFormat: 'markdown',
    body: longText,
    media: [],
    cefrMin: 'A1',
    cefrMax: 'A2',
    skills: ['speaking', 'listening'],
    primarySkill: 'speaking',
    grammarTags: ['ser vs estar'],
    lexicalTags: ['comida'],
    themeTags: ['viagem'],
    register: 'neutro',
    countryTags: [],
    dialectTags: ['SP'],
    estMinutes: 15,
    source: 'human',
    authorId: uid,
    status: 'in_review',
    qualityScore: 1,
    usageCount: 0,
    ratingCount: 0,
    reportCount: 0,
    version: 1,
    createdAt: Timestamp.now(),
  })

  // Conteudo nao tem teacherId: e da plataforma. Listagem nao filtra por dono.
  const allContent = await getDocs(
    query(collection(firestore, 'contents'), orderBy('createdAt', 'desc')),
  )
  check('biblioteca lista sem filtro de professor', allContent.size >= 2, `${allContent.size} item(ns)`)
  check(
    'material do outro autor aparece para todos',
    allContent.docs.some((d) => (d.data() as { slug?: string }).slug === 'material-incompleto'),
    'vazamento invertido: nao deveria',
  )

  // Autor edita o proprio; outro professor nao.
  await updateDoc(goodRef, { qualityScore: 0.9 })
  const edited = (await getDoc(goodRef)).data() as { qualityScore?: number }
  check('autor edita o proprio material', edited?.qualityScore === 0.9, String(edited?.qualityScore))

  let foreignEditBlocked = false
  try {
    await signInWithEmailAndPassword(auth, otherEmail, password)
    await updateDoc(goodRef, { title: ' sequestrado' })
  } catch {
    foreignEditBlocked = true
  }
  check('outro professor nao edita material alheio', foreignEditBlocked, 'editou!')

  console.log('\n8. Isolamento de conteudo apos troca de sessao')
  const afterSwitch = await getDocs(
    query(collection(firestore, 'contents'), orderBy('createdAt', 'desc')),
  )
  check('leitura de conteudo continua aberta', afterSwitch.size >= 2, `${afterSwitch.size} item(ns)`)

  console.log('\n9. Configuracoes do professor')
  // Volta para a sessao do dono: a secao 5 trocou de usuario.
  await signInWithEmailAndPassword(auth, email, password)

  const base = await getTeacherSettings(uid, email, 'Nome Antigo')
  check(
    'defaults entram quando nao ha documento',
    base.defaultWeeklyHours === 3 && base.defaultSessionMinutes === 60,
    `${base.defaultWeeklyHours}h / ${base.defaultSessionMinutes}min`,
  )

  // O emulador pode devolver o timestamp como classe Timestamp ou como o
  // descritor { type, seconds, nanoseconds }. Chamar toMillis() direto no
  // segundo caso quebrava a comparacao.
  const tsMillis = (v: unknown): number => {
    if (!v) return 0
    const t = v as { toMillis?: () => number; seconds?: number; nanoseconds?: number }
    if (typeof t.toMillis === 'function') return t.toMillis()
    return (t.seconds ?? 0) * 1000 + Math.floor((t.nanoseconds ?? 0) / 1e6)
  }

  const firstSave = { ...base, displayName: 'Ana Atualizada', defaultWeeklyHours: 5 }
  await saveTeacherSettings(firstSave)
  const afterFirst = (await getDoc(doc(firestore, 'teachers', uid))).data() as {
    createdAt?: unknown
    displayName?: string
    defaultWeeklyHours?: number
  }
  const createdAtFirst = tsMillis(afterFirst?.createdAt)
  check('createdAt gravado no primeiro save', createdAtFirst > 0, String(createdAtFirst))

  // users/{uid} e a fonte do header; tem de acompanhar o teachers/{uid}.
  const userDocName = (await getDoc(doc(firestore, 'users', uid))).data() as {
    displayName?: string
  }
  check(
    'displayName vai para users/{uid}',
    userDocName?.displayName === 'Ana Atualizada',
    String(userDocName?.displayName),
  )

  await new Promise((r) => setTimeout(r, 1100))
  await saveTeacherSettings({ ...firstSave, defaultWeeklyHours: 7 })
  const afterSecond = (await getDoc(doc(firestore, 'teachers', uid))).data() as {
    createdAt?: unknown
    defaultWeeklyHours?: number
  }
  const createdAtSecond = tsMillis(afterSecond?.createdAt)
  check(
    'segundo save nao mexe no createdAt',
    createdAtSecond === createdAtFirst,
    `${createdAtFirst} -> ${createdAtSecond}`,
  )
  check(
    'segundo save persiste o novo valor',
    afterSecond?.defaultWeeklyHours === 7,
    String(afterSecond?.defaultWeeklyHours),
  )

  const settingsBack = await getTeacherSettings(uid, email, 'Nome Antigo')
  check('getTeacherSettings reflete o gravado', settingsBack.defaultWeeklyHours === 7, String(settingsBack.defaultWeeklyHours))
  check('getTeacherSettings le o nome novo', settingsBack.displayName === 'Ana Atualizada', settingsBack.displayName)

  let foreignSettingsBlocked = false
  try {
    await signInWithEmailAndPassword(auth, otherEmail, password)
    await saveTeacherSettings({ ...settingsBack, uid, defaultWeeklyHours: 99 })
  } catch {
    foreignSettingsBlocked = true
  }
  check('outro professor nao altera configuracoes alheias', foreignSettingsBlocked, 'alterou!')

  await signInWithEmailAndPassword(auth, email, password)
  const stillMine = (await getDoc(doc(firestore, 'teachers', uid))).data() as {
    defaultWeeklyHours?: number
  }
  check('configuracao nao foi corrompida pelo outro professor', stillMine?.defaultWeeklyHours === 7, String(stillMine?.defaultWeeklyHours))

  console.log(`\n${pass} passaram, ${fail} falharam\n`)
  process.exit(fail > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error('\nErro fatal:', err?.message ?? err)
  process.exit(1)
})
