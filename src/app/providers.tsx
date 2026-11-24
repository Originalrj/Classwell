'use client'

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getFirebaseAuth } from '@/lib/firebase/client'
import { createUser, ensureTeacherDoc, getUser } from '@/lib/firebase/repositories'
import type { Role, UserDoc } from '@/lib/types'

interface AuthState {
  user: UserDoc | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (input: {
    email: string
    password: string
    displayName: string
    role: Role
  }) => Promise<void>
  signOut: () => Promise<void>
  /** Recarrega users/{uid} — usado pela tela de aguardo e pelo admin. */
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function homeFor(role: Role | undefined): string {
  if (role === 'teacher' || role === 'admin') return '/professor'
  if (role === 'student') return '/aluno'
  return '/entrar'
}

/** Destino final, já considerando a aprovação do professor. */
export function destinationFor(user: UserDoc | null): string {
  if (!user) return '/entrar'
  if (user.role === 'teacher' && user.approval === 'pending') {
    return '/aguardando-aprovacao'
  }
  return homeFor(user.role)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  /**
   * Le o perfil e o expoe no estado.
   *
   * Precisa ser chamado explicitamente depois de criar os documentos:
   * o onAuthStateChanged dispara assim que a credencial e criada, ou seja,
   * ANTES do users/{uid} existir — e buscaria null.
   */
  const loadProfile = useCallback(async (uid: string): Promise<UserDoc | null> => {
    const profile = await getUser(uid)
    setUser(profile)
    return profile
  }, [])

  useEffect(() => {
    let alive = true

    const unsub = onAuthStateChanged(getFirebaseAuth(), async (fbUser) => {
      if (!alive) return
      if (!fbUser) {
        setUser(null)
        setLoading(false)
        return
      }
      const profile = await getUser(fbUser.uid)
      if (!alive) return
      // Nao sobrescreve com null: pode ser o disparo prematureo de logo-cru.
      if (profile) setUser(profile)
      setLoading(false)
    })

    return () => {
      alive = false
      unsub()
    }
  }, [])

  const signIn = useCallback(
    async (email: string, password: string) => {
      const cred = await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
      await loadProfile(cred.user.uid)
    },
    [loadProfile],
  )

  const signUp = useCallback<AuthState['signUp']>(
    async ({ email, password, displayName, role }) => {
      const cred = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
      await updateProfile(cred.user, { displayName })

      await createUser(cred.user.uid, {
        role,
        // Novo professor so entra depois que o admin aprovar.
        ...(role === 'teacher' ? { approval: 'pending' as const } : {}),
        displayName,
        email,
        locale: 'pt-BR',
      })

      if (role === 'teacher') {
        await ensureTeacherDoc(cred.user.uid, {
          headline: '',
          bio: '',
          country: 'BR',
          cefrLevelsTaught: ['A1', 'A2', 'B1', 'B2'],
          defaultSessionMinutes: 60,
          stats: { students: 0, publishedContents: 0, totalUses: 0 },
        })
      }

      await loadProfile(cred.user.uid)
    },
    [loadProfile],
  )

  const refresh = useCallback(async () => {
    const fbUser = getFirebaseAuth().currentUser
    if (!fbUser) {
      setUser(null)
      return
    }
    await loadProfile(fbUser.uid)
  }, [loadProfile])

  const signOut = useCallback(async () => {
    await fbSignOut(getFirebaseAuth())
    setUser(null)
    router.push('/entrar')
  }, [router])

  const value = useMemo<AuthState>(
    () => ({ user, loading, signIn, signUp, signOut, refresh }),
    [user, loading, signIn, signUp, signOut, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}
