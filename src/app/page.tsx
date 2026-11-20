'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { homeFor, useAuth } from './providers'
import { usingEmulators } from '@/lib/firebase/client'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.replace(homeFor(user.role))
  }, [user, loading, router])

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p className="text-sm text-ink-500">Carregando…</p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:gap-20">
      <section className="flex-1">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          Português como Língua Estrangeira
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
          Da primeira aula até o nível desejado, com um plano.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-600">
          O professor avalia o aluno na primeira aula, a plataforma transforma a conversa em um
          diagnóstico por competência e devolve uma rampa de aprendizado personalizada — com
          material, tarefas e progresso visível para os dois lados.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/entrar?modo=cadastro&papel=teacher"
            className="rounded-lg bg-ink-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
          >
            Sou professor
          </Link>
          <Link
            href="/entrar?modo=cadastro&papel=student"
            className="rounded-lg border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-800 transition hover:border-ink-300"
          >
            Sou aluno
          </Link>
        </div>

        {usingEmulators() && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-md bg-audit-400/10 px-3 py-1.5 text-xs text-audit-500">
            <span className="h-1.5 w-1.5 rounded-full bg-audit-400" />
            Emuladores locais — nada sai desta máquina
          </p>
        )}
      </section>

      <section className="flex-1">
        <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-ink-950">Como funciona</h2>
          <ol className="mt-4 space-y-4">
            {[
              ['Entrevista diagnóstica', 'O professor responde o que o aluno demonstra na aula.'],
              ['Vetor de competências', 'Oito áreas avaliadas: ouvir, falar, ler, escrever, gramática, léxico, pronúncia e registro.'],
              ['Rampa personalizada', 'Passos ordenados do nível atual até a meta, respeitando as horas que o aluno tem.'],
              ['Material no tom dele', 'Idade, profissão e forma de aprender mudam como cada explicação é escrita.'],
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
    </main>
  )
}
