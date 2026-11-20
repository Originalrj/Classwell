'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Gamepad2,
  Globe2,
  GraduationCap,
  Headphones,
  Music2,
  Play,
  Sparkles,
  Target,
  UtensilsCrossed,
  UserPlus,
  Volume2,
} from 'lucide-react'

type Level = 'A0' | 'A1' | 'A2' | 'B1'

type Phrase = {
  pt: string
  en: string
  say: string
  note: string
}

const LEVELS: Level[] = ['A0', 'A1', 'A2', 'B1']

const PHRASES: Record<Level, Phrase[]> = {
  A0: [
    {
      pt: 'Oi, eu sou a Ana.',
      en: 'Hi, I am Ana.',
      say: 'Oi, iu sou a Â-na.',
      note: 'O “sou” tem vogal fechada: é “sô”, não “sou” aberto.',
    },
    {
      pt: 'Como você se chama?',
      en: 'What is your name?',
      say: 'KO-mu vo-SE se SHÃ-ma?',
      note: 'O “lh” soa como “li” rápido: “sha-ma”, não “chama”.',
    },
    {
      pt: 'Eu moro no Rio.',
      en: 'I live in Rio.',
      say: 'Iu MO-ru nu Riu.',
      note: '“Rio” tem duas sílabas: Ri-u, sem ditongo.',
    },
  ],
  A1: [
    {
      pt: 'Eu gostaria de um café, por favor.',
      en: 'I would like a coffee, please.',
      say: 'Iu gos-TA-ri-a d um ka-FE, pu fa-VOR.',
      note: '“por” soa como “pur”; o “r” final é bem fraco.',
    },
    {
      pt: 'Onde fica a estação?',
      en: 'Where is the station?',
      say: 'ON-di FI-ka a es-ta-SÃU?',
      note: '“ão” é nasal: o ar sai pelo nariz, como um “au” nasalizado.',
    },
    {
      pt: 'Trabalho com design.',
      en: 'I work in design.',
      say: 'Tra-BA-lu ku di-ZAIN.',
      note: 'O “lh” de “trabalho” não existe no inglês: é um “li” suave.',
    },
  ],
  A2: [
    {
      pt: 'Se eu tivesse tempo, viajaria mais.',
      en: 'If I had time, I would travel more.',
      say: 'Si eu ti-VES-si TEM-pu, vi-a-ZHRI-a mais.',
      note: 'O “j” em “viajaria” soa como o “s” de “measure”.',
    },
    {
      pt: 'Já comi feijoada uma vez.',
      en: 'I have already eaten feijoada once.',
      say: 'ZHA ko-MI fei-zhO-a-da U-ma vez.',
      note: '“Já” com J como “zh”; “feijoada” tem o “j” também suave.',
    },
    {
      pt: 'Prefiro que a gente combine amanhã.',
      en: 'I prefer that we arrange it tomorrow.',
      say: 'Pre-FI-ru ki a ZHEN-ti kom-BI-ni a-ma-NÃ.',
      note: '“amanhã” termina em “ã” nasal — não é “amania”.',
    },
  ],
  B1: [
    {
      pt: 'Embora esteja cansado, vou terminar o relatório.',
      en: 'Although I am tired, I will finish the report.',
      say: 'Em-BO-ra is-TE-ja kan-SA-du, vou ter-mi-NAR u re-la-TÓ-riu.',
      note: 'O “o” de “relatório” é fechado; a palavra termina em “iu”.',
    },
    {
      pt: 'Se tivesse sabido, teria avisado antes.',
      en: 'If I had known, I would have warned you earlier.',
      say: 'Si ti-VES-si sa-BI-du, te-RI-a a-vi-ZA-du AN-tis.',
      note: '“avisado” tem o “s” entre vogais com som de “z”.',
    },
    {
      pt: 'O que mais me chamou atenção foi a música.',
      en: 'What caught my attention most was the music.',
      say: 'U ki MAIS mi sha-MOU a-ten-SÃU foi a MU-zi-ka.',
      note: '“música” tem acento na primeira sílaba: MU-zi-ka.',
    },
  ],
}

const L1_TIPS: Record<
  string,
  { label: string; flag: string; focus: string; tip: string }
