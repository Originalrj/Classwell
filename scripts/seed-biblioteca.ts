/**
 * Seed da Biblioteca: grava o material-base do curriculo em `contents`.
 *
 *   npx tsx scripts/seed-biblioteca.ts
 *
 * Requer os emuladores rodando (Auth 9099, Firestore 8080). O material entra
 * como RASCUNHO e so e publicado depois que o scoreContent passa: o seed nao
 * burla a regra de qualidade que o app aplica ao professor.
 *
 * Reconciliacao (idempotente): o slug e a chave. Se o slug ja existe e e da
 * conta de autoria do material-base, o conteudo e ATUALIZADO (correcoes de
 * texto propagam); se nao existe, e criado; se sobrou um slug da autoria do
 * seed que nao esta mais no curriculo, ele e removido. Conteudo de OUTRA
 * autoria nunca e tocado.
 */
import { initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Firestore,
} from 'firebase/firestore'
import {
  createContent,
  scoreContent,
  updateContentStatus,
  type CreateContentInput,
} from '../src/lib/firebase/repositories'
import { allTopics } from '../src/lib/domain/curriculum'
import { A1_LESSONS } from './seed-a1'
import { A2_LESSONS } from './seed-a2'
import { B1_LESSONS } from './seed-b1'
import { B2_LESSONS } from './seed-b2'
import { C1_LESSONS } from './seed-c1'
import type { SeedLesson } from './seed-types'

const PROJECT = 'demo-rampa'

/** Todos os blocos de material, na ordem do programa. */
const LESSONS: SeedLesson[] = [
  ...A1_LESSONS,
  ...A2_LESSONS,
  ...B1_LESSONS,
  ...B2_LESSONS,
  ...C1_LESSONS,
]

/** themeTags vem do mapa do curriculo: uma fonte, sem duplicar tag. */
const THEME_BY_TOPIC = new Map(allTopics().map(({ topic }) => [topic.key, topic.themeTags]))

/** Conta de autoria do material-base. Os emuladores nao tem e-mail real. */
const AUTHOR_EMAIL = 'material-base@rampa.app'
const AUTHOR_PASSWORD = 'rampa-base-123'

/**
 * O slugify do repositorio e privado. Aqui repetimos os passos para gerar a
 * MESMA chave que o app geraria, senao a reconciliacao nunca bate.
 */
function slugFor(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

/** O scoreContent exige ao menos um tema; o curriculo sempre fornece. */
function themeTagsFor(topicKey: string): string[] {
  return THEME_BY_TOPIC.get(topicKey) ?? ['estudo']
}

/** Traduz o dado de seed para o input do repositorio. Uma fonte so. */
function lessonInput(lesson: SeedLesson): CreateContentInput {
  return {
    title: lesson.title,
    type: lesson.type,
    body: lesson.body,
    answerKey: lesson.answerKey,
    cefrMin: lesson.cefrMin,
    cefrMax: lesson.cefrMax,
    skills: lesson.skills,
    primarySkill: lesson.primarySkill,
    grammarTags: lesson.grammarTags,
    lexicalTags: lesson.lexicalTags,
    themeTags: themeTagsFor(lesson.topicKey),
    register: lesson.register,
    countryTags: ['BR'],
    dialectTags: lesson.dialectTags,
    estMinutes: lesson.estMinutes,
  }
}

/**
 * Mesmos campos que `createContent` grava, para a atualizacao nao divergir.
 * Nao mexe em id, source, authorId, media, counters nem createdAt.
 */
function persistFields(input: CreateContentInput) {
  return {
    title: input.title.trim(),
    slug: slugFor(input.title),
    type: input.type,
    bodyFormat: 'markdown' as const,
    body: input.body?.trim() ?? null,
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
  }
}

async function ensureAuthor(): Promise<{ firestore: Firestore; uid: string }> {
  const app = initializeApp({ projectId: PROJECT, apiKey: 'demo-key' })
  const auth = getAuth(app)
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  const firestore = getFirestore(app)
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080)

  try {
    const cred = await signInWithEmailAndPassword(auth, AUTHOR_EMAIL, AUTHOR_PASSWORD)
    return { firestore, uid: cred.user.uid }
  } catch {
    const cred = await createUserWithEmailAndPassword(auth, AUTHOR_EMAIL, AUTHOR_PASSWORD)
    const uid = cred.user.uid
    await setDoc(doc(firestore, 'users', uid), {
      uid,
      role: 'teacher',
      displayName: 'Material-base Rampa',
      email: AUTHOR_EMAIL,
      locale: 'pt-BR',
      country: 'BR',
      defaultSessionMinutes: 60,
      stats: { students: 0, publishedContents: 0, totalUses: 0 },
      createdAt: serverTimestamp(),
    })
    console.log(`conta de autoria criada: ${uid}`)
    return { firestore, uid }
  }
}

