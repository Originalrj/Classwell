import type { SeedLesson } from './seed-types'

/** Bloco A1 do material-base. Ver src/lib/domain/curriculum.ts para o mapa. */
export const A1_LESSONS: SeedLesson[] = [
  {
    topicKey: 'a1-alfabeto-fonetica',
    type: 'explanation',
    title: 'A1 — O alfabeto em português: S, X e Ç na prática',
    cefrMin: 'A1',
    cefrMax: 'A1',
    skills: ['pronunciation', 'listening', 'speaking'],
    primarySkill: 'pronunciation',
    register: 'neutro',
    estMinutes: 60,
    grammarTags: ['saudacoes', 'apresentacao-pessoal'],
    lexicalTags: ['saudacoes', 'nomes proprios', 'cidades'],
    dialectTags: ['BR'],
    body: `## Por que o alfabeto vem antes de tudo

O português é uma das línguas mais transparentes do mundo para quem lê: quase toda palavra escrita se pronuncia como parece. Isso é uma vantagem enorme e também um perigo. O aluno que acabou de chegar vai olhar um nome na agenda, um mapa ou um cardápio e tentar adivinhar a pronúncia pela forma da letra. Quase sempre ele acerta. Mas quando erra, erra justo nos sons que o português faz de um jeito diferente do inglês, do espanhol ou do japonês, e o erro vira hábito antes de ser corrigido.

Os três sons abaixo são os que mais aparecem em nomes brasileiros em contexto de PLE, porque é em nome próprio que o aluno sempre precisa ler em voz alta na frente de outra pessoa.

## S: duas pronúncias, uma letra

O **S** no final de sílaba ou de palavra é **/s/**, como em "dois", "os" ou "atlas". O **S** entre duas vogais é **/z/**, como em "rosa", "casa" ou "gasolina". O aluno precisa ouvir essa diferença porque "rosa" passa a soar como "roa" para quem não distingue os dois sons.

O erro mais comum é dizer o /s/ final como /ʃ/, o som de "show" do inglês. Em português isso soa estrangeiro e, em vários contextos, é o primeiro marcador de que a pessoa não é nativa.

## X: quatro sons num grafismo

O **X** é o grafismo mais injusto da língua. Ele representa sons diferentes conforme a palavra:

- **/ʃ/** (som de "ch") no início da palavra: "xampu", "xícara"; e em palavras como "rixa" e "deixar"
- **/z/** (som de "z") quando vem depois de "e" e antes de vogal: "exame", "exato", "exemplo"
- **/ks/** (som de "ks") em palavras como "tóxico", "fixar", "box"
- **/s/** em "máximo", "próximo", "auxílio"

A regra prática é olhar a palavra inteira, nunca a letra sozinha. Não existe regra única: o aluno aprende X ouvindo cada palavra nova.

Um aluno que supõe que "X" soa sempre como "ch" vai dizer "exame" como "echame" (o certo é "ezame") e "tóxico" como "chóxico" (o certo é "tóksico"). O contrário também acontece: quem acha que X é sempre "ks" diz "ksícara" em vez de "chícara". Por isso a pronúncia de X se aprende ouvindo cada palavra, e um dicionário com áudio vale mais que qualquer regra.

## Ç: sempre /s/ antes de A, O, U

O **Ç** é o c cedilha, e ele só aparece antes de **a, o, u**. O som é sempre **/s/**. Nunca existe ç antes de e ou i, porque nesses casos o próprio **c** já faz o som de /s/: "cidade", "cinco", "cedo".

O erro típico é trocar esse som. Quem vem do inglês tende a dizer "kidade" e "kinko", usando /k/ para o **c** antes de e/i. Corrija lembrando que "cidade", "cinco" e "senhora" começam com o mesmo som.

## Os três sons juntos em contexto real

Compare os pares que aparecem em placas e crachás:

- /s/ final — "Santos", "dois", "após", "vocês"
- /z/ entre vogais — "rosa", "casa", "mesa", "gasolina"
- /ʃ/ de X — "xampu", "xícara", "rixa", "deixar"
- /ks/ de X — "tóxico", "fixar", "box"
- /s/ de ç e de c antes de e/i — "caça", "moço", "cidade", "cinco"

Quando o aluno pratica lendo placas, percebe que **X** não indica som nenhum por si só, e que **Ç** é sempre /s/. Isso resolve metade dos erros de leitura de nome próprio.

## Cumprimentos: o mínimo funcional

Para sobreviver no primeiro contato, o aluno precisa de quatro saudações:

- **Olá / Oi** — neutro e válido a qualquer hora
- **Bom dia** — até o meio-dia
- **Boa tarde** — da tarde até o fim da tarde
- **Boa noite** — duas funções: saudação à noite e despedida educada

O erro clássico é dizer "boa noite" para se despedir às 11h da manhã. Em português a saudação noturna e a despedida são a mesma frase, e quem escolhe é a hora.

## Atividade curta para a aula

Peça que o aluno escreva o próprio nome, três cidades brasileiras que já ouviu falar e o nome de um colega. O objetivo não é a grafia: é fazer o aluno dizer cada palavra em voz alta duas vezes e ouvir se o som sai do jeito que ele espera. Na segunda rodada, o professor lê os nomes em voz alta e o aluno identifica o seu entre eles.

## Erro comum e o que fica para a próxima aula

O erro mais persistente da aula é o /s/ final falado com influência do inglês. Vale corrigir em voz alta toda vez que aparecer, mesmo em contexto de significado irrelevante, porque pronúncia não se corrige sozinha. Nada de passado entra aqui: sem estes três sons o aluno não consegue copiar um nome de uma placa, e sem copiar nomes ele não consegue se cadastrar em lugar nenhum.`,
  },
  {
    topicKey: 'a1-verbos-essenciais',
    type: 'explanation',
    title: 'A1 — Ser, estar, ter, ir: quatro verbos para o dia inteiro',
    cefrMin: 'A1',
    cefrMax: 'A1',
    skills: ['grammar', 'speaking', 'writing'],
    primarySkill: 'grammar',
    register: 'neutro',
    estMinutes: 90,
    grammarTags: ['ser', 'estar', 'ter', 'ir', 'presente'],
    lexicalTags: ['identidade', 'profissoes', 'localizacao'],
    dialectTags: ['BR'],
    body: `## O problema do A1 não é dificuldade: é excesso

O aluno iniciante não tem dificuldade com o presente. Ele tem dificuldade com **quantidade**. Um aluno que fala inglês ou japonês precisa aprender que o português exige duas formas para dizer "eu sou feliz" e "eu estou feliz", e mais três para dizer "eu tenho um carro". Ser, estar, ter e ir cobrem identidade, estado, posse e deslocamento. Com esses quatro o aluno descreve a si mesmo, à família e ao lugar onde está, e já consegue participar de uma conversa inteira sobre a vida cotidiana.

## SER: identidade e natureza

Use **ser** para o que não muda:

- eu **sou** brasileiro
- ela **é** professora
- nós **somos** amigos
- isso **é** importante

Ser também aparece em expressões fixas que o aluno vai ouvir muito: "ser assim", "ser simpático", "ser de São Paulo".

**Erro comum:** usar **estar** com profissão. O aluno diz "ela está médica". Em português soa errado, porque profissão é identidade e não estado temporário. A exceção que confunde o aluno é "estar em casa", que usa estar porque é localização.

## ESTAR: estado e localização

Use **estar** para tudo que muda, ou para lugar:

- eu **estou** bem
- a reunião **está** às 14h
- eles **estão** em casa
- você **está** com sorte

A distinção que o aluno precisa internalizar é que **ser** descreve o que a coisa é e **estar** descreve como ela está agora. "Ela é nervosa" descreve o temperamento; "ela está nervosa" descreve o momento.

## TER: posse, idade e fixos

Ter é mais amplo do que posse:

- eu **tenho** 30 anos
- eu **tenho** dois irmãos
- eu **tenho** fome
- eu **tenho** que ir embora

As duas primeiras mostram posse e idade. "Ter fome" e "ter sede" são expressões fixas: não aceitam estar nem ser. Outras do dia a dia: "ter sono", "ter pressa", "ter razão".

## IR: movimento e futuro

No presente, **ir** é só deslocamento: "eu vou para casa". Mas já vale plantar a semente de que **ir** mais infinitivo é o futuro: "eu vou estudar". Não é preciso explicar a gramática agora; basta que o aluno ouça "vou comer" e aceite como frase completa e correta.

**Erro de interlíngua:** o aluno diz "eu ir para casa" porque no inglês é "I go". Em português o movimento exige o verbo **ir** conjugado.

## Tabela de bolso

| Pergunta | Verbo | Exemplo |
|---|---|---|
| Quem é? | ser | Eu sou Ana. |
| Como está? | estar | Estou cansado. |
| O que tem? | ter | Tenho dois gatos. |
| Para onde vai? | ir | Vou para o trabalho. |

## Atividade curta

O professor desenha quatro colunas com os verbos e lê dez frases em voz alta. O aluno levanta a mão e indica o verbo correspondente. Depois inverte a direção: o professor diz um verbo e o aluno fala uma frase. Faça a segunda parte só depois da primeira — inverter cedo produz mistura dos quatro verbos na mesma frase.

## Erros que vão aparecer e como corrigir

1. "Eu estar feliz" → "Eu estou feliz". O aluno esquece a conjugação porque em inglês o verbo não flexiona. Corrija com frases afirmativas antes de pedir negativas.
2. "Ela está médico" → "Ela é médica". Explique que profissão é identidade.
3. "Eu tenho 30 anos" está correto. Muitos alunos duvidam disso por causa da interlíngua com "I am 30"; confirme explicitamente em voz alta.
4. "Eu ir amanhã" → "Eu vou amanhã". Faltou o auxiliar do futuro.

## O que fica para a próxima aula

Os quatro verbos já dão frases sobre identidade. A próxima aula pega tempo e calendário, que é o que falta para o aluno marcar uma consulta e entender quando um ônibus passa.`,
  },
  {
    topicKey: 'a1-numeros-tempo',
    type: 'exercise',
    title: 'A1 — Números, horas e datas: drill de 20 itens',
    cefrMin: 'A1',
    cefrMax: 'A1',
    skills: ['listening', 'speaking', 'vocabulary'],
    primarySkill: 'listening',
    register: 'neutro',
    estMinutes: 45,
    grammarTags: ['numeros', 'datas', 'horas'],
    lexicalTags: ['numeros', 'dias da semana', 'meses', 'horarios'],
    dialectTags: ['BR'],
    body: `## Formatos de hora: o ponto que faz o aluno errar

O português do Brasil usa **24 horas** por escrito: 14:30, 08:00, 19:45. Falado, o padrão também é "quatorze e trinta", mas **meio-dia e meia** é a exceção comum. Existe ainda o formato informal de 12 horas com AM e PM, que aparece em anúncios, em placas e no horário de ônibus: "3:30 PM". O aluno que só viu o formato de 24 horas vai ler "3:30 PM" como três e meia da manhã. Vale treinar os dois formatos.

**Meia-noite e meia** é ambíguo em fala rápida. O professor deve ensinar a dizer "zero e meia" ou "meia-noite e meia" com cuidado, e aceitar qualquer uma das duas como resposta.

## Datas por extenso

O formato brasileiro é **dia, mês por extenso e ano**: "12 de março de 2026". Nunca "3 de março" para o dia, como acontece no inglês. O "de" antes do mês é obrigatório, e o aluno quase sempre esquece na primeira tentativa.

## Atividade

O professor lê cada item duas vezes. O aluno escreve a resposta em português por extenso. Depois compare com o gabarito e reforce as respostas em que o aluno trocou o formato.

### Parte 1 — horas

1. 08:00
2. 14:30
3. 19:45
4. 00:15
5. 21:00

### Parte 2 — números

6. 15
7. 42
8. 68
9. 100
10. 250

### Parte 3 — datas

11. 01/03/2026
12. 15/07/2026
13. 21/09/2026
14. 30/11/2026
15. 09/12/2026

### Parte 4 — o que o aluno diz

16. O professor responde 07:30 a "Que horas são?". O aluno pergunta: "A reunião é às ___?"
17. O professor responde "cinco de agosto" a "Quando é o aniversário da sua irmã?".
18. O aluno pergunta "Que dia é hoje?" e hoje é terça-feira.
19. O professor pergunta "Qual é o número da sua casa?" e o aluno responde qualquer um.
20. O professor diz "A padaria abre às seis." O aluno pergunta se pode ir às 18:00.

## Objetivo

O aluno termina a atividade capaz de ouvir um horário falado, escrevê-lo no formato brasileiro e voltar a ele em fala. Essa é a base de marcar consulta, entender ponto de ônibus e ler a validade de um documento. Se o aluno errar o item 16, é sinal de que ainda não separou o formato falado do escrito: retome antes de avançar.`,
    answerKey: `1. oito horas
2. quatorze e trinta
3. dezenove e quarenta e cinco
4. zero e quinze
5. vinte e uma horas
6. quinze
7. quarenta e dois
8. sessenta e oito
9. cem
10. duzentos e cinquenta
11. primeiro de março de dois mil e vinte e seis
12. quinze de julho de dois mil e vinte e seis
13. vinte e um de setembro de dois mil e vinte e seis
14. trinta de novembro de dois mil e vinte e seis
15. nove de dezembro de dois mil e vinte e seis
16. "A reunião é às sete e meia?"
17. "Cinco de agosto."
18. "Hoje é terça-feira."
19. qualquer número, por exemplo "é o número 47"
20. "Posso ir às seis da tarde?" (aceita "às dezoito horas")`,
  },
  {
    topicKey: 'a1-apresentacao-pessoal',
    type: 'worksheet',
    title: 'A1 — Apresentação pessoal em 30 segundos',
    cefrMin: 'A1',
    cefrMax: 'A1',
    skills: ['speaking', 'writing', 'vocabulary'],
    primarySkill: 'speaking',
    register: 'neutro',
    estMinutes: 60,
    grammarTags: ['ser', 'estar', 'ter', 'apresentacao'],
    lexicalTags: ['profissoes', 'nacionalidades', 'familia'],
    dialectTags: ['BR'],
    body: `## O objetivo da aula

No fim da aula o aluno se apresenta em 30 segundos sem ler. Este é o primeiro objetivo comunicativo mensurável do programa, e vale medir em voz alta, não por escrito. Prova no papel não prova nada aqui: o que prova é o aluno falando sob atenção.

## Script modelado

O professor ensina um roteiro fixo de quatro partes. A estrutura é repetível justamente para dar segurança ao aluno iniciante:

1. **Cumprimento e nome** — "Oi, meu nome é Yuki. Tudo bem?"
2. **Origem** — "Eu sou do Japão. Eu moro em São Paulo há dois anos."
3. **Ocupação** — "Eu sou engenheiro. Eu trabalho numa fábrica."
4. **Família** — "Eu tenho uma irmã. Ela estuda medicina."

Repita o script com três alunos antes de pedir que qualquer um fale sozinho. O aluno que está em A1 precisa ouvir a estrutura duas ou três vezes em voz alta antes de produzir.

## Vocabulário de profissões

O aluno precisa de profissões com gênero marcado, porque a forma é um substantivo e não um verbo:

| Masculino | Feminino |
|---|---|
| o médico | a médica |
| o professor | a professora |
| o engenheiro | a engenheira |
| o cozinheiro | a cozinheira |
| o estudante | a estudante |

A regra é **o** ou **a** mais o substantivo, com a concordância variando no substantivo. Não existe artigo assimilado como em espanhol ou francês. O aluno que fala espanhol às vezes tenta "lo engenheiro", que está errado, mas "a engenheira" está certo. Não force o feminino se o aluno não se reconhece como tal: ele pode dizer "sou engenheiro" com a forma que prefere, e isso é legítimo.

## Nacionalidades

As nacionalidades são irregulares e se aprendem uma a uma:

- brasileiro, americano, italiano, coreano
- japonês, japonesa
- espanhol, portuguesa, inglês, inglesa, alemão, alemã

Irregulares decoram, não derivam. Forneça de oito a dez e faça o aluno repetir em voz alta. Cuidado com "japonês/japonesa": a forma feminina perde o acento, mas é regular.

## Família

A estrutura é **ter** mais numeral mais parente, e a concordância de gênero é do parente:

- eu tenho um irmão, duas irmãs
- eu tenho um pai e uma mãe
- eu tenho um marido, uma esposa

**Erro frequente:** o aluno diz "eu tenho um irmão e uma irmã" para se referir a ele mesmo. Explique que a forma feminina do parente se refere a uma pessoa do sexo feminino, não ao falante. "Eu tenho uma irmã" quer dizer que existe uma irmã, não que o falante é irmã.

## Atividade 1 — preencher

O aluno completa cinco frases sobre si:

1. Eu me chamo ___ e sou de ___.
2. Eu moro em ___.
3. Eu sou ___ e trabalho ___.
4. Eu tenho ___ anos.
5. Eu tenho ___ irmão(s) e ___ irmã(s).

## Atividade 2 — par em espelho

O professor fala e o aluno escreve. Inverta a direção na rodada seguinte. Não inverta antes de o aluno ter sucesso na primeira direção.

## Atividade 3 — o minuto real

Cada aluno fala por 30 segundos com o roteiro. Os colegas anotam **uma coisa** que entenderam. Depois o professor lê as anotações e cada aluno confirma ou corrige uma informação sobre si. A confirmação oral é o que fecha a aula: o aluno ouve a própria história contada por outra pessoa.

## Critério de sucesso

O aluno cumpre as quatro partes do roteiro, diz a profissão com a concordância correta e usa pelo menos três nacionalidades sem hesitar. Se travar em uma parte, isso não é reprovação: anote e retome na aula seguinte, porque a meta é em três dias, não em uma sessão.`,
  },
  {
    topicKey: 'a1-sobrevivencia',
    type: 'worksheet',
    title: 'A1 — Sobrevivência: pedir comida, preços e direções',
    cefrMin: 'A1',
    cefrMax: 'A1',
    skills: ['listening', 'speaking', 'pragmatics'],
    primarySkill: 'pragmatics',
    register: 'neutro',
    estMinutes: 60,
    grammarTags: ['ir-infinitivo', 'ter-que'],
    lexicalTags: ['restaurante', 'compras', 'direcoes'],
    dialectTags: ['BR'],
    body: `## A aula de utilidade imediata

Esta é a aula com maior retorno do A1. Tudo aqui é usado na primeira semana fora da sala. Se o aluno não aprender mais nada do módulo, precisa sair daqui sabendo pedir comida, perguntar preço e dizer que não entendeu.

## Pedir comida

A estrutura é **querer** mais infinitivo, ou **ir** mais infinitivo. Ambas funcionam:

- "Eu quero um café, por favor."
- "Eu vou querer o prato do dia."
- "Pode me trazer a conta, por favor?"

**Por favor** é o pedido formal. Em lanchonete e restaurante informal o **"se faz favor"** também é comum e não soa antiquado, ao contrário do inglês.

Se o aluno tem alergia ou restrição alimentar, a frase de emergência é:

> "Eu não como \_\_\_. É uma alergia."

E, se for alergia grave, a versão curta é "tenho alergia a \_\_\_". O aluno precisa ter essa frase pronta antes de precisar dela, e não no meio de um jantar.

## Perguntar preço

Três formas, da mais comum fora do Brasil para a mais comum aqui:

- "Quanto custa isso?"
- "Quanto é isso?"
- "Quanto está saindo isso?"

A terceira é a mais comum em feiras e no comércio de bairro. "Quanto custa" é entendida em todo o Brasil, mas soa mais formal. Vale ensinar as três e avisar que o aluno vai ouvir as três nos primeiros dias.

## Direções

O aluno não precisa entender endereços nesta aula, apenas o caminho. As perguntas essenciais são:

- "Como eu chego lá?"
- "É muito longe?"
- "Fica perto de onde?"
- "Posso ir a pé?"

E as respostas que o aluno precisa decifrar: "é na próxima esquina", "vira à direita", "fica depois do posto", "é em frente ao parque", "sobe a ladeira".

## A frase que o aluno mais precisa

> "Desculpa, eu não entendi. Você pode repetir?"

Mais uma, ainda mais útil:

> "Desculpa, como se diz isso em português?"

O aluno que tem estas duas frases prontas deixa de ter medo da rua. Elas custam dez segundos de aula e economizam semanas de silêncio.

## Atividade 1 — no restaurante

O professor faz o papel de garçom. O aluno pede entrada, prato, bebida e a conta. Erros permitidos; o objetivo é a transação, não a gramática.

## Atividade 2 — na loja

O aluno pergunta preço de três itens, diz que um não serve e pergunta o valor de outro.

## Atividade 3 — na rua

O professor dá a rota: "siga em frente, vire à esquerda, é depois da padaria". O aluno pergunta o caminho de volta.

## Erro comum

O aluno traduz "How much?" para "Quanto" e esquece o verbo: diz "Quanto isso?". A palavra "quanto" sozinha é numeral, e o aluno brasileiro sempre vai entender que ele perguntou o preço da coisa, mas o aluno pode achar que esqueceu a palavra. Ensine a frase completa e não a palavra solta.

## O que fica para a próxima aula

O aluno já opera em loja e restaurante. Na próxima aula ele descreve a própria rotina, que é a ponte para o passado.`,
  },
]
