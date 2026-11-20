'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers'
import { createStudent, getTeacherSettings } from '@/lib/firebase/repositories'
import { GOAL_LABELS, LEVEL_LABELS } from '@/lib/domain/levels'
import { resolveTone, toneSummary } from '@/lib/domain/tone'
import {
  CEFR_LEVELS,
  GOALS,
  PERSONALITY_TAGS,
  type CefrLevel,
  type GoalCode,
  type PersonalityTag,
  type StudentProfile,
} from '@/lib/types'

const PERSONALITY_LABELS: Record<PersonalityTag, string> = {
  shy: 'Tímido',
  anxious: 'Ansioso com erro',
  talkative: 'Falante',
  analytical: 'Analítico',
  visual: 'Visual',
  auditory: 'Auditivo',
  kinesthetic: 'Fazendo',
  perfectionist: 'Perfeccionista',
  impatient: 'Impaciente',
  curious: 'Curioso',
  structured: 'Metódico',
  freeform: 'Avesso a plano',
}

const COUNTRIES = ['BR', 'PT', 'US', 'GB', 'DE', 'FR', 'ES', 'IT', 'JP', 'CN', 'AR', 'KR', 'IN', 'BR']
const L1_LANGUAGES = ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano', 'Japonês', 'Mandarim', 'Russo', 'Árabe', 'Outra']
const INTERESTS = ['culinária', 'viagem', 'cinema', 'música', 'futebol', 'games', 'tecnologia', 'saúde', 'direito', 'economia', 'moda', 'esportes']

