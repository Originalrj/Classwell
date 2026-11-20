'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/app/providers'
import { listContents, listStudents } from '@/lib/firebase/repositories'
import { GOAL_LABELS, LEVEL_LABELS, SKILL_LABELS } from '@/lib/domain/levels'
import { resolveTone } from '@/lib/domain/tone'
import type { Student } from '@/lib/types'
import CountUp from '@/components/reactbits/CountUp'
import ShinyText from '@/components/reactbits/ShinyText'
import SpotlightCard from '@/components/reactbits/SpotlightCard'

export default function ProfessorDashboard() {
  const { user } = useAuth()
  const [students, setStudents] = useState<Student[] | null>(null)
  const [publishedCount, setPublishedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    listStudents(user.uid)
      .then(setStudents)
      .catch((e) => setError(e?.message ?? 'Falha ao carregar alunos'))
    listContents({ status: 'published', max: 500 })
      .then((c) => setPublishedCount(c.length))
      .catch(() => setPublishedCount(0))
  }, [user])

  const awaiting = students?.filter((s) => !s.lastAssessmentId) ?? []
  const active = students?.filter((s) => s.lastAssessmentId) ?? []

  return (
    <div className="animate-fade-up space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-950">
            Olá,{' '}
            <ShinyText
              text={user?.displayName?.split(' ')[0] ?? ''}
              className="font-semibold"
              speed={3}
            />
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            {error
              ? error
              : students === null
                ? 'Carregando…'
                : students.length === 0
                  ? 'Nenhum aluno ainda. Comece pela primeira avaliação.'
                  : `${students.length} aluno(s) · ${awaiting.length} aguardando diagnóstico`}
          </p>
        </div>
        <Link
          href="/professor/alunos/novo"
          className="rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
        >
          Novo aluno
        </Link>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Alunos" value={students?.length ?? 0} />
        <StatCard
          label="Aguardando diagnóstico"
          value={awaiting.length}
          tone={awaiting.length > 0 ? 'audit' : 'default'}
        />
        <StatCard label="Materiais publicados" value={publishedCount} />
      </section>

      {awaiting.length > 0 && (
        <section>
          <SectionTitle
            title="Aguardando diagnóstico"
            hint="Alunos cadastrados sem avaliação. Sem isso não dá para gerar a rampa."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {awaiting.map((s) => (
              <StudentCard key={s.id} student={s} highlight />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle title="Alunos ativos" />
        {active.length === 0 && students !== null ? (
          <EmptyState hasAny={students.length > 0} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: number
  tone?: 'default' | 'audit'
}) {
  return (
    <SpotlightCard className="rounded-xl border border-ink-200 bg-white">
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{label}</p>
        <p
          className={`mt-1.5 text-3xl font-semibold tabular-nums ${
            tone === 'audit' ? 'text-audit-500' : 'text-ink-950'
          }`}
        >
          <CountUp to={value} duration={1} />
        </p>
      </div>
    </SpotlightCard>
  )
}

function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-sm font-semibold text-ink-900">{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-ink-500">{hint}</p>}
    </div>
  )
}

function EmptyState({ hasAny }: { hasAny: boolean }) {
  return (
    <div className="rounded-xl border border-dashed border-ink-300 bg-white p-10 text-center">
      <p className="text-sm font-medium text-ink-900">
        {hasAny ? 'Nenhum aluno avaliado ainda' : 'Comece pelo primeiro aluno'}
      </p>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-500">
        Cadastre o aluno, responda a entrevista diagnóstica na primeira aula e a plataforma
        monta a rampa a partir do que ele realmente demonstra.
      </p>
      <Link
        href="/professor/alunos/novo"
        className="mt-5 inline-block rounded-lg bg-ink-950 px-4 py-2 text-sm font-medium text-white"
      >
        Cadastrar aluno
      </Link>
    </div>
  )
}

function StudentCard({ student, highlight = false }: { student: Student; highlight?: boolean }) {
  const tone = resolveTone(student.profile)
  const weakest = Object.entries(student.skillVector).sort(
    (a, b) => ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(a[1] as never) -
              ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(b[1] as never),
  )[0]

  return (
    <SpotlightCard
      className={`rounded-xl border bg-white transition hover:shadow-md ${
        highlight ? 'border-audit-400/50' : 'border-ink-200'
      }`}
    >
      <Link href={`/professor/alunos/${student.id}`} className="block p-4">
        <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink-950">{student.name}</p>
          <p className="mt-0.5 truncate text-xs text-ink-500">{student.email}</p>
        </div>
        {student.inviteStatus === 'pending' && (
          <span className="shrink-0 rounded bg-ink-100 px-1.5 py-0.5 text-[11px] text-ink-600">
            convite pendente
          </span>
        )}
      </div>

      <dl className="mt-3.5 space-y-1.5 text-xs">
        <div className="flex justify-between">
          <dt className="text-ink-500">Objetivo</dt>
          <dd className="font-medium text-ink-800">{GOAL_LABELS[student.goal]}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-500">Meta</dt>
          <dd className="font-medium text-ink-800">
            {student.targetCefr} · {LEVEL_LABELS[student.targetCefr]}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-500">Carga</dt>
          <dd className="font-medium text-ink-800">
            {student.weeklyHours}h/sem · {student.sessionMinutes}min
          </dd>
        </div>
        {student.lastAssessmentId && weakest && (
          <div className="flex justify-between">
            <dt className="text-ink-500">Gargalo</dt>
            <dd className="font-medium text-ink-800">
              {SKILL_LABELS[weakest[0] as never]} {weakest[1]}
            </dd>
          </div>
        )}
      </dl>

      <p className="mt-3 truncate border-t border-ink-100 pt-2.5 text-[11px] text-ink-400">
        Tom: {tone.addressStyle === 'formal' ? 'formal' : 'pelo primeiro nome'} ·{' '}
        {tone.explanationDepth === 'deep' ? 'explicação profunda' : tone.explanationDepth === 'minimal' ? 'curta' : 'padrão'}
      </p>
      </Link>
    </SpotlightCard>
  )
}
