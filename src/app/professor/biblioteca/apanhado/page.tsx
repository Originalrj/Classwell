'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { CONTENT_THEMES } from '@/lib/types'
import { KNOWLEDGE_BANK } from '@/lib/domain/knowledge-bank'
import {
  CONTENT_DRAFT_KEY,
  KNOWLEDGE_KINDS,
  KNOWLEDGE_KIND_LABELS,
  KNOWLEDGE_LEVELS,
  KNOWLEDGE_LEVEL_LABELS,
  KNOWLEDGE_TYPE_LABELS,
  KNOWLEDGE_TYPES,
  L1_CODES,
  L1_LABELS,
  contentDraftFromEntry,
  knowledgeCounts,
  searchKnowledge,
  type KnowledgeEntry,
  type KnowledgeKind,
  type KnowledgeLevel,
  type KnowledgeType,
  type L1Code,
} from '@/lib/domain/knowledge'

const counts = knowledgeCounts(KNOWLEDGE_BANK)

export default function ApanhadoPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<KnowledgeLevel | 'all'>('all')
  const [type, setType] = useState<KnowledgeType | 'all'>('all')
  const [kind, setKind] = useState<KnowledgeKind | 'all'>('all')
  const [l1, setL1] = useState<L1Code | 'all'>('all')
  const [theme, setTheme] = useState<string | 'all'>('all')

  const hits = useMemo(
    () =>
      searchKnowledge(KNOWLEDGE_BANK, {
        query,
        level,
        type,
        kind,
        l1,
        theme,
      }),
    [query, level, type, kind, l1, theme],
  )

  const hasFilters =
    query.trim() !== '' ||
    level !== 'all' ||
    type !== 'all' ||
    kind !== 'all' ||
    l1 !== 'all' ||
    theme !== 'all'

  function clear() {
    setQuery('')
    setLevel('all')
    setType('all')
    setKind('all')
    setL1('all')
    setTheme('all')
  }

  function useAsMaterial(entry: KnowledgeEntry) {
    sessionStorage.setItem(CONTENT_DRAFT_KEY, JSON.stringify(contentDraftFromEntry(entry)))
    router.push('/professor/biblioteca')
  }

  return (
    <div className="animate-fade-up space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/professor/biblioteca"
            className="text-xs text-ink-500 underline-offset-2 hover:text-ink-900 hover:underline"
          >
            ← Biblioteca
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink-950">
            Apanhado de conhecimento
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-600">
            {KNOWLEDGE_BANK.length} entradas organizadas por nível, tipo de conhecimento e pergunta
            comum. Cada cartão traz português, ponte em inglês, “como se fala” e dicas por idioma
            materno. Use a busca para achar a resposta antes da aula.
          </p>
        </div>
        <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-xs text-brand-700">
          <span className="text-lg font-semibold">{KNOWLEDGE_BANK.length}</span> informações ·{' '}
          <span className="font-semibold">{counts.kinds.question ?? 0}</span> perguntas comuns
        </div>
      </header>

      <section aria-label="Busca no apanhado" className="rounded-xl border border-ink-200 bg-white p-4">
        <div className="relative">
          <span aria-hidden className="absolute left-3 top-2.5 text-ink-400">
            ⌕
          </span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por pergunta, frase, tema ou tag — ex.: ser e estar, saudade, s final"
            aria-label="Buscar no apanhado de conhecimento"
            className="w-full rounded-lg border border-ink-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div className="mt-4 space-y-3">
          <FilterChips
            label="Nível"
            value={level}
            onChange={(v) => setLevel(v as KnowledgeLevel | 'all')}
            options={[
              { value: 'all', label: 'Todos', count: counts.levels.all },
              ...KNOWLEDGE_LEVELS.map((l) => ({
                value: l,
                label: l,
                count: counts.levels[l] ?? 0,
              })),
            ]}
          />
          <FilterChips
            label="Tipo de conhecimento"
            value={type}
            onChange={(v) => setType(v as KnowledgeType | 'all')}
            options={[
              { value: 'all', label: 'Todos', count: counts.types.all },
              ...KNOWLEDGE_TYPES.map((t) => ({
                value: t,
                label: KNOWLEDGE_TYPE_LABELS[t],
                count: counts.types[t] ?? 0,
              })),
            ]}
          />
          <FilterChips
            label="Formato"
            value={kind}
            onChange={(v) => setKind(v as KnowledgeKind | 'all')}
            options={[
              { value: 'all', label: 'Todos', count: counts.kinds.all },
              ...KNOWLEDGE_KINDS.map((k) => ({
                value: k,
                label: KNOWLEDGE_KIND_LABELS[k],
                count: counts.kinds[k] ?? 0,
              })),
            ]}
          />
          <div className="flex flex-wrap items-end gap-3">
            <label className="min-w-[170px] flex-1">
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-ink-400">
                Idioma materno (L1)
              </span>
              <select
                value={l1}
                onChange={(e) => setL1(e.target.value as L1Code | 'all')}
                className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
              >
                <option value="all">Todos os idiomas</option>
                {L1_CODES.map((code) => (
                  <option key={code} value={code}>
                    {L1_LABELS[code]}
                  </option>
                ))}
              </select>
            </label>
            <label className="min-w-[170px] flex-1">
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-ink-400">
                Tema
              </span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
              >
                <option value="all">Todos os temas</option>
                {CONTENT_THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            {hasFilters && (
              <button
                onClick={clear}
                className="rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-600 transition hover:bg-ink-50"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-ink-500" aria-live="polite">
          <span className="font-semibold text-ink-800">{hits.length}</span>{' '}
          {hits.length === 1 ? 'informação encontrada' : 'informações encontradas'}
        </p>
        {kind === 'all' && (
          <button
            onClick={() => setKind('question')}
            className="text-xs text-brand-700 underline-offset-2 hover:underline"
          >
            Ver só perguntas comuns
          </button>
        )}
      </div>

      {hits.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-300 bg-white p-10 text-center">
          <p className="text-sm text-ink-600">Nada encontrado com esses filtros.</p>
          <button onClick={clear} className="mt-3 text-sm text-brand-700 underline">
            Limpar busca
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {hits.map(({ entry }) => (
            <li key={entry.id}>
              <KnowledgeCard
                entry={entry}
                l1Filter={l1}
                onUse={() => useAsMaterial(entry)}
              />
            </li>
          ))}
        </ul>
      )}

      <p className="pb-4 text-xs leading-relaxed text-ink-400">
        Dicas de pronúncia aproximada e notas de L1 são hipóteses pedagógicas revisáveis. A versão em
        inglês é ponte de compreensão, não tradução literal obrigatória.
      </p>
    </div>
  )
}

function FilterChips({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: string; label: string; count?: number }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 w-36 shrink-0 text-[11px] font-medium uppercase tracking-wider text-ink-400">
        {label}
      </span>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-2.5 py-1 text-xs transition ${
              active
                ? 'border-ink-950 bg-ink-950 text-white'
                : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900'
            }`}
          >
            {option.label}
            {option.count !== undefined && (
              <span className={active ? 'ml-1 text-white/60' : 'ml-1 text-ink-400'}>
                {option.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function KnowledgeCard({
  entry,
  l1Filter,
  onUse,
}: {
  entry: KnowledgeEntry
  l1Filter: L1Code | 'all'
  onUse: () => void
}) {
  const allHints = Object.entries(entry.l1Hints) as [L1Code, string][]
  const visibleHints =
    l1Filter === 'all' ? allHints.slice(0, 2) : allHints.filter(([code]) => code === l1Filter)

  return (
    <article className="rounded-xl border border-ink-200 bg-white p-5 shadow-sm transition hover:border-brand-300">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded bg-ink-950 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {entry.level}
        </span>
        <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">
          {KNOWLEDGE_TYPE_LABELS[entry.type]}
        </span>
        <span className="rounded bg-ink-100 px-2 py-0.5 text-[10px] text-ink-600">
          {KNOWLEDGE_KIND_LABELS[entry.kind]}
        </span>
        {entry.reviewed && (
          <span className="ml-auto text-[10px] text-ink-400" title="Revisado">
            ✓ revisado
          </span>
        )}
      </div>

      <h2 className="mt-3 text-sm font-semibold text-ink-900">{entry.question}</h2>

      <div className="mt-3 rounded-lg border-l-2 border-brand-400 bg-brand-50/40 py-2.5 pl-3.5 pr-3">
        <p className="text-base font-medium leading-relaxed text-ink-950">{entry.pt}</p>
        <p className="mt-1 text-sm italic leading-relaxed text-ink-600">{entry.en}</p>
        <p className="mt-2 text-xs text-ink-500">
          <span className="font-medium text-ink-700">Como se fala:</span> {entry.spoken}
        </p>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-700">{entry.answer}</p>

      {visibleHints.length > 0 && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {visibleHints.map(([code, text]) => (
            <div key={code} className="rounded-lg bg-ink-50 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                {L1_LABELS[code]}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-600">{text}</p>
            </div>
          ))}
        </div>
      )}

      {allHints.length > visibleHints.length && (
        <details className="mt-2 text-xs text-ink-500">
          <summary className="cursor-pointer underline-offset-2 hover:underline">
            Ver todas as dicas de L1 ({allHints.length})
          </summary>
          <ul className="mt-2 space-y-1.5">
            {allHints.map(([code, text]) => (
              <li key={code}>
                <span className="font-medium text-ink-700">{L1_LABELS[code]}:</span> {text}
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-ink-100 pt-3">
        {[...new Set([...entry.grammarTags, ...entry.lexicalTags])].slice(0, 6).map((tag) => (
          <span key={tag} className="rounded bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-600">
            {tag}
          </span>
        ))}
        <span className="ml-auto text-[10px] text-ink-400">
          {KNOWLEDGE_LEVEL_LABELS[entry.level]}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={onUse}
          className="rounded-lg bg-ink-950 px-3 py-2 text-xs font-medium text-white transition hover:bg-ink-800"
        >
          Criar material na biblioteca →
        </button>
        <span className="text-[11px] text-ink-400">
          id: <code>{entry.id}</code>
        </span>
      </div>
    </article>
  )
}
