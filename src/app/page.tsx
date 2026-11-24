'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthForm } from '@/components/auth-form'
import { destinationFor, useAuth } from './providers'
import { usingEmulators } from '@/lib/firebase/client'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.replace(destinationFor(user))
  }, [user, loading, router])

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p className="text-sm text-ink-500">Carregando…</p>
      </main>
    )
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          Português como Língua Estrangeiro
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
          Da primeira aula até o nível desejado, com um plano.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-600">
          O professor avalia o aluno na primeira aula, a plataforma transforma a conversa em um
          diagnóstico por competência e devolve uma rampa de aprendizado personalizada — com
          material, tarefas e progresso visível para os dois lados.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/prototipo"
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-medium text-brand-700 transition hover:border-brand-300"
          >
            Ver prévia visual <span aria-hidden>→</span>
          </Link>
          <span className="text-sm text-ink-400">
            Professor ou aluno: use o formulário ao lado.
          </span>
        </div>

        {usingEmulators() && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-md bg-audit-400/10 px-3 py-1.5 text-xs text-audit-500">
            <span className="h-1.5 w-1.5 rounded-full bg-audit-400" />
            Emuladores locais — nada sai desta máquina
          </p>
        )}

        <div className="mt-10 rounded-xl border border-ink-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-ink-950">Como funciona</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ['Entrevista diagnóstica', 'O professor responde o que o aluno demonstra na aula.'],
              ['Vetor de competências', 'Oito áreas: ouvir, falar, ler, escrever, gramática, léxico, pronúncia e registro.'],
              ['Rampa personalizada', 'Passos do nível atual até a meta, respeitando as horas disponíveis.'],
              ['Material no tom dele', 'Idade, profissão e interesse mudam como cada explicação é escrita.'],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-950 text-xs font-medium text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink-900">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-500">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="acesso" aria-label="Entrar ou criar conta">
        <AuthForm />
      </section>
    </main>
  )
}
