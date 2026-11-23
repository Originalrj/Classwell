'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/app/providers'
import {
  createContent,
  getContent,
  getTeacherSettings,
  listContents,
  reportContent,
  updateContentStatus,
} from '@/lib/firebase/repositories'
import { CEFR_LEVELS, SKILLS, SKILL_LABELS, levelIndex } from '@/lib/domain/levels'
import { CONTENT_DRAFT_KEY, type ContentDraft } from '@/lib/domain/knowledge'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import {
  CONTENT_STATUSES,
  CONTENT_STATUS_LABELS,
  CONTENT_THEMES,
  CONTENT_TYPE_LABELS,
  CONTENT_TYPES,
  REGISTER_LABELS,
  REGISTERS,
  type CefrLevel,
  type Content,
  type ContentStatus,
  type ContentType,
  type Register,
  type SkillCode,
} from '@/lib/types'

const STATUS_TONE: Record<ContentStatus, string> = {
  draft: 'bg-ink-100 text-ink-700',
  in_review: 'bg-audit-400/20 text-audit-500',
  published: 'bg-brand-100 text-brand-700',
  rejected: 'bg-ink-200 text-ink-700',
  deprecated: 'bg-ink-100 text-ink-400',
}

export default function LibraryPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<Content[] | 'loading'>('loading')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<ContentStatus | 'all'>('all')
  const [skill, setSkill] = useState<SkillCode | 'all'>('all')
  const [levelFilter, setLevelFilter] = useState<CefrLevel | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<ContentType | 'all'>('all')
  const [themeFilter, setThemeFilter] = useState<string | 'all'>('all')
  const [onlyMine, setOnlyMine] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState<ContentDraft | null>(null)

  const reload = useCallback(() => {
    listContents()
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  useEffect(reload, [reload])

  // O apanhado de conhecimento escreve aqui quando o professor escolhe
  // "Criar material na biblioteca". Abrimos o formulario ja preenchido.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CONTENT_DRAFT_KEY)
      if (!raw) return
      sessionStorage.removeItem(CONTENT_DRAFT_KEY)
      setDraft(JSON.parse(raw) as ContentDraft)
      setShowForm(true)
    } catch {
      // storage indisponivel ou rascunho corrompido: segue com formulario limpo
    }
  }, [])

  const filtered = useMemo(() => {
    if (items === 'loading') return []
    const q = query.trim().toLowerCase()
    return items.filter((c) => {
      if (status !== 'all' && c.status !== status) return false
      if (skill !== 'all' && !c.skills.includes(skill)) return false
      if (
        levelFilter !== 'all' &&
        !(levelIndex(c.cefrMin) <= levelIndex(levelFilter) &&
          levelIndex(levelFilter) <= levelIndex(c.cefrMax))
      ) {
        return false
      }
      if (typeFilter !== 'all' && c.type !== typeFilter) return false
      if (themeFilter !== 'all' && !c.themeTags.includes(themeFilter)) return false
      if (onlyMine && c.authorId !== user?.uid) return false
      if (!q) return true
      return (
        c.title.toLowerCase().includes(q) ||
        (c.body?.toLowerCase().includes(q) ?? false) ||
        (c.answerKey?.toLowerCase().includes(q) ?? false) ||
        c.lexicalTags.some((t) => t.toLowerCase().includes(q)) ||
        c.grammarTags.some((t) => t.toLowerCase().includes(q)) ||
        c.themeTags.some((t) => t.includes(q))
      )
    })
  }, [items, query, status, skill, levelFilter, typeFilter, themeFilter, onlyMine, user?.uid])

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: 0 }
    for (const s of CONTENT_STATUSES) base[s] = 0
    if (items === 'loading') return base
    for (const c of items) {
      base.all++
      base[c.status] = (base[c.status] ?? 0) + 1
    }
    return base
  }, [items])

  if (items === 'loading') return <p className="text-sm text-ink-500">Carregando…</p>

  return (
    <div className="animate-fade-up space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-950">Biblioteca</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-600">
            Material pertence à plataforma, não ao aluno. Todo professor escreve, e o material
            serve para qualquer aluno cujo perfil bata.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/professor/biblioteca/apanhado"
            className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-medium text-brand-700 transition hover:border-brand-300"
          >
            Apanhado de conhecimento →
          </Link>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
          >
            {showForm ? 'Fechar' : 'Novo material'}
          </button>
        </div>
      </header>

      {showForm && (
        <ContentForm
          initial={draft}
          onCancel={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false)
            reload()
          }}
        />
      )}

      <div className="rounded-xl border border-ink-200 bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(5,minmax(0,1fr))_auto]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, texto, léxico, gramática ou tema"
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as CefrLevel | 'all')}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="all">Todos os níveis</option>
            {CEFR_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ContentType | 'all')}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="all">Todos os formatos</option>
            {CONTENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {CONTENT_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
          <select
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="all">Todos os temas</option>
            {CONTENT_THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ContentStatus | 'all')}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="all">Todos os status ({counts.all})</option>
            {CONTENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {CONTENT_STATUS_LABELS[s]} ({counts[s] ?? 0})
              </option>
            ))}
          </select>
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value as SkillCode | 'all')}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="all">Todas as competências</option>
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {SKILL_LABELS[s]}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 whitespace-nowrap text-sm text-ink-700">
            <input
              type="checkbox"
              checked={onlyMine}
              onChange={(e) => setOnlyMine(e.target.checked)}
              className="h-4 w-4 accent-brand-500"
            />
            Só os meus
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-300 bg-white p-10 text-center">
          <p className="text-sm text-ink-600">
            {items.length === 0
              ? 'A biblioteca está vazia. Crie o primeiro material.'
              : 'Nenhum material bate com esses filtros.'}
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {filtered.map((c) => (
            <li key={c.id}>
              <ContentCard
                content={c}
                isMine={c.authorId === user?.uid}
                expanded={openId === c.id}
                onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                onChanged={reload}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ContentCard({
  content,
  isMine,
  expanded,
  onToggle,
  onChanged,
}: {
  content: Content
  isMine: boolean
  expanded: boolean
  onToggle: () => void
  onChanged: () => void
}) {
  const { user } = useAuth()
  const [busy, setBusy] = useState(false)
  const c = content

  const move = async (to: ContentStatus) => {
    setBusy(true)
    try {
      await updateContentStatus(c.id, to)
      onChanged()
    } finally {
      setBusy(false)
    }
  }

  const report = async () => {
    setBusy(true)
    try {
      await reportContent(c.id, 'Reportado pela biblioteca')
      onChanged()
    } finally {
      setBusy(false)
    }
  }

  return (
    <SpotlightCard className="rounded-xl border border-ink-200 bg-white">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-ink-950">{c.title}</h3>
          <p className="mt-0.5 text-xs text-ink-500">
            {CONTENT_TYPE_LABELS[c.type]} · {c.cefrMin}–{c.cefrMax} · {c.estMinutes} min ·{' '}
            {REGISTER_LABELS[c.register]}
          </p>
        </div>
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_TONE[c.status]}`}
        >
          {CONTENT_STATUS_LABELS[c.status]}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.skills.slice(0, 4).map((s) => (
          <span key={s} className="rounded bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-600">
            {SKILL_LABELS[s]}
          </span>
        ))}
        {c.themeTags.map((t) => (
          <span key={t} className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] text-brand-700">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-500">
        <span>qualidade {c.qualityScore.toFixed(1)}</span>
        <span>usos {c.usageCount}</span>
        {c.reportCount > 0 && <span className="text-audit-500">{c.reportCount} denúncia(s)</span>}
        <button onClick={onToggle} className="ml-auto text-ink-600 underline">
          {expanded ? 'fechar' : 'detalhes'}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-ink-100 pt-4">
          {c.body && (
            <p className="whitespace-pre-wrap text-xs leading-relaxed text-ink-700">{c.body}</p>
          )}
          {c.answerKey && (
            <p className="rounded bg-ink-50 px-2.5 py-2 text-xs text-ink-700">
              <span className="font-medium">Gabarito:</span> {c.answerKey}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {isMine && c.status === 'draft' && (
              <button
                disabled={busy}
                onClick={() => move('in_review')}
                className="rounded-md bg-ink-950 px-2.5 py-1.5 text-xs text-white disabled:opacity-50"
              >
                Submeter para revisão
              </button>
            )}
            {isMine && c.status === 'in_review' && (
              <button
                disabled={busy}
                onClick={() => move('draft')}
                className="rounded-md border border-ink-300 px-2.5 py-1.5 text-xs text-ink-700 disabled:opacity-50"
              >
                Voltar para rascunho
              </button>
            )}
            {isMine && c.status === 'in_review' && (
              <button
                disabled={busy}
                onClick={() => move('published')}
                className="rounded-md bg-brand-600 px-2.5 py-1.5 text-xs text-white disabled:opacity-50"
              >
                Aprovar e publicar
              </button>
            )}
            {isMine && c.status === 'deprecated' && (
              <button
                disabled={busy}
                onClick={() => move('published')}
                className="rounded-md border border-ink-300 px-2.5 py-1.5 text-xs text-ink-700 disabled:opacity-50"
              >
                Reativar
              </button>
            )}
            {!isMine && c.status === 'published' && (
              <button
                disabled={busy}
                onClick={report}
                className="rounded-md border border-ink-300 px-2.5 py-1.5 text-xs text-ink-700 disabled:opacity-50"
              >
                Reportar problema
              </button>
            )}
            {isMine && user?.role === 'admin' && c.status === 'in_review' && (
              <button
                disabled={busy}
                onClick={() => move('rejected')}
                className="rounded-md border border-ink-300 px-2.5 py-1.5 text-xs text-ink-700 disabled:opacity-50"
              >
                Rejeitar
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </SpotlightCard>
  )
}

function ContentForm({
  initial,
  onCancel,
  onSaved,
}: {
  initial?: ContentDraft | null
  onCancel: () => void
  onSaved: () => void
}) {
  const { user } = useAuth()
  const [minWords, setMinWords] = useState(300)
  const [title, setTitle] = useState(initial?.title ?? '')
  const [type, setType] = useState<ContentType>(initial?.type ?? 'explanation')
  const [body, setBody] = useState(initial?.body ?? '')
  const [answerKey, setAnswerKey] = useState('')
  const [cefrMin, setCefrMin] = useState<CefrLevel>(initial?.cefrMin ?? 'A1')
  const [cefrMax, setCefrMax] = useState<CefrLevel>(initial?.cefrMax ?? 'A2')
  const [primarySkill, setPrimarySkill] = useState<SkillCode>(initial?.skills[0] ?? 'speaking')
  const [skills, setSkills] = useState<SkillCode[]>(initial?.skills ?? ['speaking'])
  const [themes, setThemes] = useState<string[]>(initial?.themeTags ?? [])
  const [lexicalTags, setLexicalTags] = useState(initial?.lexicalTags.join(', ') ?? '')
  const [grammarTags, setGrammarTags] = useState(initial?.grammarTags.join(', ') ?? '')
  const [register, setRegister] = useState<Register>(initial?.register ?? 'neutro')
  const [estMinutes, setEstMinutes] = useState(initial?.estMinutes ?? 15)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleSkill = (s: SkillCode) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  const toggleTheme = (t: string) =>
    setThemes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const csv = (v: string) =>
    v.split(',').map((x) => x.trim().toLowerCase()).filter(Boolean)

  const inverted = levelIndex(cefrMax) < levelIndex(cefrMin)

  // O limite de palavras vem das configuracoes do professor: se ele não
  // existir mais, o default do repositorio (300) assume.
  useEffect(() => {
    if (!user?.uid) return
    let alive = true
    getTeacherSettings(user.uid, user.email, user.displayName)
      .then((s) => {
        if (alive) setMinWords(s.minWordsForExplanation)
      })
      .catch(() => undefined)
    return () => {
      alive = false
    }
  }, [user?.uid, user?.email, user?.displayName])

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length

  const submit = async (forReview: boolean) => {
    if (!user?.uid) {
      setError('Sessão sem uid. Saia e entre novamente.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const { score, issues } = await createContent(
        user.uid,
        {
          title,
          type,
          body,
          answerKey,
          cefrMin,
          cefrMax,
          skills,
          primarySkill,
          grammarTags: csv(grammarTags),
          lexicalTags: csv(lexicalTags),
          themeTags: themes,
          register,
          countryTags: [],
          dialectTags: [],
          estMinutes,
          minWords,
        },
        forReview,
      )
      if (forReview && score < 0.7) {
        setError(
          `Salvo como rascunho: score ${score.toFixed(1)} (mínimo 0.7 para revisar). Pendências: ${issues.join('; ')}`,
        )
        setSaving(false)
        return
      }
      onSaved()
    } catch (e) {
      setError((e as Error).message)
      setSaving(false)
    }
  }

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-ink-950">Novo material</h2>
      <p className="mt-0.5 text-xs text-ink-500">
        O registro e obrigatório para PLE: o mesmo conteúdo muda de sentido conforme a
        formalidade.
      </p>

      {initial && (
        <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
          Rascunho trazido do apanhado de conhecimento. Revise e complete antes de publicar.
        </p>
      )}

      <div className="mt-4 grid gap-4">
        <Field label="Título">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            placeholder="Diálogo: um almoço em São Paulo"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Tipo">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ContentType)}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {CONTENT_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Nível mínimo">
            <select
              value={cefrMin}
              onChange={(e) => setCefrMin(e.target.value as CefrLevel)}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {CEFR_LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Nível máximo">
            <select
              value={cefrMax}
              onChange={(e) => setCefrMax(e.target.value as CefrLevel)}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {CEFR_LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {inverted && (
          <p className="rounded-lg bg-audit-400/10 px-3 py-2 text-xs text-audit-500">
            Nível máximo abaixo do mínimo. O check de qualidade vai reprovar.
          </p>
        )}

        <Field
          label="Corpo (markdown)"
          hint={`${wordCount} de ${minWords} palavras. O mínimo vem das suas configurações.`}
        >
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            placeholder="Texto do material. O check de qualidade exige a contagem de palavras acima."
          />
        </Field>

        {wordCount < minWords && body.trim().length > 0 && (
          <p className="rounded-lg bg-audit-400/10 px-3 py-2 text-xs text-audit-500">
            Faltam {minWords - wordCount} palavras para o check automático aprovar.
          </p>
        )}

        {(type === 'exercise' || type === 'quiz') && (
          <Field label="Gabarito">
            <input
              value={answerKey}
              onChange={(e) => setAnswerKey(e.target.value)}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
              placeholder="1-a, 2-c, 3-b"
            />
          </Field>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Competência principal">
            <select
              value={primarySkill}
              onChange={(e) => setPrimarySkill(e.target.value as SkillCode)}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {SKILLS.map((s) => (
                <option key={s} value={s}>
                  {SKILL_LABELS[s]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Registro">
            <select
              value={register}
              onChange={(e) => setRegister(e.target.value as Register)}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            >
              {REGISTERS.map((r) => (
                <option key={r} value={r}>
                  {REGISTER_LABELS[r]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Competências">
          <div className="flex flex-wrap gap-1.5">
            {SKILLS.map((s) => (
              <button
                key={s}
                onClick={() => toggleSkill(s)}
                className={`rounded-md px-2.5 py-1.5 text-xs transition ${
                  skills.includes(s)
                    ? 'bg-ink-950 text-white'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                }`}
              >
                {SKILL_LABELS[s]}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Temas">
          <div className="flex flex-wrap gap-1.5">
            {CONTENT_THEMES.map((t) => (
              <button
                key={t}
                onClick={() => toggleTheme(t)}
                className={`rounded-md px-2.5 py-1.5 text-xs transition ${
                  themes.includes(t)
                    ? 'bg-brand-600 text-white'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Léxico (separado por vírgula)">
            <input
              value={lexicalTags}
              onChange={(e) => setLexicalTags(e.target.value)}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
              placeholder="comida, restaurante"
            />
          </Field>
          <Field label="Gramática (separado por vírgula)">
            <input
              value={grammarTags}
              onChange={(e) => setGrammarTags(e.target.value)}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
              placeholder="ser vs estar, pretérito"
            />
          </Field>
          <Field label="Tempo estimado (min)">
            <input
              type="number"
              min={1}
              value={estMinutes}
              onChange={(e) => setEstMinutes(Number(e.target.value))}
              className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </Field>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-audit-400/40 bg-audit-400/10 px-3 py-2 text-xs text-audit-500">
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => submit(true)}
          disabled={saving || !title.trim()}
          className="rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800 disabled:opacity-50"
        >
          {saving ? 'Salvando…' : 'Salvar e submeter'}
        </button>
        <button
          onClick={() => submit(false)}
          disabled={saving || !title.trim()}
          className="rounded-lg border border-ink-300 px-4 py-2.5 text-sm text-ink-700 transition hover:bg-ink-50 disabled:opacity-50"
        >
          Salvar rascunho
        </button>
        <button onClick={onCancel} className="text-sm text-ink-500 hover:text-ink-800">
          Cancelar
        </button>
      </div>
    </div>
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