interface ExistingDoc {
  id: string
  authorId: string
}

/** Indice dos conteudos por slug, com o autor, para decidir criar x atualizar. */
async function existingBySlug(firestore: Firestore): Promise<Map<string, ExistingDoc>> {
  const snap = await getDocs(collection(firestore, 'contents'))
  const map = new Map<string, ExistingDoc>()
  snap.forEach((d) => {
    const data = d.data()
    const slug = data.slug
    if (typeof slug === 'string') {
      map.set(slug, { id: d.id, authorId: String(data.authorId ?? '') })
    }
  })
  return map
}

/** Remove material obsoleto da propria autoria (slug que saiu do curriculo). */
async function removeStale(
  firestore: Firestore,
  uid: string,
  keep: Set<string>,
): Promise<string[]> {
  const snap = await getDocs(collection(firestore, 'contents'))
  const removed: string[] = []
  for (const d of snap.docs) {
    const data = d.data()
    if (data.authorId !== uid) continue
    if (typeof data.slug === 'string' && keep.has(data.slug)) continue
    // A regra de delete so libera rascunho: rebaixa antes de apagar.
    if (data.status !== 'draft') {
      await updateDoc(doc(firestore, 'contents', d.id), { status: 'draft' })
    }
    await deleteDoc(doc(firestore, 'contents', d.id))
    removed.push(typeof data.slug === 'string' ? data.slug : d.id)
  }
  return removed
}

async function main() {
  console.log('Seed da Biblioteca - material-base do curriculo\n')
  const { firestore, uid } = await ensureAuthor()
  console.log(`autoria: ${uid}`)

  const existing = await existingBySlug(firestore)
  console.log(`material ja existente: ${existing.size}\n`)

  let created = 0
  let updated = 0
  let published = 0
  let foreign = 0
  const keep = new Set<string>()
  const thin: string[] = []

  for (const lesson of LESSONS) {
    const input = lessonInput(lesson)
    const slug = slugFor(lesson.title)
    keep.add(slug)

    const prior = existing.get(slug)
    const { score, issues } = scoreContent(input)

    if (prior) {
      if (prior.authorId !== uid) {
        // Outra autoria ocupa o slug: nao sobrescreve.
        foreign++
        continue
      }
      await updateDoc(doc(firestore, 'contents', prior.id), {
        ...persistFields(input),
        qualityScore: score,
        updatedAt: serverTimestamp(),
      })
      updated++
      if (score >= 0.7) {
        await updateContentStatus(prior.id, 'published')
        published++
      } else {
        thin.push(`${lesson.title} (score ${score})`)
        console.log(`  ${issues.join(' | ')}`)
      }
      continue
    }

    const { id } = await createContent(uid, input, false)
    created++
    if (score >= 0.7) {
      await updateContentStatus(id, 'published')
      published++
    } else {
      thin.push(`${lesson.title} (score ${score})`)
      console.log(`  ${issues.join(' | ')}`)
    }
  }

  const removed = await removeStale(firestore, uid, keep)
  removed.forEach((slug) => console.log(`  removido obsoleto: ${slug}`))

  console.log(`\ncriados: ${created}`)
  console.log(`atualizados: ${updated}`)
  console.log(`publicados: ${published}`)
  if (foreign > 0) console.log(`ignorados (slug de outra autoria): ${foreign}`)
  if (removed.length > 0) console.log(`removidos: ${removed.length}`)
  if (thin.length > 0) {
    console.log('\nabaixo do limiar de publicacao (0.7), ficaram como rascunho:')
    thin.forEach((t) => console.log(`  - ${t}`))
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('\nfalhou:', e)
    process.exit(1)
  })
