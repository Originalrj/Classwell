import type { SeedLesson } from './seed-types'

/** Bloco C1 do material-base. Ver src/lib/domain/curriculum.ts para o mapa. */
export const C1_LESSONS: SeedLesson[] = [
  {
    topicKey: 'c1-regencia-sintaxe',
    type: 'explanation',
    title: 'C1 — Regência e sintaxe complexa: o que separa o avançado',
    cefrMin: 'C1',
    cefrMax: 'C1',
    skills: ['grammar', 'writing', 'reading'],
    primarySkill: 'grammar',
    register: 'formal',
    estMinutes: 120,
    grammarTags: ['regencia-verbal', 'regencia-nominal', 'oracao-subordinada', 'crase'],
    lexicalTags: ['formalidade', 'norma-culta'],
    dialectTags: ['BR'],
    body: `## O que embaraça o aluno em C1

Em C1 o aluno não erra a conjugação. Ele erra a **regência**: a preposição que o verbo ou o nome exige. "Assistir o filme" ou "assistir ao filme"? "Obedecer as leis" ou "obedecer às leis"? São erros que não impedem a compreensão, mas marcam imediatamente quem não domina a norma culta.

## Regência verbal: os verbos que mais aparecem

| Verbo | Regência | Exemplo |
|---|---|---|
| assistir (ver) | a | Assisti **ao** filme. |
| aspirar (desejar) | a | Aspiro **ao** cargo. |
| obedecer | a | Obedeça **às** regras. |
| precisar (necessitar) | de | Preciso **de** tempo. |
| gostar | de | Gosto **de** música. |
| esquecer-se | de | Esqueci-me **do** livro. |
| lembrar-se | de | Lembrei-me **do** nome. |
| preferir | a (comparação) | Prefiro café **a** chá. |
| visar (almejar) | a | Visa **a** resultados. |
| implicar (acarretar) | ∅ | Isso implica **riscos**. |

A tabela vale mais do que a explicação porque o aluno precisa decorar a preposição de cada verbo. Dê a tabela e pratique com frases.

## Regência nominal

Os nomes também pedem preposição. Os mais frequentes:

- **obediência a** — obediência às normas
- **acesso a** — acesso à informação
- **necessidade de** — necessidade de apoio
- **dúvida sobre** — dúvida sobre o prazo
- **orgulho de** — orgulho do filho
- **compatível com** — compatível com a proposta

## Crase: a armadilha clássica

A crase é a fusão da preposição **a** com o artigo **a**. Aparece antes de substantivo feminino definido:

- "Fui **à** praia." (a + a praia)
- "Entreguei **às** meninas." (a + as meninas)

Nunca há crase antes de:
- masculino: "Fui **a** pé."
- verbo: "Comecei **a** estudar."
- nome próprio sem artigo: "Fui **a** Salvador." (a cidade não pede artigo)
- palavra indefinida: "Fui **a** uma festa."

O teste do masculino resolve quase tudo: troque por "ao" e, se a frase aceitar, há crase. "Fui ao mercado" → "Fui à feira".

## Subordinadas: o sujeito oracional

Em C1 o aluno precisa produzir sujeito oracional sem hesitar:

- "É importante **que ele venha**."
- "Convém **estudar antes**."
- "O fato **de ela ter saído** mudou tudo."

O sujeito oracional com verbo no subjuntivo é o que dá ao texto o tom impessoal da escrita cuidada. É a diferença entre "Eu acho que é preciso mudar" (conversa) e "É preciso **que se mudem** as regras" (escrita).

## Reorganização de sintagmas

O aluno C1 deve saber mover a informação pela frase:

- "A mudança ocorreu depois da reunião." (neutro)
- "Foi depois da reunião **que** a mudança ocorreu." (clivada, ênfase)
- "Depois da reunião **é que** a mudança ocorreu." (coloquial, ênfase)

A clivagem com **é que** é um recurso de ênfase que aparece em todo texto opinativo brasileiro. Ensine-a explicitamente.

## Atividade curta

Dê dez frases com a preposição errada. O aluno corrige pela regência. Depois peça que reescreva três delas começando por "Foi ... que" para praticar a clivagem.`,
  },
  {
    topicKey: 'c1-tom',
    type: 'worksheet',
    title: 'C1 — Tom: formal, informal, irônico e persuasivo',
    cefrMin: 'C1',
    cefrMax: 'C1',
    skills: ['pragmatics', 'writing', 'speaking'],
    primarySkill: 'pragmatics',
    register: 'formal',
    estMinutes: 120,
    grammarTags: ['registro', 'ironia', 'atenuacao', 'modalizacao'],
    lexicalTags: ['argumentacao', 'persuasao', 'humor'],
    dialectTags: ['BR'],
    body: `## A competência que define C1

Em B2 o aluno diz a coisa certa. Em C1 ele diz de forma a produzir o efeito que quer: convencer, agradar, cutucar ou se proteger. Isso é **tom**, e o tom se faz com escolha de registro, atenuação e modalização. É a aula mais difícil de ensinar porque não há regra fixa: há repertório.

## O mesmo conteúdo em quatro tons

Tome a frase "Você não fez isso."

- **Formal**: "Notei que a tarefa ainda não foi concluída."
- **Informal**: "Você não fez, né?"
- **Irônico**: "Que belo trabalho, hein?"
- **Persuasivo**: "Se a gente fechar isso hoje, amanhã podemos começar a próxima etapa."

A mesma ideia, quatro efeitos. O aluno precisa reconhecer os quatro e produzir pelo menos dois.

## Ferramentas de formalidade

- **Impessoalidade**: "Foi decidido" em vez de "Eu decidi".
- **Nominalização**: "a implementação da medida" em vez de "implementar a medida".
- **Vocabulário latino**: "solicitar", "verificar", "posteriormente" em vez de "pedir", "checar", "depois".
- **Ausência de diminutivos e gírias**.

## Ferramentas de informalidade brasileira

O português brasileiro informal tem marcas próprias, e o aluno C1 precisa conhecê-las para não parecer robô:

- **diminutivos afetivos**: "uma perguntinha", "rapidinho", "só um minutinho"
- **né / tá / viu** no fim de frase
- **a gente** em vez de "nós"
- **contrações na fala**: "cê" para você, "tá" para está
- **reduções**: "péra aí", "deixa eu ver"

## Ironia: como marcar e como detectar

A ironia em português vive da contradição entre o elogio e o contexto, mais o marcador entonacional. Marcadores textuais: **hein**, **né**, **claro**, **só que não**, aspas, reticências.

- "Você é o rei da pontualidade, né?" (dito a quem acabou de chegar 40 minutos atrasado)

No texto, a ironia se marca com aspas: "O 'especialista' cometeu três erros básicos." Sem aspas e sem entonação, ela desaparece — e é aí que o aluno C1 escreve algo que ofende sem querer.

## Persuasão: os movimentos

- **Antecipar a objeção**: "Sei que o custo preocupa. Mas..."
- **Concessão estratégica**: "Reconheço o esforço. Ainda assim..."
- **Prova social**: "Três equipes já testaram e o resultado foi..."
- **Contraste**: "Não é gasto, é investimento."
- **Escassez**: "Se deixarmos para depois, perdemos o prazo da licitação."

## Atividade 1 — reescrever em quatro tons

Dê uma mensagem neutra: "O relatório está atrasado." O aluno escreve quatro versões: formal, informal, irônica e persuasiva.

## Atividade 2 — caçar a ironia

Dê um trecho de crônica. O aluno sublinha os marcadores de ironia e explica o que o autor realmente quis dizer.

## Atividade 3 — a concessão incômoda

Dê uma proposta que o aluno discorda. Ele precisa escrever uma resposta que reconheça o mérito da proposta antes de recusá-la. Este é o movimento mais valorizado no mundo de trabalho brasileiro.

## Erro comum

O aluno C1 escreve correto e sem tom: parece um comunicado. A correção não é gramatical, é de repertório. Aponte onde ele poderia ter atenuado, onde poderia ter sido mais direto, e mostre o mesmo parágrafo reescrito por um nativo.`,
  },
  {
    topicKey: 'c1-literatura',
    type: 'explanation',
    title: 'C1 — Ler literatura e crônica brasileira: vocabulário e referência',
    cefrMin: 'C1',
    cefrMax: 'C1',
    skills: ['reading', 'vocabulary', 'speaking'],
    primarySkill: 'reading',
    register: 'formal',
    estMinutes: 120,
    grammarTags: ['estilo', 'vocabulario-erudito', 'figuras'],
    lexicalTags: ['literatura', 'cronica', 'cultura', 'jornal'],
    dialectTags: ['BR'],
    body: `## Leitura literária não é leitura de notícia

O aluno C1 lê jornal sem esforço e trava na crônica. Não é vocabulário raro: é que a crônica trabalha com **referência cultural compartilhada** e com **ambiguidade**. O objetivo desta aula não é decorar autores, e sim dar ao aluno as chaves de leitura que o leitor brasileiro já tem.

## Gêneros que o aluno vai encontrar

- **Crônica**: texto curto, coloquial, do cotidiano, publicado em jornal. Nomes centrais: Rubem Braga, Fernando Sabino, Carlos Drummond de Andrade, Luís Fernando Verissimo.
- **Conto**: narrativa curta com um só efeito. Machado de Assis, Guimarães Rosa, Clarice Lispector.
- **Romance**: Machado, Graciliano Ramos, Jorge Amado, Rachel de Queiroz.
- **Poesia**: Drummond, Manuel Bandeira, João Cabral de Melo Neto.

Não peça que o aluno leia um romance inteiro; uma crônica de duas páginas basta para a aula.

## As figuras que mais aparecem

- **metáfora** — "a vida é um rio"
- **metonímia** — "li Machado ontem" (o autor pela obra)
- **hipérbole** — "milhões de vezes"
- **ironia** — o contrário do que se diz
- **anáfora** — repetição no início: "Cada dia, cada hora, cada instante"

O aluno C1 reconhece quase todas; o que falta é nomear e saber o efeito.

## Vocabulário erudito em contexto

Palavras que a crônica usa e a notícia evita: **melancolia, esbraseado, torpor, arrastado, esquivo, obstinado, soturno, esgar, lânguido, recôndito**. Ensine em contexto, com o sinônimo ao lado, nunca em lista solta.

## A referência cultural compartilhada

A crônica pressupõe o leitor brasileiro. Quando Verissimo escreve sobre o "jeitinho", ou quando Drummond fala do "sentimento do mundo", há um lastro cultural que o aluno estrangeiro não tem. Cabe ao professor fornecer o contexto: a Semana de 22, a ditadura, o futebol, o samba, a migração Nordeste-Sul.

## Como ler uma crônica C1

1. Qual é a **cena**? (onde, quando, quem)
2. Qual é a **virada**? (o que muda no meio do texto)
3. Qual é a **ideia**? (o que o autor quer que você sinta ou pense)
4. Qual é a **marca de estilo**? (humor, lirismo, crítica)

## Atividade 1 — crônica lida em voz alta

Leia uma crônica curta em voz alta enquanto o aluno acompanha. Depois, faça as quatro perguntas acima. Ler em voz alta resolve o ritmo e ajuda o aluno a captar a ironia.

## Atividade 2 — reescrever a crônica como notícia

O aluno reescreve a mesma cena em formato de notícia, no registro jornalístico. Isso revela a diferença entre os dois gêneros de forma concreta.

## Atividade 3 — vocabulário em contexto

Selecione oito palavras eruditas da crônica. O aluno escreve o significado e um exemplo próprio. Não aceite o sinônimo do dicionário sem a frase dele.

## Erro comum

O aluno lê a crônica procurando informação, como faz com a notícia, e se perde. Ensine desde o início que o objetivo é a **experiência**, não o dado. A pergunta certa não é "o que aconteceu?", e sim "o que o autor fez com o que aconteceu?".`,
  },
  {
    topicKey: 'c1-textos-academicos',
    type: 'worksheet',
    title: 'C1 — Escrever relatório, resumo e artigo com precisão',
    cefrMin: 'C1',
    cefrMax: 'C1',
    skills: ['writing', 'vocabulary', 'grammar'],
    primarySkill: 'writing',
    register: 'formal',
    estMinutes: 120,
    grammarTags: ['impessoalidade', 'voz-passiva', 'coesao', 'conectivos-formais'],
    lexicalTags: ['academico', 'relatorio', 'resumo', 'artigo'],
    dialectTags: ['BR'],
    body: `## O que a escrita acadêmica exige

O aluno C1 escreve bem um e-mail e trava num relatório, porque a escrita acadêmica e profissional exige **impessoalidade**, **precisão terminológica** e **coesão explícita**. É o último degrau do programa e o mais formatado.

## Os três gêneros

- **Resumo (abstract)**: 150 a 250 palavras. Objetivo, método, resultado, conclusão. Sem citações, sem opinião.
- **Relatório**: seções com títulos (Introdução, Metodologia, Resultados, Discussão, Conclusão). Foco em dados.
- **Artigo**: tese defendida com evidência. Introdução, desenvolvimento com argumentos, conclusão.

## Impessoalidade: as três estratégias

1. **Voz passiva**: "Os dados foram coletados." Em vez de "Eu coletei os dados."
2. **Se impessoal**: "Coletaram-se os dados." ou "Foram coletados os dados."
3. **Nominalização**: "A coleta dos dados ocorreu em março."

A primeira pessoa é aceita hoje em muitas áreas, mas o aluno precisa saber produzi-la e evitá-la. Ensine a alternar.

## Precisão terminológica

Cada área tem o seu vocabulário, mas há erros transáreas:

- **análise** (processo) × **analise** (verbo) — acento muda a classe
- **possível** × **potencial** × **viável** — não são sinônimos
- **elevado** × **alto** × **significativo** — o registro decide
- **realizar** × **fazer** — "realizar" soa mais técnico, mas não em todo contexto

Quando o aluno usa "fazer uma análise", troque por "realizar uma análise" se o texto for formal.

## Coesão explícita: os conectores acadêmicos

- **Adição**: além disso, outrossim, adicionalmente
- **Contraste**: não obstante, entretanto, em contrapartida
- **Causa**: em virtude de, em função de, devido a
- **Consequência**: consequentemente, dessa forma, por conseguinte
- **Exemplificação**: a título de exemplo, a saber, isto é
- **Conclusão**: em suma, portanto, diante do exposto

**Não obstante**, **outrossim** e **por conseguinte** são mais eruditos e não devem ser usados em excesso. Um ou dois por texto bastam. O excesso soa artificial.

## Estrutura do resumo

1. Frase de contexto: "Este trabalho investiga..."
2. Objetivo: "O objetivo é verificar..."
3. Método: "Utilizou-se uma amostra de..."
4. Resultado: "Os resultados indicam que..."
5. Conclusão: "Conclui-se que..."

## Atividade 1 — resumir em 150 palavras

Dê um artigo curto. O aluno escreve o resumo seguindo as cinco frases. Depois conte as palavras e ajuste.

## Atividade 2 — trocar a voz

Dê cinco frases em primeira pessoa. O aluno reescreve em impessoal, usando as três estratégias.

## Atividade 3 — revisar a coesão

Dê um texto com frases soltas. O aluno insere pelo menos seis conectores acadêmicos e justifica a escolha de cada um.

## Erro comum

O aluno usa conector erudito sem a relação ser real: "Não obstante, os resultados foram positivos" sem contraste anterior. Explique que conector é compromisso semântico: se a relação não existe, o texto soa vazio, por mais bonito que seja o vocabulário.`,
  },
]