> = {
  en: {
    label: 'Inglês',
    flag: '🇬🇧',
    focus: 'r · vogais · nh/lh',
    tip: 'O “r” no início é fraco, quase um “h”. Não use o /ɹ/ inglês, e cuidado para não ditongar as vogais fechadas.',
  },
  es: {
    label: 'Espanhol',
    flag: '🇪🇸',
    focus: 's final · ão · ll',
    tip: 'O “s” antes de vogal soa como “z”. O “ão” é nasal e o “lh” não é o “ll” espanhol: é um “li” rápido.',
  },
  fr: {
    label: 'Francês',
    flag: '🇫🇷',
    focus: 'vogais · r · lh',
    tip: 'As vogais são mais fechadas e o “r” é mais fraco que o /ʁ/ francês. Marque bem o “lh” e as finais em “ão”.',
  },
  de: {
    label: 'Alemão',
    flag: '🇩🇪',
    focus: 'u · ch · ê',
    tip: 'Evite o “ch” alemão: em “muito” as vogais ficam soltas. O “r” final é bem mais fraco que o alemão.',
  },
  ja: {
    label: 'Japonês',
    flag: '🇯🇵',
    focus: 'ã · õ · ritmo',
    tip: 'Vogais nasais (ã, õ) não existem no japonês: deixe o ar sair pelo nariz e marque o acento da última sílaba.',
  },
}

const LESSON = [
  {
    time: '00–05',
    title: 'Acolhida e checagem',
    body: 'Como foi a semana? Revisão rápida do que ficou da última aula e confirmação do objetivo da sessão.',
    tag: 'Relação',
  },
  {
    time: '05–15',
    title: 'Aquecimento com a frase',
    body: 'Cartão PT → EN → como se fala. O aluno ouve, repete e grava a própria voz para comparar.',
    tag: 'Pronúncia',
  },
  {
    time: '15–30',
    title: 'Núcleo do nível',
    body: 'Uma micro-habilidade da rampa por aula: uma função comunicativa, quatro exemplos e uma regra curta.',
    tag: 'Gramática',
  },
  {
    time: '30–42',
    title: 'Jogo de prática',
    body: 'Escolha a tradução, complete a lacuna ou monte a frase em ordem. Erro vira dica, não punição.',
    tag: 'Prática',
  },
  {
    time: '42–48',
    title: 'Música e interesses',
    body: 'Trecho de música, receita ou tema de cultura conectado ao objetivo que o aluno declarou no cadastro.',
    tag: 'Engajamento',
  },
  {
    time: '48–50',
    title: 'Fechamento e tarefa',
    body: 'O que ficou, o que volta na revisão espaçada e uma microtarefa para a semana.',
    tag: 'Progresso',
  },
]

const INTERESTS = [
  { icon: Music2, label: 'Música', desc: 'Versos de MPB e pop em português, com glossário e canto alongado.', color: 'bg-violet-50 text-violet-600' },
  { icon: UtensilsCrossed, label: 'Comida', desc: 'Receitas curtas, cardápios e diálogos de mercado como material de A1/A2.', color: 'bg-amber-50 text-amber-600' },
  { icon: Globe2, label: 'Cultura', desc: 'Notícias leves, feriados e costumes para treinar registro e pragmática.', color: 'bg-sky-50 text-sky-600' },
  { icon: Headphones, label: 'Viagem', desc: 'Situações reais: aeroporto, hotel, direções e improviso oral.', color: 'bg-brand-50 text-brand-600' },
]

const SKILLS = ['Ouvir', 'Falar', 'Ler', 'Escrever', 'Gramática', 'Léxico', 'Pronúncia', 'Registro']
const SKILL_VALUES = [2, 1, 3, 2, 2, 3, 1, 2]
const SKILL_LABELS = ['A1', 'A2', 'B1', 'B2', 'C1']

