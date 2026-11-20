import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  connectAuthEmulator,
  getAuth,
  updateProfile,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'

const app = initializeApp({
  apiKey: 'demo-key',
  authDomain: 'demo-rampa.firebaseapp.com',
  projectId: 'demo-rampa',
  storageBucket: 'demo-rampa.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:demo',
})

const auth = getAuth(app)
connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)

let cred
try {
  cred = await createUserWithEmailAndPassword(auth, 'professor@demo.com', 'Demo1234!')
} catch (e) {
  if (e.code === 'auth/email-already-in-use') {
    cred = { user: auth.currentUser }
  } else {
    throw e
  }
}
const uid = cred.user.uid
await updateProfile(cred.user, { displayName: 'Professora Demo' })

await setDoc(doc(db, 'users', uid), {
  uid,
  role: 'teacher',
  displayName: 'Professora Demo',
  email: 'professor@demo.com',
  locale: 'pt-BR',
  createdAt: serverTimestamp(),
})

await setDoc(doc(db, 'teachers', uid), {
  uid,
  displayName: 'Professora Demo',
  email: 'professor@demo.com',
  createdAt: serverTimestamp(),
}, { merge: true })

const vector = {
  listening: 'A2', speaking: 'A1', reading: 'A2', writing: 'A1',
  grammar: 'A2', vocabulary: 'A2', pronunciation: 'A1', pragmatics: 'A2',
}

const studentRef = await addDoc(collection(db, 'students'), {
  teacherId: uid,
  name: 'Ana Silva',
  email: 'ana@example.com',
  inviteStatus: 'pending',
  goal: 'general',
  goalDetail: 'Quero me virar em viagens e conversas informais.',
  targetCefr: 'A2',
  targetDate: null,
  weeklyHours: 3,
  sessionMinutes: 50,
  currentCefr: 'A2',
  skillVector: vector,
  resolvedTone: 'warm',
  profile: {
    l1: 'en',
    l1Label: 'InglÃªs',
    interests: ['musica', 'cultura', 'comida'],
    level: 'A2',
  },
  status: 'active',
  createdAt: serverTimestamp(),
  lastActiveAt: serverTimestamp(),
})

const assessmentRef = await addDoc(collection(db, 'assessments'), {
  studentId: studentRef.id,
  teacherId: uid,
  status: 'submitted',
  method: 'trial_class',
  items: [],
  freeNotes: 'Boa compreensÃ£o; pronÃºncia e fala ainda precisam de reforÃ§o.',
  result: {
    skillVector: vector,
    overall: 'A2',
    ceiling: 'A2',
    floor: 'A1',
    profileSkew: true,
    gaps: [
      { skill: 'speaking', from: 'A1', to: 'A2', criticality: 'critical', reason: 'Fala bem abaixo da compreensÃ£o.' },
      { skill: 'pronunciation', from: 'A1', to: 'A2', criticality: 'important', reason: 'Ritmo e vogais ainda instÃ¡veis.' },
    ],
    summaryText: 'CompreensÃ£o em A2, produÃ§Ã£o oral em A1.',
  },
  createdAt: serverTimestamp(),
  submittedAt: serverTimestamp(),
})

await setDoc(doc(db, 'students', studentRef.id), {
  lastAssessmentId: assessmentRef.id,
}, { merge: true })

console.log(JSON.stringify({ uid, studentId: studentRef.id, assessmentId: assessmentRef.id }))

