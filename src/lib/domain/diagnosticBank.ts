// Banco de itens do diagnóstico. Fonte de verdade em TypeScript: o emulador
// e o build nao dependem do Firestore para o professor conseguir avaliar.
//
// 40 itens = 8 skills x 5. A ordem dentro de cada skill vai do mais facil ao
// mais dificil; o professor pode pular qualquer item (fica `unknown` e conta
// como `not_assessed`, o que reduz a confianca mas nunca quebra o calculo).
import type { CefrLevel, DiagnosticItem, SkillCode } from '@/lib/types'

type Pillar = NonNullable<DiagnosticItem['pillar']>

function item(
  id: string,
  skill: SkillCode,
  prompt: string,
  descriptors: Partial<Record<CefrLevel, string>>,
  pillar: Pillar,
  tags: string[],
): DiagnosticItem {
  return { id, skill, prompt, descriptors, tags, pillar, order: 0, active: true }
}

const LISTENING: DiagnosticItem[] = [
  item(
    'li-01',
    'listening',
    'Entende uma frase curta com nome e número ("A Maria tem trinta anos")?',
    {
      A1: 'ouve numeros e nomes isolados',
      A2: 'entende a frase inteira',
      B1: 'entende sem pedir para repetir',
    },
    'canDo',
    ['numeros', 'identificacao'],
  ),
  item(
    'li-02',
    'listening',
    'Segue instrucoes simples de um audio: "pegue a chave e saia".',
    {
      A1: 'ouve a primeira instrucao',
      A2: 'segue duas acoes em sequencia',
      B1: 'segue tres acoes',
    },
    'canDo',
    ['instrucoes'],
  ),
  item(
    'li-03',
    'listening',
    'Compreende uma conversa lenta entre duas pessoas sobre rotina diaria.',
    {
      A2: 'entende o tema geral',
      B1: 'entende horarios e planos',
      B2: 'entende cada detalhe',
    },
    'canDo',
    ['rotina', 'conversa'],
  ),
  item(
    'li-04',
    'listening',
    'Apreende o argumento principal de um audio de radio ou podcast simples.',
    {
      B1: 'entende a ideia principal',
      B2: 'entende exemplos e ressalvas',
    },
    'canDo',
    ['midia', 'argumento'],
  ),
  item(
    'li-05',
    'listening',
    'Segue um debate em que as pessoas discordam, sem se perder.',
    {
      B2: 'segue a linha de cada participante',
      C1: 'percebe o que ficou implicito',
    },
    'canDo',
    ['debate', 'inferencia'],
  ),
]

const SPEAKING: DiagnosticItem[] = [
  item(
    'sp-01',
    'speaking',
    'Diz nome, idade e de onde e, com frases prontas.',
    {
      A1: 'frases soltas com apoio',
      A2: 'se apresenta sozinho',
    },
    'canDo',
    ['autoapresentacao'],
  ),
  item(
    'sp-02',
    'speaking',
    'Faz pedidos simples: preco, horario, direcao.',
    {
      A1: 'usa frases fixas',
      A2: 'varia o pedido',
      B1: 'faz pedido detalhado e educado',
    },
    'canDo',
    ['servicos', 'pedido'],
  ),
  item(
    'sp-03',
    'speaking',
    'Fala por um minuto sem parar sobre a rotina dele.',
    {
      A2: 'fala com pausas',
      B1: 'fala um minuto seguido',
      B2: 'usa variedade e liga as frases',
    },
    'canDo',
    ['monologo', 'fluencia'],
  ),
  item(
    'sp-04',
    'speaking',
    'Explica um problema tecnico de forma que outra pessoa resolva.',
    {
      B1: 'descreve o problema',
      B2: 'organiza causa e solucao',
      C1: 'adapta a explicacao ao interlocutor',
    },
    'canDo',
    ['explicacao', 'organizacao'],
  ),
  item(
    'sp-05',
    'speaking',
    'Defende um ponto de vista e responde a uma objecao.',
    {
      B2: 'da a opiniao e um motivo',
      C1: 'rebate sem perder o fio',
    },
    'canDo',
    ['argumentacao'],
  ),
]

