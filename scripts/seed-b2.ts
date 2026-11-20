import type { SeedLesson } from './seed-types'

/** Bloco B2 do material-base. Ver src/lib/domain/curriculum.ts para o mapa. */
export const B2_LESSONS: SeedLesson[] = [
  {
    topicKey: 'b2-subjuntivo',
    type: 'explanation',
    title: 'B2 — Subjuntivo: hipóteses, dúvidas e desejos',
    cefrMin: 'B2',
    cefrMax: 'B2',
    skills: ['grammar', 'speaking', 'writing'],
    primarySkill: 'grammar',
    register: 'neutro',
    estMinutes: 120,
    grammarTags: ['subjuntivo', 'se', 'quando', 'esperar-que'],
    lexicalTags: ['hipotese', 'duvida', 'desejo'],
    dialectTags: ['BR'],
    body: `## O tema que o aluno evita

O aluno B2 já fala com autonomia, mas evita o subjuntivo porque parece uma regra arbitrária. Na prática o subjuntivo é o modo da **não-realidade**: tudo que é hipótese, dúvida, desejo ou emoção contrária ao fato usa o subjuntivo. Ensine o conceito antes da forma e o aluno para de decorar.

## As três portas de entrada

O aluno só precisa dominar três concatenações para resolver quase tudo:

### 1. com SE (hipótese)

- "**Se** eu **tivesse** tempo, eu **via** o filme."
- "**Se** você **quiser**, eu **posso** ajudar."
- "**Se** eu **morasse** em Salvador, eu **comeria** todo dia."

Perceba: quando a hipótese é **impossível** (tempo, morar), o verbo vai para o **pretérito imperfeito do subjuntivo**. Quando é **possível** (querer, poder), vai para o **presente do subjuntivo**, que em português é quase igual ao presente do indicativo. Essa é a boa notícia: o presente do subjuntivo é o presente normal.

### 2. com QUANDO (tempo futuro)

- "**Quando** eu **chegar**, eu **te** aviso."
- "**Quando** ele **ligar**, pede pra mim."

Quando mais futuro no subjuntivo é a estrutura da expectativa: quando algo ainda não aconteceu, o verbo vai ao subjuntivo.

### 3. com ESPERAR QUE / ESPERAR PARA

- "Eu **espero que** você **esteja** bem."
- "Espero **que** ele **chegue** a tempo."
- "Espero **poder** falar com o gerente."

O verbo **esperar** no presente (ou no passado recente) exige que o complemento vá para o subjuntivo. Repare que "eu espero que ele está bem" está errado: é "eu espero que ele **esteja** bem".

## Subjuntivo no passado

O passado do subjuntivo se forma com o **pretérito imperfeito** mais o **-se**. Na primeira e na terceira pessoa do singular, a forma é idêntica à do imperfeito do indicativo:

- falasse = falava
- chegasse = chegava
- tivesse = tinha

O **-se** é a marca: "se eu tivesse", "quando ele chegasse", "espero que estivesse". E é essa ambiguidade entre "se eu tinha" (imperfeito) e "se eu tivesse" (subjuntivo) que produz os erros.

## Subjuntivo x indicativo

A regra prática, e é ela que resolve quase tudo:

- Fato, certeza, rotina → indicativo. "Eu sei que ele vem."
- Hipótese, dúvida, desejo → subjuntivo. "Espero que ele venha."

## Atividade curta

Transforme frases do indicativo para o subjuntivo, mudando o sentido:

- "Eu sei que ele vem amanhã." → "Espero que ele **venha** amanhã."
- "É verdade que eles saíram." → "É duvidoso que eles **tenham saído**."

A segunda mostra que a troca de verbo também muda, porque o auxiliar *ter* entra no subjuntivo: eles **sairam** (ind.) → eles **tenham saído** (subj.).

## Erro comum

O aluno diz "Se eu tivesse tempo, eu vejo o filme" com o indicativo. A regra é: hipótese impossível no passado → subjuntivo. Se o aluno escreve "se eu tinha tempo", está descrevendo um hábito do passado, não uma hipótese de hoje.

## O que fica para a próxima aula

O aluno faz hipóteses. Na próxima aula ele conecta ideias com conectivos avançados, que é o que sustenta um texto longo.`,
  },
  {
    topicKey: 'b2-conectivos',
    type: 'explanation',
    title: 'B2 — Conectivos e coesão: amarrar raciocínio em texto longo',
    cefrMin: 'B2',
    cefrMax: 'B2',
    skills: ['writing', 'grammar', 'reading'],
    primarySkill: 'writing',
    register: 'neutro',
    estMinutes: 120,
    grammarTags: ['conectivos', 'coesao', 'concessao'],
    lexicalTags: ['argumentacao', 'redacao', 'parecer'],
    dialectTags: ['BR'],
    body: `## Por que o texto curto é fácil e o longo não

O aluno B2 escreve frases corretas e falha em parágrafos, porque parágrafo exige **cadeia de raciocínio**. Conectivo é a dobradiça: mostra causa, consequência, contraste, condição e resumo. Quem domina conectivo escreve um texto que **segue**.

## Conectivos de causa

- porque, pois, já que, uma vez que, visto que, como
- porque e pois são os mais falados. "Já que" e "uma vez que" soam mais formais.

- "Não fui **porque** estava cansado."
- "**Já que** você está aqui, vamos comer."

## Conectivos de consequência

- então, por isso, por conseguinte, portanto, logo, assim
- "Estava cansado, **então** não fui."
- "**Portanto**, o prazo não será cumprido."

## Conectivos de oposição e concessão

Este é o conectivo mais útil para o aluno que argumenta:

- mas, porém, contudo, todavia, entretanto, no entanto
- embora, ainda que, mesmo que, nem que

A distinção crítica: **embora** vai para o indicativo, **ainda que / mesmo que** pedem o **subjuntivo**.

- "**Embora** chovia, saímos."
- "**Saímos** mesmo que **chova**."

Explique que "embora" é mais comum e mais fácil; "ainda que" é mais formal. O aluno de B2 precisa do "embora" bem antes do "mesmo que".

## Conectivos de conclusão e ordem

- portanto, em resumo, em suma, concluindo, diante disso
- primeiro, depois, em seguida, por fim, por último

## Conectivos de finalidade e condição

- para que, a fim de que (com subjuntivo)
- caso, contanto que, desde que, a menos que (com subjuntivo)

"**Desde que** você **chegue**, eu **preparo** tudo." Aqui o presente do subjuntivo é igual ao indicativo, então não há erro visível — o que importa aqui é a coesão, não a forma.

## A regra de ouro do conectivo

O conectivo certo é o que nomeia a relação real entre as ideias, não o que soa mais bonito. Erro comum: usar "então" (consequência) onde a relação é de oposição, ou "porém" onde a relação é de causa. Antes de escrever, diga em voz alta a relação — causa, consequência, oposição, conclusão — e só depois escolha o conectivo.

## Atividade curta

Dê um parágrafo com as frases fora de ordem e cinco conectivos. O aluno reordena e conecta. Exemplo de ordem embaralhada: "Estudei muito. Passei na prova. Não queria estudar. Foi difícil. Fiquei feliz." → "Embora não quisesse estudar, estudei muito. Como foi difícil, quase desisti. Mas passei na prova, portanto fiquei feliz."

## Erro comum

O aluno usa conectivo sem relação semântica: "Ele chegou. Então eu fui embora." Sem saber por que, o conectivo fica solto. Lembre que conectivo é argumento: só use se a relação for real.`,
  },
  {
    topicKey: 'b2-giarias-regionalismo',
    type: 'worksheet',
    title: 'B2 — Gírias e variações regionais sem soar caricato',
    cefrMin: 'B2',
    cefrMax: 'B2',
    skills: ['listening', 'pragmatics', 'vocabulary'],
    primarySkill: 'pragmatics',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['registro', 'variacao'],
    lexicalTags: ['giria', 'regionalismo', 'idiomas'],
    dialectTags: ['BR-ne','BR-se','BR-sul'],
    body: `## O objetivo: entender tudo, falar pouco

O aluno B2 não precisa falar gíria. Precisa **entender** gíria, porque vai ouvir em qualquer conversa de amigos, no trabalho e na mídia. A régua é simples: **entender sempre, usar com cuidado e saber a região**.

## Gírias nacionais (todo mundo entende)

- **rolê** — sair com amigos: "vamos dar um rolê?"
- **chilhar** — ficar de boa, à toa: "vamos chilhar"
- **marmota** — ficar em casa, introvertido
- **caidinha** — dar-se bem: "eles se dão bem"
- **treta** — discussão
- **mover o caldo** — provocar
- **morar no 220** — ladrão
- **tá de boa** — está tudo bem
- **nossa** — interjeição de espanto, muito comum
- **sal de fruta** — reação

## Variação regional: o mesmo sentimento, palavras diferentes

O Brasil tem três grandes blocos. O mesmo conceito muda de palavra:

### "Errado" / "não gostei"
- Sudeste: "tá errado", "não curti"
- Sul: "tá ruim", "não foi massa"
- Nordeste: "tá bobeira", "num curti"

### "Legal"
- Sudeste: "legal", "massa"
- Sul: "massa", "maneiro", "tri"
- Nordeste: "massa", "de boa"

### "Dinheiro"
- Sudeste: "dinheiro", "grana", "trocado"
- Sul: "dinheiro", "grana", "nobre" (raro)
- Nordeste: "dinheiro", "trocado"

### "Trabalho"
- Sudeste: "trabalho", "bico", "serviço"
- Sul: "trabalho", "bico"
- Nordeste: "trabalho", "tarefa", "serviço"

O aluno que viaja e entende "bico" como trabalho não vai entender a conversa no Sul. Ensine o vocabulário dos três blocos mesmo que o aluno more num só.

## Expressões idiomáticas

- **dar um jeito** — resolver
- **mão na massa** — começar a trabalhar
- **pôr a mão no fogo** — garantir com toda certeza
- **estar no mesmo barco** — passar pela mesma situação
- **ser um craque** — ser muito bom nisso: "nessa área, ele é um craque"
- **cortar o mal pela raiz** — resolver o problema de fundo
- **não ter duas mãos** — ser atrapalhado para resolver tudo sozinho

## Registro: o filtro do aluno

Um aluno B2 que usa "massa", "rolê" e "chilhar" em uma entrevista soa desajustado, não porque as palavras estejam erradas, mas porque o contexto mudou. A regra do professor:

- **Entrevista, e-mail, aula formal**: não use gíria.
- **Conversa com amigos**: gíria leve, se natural.
- **Entender**: sempre.

## Atividade curta

Dê um diálogo curto usando gírias. O aluno sublinha as gírias, depois reescreve o diálogo em registro formal. O objetivo é ver que a mensagem é a mesma, só muda a embalagem.

## Erro comum

O aluno usa gíria sem saber o registro e se surpreende quando é mal interpretado. Mais importante do que ensinar gíria é ensinar **quando não usar**. Diga explicitamente: em dúvida, não use.`,
  },
  {
    topicKey: 'b2-profissional',
    type: 'worksheet',
    title: 'B2 — Português profissional: e-mail, reunião e entrevista',
    cefrMin: 'B2',
    cefrMax: 'B2',
    skills: ['writing', 'pragmatics', 'speaking'],
    primarySkill: 'pragmatics',
    register: 'formal',
    estMinutes: 120,
    grammarTags: ['registro-formal', 'tratamento', 'conectivos'],
    lexicalTags: ['trabalho', 'email', 'entrevista', 'reuniao'],
    dialectTags: ['BR'],
    body: `## O degrau que o aluno sente mas não sabe nomear

O aluno B2 fala bem numa entrevista informal e trava numa mensagem de trabalho. Não é vocabulário: é **registro**. O português profissional brasileiro tem fórmulas próprias de abertura, pedido e encerramento, e escrever "Oi, tudo bem? Quero saber..." para um cliente soa amador.

## Estrutura do e-mail profissional

Use a ordem fixa:

1. **Assunto** na linha do assunto: curto, com verbo no infinitivo. "Solicitação de orçamento para reforma". Nunca "Assunto importante".
2. **Vocativo**: "Prezado Sr. Almeida," ou "Olá, Mariana,". "Prezado" é o mais formal; "Olá" já entrou no ambiente corporativo e é seguro.
3. **Abertura**: "Espero que esteja bem." Um período, não três.
4. **Objetivo**: o pedido em uma frase. "Escrevo para solicitar o orçamento da reforma."
5. **Contexto**: dois ou três períodos.
6. **Ação esperada**: "Peço a gentileza de confirmar até sexta-feira."
7. **Despedida**: "Atenciosamente," ou "Cordialmente," (mais quente). Depois o nome.

## Fórmulas de tratamento

- Você → ambiente próximo e horizontal: "Você pode me mandar?"
- Senhor/Senhora → cliente, chefe antigo: "O senhor pode verificar?"
- O/A senhor(a) evita erro de gênero, mas "prezado(a)" já resolve no escrito.

**Erro comum:** o aluno usa "Você" com um cliente antigo e soa informal demais. Em contrapartida, usa "senhor" com colegas de idade próxima e soa distante. A regra: o primeiro e-mail sempre mais formal; o cliente sinaliza se quer mais proximidade.

## Reunião: entrar, opinar, discordar

- **Pedir a palavra**: "Posso complementar?" / "Só um adendo."
- **Concordar**: "Concordo com o ponto da Mariana."
- **Discordar sem atacar**: "Entendo, mas vejo de outra forma. Na minha experiência..."
- **Encerrar**: "Fechamos assim, então?"

Discordar no Brasil profissional não é confronto direto: use "entendo, mas", "só uma ressalva", "posso discordar?". O aluno que discorda com "Isso está errado" pode ser mal interpretado, mesmo estando certo.

## Entrevista de emprego: três perguntas

- "Fale sobre você." → 60 a 90 segundos, foco em experiência e motivação.
- "Por que quer trabalhar aqui?" → pesquisar antes, citar a empresa.
- "Qual seu ponto fraco?" → responda com uma fraqueza real e o que faz para melhorar. Perfeccionismo soa falso.

## Atividade 1 — reescrever o e-mail

Entregue um e-mail informal: "Oi, preciso do relatório. Manda hoje? Valeu." O aluno reescreve no registro profissional completo. Depois comparem a estrutura item por item.

## Atividade 2 — simulação de entrevista

O professor faz três perguntas. O aluno responde. O professor anota uma coisa boa e uma a melhorar, e não corrige durante a fala.

## Atividade 3 — reunião com discordância

Dois alunos defendem posições opostas sobre um projeto fictício. Precisam discordar usando pelo menos duas fórmulas de atenuação. O professor observa se o aluno consegue discordar sem soar agressivo.`,
  },
  {
    topicKey: 'b2-temas-complexos',
    type: 'explanation',
    title: 'B2 — Ler notícia e argumentar sobre temas de atualidade',
    cefrMin: 'B2',
    cefrMax: 'B2',
    skills: ['listening', 'reading', 'speaking'],
    primarySkill: 'reading',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['conectivos', 'voz-passiva', 'discurso'],
    lexicalTags: ['noticias', 'politica', 'cultura', 'midia'],
    dialectTags: ['BR'],
    body: `## Da frase à argumentação

O aluno B2 entende a frase, mas perde o fio de um texto de três parágrafos, porque não reconhece a **estrutura argumentativa** da notícia e do artigo. Esta aula ensina o aluno a ler em camadas: o que é fato, o que é opinião, o que é fonte.

## Camada 1: o lide

O lide é o primeiro parágrafo, e responde a seis perguntas: **o quê, quem, quando, onde, como, por quê**. Todo o resto do texto é detalhamento. O aluno que aprende a achar o lide lê qualquer notícia em trinta segundos e depois decide se vale aprofundar.

## Camada 2: fato versus opinião

Frases de fato: "O projeto foi aprovado por 20 votos a 10." Frases de opinião: "O projeto é inaceitável." Marcadores de opinião: **acredita-se, na avaliação de, é inaceitável, sem dúvida, é importante**. Marcadores de fato: **segundo dados, de acordo com, informou, confirmou**.

O aluno precisa saber separar as duas porque em PLE a diferença entre reportar e opinar é o que o distingue de um aluno B1.

## Camada 3: as vozes

Toda notícia tem fontes. Identifique no texto: **o autor**, **a instituição**, **os entrevistados**, **os especialistas**. Perguntas de leitura:
- Quem falou?
- Qual é o interesse de quem falou?
- Qual frase é do repórter e qual é citação?

## Vocabulário de mídia

- o lide, a manchete, a chamada, a coluna, o editorial, a reportagem
- o porta-voz, a coletiva, o comunicado, a nota oficial
- os dados, o indicador, o índice, a estimativa, a projeção

## Estrutura da opinião em português

Para opinar sobre um tema, use a sequência: **introdução do tema**, **posição clara**, **dois argumentos com dado**, **concessão**, **fechamento**.

Exemplo:
> "O transporte público é o principal gargalo das metrópoles brasileiras. Primeiro, porque consome três horas diárias de quem mora na periferia. Além disso, porque o investimento em ônibus ficou décadas atrás do crescimento urbano. É verdade que os trilhos avançaram nos últimos anos, mas a cobertura ainda é insuficiente. Por isso, priorizar o transporte público é decisão de justiça social, não só de conveniência."

## Atividade 1 — caça ao lide

Leia uma notícia curta e responda: quem, o quê, quando, onde, como, por quê. Depois sublinhe uma frase de fato e uma de opinião.

## Atividade 2 — opinar em 60 segundos

Escolha um tema (transporte, educação, moradia). O aluno monta a estrutura em quatro partes: tema, posição, dois argumentos, concessão. Fale sem ler.

## Atividade 3 — trocar de lado

O aluno defende a posição contrária à que escolheu no debate anterior. Isso revela se ele domina o vocabulário ou apenas decorou a tese.

## Erro comum

O aluno lê a manchete e acredita ser a notícia. A manchete é uma interpretação. Ensine sempre a descer ao lide e verificar quem é a fonte antes de opinar.`,
  },
]
