'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/app/providers'

export default function AlunoPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/entrar')
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p className="text-sm text-ink-500">Carregando…</p>
      </main>
    )
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            r
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink-950">rampa</span>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-700">
            aluno
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-500">{user.displayName}</span>
          <button
            onClick={signOut}
            className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700 transition hover:border-ink-300"
          >
            Sair
          </button>
        </div>
      </header>

      <section className="mt-10 rounded-2xl border border-ink-200 bg-white p-8 shadow-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          Sua conta está pronta
        </span>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink-950">
          Olá, {user.displayName?.split(' ')[0] ?? 'aluno'}.
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
          Esta é a sua área na Rampa. Seu professor cadastra o plano de aula, o diagnóstico e as
          metas; quando o vínculo estiver pronto, seu progresso aparece aqui.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ['E-mail', user.email],
            ['Papel', 'Aluno'],
            ['Idioma', user.locale ?? 'pt-BR'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-ink-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-ink-400">{label}</p>
              <p className="mt-1 break-all text-sm text-ink-800">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/prototipo"
            className="rounded-lg bg-ink-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
          >
            Ver prévia da rampa →
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-700 transition hover:border-ink-300"
          >
            Voltar ao início
          </Link>
        </div>
      </section>
    </main>
  )
}