const READING: DiagnosticItem[] = [
  item(
    're-01',
    'reading',
    'Le um aviso curto: horario, endereco, horario de funcionamento.',
    {
      A1: 'acha palavras-chave',
      A2: 'le o aviso inteiro',
    },
    'canDo',
    ['avisos', 'leitura instrumental'],
  ),
  item(
    're-02',
    'reading',
    'Le um e-mail curto e responde ao que e pedido.',
    {
      A1: 'entende o assunto',
      A2: 'entende o pedido e responde',
      B1: 'le e-mail formal',
    },
    'canDo',
    ['e-mail'],
  ),
  item(
    're-03',
    'reading',
    'Le um texto informativo curto e resume com as proprias palavras.',
    {
      A2: 'entende o texto',
      B1: 'resume sem copiar',
      B2: 'resume e explica pontos',
    },
    'canDo',
    ['resumo'],
  ),
  item(
    're-04',
    'reading',
    'Le um artigo de jornal e distingue fato de opiniao.',
    {
      B1: 'separa o que e informacao',
      B2: 'identifica a linha de argumento',
    },
    'canDo',
    ['jornal', 'analise'],
  ),
  item(
    're-05',
    'reading',
    'Le um texto academico ou tecnico e extrai a tese.',
    {
      B2: 'identifica a tese',
      C1: 'separa tese de metodologia',
    },
    'canDo',
    ['academico'],
  ),
]

const WRITING: DiagnosticItem[] = [
  item(
    'wr-01',
    'writing',
    'Escreve uma frase sobre si mesmo.',
    {
      A1: 'modelo copiado',
      A2: 'frases proprias',
    },
    'canDo',
    ['escrita inicial'],
  ),
  item(
    'wr-02',
    'writing',
    'Escreve um e-mail curto para pedir informacoes.',
    {
      A1: 'texto solto',
      A2: 'e-mail com assunto e formula',
      B1: 'e-mail formal e claro',
    },
    'canDo',
    ['e-mail', 'registro'],
  ),
  item(
    'wr-03',
    'writing',
    'Escreve um paragrafo coerente de cinco a sete linhas sobre um tema.',
    {
      A2: 'frases ligadas',
      B1: 'paragrafo com topico claro',
      B2: 'paragrafo bem organizado',
    },
    'grammar',
    ['paragrafo', 'coesao'],
  ),
  item(
    'wr-04',
    'writing',
    'Escreve uma redacao argumentativa com dois paragrafos.',
    {
      B1: 'opiniao com motivo',
      B2: 'tese, desenvolvimento e conclusao',
    },
    'grammar',
    ['redacao'],
  ),
  item(
    'wr-05',
    'writing',
    'Escreve um texto formal: carta, reclamacao, curriculo.',
    {
      B2: 'texto formal correto',
      C1: 'adapta o registro a situacao',
    },
    'pragmatics',
    ['registro formal'],
  ),
]

const GRAMMAR: DiagnosticItem[] = [
  item(
    'gr-01',
    'grammar',
    'Usa o presente para falar de rotina: "eu trabalho todos os dias".',
    {
      A1: 'reconhece a forma',
      A2: 'usa sem errar',
    },
    'grammar',
    ['presente'],
  ),
  item(
    'gr-02',
    'grammar',
    'Distingue "ser" e "estar" numa frase simples.',
    {
      A1: 'reconhece',
      A2: 'usa corretamente em frases comuns',
    },
    'grammar',
    ['ser/estar'],
  ),
  item(
    'gr-03',
    'grammar',
    'Monta frases com o preterito para contar o que aconteceu.',
    {
      A2: 'usa o preterito perfeito',
      B1: 'distingue perfeito e imperfeito',
    },
    'grammar',
    ['passado'],
  ),
  item(
    'gr-04',
    'grammar',
    'Usa o subjuntivo depois de "quero que" e "e importante que".',
    {
      B1: 'forma regular',
      B2: 'com verbos irregulares',
    },
    'grammar',
    ['subjuntivo'],
  ),
  item(
    'gr-05',
    'grammar',
    'Relata ao viu em voz passiva e com a indireta.',
    {
      B2: 'usa as duas construcoes',
      C1: 'controla o registro',
    },
    'grammar',
    ['sintaxe avancada'],
  ),
]

const VOCABULARY: DiagnosticItem[] = [
  item(
    'vo-01',
    'vocabulary',
    'Conhece vocabulario de familia, comida e casa.',
    {
      A1: 'palavras basicas',
      A2: 'vocabulario do dia a dia',
    },
    'lexis',
    ['temas basicos'],
  ),
  item(
    'vo-02',
    'vocabulary',
    'Fala de trabalho, estudo e planos usando o vocabulario certo.',
    {
      A1: 'profissao por extenso',
      A2: 'terminologia do trabalho',
    },
    'lexis',
    ['trabalho'],
  ),
  item(
    'vo-03',
    'vocabulary',
    'Usa expressoes idiomaticas sem confundir o sentido.',
    {
      B1: 'entende e usa as mais comuns',
      B2: 'usa com naturalidade',
    },
    'lexis',
    ['expressoes'],
  ),
  item(
    'vo-04',
    'vocabulary',
    'Le um texto tecnico e entende o vocabulario em contexto.',
    {
      B1: 'deduz o sentido pela frase',
      B2: 'usa o termo tecnico corretamente',
    },
    'lexis',
    ['tecnico'],
  ),
  item(
    'vo-05',
    'vocabulary',
    'Apercebe nuances e falsos amigos em textos formais.',
    {
      B2: 'identifica falsos amigos',
      C1: 'deduz por contexto e campo semantico',
    },
    'lexis',
    ['nuance'],
  ),
]

