import type { SeedLesson } from './seed-types'

/** Bloco A2 do material-base. Ver src/lib/domain/curriculum.ts para o mapa. */
export const A2_LESSONS: SeedLesson[] = [
  {
    topicKey: 'a2-preterito-perfeito',
    type: 'explanation',
    title: 'A2 — Falar do passado hoje: pretérito perfeito e ir + infinitivo',
    cefrMin: 'A2',
    cefrMax: 'A2',
    skills: ['grammar', 'speaking', 'listening'],
    primarySkill: 'grammar',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['preterito-perfeito', 'ir-infinitivo', 'assunto'],
    lexicalTags: ['rotina', 'projetos', 'relatos'],
    dialectTags: ['BR'],
    body: `## Dois passos de uma vez

O aluno A1 vive no presente. Em A2 ele precisa de duas ferramentas para sair dele: o **pretérito perfeito**, para contar o que aconteceu hoje ou nesta semana, e o **ir + infinitivo**, para falar do futuro. As duas são irregulares no verbo *ir*, o que torna a aula densa. Vale tratar o perfeito primeiro e só depois o futuro, no mesmo dia, mas em blocos separados.

## Pretérito perfeito: o passado que ainda é relevante

O português do Brasil usa o pretérito perfeito para ações encerradas no passado cujo efeito ainda pesa no presente ou que aconteceram hoje. Compare:

- "Ontem eu **comi** muito." — tempo fechado, o efeito já passou
- "Hoje eu **comi** pouco." — o dia ainda não acabou

A marca temporal é **hoje, ontem, esta semana, esse mês**. O aluno deve internalizar que o perfeito não é "ontem": é "agora, ainda em curso".

## Verbo ter + participio

O auxiliar é **ter** e o participio vem logo depois:

- eu **comi** (comer, comido, sem "have")
- eu **fui** à praia
- eu **vi** o filme
- eles **fizeram** a tarefa

Note que o português não usa *have*. O aluno que fala inglês vai dizer "eu have comido" e precisa ser corrigido de imediato: o auxiliar é **ter**.

## Irregulares mais comuns

Estes precisam ser decorados, não deduzidos: **ser/ir** (fui), **fazer** (fiz), **ver** (vi), **dar** (dei), **pôr** (pus), **estar** (estive), **ter** (tive), **poder** (podei), **saber** (sai), **querer** (quis).

## Ir + infinitivo: o futuro sem flexionar

O futuro se faz com **ir** no presente mais o infinitivo, sem conjugar o segundo verbo:

- eu **vou** morar no Brasil
- nós **vamos** viajar
- eles **vão** chegar cedo

O aluno que vem do espanhol às vezes tenta conjugar o segundo verbo. Em português ele fica no infinitivo: "eu vou *morar*", nunca "eu vou *moro*".

## O mesmo "ir" faz as duas coisas

Este é o ponto que mais surpreende o aluno: **ir** conjugado significa movimento ou futuro, e o contexto decide:

- "Eu **vou** para casa." — movimento
- "Eu **vou** estudar." — futuro

Explique que o verbo da primeira pessoa do plural **vamos** é idêntico em ambos os casos, e que a diferença está no que vem depois.

## Erro comum

O erro mais persistente é dizer "eu comi ontem" e sentir que está errado. Explique que o perfeito com "ontem" existe e é perfeitamente aceito na fala informal, mas soa mais preciso com "hoje". Não trate a variação como erro, apenas explique a diferença de nuance.

## Atividade curta

O professor conta uma história pessoal usando perfeito e futuro, e o aluno levanta a mão toda vez que ouvir um dos dois tempos. Na segunda rodada, inverta: o aluno conta e o professor só levanta a mão.`,
  },
  {
    topicKey: 'a2-gerundio',
    type: 'explanation',
    title: 'A2 — O gerúndio: estou comendo, estou fazendo',
    cefrMin: 'A2',
    cefrMax: 'A2',
    skills: ['grammar', 'speaking', 'writing'],
    primarySkill: 'grammar',
    register: 'neutro',
    estMinutes: 60,
    grammarTags: ['gerundio', 'estar'],
    lexicalTags: ['acoes', 'progresso'],
    dialectTags: ['BR'],
    body: `## A estrutura mais útil da língua

Se o aluno aprender uma única coisa no A2, que seja o gerúndio. É a estrutura com que o português do Brasil descreve ação em andamento, e o aluno vai ouvi-la o dia inteiro em anúncios, conversas e instruções.

A estrutura é **estar** no presente mais **-ndo**:
- eu **estou comendo**
- ela **está trabalhando**
- nós **estamos estudando**

## Por que é um ponto cego

O falante de espanhol já tem essa estrutura ("estoy comiendo"), então tende a acertar rápido. O falante de inglês tem uma forma contínua ("I am eating") e tende a transferi-la para todo contexto, inclusive onde o português prefere o presente simples ("Eu como", para hábitos). Já o falante de japonês ou coreano não tem marca de continuidade e tende a omitir a ideia.

## Como formar o gerúndio

A regra geral é trocar a terminação **-ar** por **-ando** e **-er/ir** por **-endo**:
- falar → falando
- comer → comendo
- partir → partindo

Os irregulares são poucos e precisam de memorização:
- dormir → dormindo
- pedir → pedindo
- repetir → repetindo
- construir → construindo
- poder → podendo

## O que o gerúndio NÃO é

Este é o erro que o professor precisa corrigir mais do que o aluno erra sozinho: **-ndo** não é o passado. O aluno de inglês diz "Eu estou comendo ontem" quando quer dizer "eu comi ontem". O gerúndio é sempre agora, sempre em curso. Para o passado fechado use o perfeito, que é a aula anterior.

## Gerúndio ou "estar comendo"?

Em Brasil há também o **gerundismo com "estar com a gente + infinitivo"**:
- "Eu estou comendo" e "estou com a gente comendo" são ambos naturais.

O primeiro é mais formal e concentra a ação na pessoa. O segundo é mais coloquial e grupal. Não force um sobre o outro: o aluno que entende os dois consegue alternar conforme o registro.

## Atividade curta

Dê uma lista de dez ações e peça ao aluno que as transforme em frases de progresso:
- limpar a casa → "Eu estou limpando a casa."

Depois pergunte ao aluno o que ele **está fazendo agora** enquanto fala, para ancorar a estrutura no presente real dele.

## Erro comum

O aluno posta a palavra inteira no plural e esquece de conjugar o estar: "Eu estou comendo" vira "Eu está comendo". Lembre que estar flexiona como um verbo comum: eu estou, tu estás, ele está, nós estamos.`,
  },
  {
    topicKey: 'a2-rotina-lugares',
    type: 'worksheet',
    title: 'A2 — Descrever a rotina e o lugar onde mora',
    cefrMin: 'A2',
    cefrMax: 'A2',
    skills: ['speaking', 'writing', 'vocabulary'],
    primarySkill: 'speaking',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['gerundio', 'preposicao', 'ter-esta'],
    lexicalTags: ['rotina diaria', 'casa', 'bairro'],
    dialectTags: ['BR'],
    body: `## Duas tarefas numa aula

Rotina e lugar têm a mesma estrutura de apoio: **ter** para posse e **estar** para localização. O aluno reaproveita a aula anterior e amplia o vocabulário. Trate as duas partes na mesma sessão, porque o texto final do aluno precisa misturar as duas.

## Parte 1 — a rotina

A rotina usa o gerúndio ou o presente com frequência. Compare:

- "Eu **estudo** português todo dia." — rotina
- "Eu **estou estudando** português agora." — em curso

Para descrever um dia inteiro, use conectores de sequência: **primeiro, depois, em seguida, por fim, antes de, depois de**.

## Modelo de texto

> "Todos os dias eu acordo às sete. Primeiro, tomo café. Depois, vou para o trabalho. À noite, em casa, eu assisto série. No fim de semana eu não trabalho e descanso."

## Vocabulário de casa

O aluno precisa nomear cômodos e objetos:
- a sala, a cozinha, o quarto, o banheiro
- a cama, a mesa, a cadeira, o sofá, a geladeira
- a chave, a janela, a porta, o chão

## Parte 2 — o lugar

Para descrever o bairro ou a cidade, use **tem** e **não tem**, **é** e **está perto**:
- "Meu bairro tem uma praça grande."
- "Aqui não tem estacionamento."
- "O mercado fica perto da minha casa."
- "Tem uma escola do lado."

## Vocabulário de bairro e cidade

- a praça, o mercado, o posto de saúde, a escola, o banco
- a rua, a avenida, a esquina, a esquina da praça
- perto, longe, ao lado, no meio

## Atividade 1 — descrever o dia

O aluno escreve um parágrafo de seis linhas sobre um dia comum da semana dele. Requer mínimo de quatro conectores de sequência. Releia e aponte os conectores que faltaram.

## Atividade 2 — descrever o lugar

O aluno desenha o cômodo onde está e o descreve: o que tem, o que não tem, o que fica perto do quê. Peça que aponte para a foto enquanto fala.

## Atividade 3 — o mapa falado

O professor descreve a planta de uma casa imaginária. O aluno escuta e desenha. Ao final, o aluno descreve a própria casa desenhada e o professor tenta adivinhar o cômodo que o aluno quer dizer. Esta atividade revela se a preposição de lugar está firme.

## Erro comum

O aluno usa **estar** para posse: "A casa tem uma geladeira" ele às vezes diz "A casa está com uma geladeira". Explique que posse é sempre **ter**, e que **estar com** significa estar acompanhado, não ter dentro. Essa confusão custa caro até o final do curso.

## O que fica para a próxima aula

O aluno descreve sua rotina e sua casa. A próxima aula leva essas descrições para fora: compras, roupas e transporte público.`,
  },
  {
    topicKey: 'a2-comparacoes',
    type: 'explanation',
    title: 'A2 — Comparar: mais, menos, tão... quanto',
    cefrMin: 'A2',
    cefrMax: 'A2',
    skills: ['grammar', 'speaking', 'writing'],
    primarySkill: 'grammar',
    register: 'neutro',
    estMinutes: 60,
    grammarTags: ['comparacao', 'superlativo', 'negacao'],
    lexicalTags: ['descritao', 'preferencias'],
    dialectTags: ['BR'],
    body: `## As duas estruturas

O aluno A2 compara com duas estruturas e precisa das duas.

### mais/menos ... que

Compara duas coisas:
- São Paulo **é mais** grande **que** Recife.
- Isso **é menos** caro **do que** eu pensava.
- Ela **é mais** simpática **que** a irmã.

Note que depois de **que** o verbo já veio conjugado acima. Não repita: "São Paulo é mais grande que é Recife" está errado. O "que" apenas conecta.

### tão ... quanto

Compara duas coisas usando **tão** mais adjetivo mais **quanto**:
- Este livro **é tão** bom **quanto** aquele.
- Ela fala **tão** rápido **quanto** você.

## A negação troca tudo

Este é o detalhe que os manuais de interlíngua sempre escorregam. A negação inverte **mais** em **menos** e **tão** em **menos**:

- "Este **não é** tão bom **quanto** aquele." (e não "não é tão pior quanto")
- "Isso **não é** mais caro **do que** aquilo."

Ou, de forma mais natural, usa **menos**:
- "Este **é menos** bom **do que** aquele."
- "Isso **é menos** caro **do que** aquilo."

## A negação com "menos" é mais direta

Ensine as duas mas destaque que **menos ... do que** é a forma mais segura para o aluno iniciante em A2, porque não depende de entender a inversão de tão.

## Comparar pessoas e lugares

O mesmo se aplica a pessoas:
- "Meu irmão **é mais** alto **do que** eu."
- "Ela fala **menos** bem **do que** o seu irmão."

## Atividade curta

De dois objetos reais na sala (uma caneca e um copo, por exemplo), o aluno faz dez frases comparando. Metade com **mais/menos que**, metade com **tão... quanto**. Faça o professor comparar primeiro, e só depois peça ao aluno.

## Erro comum

O aluno omite o "que" ou o "do que": "São Paulo é mais grande Recife." Ensine que a estrutura tem duas metades e nenhuma pode faltar: [comparativo] + **que/do que** + [fato]. A preposição **do que** é mais formal e aparece mais com **menos**; **que** é mais coloquial e combina com **mais**.

## O que fica para a próxima aula

O aluno sabe comparar. Na próxima aula ele vai a um mercado e pratica preço, tamanho e negociação.`,
  },
  {
    topicKey: 'a2-compras-viagens',
    type: 'worksheet',
    title: 'A2 — Compras, roupas, transporte e viagens',
    cefrMin: 'A2',
    cefrMax: 'A2',
    skills: ['listening', 'speaking', 'vocabulary'],
    primarySkill: 'listening',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['demonstrativos', 'preposicao', 'numeros'],
    lexicalTags: ['roupas', 'transporte', 'viagem', 'compras'],
    dialectTags: ['BR'],
    body: `## A aula da rua

Depois de descrever a casa e a rotina, o aluno A2 sai para a cidade. Esta aula junta três cenas que o aluno enfrenta na primeira semana: comprar roupa, andar de transporte público e organizar uma viagem. O foco é ouvir bem um número e um nome, porque quase todo erro aqui nasce de um número mal ouvido.

## Cena 1 — na loja de roupa

O aluno precisa de tamanho, cor, preço e forma de pagamento:

> Vendedor: Posso ajudar?
> Cliente: Estou procurando uma camisa.
> Vendedor: Que tamanho?
> Cliente: Média, por favor.
> Vendedor: Tem esta aqui, azul e branca.
> Cliente: Quanto custa?
> Vendedor: Noventa e nove reais. Quer provar?
> Cliente: Sim. Onde fica o provador?

Vocabulário: o tamanho (P, M, G, GG), o provador, a vitrine, as formas de pagamento (dinheiro, cartão de crédito, débito, pix). Mostre que **provar** é experimentar roupa, não "provar que é verdade".

## Cena 2 — no transporte público

As três compras do dia a dia:

- **bilhete** de metrô ou trem ("um bilhete, por favor")
- **passagem** de ônibus ("quanto é a passagem?")
- **cartão** de transporte ("posso recarregar o cartão?")

Frases de sobrevivência no terminal:

> "Qual é a plataforma para o centro?"
> "Esse ônibus passa na avenida Paulista?"
> "Preciso baldeação?"

Ensine que **baldeação** é trocar de linha, e que no Brasil o ônibus pede que o aluno esteja com o cartão pronto antes de subir.

## Cena 3 — planejar uma viagem

O aluno combina data, meio de transporte e hospedagem:

> "Quero uma passagem para o Rio na sexta."
> "Tem horário à noite?"
> "Quanto é a passagem de volta?"
> "Reservei um quarto para três noites."

Estruturas úteis: **ir + infinitivo** para planos ("vou viajar"), **de ... a** para período ("de segunda a sexta"), e números para horários e preços.

## Erro comum

O erro mais caro é confundir números parecidos: **seis/sete**, **quarenta/cinquenta**, **cento e dez/cento e vinte**. Em preço e horário, o erro muda a compra. Treine pares isolados em voz alta, sem contexto, antes de usá-los em diálogo.

O segundo erro é usar **provar** para roupa sem dizer o que: "quero provar" sozinho é ambíguo; o certo é "quero provar esta camisa".

## Atividade 1 — ditado de números

O professor lê dez preços e horários. O aluno anota só o número. Depois repita a lista e o aluno confere.

## Atividade 2 — role-play

Em trios: um é vendedor, um é cliente, um observa. Troque os papéis. Depois o grupo repete a cena no transporte e na agência de viagem.

## Atividade 3 — a viagem de dez linhas

O aluno escreve um plano curto de viagem: para onde vai, quando, como, quanto custa e onde dorme. Use pelo menos três verbos no ir + infinitivo.

## O que fica para a próxima aula

O aluno já compra e viaja. Na próxima aula ele compara duas opções, que é a base para escolher entre preços e destinos.`,
  },
]