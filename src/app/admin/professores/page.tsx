'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { destinationFor, useAuth } from '@/app/providers'
import { approveTeacher, listTeachers } from '@/lib/firebase/repositories'
import type { UserDoc } from '@/lib/types'

function isPending(teacher: UserDoc): boolean {
  // Contas antigas nao tinham o campo; ausencia vale aprovada.
  return teacher.approval === 'pending'
}

export default function AdminProfessoresPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [teachers, setTeachers] = useState<UserDoc[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      setTeachers(await listTeachers())
    } catch (e) {
      setError((e as Error).message ?? 'Falha ao carregar professores')
    }
  }, [])

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/entrar')
      return
    }
    if (user.role !== 'admin') {
      router.replace(destinationFor(user))
      return
    }
    void load()
  }, [user, loading, router, load])

  const approve = async (uid: string) => {
    setBusyId(uid)
    setError(null)
    try {
      await approveTeacher(uid)
      await load()
    } catch (e) {
      setError((e as Error).message ?? 'Nao foi possivel aprovar')
    } finally {
      setBusyId(null)
    }
  }

  if (loading || !user || user.role !== 'admin') {
    return (
      <main className="grid min-h-screen place-items-center">
        <p className="text-sm text-ink-500">Carregando…</p>
      </main>
    )
  }

  const pending = (teachers ?? []).filter(isPending)
  const approvedList = (teachers ?? []).filter((t) => !isPending(t))

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700">Administracao</p>
          <h1 className="mt-1 text-3xl font-semibold text-ink-900">Aprovacoes de professores</h1>
          <p className="mt-2 text-sm text-ink-500">
            Novos professores so entram no painel depois da sua aprovacao.
          </p>
        </div>
        <Link
          href="/professor"
          className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-50"
        >
          Voltar ao painel
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {teachers === null ? (
        <p className="mt-10 text-sm text-ink-500">Carregando professores…</p>
      ) : (
        <>
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-ink-800">
              Aguardando aprovacao
              {pending.length > 0 && (
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                  {pending.length}
                </span>
              )}
            </h2>

            {pending.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-ink-200 px-5 py-6 text-sm text-ink-500">
                Nenhum professor aguardando aprovacao.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {pending.map((teacher) => (
                  <li
                    key={teacher.uid}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-100 bg-amber-50/40 px-5 py-4"
                  >
                    <div>
                      <p className="font-medium text-ink-900">{teacher.displayName || 'Sem nome'}</p>
                      <p className="text-sm text-ink-500">{teacher.email || teacher.uid}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void approve(teacher.uid)}
                      disabled={busyId === teacher.uid}
                      className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-60"
                    >
                      {busyId === teacher.uid ? 'Aprovando…' : 'Aprovar'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-12">
            <h2 className="text-lg font-semibold text-ink-800">
              Professores aprovados
              <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                {approvedList.length}
              </span>
            </h2>
            <ul className="mt-4 divide-y divide-ink-100 rounded-xl border border-ink-100 bg-white">
              {approvedList.map((teacher) => (
                <li key={teacher.uid} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink-800">
                      {teacher.displayName || 'Sem nome'}
                    </p>
                    <p className="text-xs text-ink-500">{teacher.email || teacher.uid}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                    ativo
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  )
}
