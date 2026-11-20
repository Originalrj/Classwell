import type { SeedLesson } from './seed-types'

/** Bloco B1 do material-base. Ver src/lib/domain/curriculum.ts para o mapa. */
export const B1_LESSONS: SeedLesson[] = [
  {
    topicKey: 'b1-imperfeito-vs-perfeito',
    type: 'explanation',
    title: 'B1 — Narrar: imperfeito descreve o cenário, perfeito marca o avanço',
    cefrMin: 'B1',
    cefrMax: 'B1',
    skills: ['grammar', 'writing', 'speaking'],
    primarySkill: 'grammar',
    register: 'neutro',
    estMinutes: 120,
    grammarTags: ['imperfeito', 'preterito-perfeito', 'narrativa'],
    lexicalTags: ['historias', 'relatos', 'sequencia'],
    dialectTags: ['BR'],
    body: `## A distinção que sustenta qualquer narrativa

O aluno B1 já sabe falar do passado, mas conta histórias confusas: tudo acontece no mesmo tom. A distinção entre **imperfeito** e **pretérito perfeito** é o que separa um relato cronológico de uma narrativa com cena. É a aula mais decisiva da gramática para quem escreve e fala.

A regra é curta e precisa:

- **Imperfeito** descreve o cenário, o estado, o hábito: o que estava valendo.
- **Pretérito perfeito** marca o avanço, a ruptura: o que aconteceu.

## Um exemplo para ler em voz alta

> "Eu **era** criança e **morava** em Salvador. Todo dia **chovia** de tarde. Um dia **choveu** forte mesmo. Eu **estava** brincando na rua quando **começou** a chover muito. Eu **corri** para casa e **chorei** muito."

Repare: tudo que é rotina ou estado está no imperfeito (era, morava, chovia, estava). Tudo que rompeu a rotina está no perfeito (choveu, começou, corri, chorei). O tempo do céu dá o gatilho: a rotina chove, aquele dia choveu de outro jeito.

## Construindo o cenário com o imperfeito

Use o imperfeito para:
- **ser** e **estar**: "Ela era tímida, mas estava segura diante do público."
- **ter** (idade): "Eu tinha dez anos quando mudei."
- costumes e rotina: "Todo sábado eu ia à praia com meu pai."
- descrição: "A casa era pequena, mas tinha um jardim enorme."

## Construindo o avanço com o perfeito

Use o perfeito para:
- ações pontuais: "Ele chegou, abriu a janela e saiu."
- sequência de eventos curtos: "Levantei, tomei café e fui."
- mudanças de estado: "Ela ficou melhor."

## Encadeamento: e, mas, então, de repente

Para que a narrativa flua, ensine os conectores no mesmo dia:

- **e** — soma
- **mas** — contraste
- **então** — consequência
- **de repente** — ruptura
- **enquanto isso** — ação simultânea
- **depois** — sequência

## Atividade 1 — escolher o tempo

Coloque o verbo no tempo correto. O aluno decide pela lógica da situação, não pela forma.

1. Quando eu ___(chegar) em casa, o jantar já ___(estar) pronto.
2. Enquanto ela ___(dormir), o telefone ___(tocar).
3. Todo dia eu ___(acordar) às seis, mas ontem eu ___(acordar) às nove.
4. A chuva ___(cair) forte aquele dia, então ficamos em casa.
5. Ele sempre ___(dormir) mal, mas na viagem ___(dormir) o dia inteiro.

Gabarito: 1. cheguei, estava · 2. dormia, tocou · 3. acordava, acordei · 4. caía · 5. dormia, dormiu

## Atividade 2 — reescrever

O aluno recebe um texto todo no perfeito e reescreve, colocando o cenário no imperfeito. Essa tarefa revela se ele entendeu a função ou apenas decorou a forma.

### Atividade 3 — narrar em 60 segundos

O aluno conta uma história real curta usando os cinco conectores. O professor só escuta e anota quantos itens do perfeito e do imperfeito apareceram.

## Erro comum

O aluno usa um só tempo do passado para tudo ("Eu era", "Eu morava") por influência da interlíngua. Corrija com o teste do "e se fosse rotina?": se a ação podia se repetir todo dia, é imperfeito. Se foi aquele dia só, é perfeito.`,
  },
  {
    topicKey: 'b1-imperativo',
    type: 'explanation',
    title: 'B1 — Imperativo: ordens, conselhos e instruções com o tom certo',
    cefrMin: 'B1',
    cefrMax: 'B1',
    skills: ['grammar', 'pragmatics', 'speaking'],
    primarySkill: 'pragmatics',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['imperativo', 'afirmativo', 'negativo'],
    lexicalTags: ['instrucoes', 'regras', 'conselhos'],
    dialectTags: ['BR'],
    body: `## Três intenções, uma forma

O imperativo em português tem a mesma forma para **ordem**, **conselho** e **instrução**. O que muda é o tom, o contexto e às vezes o pronome. Isso é uma boa notícia: o aluno aprende uma forma e usa em três situações. E é uma notícia perigosa, porque o erro de registro é fácil de cometer.

## Afirmativo

Para você, nós, eles, o verbo vai para a terceira pessoa e cai o pronome:

- (você) **Feche** a porta.
- (nós) **Vamos** sair.
- (eles) **Venham** aqui.

Para tu e vocês, a forma é igual à terceira pessoa mas o pronome aparece:

- (tu) **Fecha** a porta.
- (vocês) **Fechem** a porta.

No Brasil, o **tu** é pouco usado no dia a dia. O aluno de Portugal precisa saber disso: no Brasil, "tu" soa formal ou ridículo na maioria das situações. Oriente a usar **você**.

## Negativo

O negativo do imperativo usa **não** e as formas do subjuntivo:

- (você) **Não feche** a porta.
- (nós) **Não vamos** sair.
- (você) **Não venha** amanhã.

Este é um erro clássico: o aluno conjuga o negativo como se fosse uma frase presente, "não fecha". Em português é "não fecha" com o tu, mas no você é "não feche". Ensine a regra do você explicitamente.

## Como diferenciar ordem de conselho

Na prática:

- **Ordem** vem com autoridade e às vezes com "por favor" mesmo: "Feche a porta, por favor."
- **Conselho** vem com reformulações gentis: "Você deveria fechar a porta." ou "Fecha a porta, vai chover."
- **Instrução** vem com verbo de comando: "Siga em frente até a esquina."

Se o aluno quer suavizar uma ordem, as saídas mais comuns são:
- "Você pode fechar a porta?" (pergunta)
- "Fecha a porta, por favor." (imperativo + por favor)
- "Eu pediria para você fechar a porta." (imperativo mais formal)
- "Se puder, feche a porta." (condicional)

## Atividade curta

Dê ao aluno instruções para um colega, como um mapa do que deve fazer ao chegar em casa: tocar a campainha, entrar, acender a luz. O aluno fala no imperativo. Depois inverta: o colega dá ordens ao aluno e ele identifica o tom, se foi ordem ou conselho.

## Erro comum

O aluno coloca o pronome no imperativo ("Eu fecho a porta" em vez de "Feche a porta") ou conjuga na primeira pessoa por causa da força do hábito do presente. Explique que o imperativo é a forma como você fala **para o outro**, então o verbo muda para o "você" e o pronome some.`,
  },
  {
    topicKey: 'b1-pronomes-obliquos',
    type: 'explanation',
    title: 'B1 — Pronomes oblíquos e a colocação brasileira antes do verbo',
    cefrMin: 'B1',
    cefrMax: 'B1',
    skills: ['grammar', 'pragmatics', 'speaking'],
    primarySkill: 'pragmatics',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['pronomes-obliquos', 'colocacao', 'enfase'],
    lexicalTags: ['conversa', 'enfase', 'correcao'],
    dialectTags: ['BR'],
    body: `## O que são e por que importam

Os pronomes oblíquos (me, te, o, a, nos, vos, lhes) substituem o objeto direto ou indireto. O aluno já os ouve em toda frase, mas precisa saber que o português brasileiro tem a tendência de colocá-los **antes** do verbo, e isso muda o tom.

Compare a mesma frase com posição diferente:

- "Eu **vi** ele ontem." (coloquial, objeto já conhecido)
- "Eu **o** vi ontem." (mais formal, ênfase no verbo)

E compare a diferença de tom mais relevante para o aluno:

- "Você **me** ligou?" (coloquial, natural)
- "Você **ligou para mim**?" (formal, escrito, ênfase)

A forma brasileira padrão é **pronome antes do verbo**: "me liga", "te amo", "a vejo". A forma com o pronome depois do verbo, como clítico, é mais formal e aparece na escrita e na fala cuidada de quem tem escolaridade alta.

## Resumo das formas

| Pessoa | Pronome oblíquo | Exemplo |
|---|---|---|
| me | me | Você **me** vê? |
| te | te | Eu **te** amo. |
| o/a | o, a | Eu **a** vi ontem. |
| nos | nos | Eles **nos** chamaram. |
| vos | vos | Eu **vos** contei ontem. |
| lhes | lhes | Vou dar **lhes** a resposta. |

## Clíticos mais comuns do dia a dia

O aluno de PLE precisa dominar alguns, porque são frequentíssimos:
- **me** (para mim): "me dá um minuto", "me ajuda"
- **te** (para você): "te amo", "te aviso"
- **dar + me**: "me dá", "me passa"
- **fazer + me**: "me faz", "faz pra mim"

Essas expressões com **dar** e **fazer** são praticamente fórmulas de cortesia. Dizer "me dá" é mais natural do que "por favor, me dê", e o aluno que não conhece essas formas soa formal demais na rua.

## Marcação de objeto indireto

Os pronomes **me**, **te**, **nos**, **vos** indicam objeto indireto (a pessoa), enquanto **o**, **a**, **lhes** podem ser objeto direto ou indireto dependendo da construção. Não precisa explicitar isso no B1; basta que o aluno reconheça as formas.

## A tendência brasileira do pronome antes do verbo

Este é um ponto de interlíngua que vale destacar. Em espanhol, o pronome pode vir antes ou depois do verbo com restrições próprias. Em português brasileiro do dia a dia, o pronome quase sempre vem antes:

- "Eu **te** vejo." (não "Eu vejo-te")
- "Ele **me** falou." (não "Ele falou-me")

Explique que a forma com o pronome depois ainda existe e é correta, mas soa mais literária ou mais europeia. O aluno deve produzir a forma brasileira, e reconhecer a outra quando a ouvir.

## Atividade curta

Transforme frases com pronome em frases sem pronome:
- "Você me viu ontem?" → "Você viu eu ontem?" (o objetivo é comparar as duas formas)

Melhor atividade: o aluno ouve uma frase e reescreve, colocando o pronome antes do verbo. Ou o aluno repara que a gramática é "vi-o" no formal, e decide como falar na rua.

## Erro comum

O aluno mantém o objeto na posição forte: "Eu vi ele" e "Eu quero isso" são frases de objeto direto com **ele/isso** em posição forte, enquanto o pronome oblíquo sozinho não pode ser objeto direto sem o reforço. Explique que em "Eu **o** vi", o pronome **o** substitui um objeto que já foi mencionado; não pode ser o primeiro item introduzido.

Mais produtivo: peça ao aluno que transforme "Eu vi meu irmão ontem" em "Eu **o** vi ontem" e explique por que funciona.`,
  },
  {
    topicKey: 'b1-emergencia',
    type: 'worksheet',
    title: 'B1 — Emergências e consulta médica: o que dizer quando dá errado',
    cefrMin: 'B1',
    cefrMax: 'B1',
    skills: ['listening', 'speaking', 'pragmatics'],
    primarySkill: 'pragmatics',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['imperativo', 'interrogacao', 'subjuntivo'],
    lexicalTags: ['emergencia', 'saude', 'farmacia', 'reclamacao'],
    dialectTags: ['BR'],
    body: `## A aula de maior utilidade depois de casa

Esta é a aula que o aluno mais usa na vida real e a que mais dá segurança. Uma emergência em que o aluno não consegue explicar o que está sentindo é uma situação de risco. Esta aula não é gramática de luxo: é proteção.

## Frases de emergência

O aluno precisa ter estas frases prontas para usar em qualquer lugar:

> "Preciso de ajuda, por favor."
> "É uma emergência."
> "Estou passando mal."
> "Preciso ir para o hospital."
> "Chame uma ambulância, por favor."

## No consultório

Para descrever sintomas:

> "Estou com dor de cabeça."
> "Estou com febre e tosse."
> "Estou com dor aqui." (apontar)
> "Começou ontem."
> "Está piorando."
> "Sou alérgico a \_\_\_."
> "Estou tomando este remédio." (mostrar a embalagem)

## Na farmácia

Para comprar e pedir orientação:

> "Preciso de um remédio para dor de garganta."
> "Tem algum sem receita?"
> "Posso tomar isso com \_\_\_?" (interação medicamentosa)
> "Como se usa? Quantas vezes por dia?"

A pergunta "Posso tomar isso com \_\_\_?" é imediatamente útil e mostra que o aluno entendeu que pode haver interação entre remédios. Vale treinar mais de uma vez.

## Em emergência pública

Para pedir ajuda concreta:

> "Onde fica o hospital mais próximo?"
> "Qual é o endereço?"
> "Você pode me levar?"
> "Eu preciso de um telefone."

## Diálogo modelado: dor de barriga

> Cliente: Boa tarde, estou com dor de barriga desde ontem.
> Médico: Onde dói?
> Cliente: Aqui, em cima.
> Médico: Como é a dor? É forte?
> Cliente: É uma dor forte, tipo cólica.
> Médico: Tem febre?
> Cliente: Não, mas estou com náusea.
> Médico: Vou te dar um remédio para dor e outro para a náusea. Toma três vezes por dia, depois das refeições.

Depois dessa cena, peça que o aluno faça o papel do paciente com um sintoma diferente: garganta, febre, dor de cabeça.

## Atividade — o cartão de emergência

O professor entrega uma folha modelo com espaços para:
- Nome completo
- Tipo sanguíneo
- Alergias conhecidas
- Convênio ou plano de saúde
- Contato de uma pessoa de confiança

O aluno preenche para si mesmo e explica por que guardaria esse cartão na carteira ou no celular. Esse cartão tem utilidade real e o aluno leva para casa.

## Erro comum

O aluno diz "Eu estou doente" quando quer dizer "Estou com febre" ou "Estou com dor". Em português brasileiro, o mais comum é nomear o sintoma (dor, febre, tosse) e não a condição (doente). Ensine a nomear sintomas, não rótulos.

## O que fica para a próxima aula

O aluno sabe resolver emergência e consulta. Na próxima aula ele aprende a opinar e discordar com elegância.`,
  },
  {
    topicKey: 'b1-sentimentos-desejos',
    type: 'explanation',
    title: 'B1 — Sentimentos, desejos, concordar e discordar',
    cefrMin: 'B1',
    cefrMax: 'B1',
    skills: ['speaking', 'pragmatics', 'vocabulary'],
    primarySkill: 'speaking',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['subjuntivo', 'marcadores-de-grau', 'concordar-discordar'],
    lexicalTags: ['sentimentos', 'desejos', 'opiniao', 'grau'],
    dialectTags: ['BR'],
    body: `## Do fato para o sentimento

O aluno B1 já relata fatos com clareza. O degrau seguinte é falar do mundo interno: o que sente, o que quer e onde concorda ou discorda. Esta é a primeira vez que o aluno sai do factual e entra no subjetivo. Não é ainda o subjuntivo da dúvida, que fica em B2; aqui o foco é o repertório de sentimento e opinião e os marcadores de grau.

## Falar do que sente

As estruturas mais produtivas:

- **estar + adjetivo**: "Estou feliz com a notícia." / "Fiquei triste com a resposta."
- **sentir + substantivo**: "Sinto saudade de casa." / "Sinto muita vontade de viajar."
- **gostar de / gostar de que**: "Gosto de trabalhar aqui." / "Gosto que você me avise."
- **ter medo de, estar com medo de**: "Tenho medo de dirigir em São Paulo."
- **ficar + adjetivo**: "Fiquei nervoso antes da prova."

**Saudade** merece atenção: não tem tradução exata em muitas línguas e quase sempre vem com **de** ("saudade de casa", "saudade de você").

## Falar do que quer

- **querer + infinitivo**: "Quero mudar de bairro."
- **querer que + subjuntivo**: "Quero que você me ajude."
- **gostaria de**: "Gostaria de falar com o gerente." (mais educado que "quero")
- **estou a fim de**: "Estou a fim de sair hoje." (coloquial, desejo)
- **tomara que**: "Tomara que não chova amanhã." (desejo com expectativa)

Repare que **querer que** e **tomara que** já tocam o subjuntivo. Vale apresentar como fórmula pronta, sem explicar o modo: o aluno reconhece e reutiliza.

## Marcadores de grau

O B1 soa robótico quando tudo é "muito". Ensine a escala:

- **um pouco / meio**: "Estou um pouco cansado."
- **bastante / bem**: "Fiquei bastante animado."
- **demais**: "Gostei demais do filme."
- **nada**: "Não gostei nada disso."
- **tão**: "Fiquei tão feliz que chorei."

## Concordar e discordar com graça

Concordar tem níveis:

- forte: "Concordo plenamente."
- neutro: "Concordo com você." / "É isso mesmo."
- morno: "Pode ser." / "Acho que sim."

Discordar, no Brasil, raramente é direto. O aluno que diz "Você está errado" soa agressivo. As saídas naturais:

- "Entendo, mas eu vejo diferente."
- "Será?" / "Não sei não..."
- "Acho que não é bem assim."
- "Concordo em parte, só que..."

Ensine a diferença entre **discordar da pessoa** e **discordar da ideia**: o brasileiro ataca a ideia e preserva a relação.

## Erro comum

O erro mais frequente é traduzir "I miss you" como "Eu sinto falta você" ou "Eu perco você". O certo é **"Sinto sua falta"** ou **"Estou com saudade de você"**. Corrija toda vez: o verbo é **sentir falta** ou **estar com saudade**, e o complemento pede **de**.

O segundo erro é usar "muito" para tudo. Reescreva as frases do aluno trocando "muito" por um marcador mais preciso, e peça que ele escolha o grau antes de falar.

## Atividade 1 — a escala

Dê dez adjetivos (feliz, triste, cansado, animado, nervoso...). O aluno monta uma frase para cada um usando um marcador de grau diferente, sem repetir.

## Atividade 2 — concordo, discordo

O professor lê dez afirmações polêmicas e leves ("Cinema é melhor que série"). O aluno precisa reagir em três níveis: concorda, discorda com suavidade e discorda com clareza, usando uma fórmula diferente a cada vez.

## Atividade 3 — a carta de desejo

O aluno escreve cinco desejos usando **quero que**, **gostaria de**, **tomara que** e **estou a fim de**. Depois lê em voz alta e a turma adivinha qual desejo é mais forte.

## O que fica para a próxima aula

O aluno agora expressa sentimento e opinião. Na próxima aula ele usa esse repertório para discordar e se posicionar com elegância na escrita.`,
  },
]