function radarPoints(values: number[], radius: number, cx = 160, cy = 160) {
  return values
    .map((value, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / values.length
      const r = (radius * value) / 4
      return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`
    })
    .join(' ')
}

function axisPoint(i: number, radius: number, cx = 160, cy = 160) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / SKILLS.length
  return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius }
}

export default function PrototipoPage() {
  const [level, setLevel] = useState<Level>('A1')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [l1, setL1] = useState('en')
  const [lessonStep, setLessonStep] = useState(1)
  const [quizChoice, setQuizChoice] = useState<number | null>(null)

  const phrases = PHRASES[level]
  const phrase = phrases[phraseIndex % phrases.length]
  const tip = L1_TIPS[l1]
  const quizCorrect = quizChoice === 0

  useEffect(() => {
    setPhraseIndex(0)
  }, [level])

  const gridPolygons = useMemo(() => [1, 2, 3, 4].map((n) => radarPoints(Array(8).fill(n), 112)), [])

  function speak() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const utterance = new SpeechSynthesisUtterance(phrase.pt)
    utterance.lang = 'pt-BR'
    utterance.rate = 0.92
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <main className="min-h-screen bg-ink-50">
      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-ink-200/70 bg-ink-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              r
            </span>
            <span className="text-lg font-semibold tracking-tight text-ink-950">rampa</span>
            <span className="rounded-full bg-ink-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-600">
              protótipo
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-ink-600 md:flex">
            <a className="transition hover:text-ink-950" href="#cartao">Cartão</a>
            <a className="transition hover:text-ink-950" href="#aula">Aula de 50 min</a>
            <a className="transition hover:text-ink-950" href="#jogos">Jogos</a>
            <a className="transition hover:text-ink-950" href="#progresso">Progresso</a>
          </nav>
          <Link
            href="/entrar"
            className="rounded-lg bg-ink-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-ink-800"
          >
            Abrir app real
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-14 text-white sm:px-14">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-brand-400/10 blur-2xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-200">
              <Sparkles size={13} /> Prévia do produto em construção
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Português que faz sentido <span className="text-brand-300">na vida do aluno.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
              Uma rampa de A0 a C1 com frases traduzidas, pronúncia explicada conforme o idioma
              materno, aulas de 50 minutos, jogos, música e progresso visível para professor e aluno.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cartao"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
              >
                Explorar o protótipo <ArrowRight size={16} />
              </a>
              <a
                href="#aula"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Ver a aula de 50 min <ChevronRight size={16} />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-xs text-ink-400">
              <span><strong className="text-white">A0 → C1</strong> por competência</span>
              <span><strong className="text-white">PT · EN · “como se fala”</strong></span>
              <span><strong className="text-white">50 min</strong> por aula</span>
              <span><strong className="text-white">5 L1s</strong> com dicas específicas</span>
            </div>
          </div>
        </div>
      </section>

      {/* CARTÃO DE FRASE */}
      <Section id="cartao" step="01" title="Cartão de frase" subtitle="Português, tradução e pronúncia com atenção ao idioma materno.">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-1.5 rounded-lg bg-ink-100 p-1">
                {LEVELS.map((item) => (
                  <button
                    key={item}
                    onClick={() => setLevel(item)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                      level === item ? 'bg-white text-ink-950 shadow-sm' : 'text-ink-500 hover:text-ink-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <span className="text-xs text-ink-400">Frase {phraseIndex % phrases.length + 1} de {phrases.length}</span>
            </div>

            <div className="mt-8 min-h-56">
              <p className="text-xs font-medium uppercase tracking-widest text-brand-600">Em português</p>
              <p className="mt-3 text-3xl font-semibold leading-snug tracking-tight text-ink-950 sm:text-4xl">
                {phrase.pt}
              </p>
              <p className="mt-6 text-xs font-medium uppercase tracking-widest text-ink-400">In English</p>
              <p className="mt-2 text-lg text-ink-600">{phrase.en}</p>
              <div className="mt-6 rounded-xl bg-brand-50 p-4">
                <p className="text-xs font-medium uppercase tracking-widest text-brand-700">Como se fala</p>
                <p className="mt-1 font-mono text-base text-brand-900">{phrase.say}</p>
                <p className="mt-2 text-sm text-brand-800/80">{phrase.note}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={speak}
                className="inline-flex items-center gap-2 rounded-lg bg-ink-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
              >
                <Volume2 size={16} /> Ouvir em pt-BR
              </button>
              <button
                onClick={() => setPhraseIndex((i) => i + 1)}
                className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-800 transition hover:border-ink-300"
              >
                <Play size={15} /> Próxima frase
              </button>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-ink-400">
                <Check size={14} className="text-brand-500" /> Áudio com voz nativa do navegador
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Globe2 size={17} className="text-brand-600" />
                <h3 className="text-sm font-semibold text-ink-950">Dica por idioma materno</h3>
              </div>
              <p className="mt-2 text-xs text-ink-500">
                A mesma frase, um aviso diferente — porque o desafio de quem vem do inglês não é o de quem vem do japonês.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {Object.entries(L1_TIPS).map(([code, item]) => (
                  <button
                    key={code}
                    onClick={() => setL1(code)}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                      l1 === code
                        ? 'border-brand-400 bg-brand-50 text-brand-900'
                        : 'border-ink-200 text-ink-600 hover:border-ink-300'
                    }`}
                  >
                    <span className="mr-1.5">{item.flag}</span>
                    {item.label}
                  </button>
                ))}
              </div>
              <div key={l1} className="animate-fade-up mt-4 rounded-xl bg-ink-50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-ink-900">{tip.flag} {tip.label}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink-500">
                    foco: {tip.focus}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{tip.tip}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-ink-300 bg-white/60 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-ink-800">
                <BookOpen size={16} className="text-brand-600" /> Próximos passos deste cartão
              </div>
              <ul className="mt-3 space-y-2 text-sm text-ink-500">
                <li className="flex gap-2"><Check size={15} className="mt-0.5 text-brand-500" /> Gravação do aluno comparada ao áudio modelo</li>
                <li className="flex gap-2"><Check size={15} className="mt-0.5 text-brand-500" /> Exercício de completar a frase</li>
                <li className="flex gap-2"><Check size={15} className="mt-0.5 text-brand-500" /> Revisão espaçada em 1 / 3 / 7 dias</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* AULA DE 50 MIN */}
      <Section id="aula" step="02" title="Uma aula de 50 minutos" subtitle="Ritmo planejado, com prática, jogo e fechamento — não só conteúdo solto.">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-ink-700">
              <Clock3 size={16} className="text-brand-600" /> Clique em um bloco para ver o detalhe
            </div>
            <div className="space-y-2">
              {LESSON.map((item, i) => (
                <button
                  key={item.time}
                  onClick={() => setLessonStep(i)}
                  className={`flex w-full items-center gap-4 rounded-xl border p-3.5 text-left transition ${
                    lessonStep === i
                      ? 'border-brand-400 bg-brand-50'
                      : 'border-ink-100 hover:border-ink-200 hover:bg-ink-50'
                  }`}
                >
                  <span className={`w-14 shrink-0 font-mono text-xs font-semibold ${lessonStep === i ? 'text-brand-700' : 'text-ink-400'}`}>
                    {item.time}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink-900">{item.title}</span>
                    <span className="mt-0.5 block text-xs text-ink-500">{item.tag}</span>
                  </span>
                  <ChevronRight size={16} className={lessonStep === i ? 'text-brand-600' : 'text-ink-300'} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-ink-950 p-7 text-white sm:p-9">
            <div>
              <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-brand-200">
                {LESSON[lessonStep].time} · {LESSON[lessonStep].tag}
              </span>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight">{LESSON[lessonStep].title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300 lg:text-base">
                {LESSON[lessonStep].body}
              </p>
            </div>
            <div className="mt-10">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-400 transition-all duration-300"
                  style={{ width: `${((lessonStep + 1) / LESSON.length) * 100}%` }}
                />
              </div>
              <div className="mt-3 flex justify-between text-xs text-ink-400">
                <span>Início</span>
                <span>{LESSON.length} blocos · 50 minutos</span>
                <span>Fim</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* JOGOS E INTERESSES */}
      <Section id="jogos" step="03" title="Jogos e interesses" subtitle="Prática leve e temas que importam para quem está aprendendo.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2">
              <Gamepad2 size={18} className="text-brand-600" />
              <h3 className="text-sm font-semibold text-ink-950">Mini-jogo · escolha a tradução</h3>
            </div>
            <p className="mt-6 text-center text-2xl font-semibold text-ink-950">
              “Eu gostaria de um café, por favor.”
            </p>
            <div className="mt-6 space-y-2">
              {[
                'I would like a coffee, please.',
                'I like coffee much.',
                'I want a coffee now.',
              ].map((option, i) => (
                <button
                  key={option}
                  onClick={() => setQuizChoice(i)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                    quizChoice === i
                      ? i === 0
                        ? 'border-brand-400 bg-brand-50 text-brand-900'
                        : 'border-red-300 bg-red-50 text-red-800'
                      : 'border-ink-200 text-ink-700 hover:border-ink-300'
                  }`}
                >
                  {option}
                  {quizChoice === i && (i === 0 ? <Check size={16} /> : <span className="text-xs">tente de novo</span>)}
                </button>
              ))}
            </div>
            {quizChoice !== null && (
              <p key={quizChoice} className={`animate-fade-up mt-4 text-sm ${quizCorrect ? 'text-brand-700' : 'text-ink-600'}`}>
                {quizCorrect
                  ? 'Isso! “Gostaria de” é a forma educada — mais natural que “quero”.'
                  : 'Quase: “gostaria de” soa como “would like”. Tente a primeira opção.'}
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {INTERESTS.map((item) => (
              <div key={item.label} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon size={19} />
                </span>
                <h4 className="mt-4 text-sm font-semibold text-ink-950">{item.label}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROGRESSO */}
      <Section id="progresso" step="04" title="Progresso individual" subtitle="Oito competências, não uma nota só — e o professor vê o mesmo que o aluno.">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-ink-950">Ana Silva</h3>
                <p className="mt-1 text-sm text-ink-500">Meta: A2 · 3 h/semana · aulas de 50 min</p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">Nível atual: A2</span>
            </div>

            <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">
              <svg viewBox="0 0 320 320" className="h-64 w-64 shrink-0" role="img" aria-label="Radar de competências da Ana">
                {gridPolygons.map((points, i) => (
                  <polygon key={i} points={points} fill="none" stroke="#e6e9ef" strokeWidth="1" />
                ))}
                {SKILLS.map((_, i) => {
                  const p = axisPoint(i, 112)
                  return <line key={i} x1="160" y1="160" x2={p.x} y2={p.y} stroke="#e6e9ef" strokeWidth="1" />
                })}
                <polygon
                  points={radarPoints(SKILL_VALUES, 112)}
                  fill="rgba(31,167,138,0.18)"
                  stroke="#1fa78a"
                  strokeWidth="2"
                />
                {SKILL_VALUES.map((value, i) => {
                  const p = axisPoint(i, (112 * value) / 4)
                  return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#128571" />
                })}
              </svg>
              <div className="w-full space-y-2">
                {SKILLS.map((skill, i) => (
                  <div key={skill} className="flex items-center gap-3 text-sm">
                    <span className="w-24 text-ink-600">{skill}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-brand-500" style={{ width: `${SKILL_VALUES[i] * 25}%` }} />
                    </div>
                    <span className="w-7 text-right font-mono text-xs text-ink-500">{SKILL_LABELS[SKILL_VALUES[i] - 1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Target size={17} className="text-brand-600" />
                <h3 className="text-sm font-semibold text-ink-950">Próximos gargalos</h3>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ['Fala', 'A1 → A2', 'crítico'],
                  ['Pronúncia', 'A1 → A2', 'importante'],
                ].map(([skill, jump, levelName]) => (
                  <div key={skill} className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2.5">
                    <span className="text-sm font-medium text-ink-800">{skill}</span>
                    <span className="font-mono text-xs text-ink-500">{jump}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${levelName === 'crítico' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>
                      {levelName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <GraduationCap size={17} className="text-brand-600" />
                <h3 className="text-sm font-semibold text-ink-950">Cadastro do aluno</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Idioma materno, interesses, objetivo, nível-alvo e horas por semana entram no cadastro e mudam
                o conteúdo da rampa — inclusive a dica de pronúncia do cartão acima.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Inglês', 'Música', 'A2 em 4 meses', '3 h/semana'].map((chip) => (
                  <span key={chip} className="rounded-full border border-ink-200 px-2.5 py-1 text-xs text-ink-600">{chip}</span>
                ))}
              </div>
              <Link href="/professor/alunos/novo" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800">
                <UserPlus size={15} /> Ver cadastro real <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink-200 bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-ink-950">Esta é uma prévia visual.</p>
            <p className="mt-1 text-sm text-ink-500">
              Os dados são de exemplo. O fluxo real de login, cadastro e progresso já está no app.
            </p>
          </div>
          <Link
            href="/entrar"
            className="inline-flex items-center gap-2 rounded-lg bg-ink-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
          >
            Entrar no app <ArrowRight size={15} />
          </Link>
        </div>
      </footer>
    </main>
  )
}

function Section({
  id,
  step,
  title,
  subtitle,
  children,
}: {
  id: string
  step: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
      <div className="mb-7 flex items-start gap-4">
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 font-mono text-xs font-semibold text-brand-700">
          {step}
        </span>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">{title}</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-500 sm:text-base">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
