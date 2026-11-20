'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/app/providers'
import { getStudent, saveAssessment } from '@/lib/firebase/repositories'
import { DIAGNOSTIC_ITEMS } from '@/lib/domain/diagnosticBank'
import {
  computeDiagnosis,
  computeGaps,
  diagnosisHeadline,
} from '@/lib/domain/diagnosis'
import {
  CEFR_LEVELS,
  LEVEL_LABELS,
  SKILLS,
  SKILL_LABELS,
  levelIndex,
} from '@/lib/domain/levels'
import type {
  AssessmentAnswer,
  AssessmentResult,
  CefrLevel,
  Student,
} from '@/lib/types'

type Marks = Record<string, CefrLevel | undefined>

export default function AssessmentPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()

  const [student, setStudent] = useState<Student | null | 'loading' | 'missing'>('loading')
  const [marks, setMarks] = useState<Marks>({})
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [result, setResult] = useState<AssessmentResult | null>(null)

  useEffect(() => {
    if (!id) return
    setStudent('loading')
    getStudent(id)
      .then((s) => setStudent(s ?? 'missing'))
      .catch(() => setStudent('missing'))
  }, [id])

  const groups = useMemo(() => {
    return SKILLS.map((skill) => ({
      skill,
      items: DIAGNOSTIC_ITEMS.filter((i) => i.skill === skill),
    }))
  }, [])

  const answered = useMemo(
    () => Object.values(marks).filter((m) => m !== undefined).length,
    [marks],
  )
  const total = DIAGNOSTIC_ITEMS.length
  const pct = Math.round((answered / total) * 100)

  if (student === 'loading') {
    return <p className="text-sm text-ink-500">Carregando…</p>
  }

  if (student === 'missing' || student === null) {
    return (
      <div className="rounded-xl border border-dashed border-ink-300 bg-white p-10 text-center text-sm text-ink-500">
        Aluno não encontrado ou sem permissão.
      </div>
    )
  }

  const person = student as Student

  if (result) {
    return <ResultView student={person} result={result} />
  }

  const toggle = (itemId: string, level: CefrLevel) => {
    setMarks((prev) => ({ ...prev, [itemId]: prev[itemId] === level ? undefined : level }))
  }

  const submit = async () => {
    if (!user) return
    setSaving(true)
    setSaveError(null)
    try {
      const answers: AssessmentAnswer[] = DIAGNOSTIC_ITEMS.map((item) => ({
        itemId: item.id,
        level: marks[item.id] ?? 'unknown',
        confidence: marks[item.id] ? 'saw_produce' : 'not_assessed',
      }))

      const computed = computeDiagnosis(answers, DIAGNOSTIC_ITEMS)
      const gaps = computeGaps(computed.skillVector, person.goal, computed.overall)
      const payload: AssessmentResult = {
        skillVector: computed.skillVector,
        overall: computed.overall,
        ceiling: computed.ceiling,
        floor: computed.floor,
        profileSkew: computed.profileSkew,
        gaps,
        summaryText: diagnosisHeadline(computed),
      }

      await saveAssessment({
        student: person,
        teacherId: user.uid,
        items: answers,
        freeNotes: notes,
        result: payload,
      })

      setResult(payload)
    } catch (e) {
      setSaveError((e as Error).message || 'Falha ao salvar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <Link
          href={`/professor/alunos/${person.id}`}
          className="text-sm text-ink-500 hover:text-ink-800"
        >
          ← {person.name}
        </Link>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink-950">
          Entrevista diagnóstica
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-600">
          Marque o nível em que o aluno{' '}
          <em>realmente</em> acerta hoje, não o que ele deveria saber. O que ficar sem marca
          conta como não avaliado e reduz a confiança do resultado.
        </p>
      </header>

      <div className="sticky top-0 z-10 -mx-1 border-b border-ink-200 bg-white/90 px-1 py-3 backdrop-blur">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink-900">
            {answered} de {total} itens
          </span>
          <span className="text-ink-500">{pct}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full rounded-full bg-brand-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {groups.map(({ skill, items }) => (
        <section key={skill}>
          <h2 className="text-sm font-semibold text-ink-950">
            {SKILL_LABELS[skill]}
            <span className="ml-2 text-xs font-normal text-ink-500">
              {items.filter((i) => marks[i.id]).length}/{items.length}
            </span>
          </h2>
          <div className="mt-3 space-y-3">
            {items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                value={marks[item.id]}
                onPick={(level) => toggle(item.id, level)}
              />
            ))}
          </div>
        </section>
      ))}

      <section className="rounded-xl border border-ink-200 bg-white p-5">
        <label htmlFor="notes" className="text-sm font-semibold text-ink-950">
          Observações da aula
        </label>
        <p className="mt-0.5 text-xs text-ink-500">
          O que a entrevista não captou: contexto, cansaço, motivação, notas de pronúncia.
        </p>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="mt-3 w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          placeholder="Ex.: veio cansada, acelera muito quando fica nervosa; entende mais do que consegue falar."
        />
      </section>

      <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-ink-200 bg-white/90 py-4 backdrop-blur">
        <p className="text-xs text-ink-500">
          {answered === 0
            ? 'Nada marcado ainda — o resultado será A1 em tudo.'
            : `Skills avaliadas: ${new Set(DIAGNOSTIC_ITEMS.filter((i) => marks[i.id]).map((i) => i.skill)).size} de 8.`}
        </p>
        <div className="flex items-center gap-3">
          {saveError && <span className="text-xs text-audit-500">{saveError}</span>}
          <button
            onClick={submit}
            disabled={saving || !user}
            className="rounded-lg bg-ink-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-50"
          >
            {saving ? 'Salvando…' : 'Concluir diagnóstico'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ItemRow({
  item,
  value,
  onPick,
}: {
  item: (typeof DIAGNOSTIC_ITEMS)[number]
  value: CefrLevel | undefined
  onPick: (level: CefrLevel) => void
}) {
  const descriptor = value ? item.descriptors[value] : undefined
  return (
    <div
      className={`rounded-xl border bg-white p-4 transition ${
        value ? 'border-brand-500/50' : 'border-ink-200'
      }`}
    >
      <p className="text-sm text-ink-900">{item.prompt}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {CEFR_LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => onPick(level)}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
              value === level
                ? 'bg-ink-950 text-white'
                : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
            }`}
            title={item.descriptors[level] ?? ''}
          >
            {level}
          </button>
        ))}
      </div>
      {descriptor && <p className="mt-2 text-xs text-ink-500">{descriptor}</p>}
    </div>
  )
}

function ResultView({ student, result }: { student: Student; result: AssessmentResult }) {
  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink-950">
          Diagnóstico de {student.name}
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{result.summaryText}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Nível geral" value={result.overall} hint={LEVEL_LABELS[result.overall]} />
        <Stat label="Teto já tocado" value={result.ceiling} hint={LEVEL_LABELS[result.ceiling]} />
        <Stat
          label="Gargalo"
          value={result.floor}
          hint={LEVEL_LABELS[result.floor]}
          warn={result.profileSkew}
        />
      </div>

      {result.profileSkew && (
        <p className="rounded-lg border border-audit-400/40 bg-audit-400/10 px-4 py-3 text-sm text-audit-500">
          Perfil irregular: a diferença entre o gargalo e o teto é de 3 ou mais níveis. Vale
          nivelar antes de gerar a rampa.
        </p>
      )}

      <section className="rounded-xl border border-ink-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink-950">Vetor por competência</h2>
        <ul className="mt-4 space-y-2.5">
          {SKILLS.map((skill) => (
            <li key={skill} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm text-ink-700">{SKILL_LABELS[skill]}</span>
              <div className="flex flex-1 gap-1">
                {CEFR_LEVELS.map((l) => (
                  <div
                    key={l}
                    title={l}
                    className={`h-2 flex-1 rounded-full ${
                      levelIndex(l) <= levelIndex(result.skillVector[skill])
                        ? 'bg-brand-500'
                        : 'bg-ink-100'
                    }`}
                  />
                ))}
              </div>
              <span className="w-10 text-right text-xs font-medium text-ink-900">
                {result.skillVector[skill]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-ink-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink-950">Lacunas</h2>
        {result.gaps.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">
            Nenhuma skill abaixo do próximo nível. A rampa pode ir direto para o objetivo.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {result.gaps.map((gap) => (
              <li key={gap.skill} className="rounded-lg bg-ink-50 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-ink-900">
                    {SKILL_LABELS[gap.skill]}
                  </span>
                  <span className="text-xs text-ink-500">
                    {gap.from} → {gap.to}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-600">{gap.reason}</p>
                <span
                  className={`mt-2 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                    gap.criticality === 'critical'
                      ? 'bg-audit-400/20 text-audit-500'
                      : 'bg-ink-200 text-ink-600'
                  }`}
                >
                  {gap.criticality === 'critical' ? 'crítica' : 'importante'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex gap-3">
        <Link
          href={`/professor/alunos/${student.id}`}
          className="rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
        >
          Ver ficha do aluno
        </Link>
        <Link
          href={`/professor/alunos/${student.id}/rampa`}
          className="rounded-lg border border-ink-300 px-4 py-2.5 text-sm font-medium text-ink-800 transition hover:bg-ink-50"
        >
          Gerar rampa
        </Link>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  hint,
  warn,
}: {
  label: string
  value: CefrLevel
  hint: string
  warn?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        warn ? 'border-audit-400/50 bg-audit-400/5' : 'border-ink-200 bg-white'
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-ink-500">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-950">{value}</p>
      <p className="text-xs text-ink-500">{hint}</p>
    </div>
  )
}