export default function NewStudentPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [goal, setGoal] = useState<GoalCode>('travel')
  const [goalDetail, setGoalDetail] = useState('')
  const [targetCefr, setTargetCefr] = useState<CefrLevel>('A2')
  const [targetDate, setTargetDate] = useState('')
  const [weeklyHours, setWeeklyHours] = useState(3)
  const [sessionMinutes, setSessionMinutes] = useState(60)
  // Guardado para saber se o professor ja mexeu no campo; se mexeu, as
  // configuracoes dele param de sobrescrever a escolha.
  const [weeklyTouched, setWeeklyTouched] = useState(false)
  const [sessionTouched, setSessionTouched] = useState(false)
  const [goalTouched, setGoalTouched] = useState(false)

  const [age, setAge] = useState(30)
  const [l1, setL1] = useState('Inglês')
  const [country, setCountry] = useState('BR')
  const [occupation, setOccupation] = useState('')
  const [priorStudyYears, setPriorStudyYears] = useState(0)
  const [priorLanguages, setPriorLanguages] = useState<string[]>([])
  const [personality, setPersonality] = useState<PersonalityTag[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [freeNotes, setFreeNotes] = useState('')

  // Os padroes do professor preenchem carga, sessao e objetivo. Sem isso a
  // tela prometia "usa suas configuracoes" e usava 3h/60min/viagem fixos.
  useEffect(() => {
    if (!user?.uid) return
    let alive = true
    getTeacherSettings(user.uid, user.email, user.displayName)
      .then((s) => {
        if (!alive) return
        setWeeklyHours((prev) => (weeklyTouched ? prev : s.defaultWeeklyHours))
        setSessionMinutes((prev) => (sessionTouched ? prev : s.defaultSessionMinutes))
        setGoal((prev) => (goalTouched ? prev : s.defaultGoal))
      })
      .catch(() => undefined)
    return () => {
      alive = false
    }
  }, [user?.uid, user?.email, user?.displayName, weeklyTouched, sessionTouched, goalTouched])

  const profile: StudentProfile = useMemo(
    () => ({
      age,
      l1,
      country,
      occupation,
      priorStudyYears,
      priorLanguagesStudied: priorLanguages,
      personality,
      interests,
      freeNotes,
    }),
    [age, l1, country, occupation, priorStudyYears, priorLanguages, personality, interests, freeNotes],
  )

  const tone = useMemo(() => resolveTone(profile), [profile])

  function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
  }

  const step1Valid = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email)

  async function submit() {
    // Falhar em silencio deixava o professor clicar e nao ver nada. Sem uid
    // nao ha como criar o aluno, entao dizemos o que houve.
    if (!user?.uid) {
      setError(
        'Sessão sem uid. Saia e entre novamente para recarregar o perfil.',
      )
      return
    }
    setSaving(true)
    setError(null)
    try {
      const id = await createStudent(user.uid, {
        name: name.trim(),
        email: email.trim(),
        goal,
        goalDetail: goalDetail.trim(),
        targetCefr,
        targetDate: targetDate || undefined,
        weeklyHours,
        sessionMinutes,
        profile,
      })
      router.push(`/professor/alunos/${id}?primeiro=1`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível salvar. Se os emuladores não estiverem rodando, veja o terminal.',
      )
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl animate-fade-up">
      <Link href="/professor" className="text-sm text-ink-500 hover:text-ink-800">
        ← Painel
      </Link>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink-950">Novo aluno</h1>
      <p className="mt-1 text-sm text-ink-500">
        Estas informações alimentam a personalização. Quanto mais contexto, mais o tom do material
        acerta.
      </p>

      <ol className="mt-6 flex gap-2">
        {(['Identificação', 'Contexto', 'Perfil e tom'] as const).map((label, i) => (
          <li key={label} className="flex-1">
            <div
              className={`h-1 rounded-full transition ${step - 1 >= i ? 'bg-ink-950' : 'bg-ink-200'}`}
            />
            <p className="mt-2 text-xs text-ink-500">{label}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-6 rounded-xl border border-ink-200 bg-white p-6">
        {step === 1 && (
          <>
            <Row>
              <Field label="Nome do aluno" value={name} onChange={setName} required />
              <Field label="E-mail" value={email} onChange={setEmail} type="email" required />
            </Row>

            <div>
              <p className="mb-2 text-sm font-medium text-ink-700">Para que ele quer usar o idioma?</p>
              <div className="flex flex-wrap gap-2">
                {GOALS.map((g) => (
                  <Chip key={g} active={goal === g} onClick={() => { setGoal(g); setGoalTouched(true) }}>
                    {GOAL_LABELS[g]}
                  </Chip>
                ))}
              </div>
            </div>

            <Field
              label="Detalhe o objetivo"
              value={goalDetail}
              onChange={setGoalDetail}
              placeholder="Ex.: tirar A2 na IME na Itália até março; quero trabalhar com clientes em São Paulo"
              hint="Este texto entra literalmente na justificativa de cada etapa da rampa."
            />

            <div>
              <p className="mb-2 text-sm font-medium text-ink-700">Nível desejado</p>
              <div className="flex flex-wrap gap-2">
                {CEFR_LEVELS.map((l) => (
                  <Chip key={l} active={targetCefr === l} onClick={() => setTargetCefr(l)}>
                    {l} · {LEVEL_LABELS[l]}
                  </Chip>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <Row>
              <Field
                label="Meta de tempo (opcional)"
                value={targetDate}
                onChange={setTargetDate}
                type="date"
                hint="Se não couber, a plataforma avisa em vez de gerar uma rampa impossível."
              />
              <Field
                label="Carga real por semana"
                value={String(weeklyHours)}
                onChange={(v) => { setWeeklyHours(Number(v) || 0); setWeeklyTouched(true) }}
                type="number"
                hint="Horas que o aluno de fato tem, não as que ele diz que tem."
              />
            </Row>
            <Row>
              <Field
                label="Duração da sessão"
                value={String(sessionMinutes)}
                onChange={(v) => { setSessionMinutes(Number(v) || 60); setSessionTouched(true) }}
                type="number"
                hint="Padrão das suas configurações."
              />
              <Field
                label="País de residência"
                value={country}
                onChange={setCountry}
                type="text"
                hint="Define o tratamento: BR usa “você”, PT usa “tu”."
              />
            </Row>
          </>
        )}

        {step === 3 && (
          <>
            <Row>
              <Field
                label="Idade"
                value={String(age)}
                onChange={(v) => setAge(Number(v) || 0)}
                type="number"
              />
              <Select label="Idioma materna" value={l1} onChange={setL1} options={L1_LANGUAGES} />
            </Row>
            <Row>
              <Field
                label="Ocupação"
                value={occupation}
                onChange={setOccupation}
              placeholder="Ex.: engenheira de software, enfermeira, aposentado"
                hint="Exemplos do material saem daqui."
              />
              <Field
                label="Estudo formal anterior"
                value={String(priorStudyYears)}
                onChange={(v) => setPriorStudyYears(Number(v) || 0)}
                type="number"
                hint="Anos de português ou linguística."
              />
            </Row>

            <div>
              <p className="mb-1 text-sm font-medium text-ink-700">Outros idiomas que aprendeu</p>
              <p className="mb-2.5 text-xs text-ink-500">
                Se já aprendeu outro idioma, a IA usa analogias com ele para construir intuição.
              </p>
              <div className="flex flex-wrap gap-2">
                {L1_LANGUAGES.filter((l) => l !== l1).map((l) => (
                  <Chip key={l} active={priorLanguages.includes(l)} onClick={() => setPriorLanguages(toggle(priorLanguages, l))}>
                    {l}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-ink-700">Como ele é na aula</p>
              <p className="mb-2.5 text-xs text-ink-500">
                Marca o que descreve. Define tom, profundidade, humor e quando corrigir.
              </p>
              <div className="flex flex-wrap gap-2">
                {PERSONALITY_TAGS.map((t) => (
                  <Chip key={t} active={personality.includes(t)} onClick={() => setPersonality(toggle(personality, t))}>
                    {PERSONALITY_LABELS[t]}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-sm font-medium text-ink-700">Interesses</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <Chip key={i} active={interests.includes(i)} onClick={() => setInterests(toggle(interests, i))}>
                    {i}
                  </Chip>
                ))}
              </div>
            </div>

            <Field
              label="Anotações livres"
              value={freeNotes}
              onChange={setFreeNotes}
              placeholder="Ex.: trava com ouvintes britânicos, tem vergonha de falar, prefere aula noturna"
            />

            <div className="rounded-lg bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-800">Tom resolvido</p>
              <p className="mt-1 text-sm text-brand-700">{toneSummary(tone)}</p>
              <p className="mt-2 text-xs text-brand-700/70">
                Você pode sobrescrever qualquer campo depois, na ficha do aluno.
              </p>
            </div>
          </>
        )}

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div className="flex items-center justify-between border-t border-ink-100 pt-5">
          <button
            type="button"
            onClick={() => (step === 1 ? router.push('/professor') : setStep((s) => (s - 1) as 1 | 2))}
            className="rounded-lg px-3.5 py-2 text-sm text-ink-600 transition hover:bg-ink-100"
          >
            {step === 1 ? 'Cancelar' : 'Voltar'}
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
              disabled={step === 1 && !step1Valid}
              className="rounded-lg bg-ink-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-40"
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={saving || !step1Valid}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-40"
            >
              {saving ? 'Criando…' : 'Criar aluno'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition ${
        active
          ? 'border-ink-950 bg-ink-950 text-white'
          : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300'
      }`}
    >
      {children}
    </button>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  hint,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  hint?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-ink-400 focus:ring-2 focus:ring-ink-950/5"
      />
      {hint && <span className="mt-1 block text-xs text-ink-500">{hint}</span>}
    </label>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-400"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
