import { type FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { type Auth, connectAuthEmulator, getAuth } from 'firebase/auth'
import { type Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { type FirebaseStorage, connectStorageEmulator, getStorage } from 'firebase/storage'

/**
 * SPEC — decisao de ambiente: deteccao automatica de emulador.
 *
 * Com NEXT_PUBLIC_USE_EMULATORS=true (ou qualquer host local), conecta
 * nos emuladores. Sem nenhuma variavel de ambiente, em dev local, tambem
 * detecta. Em producao, usa o projeto real do .env.local.
 *
 * Consequencia pratica: `npm run dev` funciona sem configurar nada.
 */

export const EMULATORS = {
  auth: { host: '127.0.0.1', port: 9099 },
  firestore: { host: '127.0.0.1', port: 8080 },
  storage: { host: '127.0.0.1', port: 9199 },
  functions: { host: '127.0.0.1', port: 5001 },
} as const

const PLACEHOLDER_PROJECT_ID = 'demo-rampa'

export function isEmulatorMode(): boolean {
  if (typeof window !== 'undefined') {
    const flag = process.env.NEXT_PUBLIC_USE_EMULATORS
    if (flag === 'false') return false
    if (flag === 'true') return true
    // fallback: qualquer host local e local
    return /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)
  }
  // no servidor (SSR / server components), so a flag decide
  return process.env.NEXT_PUBLIC_USE_EMULATORS === 'true'
}

export function firebaseConfig(): Record<string, string> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

  if (isEmulatorMode()) {
    return {
      apiKey: apiKey || 'demo-key',
      authDomain: 'demo-rampa.firebaseio.com',
      projectId: projectId || PLACEHOLDER_PROJECT_ID,
      storageBucket: 'demo-rampa.appspot.com',
      messagingSenderId: '000000000000',
      appId: '1:000000000000:web:demo',
    }
  }

  if (!apiKey || !projectId) {
    throw new Error(
      'Configuracao do Firebase ausente. Copie .env.example para .env.local e ' +
        'preencha NEXT_PUBLIC_FIREBASE_API_KEY e NEXT_PUBLIC_FIREBASE_PROJECT_ID ' +
        '(Project settings > Your apps > SDK setup and configuration).',
    )
  }

  return {
    apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? `${projectId}.appspot.com`,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
  }
}

let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined
let storage: FirebaseStorage | undefined
let emulatorsConnected = false

function getFirebaseApp(): FirebaseApp {
  if (app) return app
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig())
  return app
}

/** Conecta aos emuladores uma unica vez por processo. */
function connectEmulatorsOnce(a: Auth, d: Firestore, s: FirebaseStorage): void {
  if (emulatorsConnected) return
  emulatorsConnected = true

  connectAuthEmulator(a, `http://${EMULATORS.auth.host}:${EMULATORS.auth.port}`, {
    disableWarnings: true,
  })
  connectFirestoreEmulator(d, EMULATORS.firestore.host, EMULATORS.firestore.port)
  connectStorageEmulator(s, EMULATORS.storage.host, EMULATORS.storage.port)
}

export function getFirebaseAuth(): Auth {
  if (auth) return auth
  auth = getAuth(getFirebaseApp())
  if (isEmulatorMode()) {
    connectEmulatorsOnce(auth, getFirebaseDb(), getFirebaseStorage())
  }
  return auth
}

export function getFirebaseDb(): Firestore {
  if (db) return db
  db = getFirestore(getFirebaseApp())
  if (isEmulatorMode()) {
    connectEmulatorsOnce(getFirebaseAuth(), db, getFirebaseStorage())
  }
  return db
}

export function getFirebaseStorage(): FirebaseStorage {
  if (storage) return storage
  storage = getStorage(getFirebaseApp())
  if (isEmulatorMode()) {
    connectEmulatorsOnce(getFirebaseAuth(), getFirebaseDb(), storage)
  }
  return storage
}

export function usingEmulators(): boolean {
  return isEmulatorMode()
}
