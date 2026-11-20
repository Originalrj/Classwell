/**
 * Currículo base de PLE (SPEC 10.4). Dados puros: nenhuma I/O aqui.
 *
 * O material da Biblioteca é gerado a partir deste mapa pelo
 * `scripts/seed-biblioteca.ts`. Separar a estrutura do texto permite
 * recalibrar o programa (ordem, carga, foco) sem reescrever aulas.
 */
import type { CefrLevel, SkillCode } from '@/lib/types'

export interface CurriculumModule {
  code: CefrLevel
  title: string
  subtitle: string
  focus: string
  minLessons: number
  maxLessons: number
  topics: CurriculumTopic[]
}

export interface CurriculumTopic {
  /** Slug estavel: identico ao grammarTag do material gerado. */
  key: string
  title: string
  summary: string
  /** Competencias que a aula treina, em ordem de prioridade. */
  skills: SkillCode[]
  primarySkill: SkillCode
  themeTags: string[]
  /** Pontos que a aula NAO pode introduzir (evita sobrecarga). */
  outOfScope: string[]
}

export const CURRICULUM: CurriculumModule[] = [
  {
    code: 'A1',
    title: 'Iniciante / Sobrevivência',
    subtitle: 'Introdução',
    focus:
      'O aluno chega sem saber nada e precisa se comunicar no dia a dia básico.',
    minLessons: 30,
    maxLessons: 40,
    topics: [
      {
        key: 'a1-alfabeto-fonetica',
        title: 'Alfabeto, fonética básica e cumprimentos',
        summary:
          'Ler nomes em voz alta, reconhecer S, X e Ç, e abrir e encerrar uma conversa com naturalidade.',
        skills: ['pronunciation', 'listening', 'speaking'],
        primarySkill: 'pronunciation',
        themeTags: ['social', 'viagem'],
        outOfScope: ['articulação dos R e S finais', 'tempos verbais do passado'],
      },
      {
        key: 'a1-verbos-essenciais',
        title: 'Verbos essenciais no presente: ser, estar, ter, ir',
        summary:
          'Montar frases sobre identidade, estado, posse e deslocamento com quatro verbos que cobrem quase todo o A1.',
        skills: ['grammar', 'speaking', 'writing'],
        primarySkill: 'grammar',
        themeTags: ['social', 'casa', 'trabalho'],
        outOfScope: [
          'ser vs. estar com ideia de localização na mesma frase',
          'pretérito',
        ],
      },
      {
        key: 'a1-numeros-tempo',
        title: 'Números, dias da semana, horas e datas',
        summary:
          'Responder "que horas são", marcar consultas e ler um calendário sem confusão de formato.',
        skills: ['listening', 'speaking', 'vocabulary'],
        primarySkill: 'listening',
        themeTags: ['casa', 'viagem', 'social'],
        outOfScope: ['datas por extenso acima do dia 31'],
      },
      {
        key: 'a1-apresentacao-pessoal',
        title: 'Apresentação pessoal, profissões, nacionalidades e família',
        summary:
          'Falar de si em 30 segundos: nome, origem, ocupação e quem são as pessoas próximas.',
        skills: ['speaking', 'writing', 'vocabulary'],
        primarySkill: 'speaking',
        themeTags: ['social', 'trabalho'],
        outOfScope: ['opiniões com conectivos (guardar para B2)'],
      },
      {
        key: 'a1-sobrevivencia',
        title: 'Vocabulário de sobrevivência: comida, preços e direções',
        summary:
          'Pedir comida, perguntar valores e entender instruções simples de caminho sem travar.',
        skills: ['listening', 'speaking', 'pragmatics'],
        primarySkill: 'pragmatics',
        themeTags: ['viagem', 'casa', 'social'],
        outOfScope: ['subjuntivo em pedidos (guardar para B2)'],
      },
    ],
  },
  {
    code: 'A2',
    title: 'Básico / Elementar',
    subtitle: 'Expansão do Cotidiano',
    focus:
      'Conseguir trocar informações simples e diretas sobre assuntos familiares e rotineiros.',
    minLessons: 35,
    maxLessons: 45,
    topics: [
      {
        key: 'a2-preterito-perfeito',
        title: 'Passado simples (Pretérito Perfeito) e início do Futuro',
        summary: 'Dizer o que aconteceu hoje e planejar com ir + infinitivo.',
        skills: ['grammar', 'speaking', 'listening'],
        primarySkill: 'grammar',
        themeTags: ['social', 'trabalho'],
        outOfScope: [
          'imperfeito (o contraste com o perfeito fica em B1)',
          'subjuntivo',
        ],
      },
      {
        key: 'a2-gerundio',
        title: 'Uso do gerúndio: estou comendo, estou fazendo',
        summary:
          'A estrutura mais produtiva do português falado no Brasil, e um ponto cego de falantes de espanhol.',
        skills: ['grammar', 'speaking', 'writing'],
        primarySkill: 'grammar',
        themeTags: ['trabalho', 'casa', 'social'],
        outOfScope: ['nominalização do gerúndio'],
      },
      {
        key: 'a2-rotina-lugares',
        title: 'Rotina diária e descrição de lugares, casas e bairros',
        summary:
          'Descrever o dia inteiro e o lugar onde mora com coerência e vocabulário de casa.',
        skills: ['speaking', 'writing', 'vocabulary'],
        primarySkill: 'speaking',
        themeTags: ['casa', 'social'],
        outOfScope: ['orações relativas com onde (guardar para B1)'],
      },
      {
        key: 'a2-compras-viagens',
        title: 'Compras, roupas, transporte público e viagens',
        summary:
          'Negociar, escolher tamanho e organizar uma viagem de transporte sem perder o ouvinte.',
        skills: ['listening', 'speaking', 'vocabulary'],
        primarySkill: 'listening',
        themeTags: ['viagem', 'casa'],
        outOfScope: ['subjuntivo em pedidos'],
      },
      {
        key: 'a2-comparacoes',
        title: 'Comparações básicas: mais... que, tão... quanto',
        summary:
          'Comparar pessoas, coisas e lugares com mais/menos e tão...quanto, incluindo a negação.',
        skills: ['grammar', 'speaking', 'writing'],
        primarySkill: 'grammar',
        themeTags: ['social', 'casa'],
        outOfScope: ['superlativos irregulares'],
      },
    ],
  },
  {
    code: 'B1',
    title: 'Intermediário / Independente',
    subtitle: 'Autonomia',
    focus:
      'O aluno já se vira bem, mas precisa lidar com imprevistos, expressar opiniões e contar histórias complexas.',
    minLessons: 40,
    maxLessons: 50,
    topics: [
      {
        key: 'b1-imperfeito-vs-perfeito',
        title: 'Passados compostos e narrativos: Imperfeito vs. Perfeito',
        summary:
          'Descrever o cenário de uma história e marcar o que avançou: a distinção que sustenta qualquer narrativa.',
        skills: ['grammar', 'writing', 'speaking'],
        primarySkill: 'grammar',
        themeTags: ['cultura', 'estudo', 'social'],
        outOfScope: ['pretérito mais-que-perfeito (fica em B2)'],
      },
      {
        key: 'b1-imperativo',
        title: 'Imperativo: ordens, conselhos e instruções',
        summary:
          'Dar ordens, conselhos e instruções (faça, venha, não olhe) e reconhecer o tom de cada uma.',
        skills: ['grammar', 'pragmatics', 'speaking'],
        primarySkill: 'pragmatics',
        themeTags: ['trabalho', 'casa', 'viagem'],
        outOfScope: ['formas de subjuntivo (são de B2)'],
      },
      {
        key: 'b1-pronomes-obliquos',
        title: 'Pronomes oblíquos na fala coloquial brasileira',
        summary:
          'Me, te, o, a e a tendência brasileira de colocar o pronome antes do verbo, com o efeito no tom.',
        skills: ['grammar', 'pragmatics', 'speaking'],
        primarySkill: 'pragmatics',
        themeTags: ['social', 'viagem'],
        outOfScope: ['o "se" pronominal como tema de aula própria'],
      },
      {
        key: 'b1-sentimentos-desejos',
        title: 'Expressar sentimentos, desejos, concordar e discordar',
        summary:
          'Sair do factual para o subjetivo com marcadores de grau, desejo e posição argumentativa.',
        skills: ['speaking', 'pragmatics', 'vocabulary'],
        primarySkill: 'speaking',
        themeTags: ['social', 'cultura'],
        outOfScope: ['subjuntivo para expressar dúvida (fica em B2)'],
      },
      {
        key: 'b1-emergencia',
        title: 'Emergência, consultas médicas e resolução de problemas cotidianos',
        summary:
          'A aula de maior valor de sobrevivência: o que dizer quando algo dá errado.',
        skills: ['listening', 'speaking', 'pragmatics'],
        primarySkill: 'pragmatics',
        themeTags: ['corpo', 'viagem', 'casa'],
        outOfScope: ['vocabulário médico além do registro leigo'],
      },
    ],
  },
  {
    code: 'B2',
    title: 'Intermediário Superior / Fluência Funcional',
    subtitle: 'Fluência Funcional',
    focus:
      'Fluência natural. O aluno interage com nativos com espontaneidade e entende gírias e nuances culturais.',
    minLessons: 45,
    maxLessons: 60,
    topics: [
      {
        key: 'b2-subjuntivo',
        title: 'Modo Subjuntivo: presente e passado para hipóteses e desejos',
        summary:
          'Se eu soubesse, quando você vier, espero que esteja. O tema que o aluno teme e precisa usar.',
        skills: ['grammar', 'speaking', 'writing'],
        primarySkill: 'grammar',
        themeTags: ['trabalho', 'estudo', 'social'],
        outOfScope: ['subjuntivo em registro literário (fica em C1)'],
      },
      {
        key: 'b2-conectivos',
        title: 'Conectivos avançados e coesão textual',
        summary:
          'Embora, portanto, já que, por isso: encadear raciocínio em parágrafos e discursos longos.',
        skills: ['writing', 'grammar', 'reading'],
        primarySkill: 'writing',
        themeTags: ['estudo', 'trabalho', 'cultura'],
        outOfScope: ['conectivos de texto acadêmico formal (ficam em C1)'],
      },
      {
        key: 'b2-giarias-regionalismo',
        title: 'Gírias brasileiras, expressões idiomáticas e variações regionais',
        summary: 'Entender e produzir Nordeste, Sudeste e Sul sem soar caricato.',
        skills: ['listening', 'pragmatics', 'vocabulary'],
        primarySkill: 'pragmatics',
        themeTags: ['cultura', 'social'],
        outOfScope: ['gíria efêmera ou muito obscura'],
      },
      {
        key: 'b2-profissional',
        title: 'Linguagem profissional, entrevistas de emprego e e-mails corporativos',
        summary:
          'O degrau entre falar bem e escrever como se trabalha em uma empresa brasileira.',
        skills: ['writing', 'pragmatics', 'speaking'],
        primarySkill: 'pragmatics',
        themeTags: ['trabalho', 'estudo'],
        outOfScope: ['jargão técnico de uma área específica'],
      },
      {
        key: 'b2-temas-complexos',
        title: 'Discussão de temas complexos: notícias, política e cultura brasileira',
        summary:
          'Sustentar posição em temas de atualidade com estrutura argumentativa e vocabulário de mídia.',
        skills: ['listening', 'reading', 'speaking'],
        primarySkill: 'reading',
        themeTags: ['cultura', 'estudo'],
        outOfScope: ['jargão técnico de áreas específicas, como medicina e direito'],
      },
    ],
  },
  {
    code: 'C1',
    title: 'Avançado / Domínio Operacional Eficaz',
    subtitle: 'Precisão e Sofisticação',
    focus: 'Precisão, elegância e uso sofisticado da língua.',
    minLessons: 50,
    maxLessons: 60,
    topics: [
      {
        key: 'c1-regencia-sintaxe',
        title: 'Estruturas sintáticas complexas e regência verbal e nominal',
        summary:
          'Assumir o sujeito oracional, controlar a regência e reordenar sintagmas sem perder naturalidade.',
        skills: ['grammar', 'writing', 'reading'],
        primarySkill: 'grammar',
        themeTags: ['estudo', 'trabalho', 'cultura'],
        outOfScope: ['linguística histórica'],
      },
      {
        key: 'c1-tom',
        title: 'Nuances de tom: formal, informal, irônico, persuasivo',
        summary:
          'Ajustar o registro ao interlocutor e ao efeito pretendido, a competência que separa C1 de B2.',
        skills: ['pragmatics', 'writing', 'speaking'],
        primarySkill: 'pragmatics',
        themeTags: ['trabalho', 'cultura', 'social'],
        outOfScope: ['variantes dialetais fora do português brasileiro'],
      },
      {
        key: 'c1-literatura',
        title: 'Literatura brasileira, crônicas, jornais e jargões',
        summary:
          'Ler e comentar texto de alta circulação com vocabulário erudito e referência cultural.',
        skills: ['reading', 'vocabulary', 'speaking'],
        primarySkill: 'reading',
        themeTags: ['cultura', 'estudo'],
        outOfScope: ['português anterior a 1900'],
      },
      {
        key: 'c1-textos-academicos',
        title: 'Produção de textos acadêmicos ou profissionais de alto nível',
        summary:
          'Redigir resumo, artigo e relatório com impessoalidade, coesão e precisão terminológica.',
        skills: ['writing', 'vocabulary', 'grammar'],
        primarySkill: 'writing',
        themeTags: ['estudo', 'trabalho'],
        outOfScope: ['metodologia específica de uma área'],
      },
    ],
  },
]

/** Todas as aulas do programa, na ordem de progressao. */
export function allTopics(): { module: CurriculumModule; topic: CurriculumTopic }[] {
  return CURRICULUM.flatMap((module) =>
    module.topics.map((topic) => ({ module, topic })),
  )
}

export function moduleByCode(code: CefrLevel): CurriculumModule | undefined {
  return CURRICULUM.find((m) => m.code === code)
}

/**
 * O que vem logo depois de `key` no mapa inteiro. O seed usa isso para
 * fechar o corpo do material com um ponteiro para a próxima aula.
 */
export function nextTopics(key: string): CurriculumTopic[] {
  const flat = allTopics()
  const index = flat.findIndex((t) => t.topic.key === key)
  if (index < 0) return []
  return flat.slice(index + 1, index + 3).map((t) => t.topic)
}

export function totalLessonRange(): { min: number; max: number } {
  return CURRICULUM.reduce(
    (acc, m) => ({ min: acc.min + m.minLessons, max: acc.max + m.maxLessons }),
    { min: 0, max: 0 },
  )
}