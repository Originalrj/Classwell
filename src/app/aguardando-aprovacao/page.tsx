'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { destinationFor, useAuth } from '@/app/providers'

/**
 * Tela de espera dos professores recem-cadastrados. O perfil nasce com
 * approval='pending'; o admin aprova em /admin/professores e o refresh()
 * detecta a mudanca e libera o painel.
 */
export default function AguardandoAprovacaoPage() {
  const { user, loading, refresh, signOut } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/entrar')
      return
    }
    if (user.role !== 'teacher' || user.approval !== 'pending') {
      router.replace(destinationFor(user))
    }
  }, [user, loading, router])

  // Verifica automaticamente a cada 10s para o admin nao precisar mandar email.
  useEffect(() => {
    if (!user || user.role !== 'teacher' || user.approval !== 'pending') return
    const timer = window.setInterval(() => {
      void refresh()
    }, 10_000)
    return () => window.clearInterval(timer)
  }, [user, refresh])

  const checkNow = async () => {
    setChecking(true)
    setMessage(null)
    try {
      await refresh()
    } catch {
      setMessage('Nao foi possivel verificar agora. Tente de novo em instantes.')
    } finally {
      setChecking(false)
    }
  }

  if (loading || !user) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p className="text-sm text-ink-500">Carregando…</p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-12">
      <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          Aguardando aprovacao
        </span>
        <h1 className="mt-5 text-2xl font-semibold text-ink-900">
          Ola, {user.displayName || 'professor'}!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          Sua conta foi criada. Um administrador precisa aprovar o acesso antes de voce
          entrar no painel. Assim que aprovarmos, esta pagina encaminha voce automaticamente.
        </p>
        <p className="mt-3 text-sm text-ink-500">
          Enquanto isso, voce pode fechar esta janela e voltar depois. Nao e preciso criar
          outra conta.
        </p>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={checkNow}
            disabled={checking}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-60"
          >
            {checking ? 'Verificando…' : 'Ja fui aprovado, verificar'}
          </button>
          <button
            type="button"
            onClick={() => void signOut()}
            className="rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-ink-50"
          >
            Sair
          </button>
        </div>

        <p className="mt-6 text-xs text-ink-400">
          Duvidas? <Link href="/" className="text-brand-700 underline">Voltar ao inicio</Link>
        </p>
      </div>
    </main>
  )
}