const PRONUNCIATION: DiagnosticItem[] = [
  item(
    'pr-01',
    'pronunciation',
    'Diz o proprio nome e um numero de telefone de forma inteligivel.',
    {
      A1: 'silabas separadas',
      A2: 'palavras inteiras',
    },
    'phonology',
    ['sons basicos'],
  ),
  item(
    'pr-02',
    'pronunciation',
    'Distingue sons que nao existem na lingua dele: j, x, nh, lh.',
    {
      A1: 'nao distingue',
      A2: 'distingue com treino',
    },
    'phonology',
    ['ortografia', 'fonetica'],
  ),
  item(
    'pr-03',
    'pronunciation',
    'Fala frases mantendo a concordancia de genero e numero.',
    {
      A2: 'mantem a concordancia',
      B1: 'fala espontaneamente sem trocar',
    },
    'phonology',
    ['sandhi', 'concordancia'],
  ),
  item(
    'pr-04',
    'pronunciation',
    'Fala com ritmo e entonacao que ajudam a ser compreendido.',
    {
      A2: 'fala devagar para compensar',
      B1: 'ritmo adequado',
      B2: 'entonacao que marca enfase',
    },
    'phonology',
    ['prosodia'],
  ),
  item(
    'pr-05',
    'pronunciation',
    'Corrige a propria pronuncia ao perceber que ficou errada.',
    {
      B2: 'percebe e corrige sozinho',
      C1: 'antecipa o ponto que vai soar errado',
    },
    'phonology',
    ['autocorrecao'],
  ),
]

const PRAGMATICS: DiagnosticItem[] = [
  item(
    'pa-01',
    'pragmatics',
    'Escolhe a saudacao certa para cada situacao: amigo, professor, padaria.',
    {
      A1: 'saudacao unica para tudo',
      A2: 'distingue registro basico',
    },
    'pragmatics',
    ['saudacoes'],
  ),
  item(
    'pa-02',
    'pragmatics',
    'Recusa um convite de formaeducada sem soar rude.',
    {
      A2: 'recusa simples',
      B1: 'recusa com justificativa',
    },
    'pragmatics',
    ['recusa'],
  ),
  item(
    'pa-03',
    'pragmatics',
    'Percebe se o interlocutor esta uncomfortable e corrige a abordagem.',
    {
      B1: 'percebe em situacao obvio',
      B2: 'ajusta o tom no momento',
    },
    'pragmatics',
    ['implicito'],
  ),
  item(
    'pa-04',
    'pragmatics',
    'Entende humor, ironia e indiretas em conversa.',
    {
      B2: 'entende o registro de humor',
      C1: 'sustenta a conversa no mesmo tom',
    },
    'pragmatics',
    ['humor', 'ironia'],
  ),
  item(
    'pa-05',
    'pragmatics',
    'Negocia, discorda e convence sem atacar o interlocutor.',
    {
      B2: 'discorda com educacao',
      C1: 'negocia e convence',
    },
    'pragmatics',
    ['negociacao'],
  ),
]

const BY_SKILL: Record<SkillCode, DiagnosticItem[]> = {
  listening: LISTENING,
  speaking: SPEAKING,
  reading: READING,
  writing: WRITING,
  grammar: GRAMMAR,
  vocabulary: VOCABULARY,
  pronunciation: PRONUNCIATION,
  pragmatics: PRAGMATICS,
}

/** Ordem de leitura da entrevista: o professor vai de cima para baixo. */
export const DIAGNOSTIC_ITEMS: DiagnosticItem[] = (
  [
    'listening',
    'speaking',
    'reading',
    'writing',
    'grammar',
    'vocabulary',
    'pronunciation',
    'pragmatics',
  ] as SkillCode[]
).flatMap((skill, skillIndex) =>
  BY_SKILL[skill].map((it, i) => ({ ...it, order: skillIndex * 100 + i })),
)

export const ITEMS_BY_ID: Record<string, DiagnosticItem> = Object.fromEntries(
  DIAGNOSTIC_ITEMS.map((i) => [i.id, i]),
)
