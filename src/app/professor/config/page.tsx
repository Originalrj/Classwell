'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/app/providers'
import { getTeacherSettings, saveTeacherSettings } from '@/lib/firebase/repositories'
import { GOAL_LABELS } from '@/lib/domain/levels'
import BorderGlow from '@/components/reactbits/BorderGlow'
import type { GoalCode, TeacherSettings } from '@/lib/types'

export default function ConfigPage() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<TeacherSettings | 'loading' | 'missing'>('loading')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.uid) return
    getTeacherSettings(user.uid, user.email, user.displayName)
      .then(setSettings)
      .catch(() => setSettings('missing'))
  }, [user?.uid, user?.email, user?.displayName])

  if (settings === 'loading') return <p className="text-sm text-ink-500">Carregando…</p>
  if (settings === 'missing' || !user) {
    return (
      <div className="rounded-xl border border-dashed border-ink-300 bg-white p-10 text-center text-sm text-ink-500">
        Não foi possível carregar as configurações.
      </div>
    )
  }

  const patch = (p: Partial<TeacherSettings>) => {
    setSettings({ ...settings, ...p })
    setSavedAt(null)
  }

  const save = async () => {
    setSaving(true)
    setError(null)
    try {
      await saveTeacherSettings(settings)
      setSavedAt(Date.now())
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="animate-fade-up space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-ink-950">Configurações</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-600">
          Preferências que valem para todo aluno novo. Alunos já cadastrados mantêm o que foi
          definido na ficha.
        </p>
      </header>

      <section className="rounded-xl border border-ink-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink-950">Perfil</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Nome exibido">
            <input
              value={settings.displayName}
              onChange={(e) => patch({ displayName: e.target.value })}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </Field>
          <Field label="E-mail" hint="Gerenciado pela conta; somente leitura.">
            <input
              value={settings.email}
              readOnly
              className="w-full rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 text-sm text-ink-500"
            />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-ink-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink-950">Padrões de aula</h2>
        <p className="mt-0.5 text-xs text-ink-500">
          Pré-preenchem o cadastro de aluno e a estimativa de duração das etapas.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Duração da sessão (min)">
            <input
              type="number"
              min={15}
              max={240}
              step={5}
              value={settings.defaultSessionMinutes}
              onChange={(e) =>
                patch({ defaultSessionMinutes: clamp(e.target.value, 15, 240) })
              }
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </Field>
          <Field label="Horas por semana">
            <input
              type="number"
              min={1}
              max={40}
              value={settings.defaultWeeklyHours}
              onChange={(e) => patch({ defaultWeeklyHours: clamp(e.target.value, 1, 40) })}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </Field>
          <Field label="Objetivo padrão">
            <select
              value={settings.defaultGoal}
              onChange={(e) => patch({ defaultGoal: e.target.value as GoalCode })}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {Object.entries(GOAL_LABELS).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-ink-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink-950">Fluxo de trabalho</h2>
        <div className="mt-4 space-y-3">
          <Toggle
            label="Gerar a rampa automaticamente ao fechar o diagnóstico"
            hint="O professor ainda revisa antes de publicar."
            checked={settings.autoRampOnDiagnosis}
            onChange={(v) => patch({ autoRampOnDiagnosis: v })}
          />
          <Toggle
            label="Mostrar a fila de revisão da biblioteca"
            hint="Material dos outros professores aguardando parecer."
            checked={settings.showReviewQueue}
            onChange={(v) => patch({ showReviewQueue: v })}
          />
        </div>
        <div className="mt-4 max-w-xs">
          <Field
            label="Mínimo de palavras para explicação"
            hint="Limite do check automático de qualidade."
          >
            <input
              type="number"
              min={50}
              max={2000}
              step={50}
              value={settings.minWordsForExplanation}
              onChange={(e) =>
                patch({ minWordsForExplanation: clamp(e.target.value, 50, 2000) })
              }
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </Field>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-50"
        >
          {saving ? 'Salvando…' : 'Salvar configurações'}
        </button>
        {savedAt && (
          <span className="text-xs text-brand-600">
            Salvo {new Date(savedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.
          </span>
        )}
        {error && <span className="text-xs text-audit-500">{error}</span>}
      </div>

      <BorderGlow
        animated
        colors={['#40c1a2', '#1fa78a', '#f5a524']}
        className="bg-white"
      >
        <div className="rounded-2xl p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
            Onde isso aparece
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li className="flex gap-2">
              <span aria-hidden className="text-brand-500">→</span>
              <span>
                <strong className="font-medium text-ink-900">
                  {settings.defaultWeeklyHours}h/sem e {settings.defaultSessionMinutes}min
                </strong>{' '}
                já vêm preenchidos no cadastro de aluno novo.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-brand-500">→</span>
              <span>
                Objetivo padrão: <strong className="font-medium text-ink-900">{GOAL_LABELS[settings.defaultGoal]}</strong>.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-brand-500">→</span>
              <span>
                O check da biblioteca exige{' '}
                <strong className="font-medium text-ink-900">
                  {settings.minWordsForExplanation} palavras
                </strong>{' '}
                por explicação.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-brand-500">→</span>
              <span>
                {settings.autoRampOnDiagnosis
                  ? 'A rampa é gerada automaticamente ao fechar o diagnóstico.'
                  : 'A rampa não é gerada automaticamente; você monta manualmente.'}
              </span>
            </li>
          </ul>
        </div>
      </BorderGlow>
    </div>
  )
}

function clamp(raw: string, min: number, max: number): number {
  const n = Number(raw)
  if (Number.isNaN(n)) return min
  return Math.min(Math.max(Math.round(n), min), max)
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string
  hint: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-brand-500"
      />
      <span>
        <span className="block text-sm text-ink-900">{label}</span>
        <span className="block text-xs text-ink-500">{hint}</span>
      </span>
    </label>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-700">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[11px] text-ink-500">{hint}</span>}
    </label>
  )
}
