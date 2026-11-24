'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { destinationFor, useAuth } from '@/app/providers'
import type { Role } from '@/lib/types'

type Mode = 'entrar' | 'cadastro'

interface AuthFormProps {
  initialMode?: Mode
  initialRole?: Role
  /** Mostra o link "← Voltar" (usado na página /entrar). */
  showBackLink?: boolean
}

/**
 * Formulario unico de acesso, usado na home e em /entrar.
 * Professor e aluno podem criar conta ou entrar; o papel escolhido define
 * para onde o usuario vai depois de autenticado.
 */
export function AuthForm({
  initialMode = 'entrar',
  initialRole = 'teacher',
  showBackLink = false,
}: AuthFormProps) {
  const router = useRouter()
  const { user, loading, signIn, signUp } = useAuth()

  const [mode, setMode] = useState<Mode>(initialMode)
  const [role, setRole] = useState<Role>(initialRole)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  // So redireciona quando o perfil existe, nao apenas a credencial do Firebase.
  useEffect(() => {
    if (!loading && user) router.replace(destinationFor(user))
  }, [user, loading, router])

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
  }

  function useDemo() {
    setMode('entrar')
    setRole('teacher')
    setEmail('professor@demo.com')
    setPassword('Demo1234!')
    setError(null)
  }

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
    <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
      {showBackLink && (
        <Link href="/" className="text-sm text-ink-500 hover:text-ink-800">
          ← Voltar
        </Link>
      )}

      <div className="flex gap-1 rounded-lg bg-ink-100 p-1">
        {(
          [
            ['entrar', 'Entrar'],
            ['cadastro', 'Criar conta'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => switchMode(value)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
              mode === value
                ? 'bg-white text-ink-950 shadow-sm'
                : 'text-ink-500 hover:text-ink-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <h2 className="mt-6 text-xl font-semibold tracking-tight text-ink-950">
        {mode === 'entrar' ? 'Bem-vindo de volta' : 'Comece pela sua conta'}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
        {mode === 'entrar'
          ? 'Entre com sua conta de professor ou de aluno.'
          : role === 'teacher'
            ? 'Crie sua conta para cadastrar alunos e montar as rampas. Um administrador aprova o acesso antes do primeiro login.'
            : 'Crie sua conta de aluno. Seu professor conecta o plano de aula ao seu perfil.'}
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink-700">Sou</legend>
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
        </fieldset>

        {mode === 'cadastro' && (
          <Field
            label="Nome"
            value={displayName}
            onChange={setDisplayName}
            type="text"
            required
            autoComplete="name"
            placeholder="Seu nome completo"
          />
        )}

        <Field
          label="E-mail"
          value={email}
          onChange={setEmail}
          type="email"
          required
          autoComplete="email"
          placeholder="voce@email.com"
        />
        <Field
          label="Senha"
          value={password}
          onChange={setPassword}
          type="password"
          required
          minLength={6}
          autoComplete={mode === 'entrar' ? 'current-password' : 'new-password'}
          placeholder="Mínimo 6 caracteres"
        />

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-50"
        >
          {busy
            ? 'Aguarde…'
            : mode === 'entrar'
              ? `Entrar como ${role === 'teacher' ? 'professor' : 'aluno'}`
              : `Criar conta de ${role === 'teacher' ? 'professor' : 'aluno'}`}
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-ink-100 pt-4">
        <button
          type="button"
          onClick={() => switchMode(mode === 'entrar' ? 'cadastro' : 'entrar')}
          className="text-sm text-brand-700 underline-offset-2 hover:underline"
        >
          {mode === 'entrar' ? 'Não tenho conta — criar agora' : 'Já tenho conta — entrar'}
        </button>
        <button
          type="button"
          onClick={useDemo}
          className="text-xs text-ink-400 underline-offset-2 hover:text-ink-700 hover:underline"
        >
          Usar conta demo
        </button>
      </div>
      <p className="mt-2 text-xs text-ink-400">
        Demo: professor@demo.com · Demo1234!
      </p>
    </div>
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
  placeholder?: string
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

export function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? ''
  if (code === 'auth/invalid-credential') return 'E-mail ou senha incorretos.'
  if (code === 'auth/email-already-in-use') return 'Já existe uma conta com este e-mail.'
  if (code === 'auth/weak-password') return 'A senha precisa ter ao menos 6 caracteres.'
  if (code === 'auth/too-many-requests') return 'Muitas tentativas. Tente de novo em alguns minutos.'
  if (code.startsWith('auth/')) return 'Não foi possível autenticar. Verifique os dados e os emuladores.'
  return 'Algo deu errado. Tente novamente.'
}
