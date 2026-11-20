'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { homeFor, useAuth } from '../providers'
import type { Role } from '@/lib/types'

type Mode = 'entrar' | 'cadastro'

function LoginForm() {
  const params = useSearchParams()
  const router = useRouter()
  const { user, loading, signIn, signUp } = useAuth()

  const [mode, setMode] = useState<Mode>(
    params.get('modo') === 'cadastro' ? 'cadastro' : 'entrar',
  )
  const [role, setRole] = useState<Role>(
    params.get('papel') === 'student' ? 'student' : 'teacher',
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  // So redireciona quando ja temos o perfil (user), nao so a credencial.
  useEffect(() => {
    if (!loading && user) router.replace(homeFor(user.role))
  }, [user, loading, router])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (mode === 'entrar') {
        await signIn(email, password)
      } else {
        await signUp({ email, password, displayName, role })
      }
    } catch (err) {
      setError(friendlyError(err))
      setBusy(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <Link href="/" className="text-sm text-ink-500 hover:text-ink-800">
        ← Voltar
      </Link>

      <h1 className="mt-8 text-2xl font-semibold tracking-tight text-ink-950">
        {mode === 'entrar' ? 'Entrar' : 'Criar conta'}
      </h1>
      <p className="mt-1.5 text-sm text-ink-500">
        {mode === 'entrar'
          ? 'Acesse seu painel de professor ou de aluno.'
          : role === 'teacher'
            ? 'Cadastre-se como professor para cadastrar alunos e montar rampas.'
            : 'Alunos são cadastrados pelo professor. Use esta conta para entrar depois.'}
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        {mode === 'cadastro' && (
          <>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ['teacher', 'Professor'],
                  ['student', 'Aluno'],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                    role === value
                      ? 'border-ink-950 bg-ink-950 text-white'
                      : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <Field
              label="Nome"
              value={displayName}
              onChange={setDisplayName}
              type="text"
              required
              autoComplete="name"
            />
          </>
        )}

        <Field
          label="E-mail"
          value={email}
          onChange={setEmail}
          type="email"
          required
          autoComplete="email"
        />
        <Field
          label="Senha"
          value={password}
          onChange={setPassword}
          type="password"
          required
          minLength={6}
          autoComplete={mode === 'entrar' ? 'current-password' : 'new-password'}
        />

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-50"
        >
          {busy ? 'Aguarde…' : mode === 'entrar' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(mode === 'entrar' ? 'cadastro' : 'entrar')}
        className="mt-6 text-sm text-ink-500 underline-offset-2 hover:text-ink-800 hover:underline"
      >
        {mode === 'entrar' ? 'Não tenho conta — criar agora' : 'Já tenho conta — entrar'}
      </button>
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type: string
  required?: boolean
  minLength?: number
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-ink-400 focus:ring-2 focus:ring-ink-950/5"
      />
    </label>
  )
}

function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? ''
  if (code === 'auth/invalid-credential') return 'E-mail ou senha incorretos.'
  if (code === 'auth/email-already-in-use') return 'Já existe uma conta com este e-mail.'
  if (code === 'auth/weak-password') return 'A senha precisa ter ao menos 6 caracteres.'
  if (code === 'auth/too-many-requests') return 'Muitas tentativas. Tente de novo em alguns minutos.'
  if (code.startsWith('auth/')) return 'Não foi possível autenticar. Verifique os dados e os emuladores.'
  return 'Algo deu errado. Tente novamente.'
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoginForm />
    </Suspense>
  )
}
