/**
 * Cria (ou atualiza) a conta admin no emulador.
 *
 * Uso (senha NUNCA vai para o repositorio — apenas via variavel de ambiente):
 *   $env:ADMIN_EMAIL = "welberty.virissimo@gmail.com"
 *   $env:ADMIN_PASSWORD = "..."
 *   node scripts/seed-admin.mjs
 */
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import {
  connectFirestoreEmulator,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

if (!email || !password) {
  console.error('Defina ADMIN_EMAIL e ADMIN_PASSWORD antes de rodar este script.')
  process.exit(1)
}

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
  cred = await createUserWithEmailAndPassword(auth, email, password)
} catch (e) {
  if (e.code === 'auth/email-already-in-use') {
    cred = await signInWithEmailAndPassword(auth, email, password)
  } else {
    throw e
  }
}

const uid = cred.user.uid
await updateProfile(cred.user, { displayName: 'Administrador Classwell' })

await setDoc(doc(db, 'users', uid), {
  uid,
  role: 'admin',
  approval: 'approved',
  displayName: 'Administrador Classwell',
  email,
  locale: 'pt-BR',
  createdAt: serverTimestamp(),
})

console.log(JSON.stringify({ uid, email, role: 'admin' }))
process.exit(0)
