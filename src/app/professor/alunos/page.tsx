'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/app/providers'
import { listStudents } from '@/lib/firebase/repositories'
import { GOAL_LABELS } from '@/lib/domain/levels'
import type { GoalCode, Student } from '@/lib/types'

const FILTERS: Array<{ value: GoalCode | 'all'; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'travel', label: GOAL_LABELS.travel },
  { value: 'work', label: GOAL_LABELS.work },
  { value: 'study', label: GOAL_LABELS.study },
  { value: 'exam', label: GOAL_LABELS.exam },
  { value: 'social', label: GOAL_LABELS.social },
]

export default function StudentsPage() {
  const { user } = useAuth()
  const [students, setStudents] = useState<Student[] | null>(null)
  const [filter, setFilter] = useState<GoalCode | 'all'>('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!user) return
    listStudents(user.uid).then(setStudents).catch(() => setStudents([]))
  }, [user])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (students ?? []).filter((s) => {
      const matchGoal = filter === 'all' || s.goal === filter
      const matchQuery =
        q.length === 0 ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.goalDetail.toLowerCase().includes(q)
      return matchGoal && matchQuery
    })
  }, [students, filter, query])

  return (
    <div className="animate-fade-up space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-950">Alunos</h1>
          <p className="mt-1 text-sm text-ink-500">
            {students === null ? 'Carregando…' : `${filtered.length} de ${students.length}`}
          </p>
        </div>
        <Link
          href="/professor/alunos/novo"
          className="rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
        >
          Novo aluno
        </Link>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome, e-mail ou objetivo"
          className="min-w-64 flex-1 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-ink-300 focus:border-ink-400"
        />
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-md px-2.5 py-1.5 text-sm transition ${
                filter === f.value
                  ? 'bg-ink-950 text-white'
                  : 'bg-white text-ink-600 hover:bg-ink-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {students !== null && filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-300 bg-white p-10 text-center text-sm text-ink-500">
          Nenhum aluno com esses filtros.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-ink-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-ink-200 bg-ink-50 text-left text-xs text-ink-500">
              <tr>
                <Th>Nome</Th>
                <Th>Objetivo</Th>
                <Th>Meta</Th>
                <Th>Atual</Th>
                <Th>Diagnóstico</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50">
                  <td className="px-4 py-3">
                    <Link href={`/professor/alunos/${s.id}`} className="font-medium text-ink-900 hover:underline">
                      {s.name}
                    </Link>
                    <p className="text-xs text-ink-500">{s.email}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{GOAL_LABELS[s.goal]}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">{s.targetCefr}</td>
                  <td className="px-4 py-3 text-ink-700">{s.lastAssessmentId ? s.currentCefr : '—'}</td>
                  <td className="px-4 py-3">
                    {s.lastAssessmentId ? (
                      <span className="text-ink-500">Feito</span>
                    ) : (
                      <span className="rounded bg-audit-400/15 px-1.5 py-0.5 text-xs text-audit-500">
                        pendente
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 font-medium">{children}</th>
}
