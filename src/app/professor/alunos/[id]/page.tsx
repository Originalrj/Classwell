'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { getStudent } from '@/lib/firebase/repositories'
import {
  CEFR_LEVELS,
  LEVEL_LABELS,
  SKILLS,
  SKILL_LABELS,
  levelIndex,
} from '@/lib/domain/levels'
import { resolveTone, toneSummary } from '@/lib/domain/tone'
import type { Student } from '@/lib/types'

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [student, setStudent] = useState<Student | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getStudent(id)
      .then((s) => (s ? setStudent(s) : setError('Aluno não encontrado')))
      .catch(() => setError('Não foi possível carregar o aluno'))
  }, [id])

  const tone = useMemo(() => (student ? resolveTone(student.profile) : null), [student])

  if (error) {
    return (
      <div className="rounded-xl border border-dashed border-ink-300 bg-white p-10 text-center text-sm text-ink-500">
        {error}
      </div>
    )
  }

  if (!student || !tone) {
    return <p className="text-sm text-ink-500">Carregando…</p>
  }

  const radarData = SKILLS.map((skill) => ({
    skill: SKILL_LABELS[skill],
    valor: levelIndex(student.skillVector[skill]) + 1,
    atual: LEVEL_LABELS[student.skillVector[skill]],
    meta: levelIndex(student.targetCefr) + 1,
  }))

  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <Link href="/professor/alunos" className="text-sm text-ink-500 hover:text-ink-800">
          ← Alunos
        </Link>
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink-950">{student.name}</h1>
            <p className="mt-1 text-sm text-ink-500">{student.goalDetail || 'Sem detalhe do objetivo.'}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-ink-100 px-2.5 py-1.5 text-xs font-medium text-ink-700">
              {student.currentCefr} → {student.targetCefr}
            </span>
            <Link
              href={`/professor/alunos/${student.id}/avaliacao`}
              className="rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
            >
              {student.lastAssessmentId ? 'Reavaliar' : 'Entrevista diagnóstica'}
            </Link>
          </div>
        </div>
      </header>

      {!student.lastAssessmentId && (
        <div className="rounded-xl border border-audit-400/40 bg-audit-400/10 p-5">
          <p className="text-sm font-medium text-audit-500">Falta o diagnóstico</p>
          <p className="mt-1 text-sm text-audit-500/90">
            O vetor de competências está em A1 em tudo por padrão. Rode a entrevista para saber
            onde ele realmente está antes de gerar a rampa.
          </p>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-xl border border-ink-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-ink-950">Vetor de competências</h2>
          <p className="mt-0.5 text-xs text-ink-500">Nível por área, de 1 a 6</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="#eceef2" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#515c76' }} />
                <PolarRadiusAxis domain={[0, 6]} tick={false} axisLine={false} />
                <Radar
                  name="Aluno"
                  dataKey="valor"
                  stroke="#1fa78a"
                  fill="#40c1a2"
                  fillOpacity={0.35}
                />
                <Radar
                  name="Meta"
                  dataKey="meta"
                  stroke="#b0b8c9"
                  fill="#d5d9e2"
                  fillOpacity={0.15}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value} · ${CEFR_LEVELS[value - 1]}`,
                    name,
                  ]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="space-y-5">
          <div className="rounded-xl border border-ink-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-ink-950">Perfil</h2>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              <Row label="Objetivo" value={student.goal} raw />
              <Row label="Meta" value={student.targetCefr} raw />
              <Row label="Idade" value={String(student.profile.age)} />
              <Row label="L1" value={student.profile.l1} />
              <Row label="País" value={student.profile.country} />
              <Row label="Ocupação" value={student.profile.occupation || '—'} />
              <Row label="Horas/semana" value={String(student.weeklyHours)} />
              <Row label="Sessão" value={`${student.sessionMinutes} min`} />
            </dl>
            {student.profile.interests.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {student.profile.interests.map((i) => (
                  <span key={i} className="rounded bg-ink-100 px-2 py-0.5 text-xs text-ink-600">
                    {i}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-ink-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-ink-950">Tom do material</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{toneSummary(tone)}</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <Row label="Tratamento" value={tone.formality} />
              <Row label="Humor" value={tone.humor} />
              <Row label="Andamento" value={tone.tempoPace} />
              <Row label="Correção" value={tone.errorCorrection} />
              <Row label="Desafio" value={tone.challengeTone} />
              <Row label="Exemplos" value={tone.exampleCulture} />
            </dl>
          </div>
        </section>
      </div>
    </div>
  )
}

function Row({ label, value, raw = false }: { label: string; value: string; raw?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-ink-500">{label}</dt>
      <dd className={`truncate ${raw ? 'font-medium text-ink-900' : 'text-ink-800'}`}>{value}</dd>
    </div>
  )
}
