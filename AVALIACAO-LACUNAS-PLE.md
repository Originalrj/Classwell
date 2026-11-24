# Avaliação das lacunas do português como língua estrangeira (PLE)

> Documento de trabalho do professor. Complementa o
> [Apanhado de conhecimento](APANHADO-CONHECIMENTO.md) e o
> [planejamento de conteúdo](../PLANEJAMENTO-CONTEUDO-PLE.md).
> Atualizado em 2026-11-23 · 72 cartões no Apanhado.

## 1. Como esta avaliação foi feita

Percorri os seis eixos que organizam o conhecimento da língua — **fonética/ortografia,
gramática, léxico, pragmática, cultura/variação e ensino** — e cruzei três perguntas:

1. **O ponto aparece hoje no material?** (cartão do Apanhado, aula-base em `scripts/seed-*.ts`,
   ou só na intuição do professor).
2. **Qual o impacto quando falta?** Um detalhe que muda a compreensão ou trava a fala pesa mais
   do que uma curiosidade etimológica.
3. **Qual o custo de cobrir?** Cartão novo é barato; áudio, exercício adaptativo e gravação de
   música são caros.

Daí vêm três faixas:

| Faixa | Critério | O que acontece |
|---|---|---|
| **P0 — essencial, já coberto** | Alta frequência, alto impacto, baixo custo | **Implementado nesta rodada** (31 cartões novos). |
| **P1 — recomendado** | Alta frequência ou alto impacto, custo médio | Próximos cartões e aulas; impacto imediato em aula. |
| **P2 — futuro** | Valor alto, mas depende de áudio, revisão nativa ou infraestrutura | Planejar para Fase 1/2 do produto. |

**Princípio orientador:** o professor não precisa de uma gramática completa; precisa da
*próxima explicação certa, no momento certo*. Todo cartão bom responde a uma pergunta real
de aluno e diz **quando não usar** a regra — não só quando usar.

---

## 2. O que já está coberto (P0)

Antes desta rodada o Apanhado tinha 41 cartões. Foram adicionados **31**, chegando a **72**.
A distribuição agora é:

| Eixo | Antes | Agora | Ganho |
|---|---:|---:|---:|
| Gramática | 17 | 37 | +20 |
| Fonética e pronúncia | 4 | 10 | +6 |
| Pragmática e registro | 9 | 9 | — |
| Léxico | 4 | 6 | +2 |
| Cultura e variação | 5 | 5 | — |
| Ensino e estratégias | 2 | 5 | +3 |
| **Total** | **41** | **72** | **+31** |

### 2.1 Os cartões que fecham o pedido original

| Pergunta do professor | Cartão | Resposta em uma linha |
|---|---|---|
| Por que `deixar` soa CH e `próximo` soa S? | `a1-x-quatro-sons` | X tem quatro sons (/ʃ/, /z/, /s/, /ks/): olhe a palavra inteira, nunca a letra sozinha. |
| E o SS? | `a1-ss-som-unico` | SS é sempre /s/; S entre vogais é /z/ (`casa` × `caça`). |
| E RR / R? | `a1-r-inicial` (já existia) | No BR, R inicial e RR = /h/; R entre vogais é brando; em PT, R inicial é /ʁ/. |
| NH, LH, J e G? | `a1-nh-lh` | NH=/ɲ/, LH=/ʎ/, J e G antes de E/I = /ʒ/. |
| Por que `hoje` não tem H? | `a1-h-mudo` | H inicial é só grafia. |
| Por que `café` tem acento e `casa` não? | `a2-acento-silaba-tonica` | O acento marca onde a voz se apoia; ensine junto com a pronúncia. |
| Ditongo ou hiato? | `a2-ditongo-hiato` | `caixa` (KAI-xa) × `saia` (SA-i-a); o ditongo explica o X de `deixar`. |
| Como organizar os tempos verbais? | `b2-mapa-tempos` | Presente → perfeito → imperfeito → futuro → condicional → mais-que-perfeito → subjuntivo, por **uso**, não por paradigma. |
| Passado antes do passado? | `b2-mais-que-perfeito` | `tinha + particípio` (`tinha saído`). |
| `Quando chegar` e não `quando chega`? | `b2-futuro-subjuntivo` | Depois de SE/QUANDO com valor futuro, use o futuro do subjuntivo. |
| Como dizer "is was built"? | `b2-voz-passiva` | `foi construída` / `vende-se pão`. |
| Como contar o que alguém disse? | `b2-discurso-indireto` | `disse que…`, `perguntou se…`, com volta de tempo e pronome. |
| Concordância? | `b2-concordancia-verbal`, `b2-concordancia-nominal`, `b2-se-impessoal` | Sujeito manda no verbo; artigo, nome e adjetivo concordam; o SE tem três funções. |
| Estruturas básicas que faltavam | `a1-plural-genero`, `a1-negacao-nao`, `a2-contracoes-a-o`, `a2-por-para`, `a2-saber-conhecer`, `a2-mas-mais`, `a2-tempo-fazer-estar`, `b1-por-que-familia`, `b1-crase`, `b1-ter-haver`, `b1-a-gente`, `b1-futuro-simples`, `b1-condicional`, `b1-levar-trazer` | Ver inventário em `APANHADO-CONHECIMENTO.md`. |
| Rotinas de aula | `tip-correcao-geral`, `tip-pares-contraste`, `tip-revisao-espacada` | Corrigir com critério, praticar com pares mínimos, revisar em 1/3/7 dias. |

### 2.2 Por que esses 31 primeiro

1. **O aluno pergunta, o professor não achava.** `deixar`/`próximo`, SS, NH/LH e o mapa dos
   tempos verbais viviam só nas aulas-base (`scripts/seed-a1.ts`, `seed-a2.ts`, `seed-b1.ts`).
   Agora são pesquisáveis por palavra-chave, nível, tipo e L1.
2. **Som e letra andam juntos.** Os cartões de fonética trazem a regra *e* o contraste
   (`casa/caça`, `dois/doish`, `deixar/próximo`), que é o que realmente muda a pronúncia.
3. **O "por quê" virou "quando".** Cada cartão de tempo verbal diz em que registro ele aparece
   (fala cotidiana × texto formal) — o erro clássico é ensinar o futuro simples antes do
   `vou + infinitivo`.
4. **Custo baixo, ganho alto.** São cartões versionados em código: não precisam de seed no
   Firestore, aparecem no app e podem virar material com um clique.

---

## 3. Lacunas restantes por domínio

### 3.1 Fonética e ortografia — **P1**

Hoje: 10 cartões (S, C/Ç, R/RR, X, SS, NH/LH, H, acento, ditongo/hiato, S final).
Falta o que o aluno ouve o tempo todo e não consegue transcrever:

| Lacuna | Por que importa | Prioridade | ID sugerido |
|---|---|---|---|
| **D/T antes de E/I** (`dia`→“jia”, `tio`→“chio”, `cidade`) | É a palatalização mais produtiva do português brasileiro; sem ela, o aluno entende a palavra mas não a reconhece na fala. | P1 | `a2-d-ti-palatalizacao` |
| **Vogais nasais e `-ão/-ões`, `-ã/-ãs`, `-em/-ens`** (`mão/mãos`, `coração/corações`, `vem/vemento`) | Muda o plural e o timbre; falantes de inglês e alemão temem esse ponto. Ligar ao `a1-plural-genero`. | P1 | `a2-vogais-nasais` |
| **Z final e Z antes de consoante** (`faz`, `vez`, `dez`, `isto` no BR) | Fecha a tríade S/SS/Z que o professor começou em A0/A1. | P1 | `a2-z-final` |
| **R final e R em coda** (`amor`, `falar`, `karma`) | O `a1-r-inicial` cobre só início e RR; o R final tem comportamento próprio no BR e no PT. | P1 | `a2-r-final` |
| **G/J e QU/GU** (`gente/gato`, `quando/água/guitarra`) | Duas grafias, um som, com U mudo em QU/GU. Erro de leitura muito comum. | P1 | `a1-g-j-qu-gu` |
| **SC / SÇ / XC / CT / PC** (`nascer`, `crescer`, `excelente`, `aspecto`) | Ortografia de alta frequência em textos acadêmicos e de trabalho (C1). | P2 | `c1-encontros-consonantais` |
| **Acento de intensidade em verbos** (`canta/cantam/cantar`) e acento diferenciador (`pode/pôde`) | Ensina o ouvido a ouvir a tônica antes da regra de acentuação escrita. | P2 | `b1-acento-verbal` |
| **Entonação de pergunta e de ênfase** | Pergunta com entonação ascendente, contraste com "você vem?" afirmativo. Depende de áudio. | P2 (áudio) | `b1-entonacao-pergunta` |
| **IPA + áudio por palavra** | Hoje a "fala" é uma transcrição aproximada em inglês. Áudio real é o maior salto de qualidade. | P2 (infra) | — |

### 3.2 Gramática — **P1 / P2**

Hoje: 37 cartões, o eixo mais forte. Ainda faltam pontos que aparecem em qualquer aula B1–C1:

| Lacuna | Por que importa | Prioridade | ID sugerido |
|---|---|---|---|
| **Infinitivo pessoal** (`para eu ir`, `para ele ir`, `antes de você sair`) | O aluno diz "para eu ir" errado ou evita a estrutura; é muito frequente em e-mails. | P1 | `b1-infinitivo-pessoal` |
| **Pronomes oblíquos e colocação** (`me dá`, `dá-me`, `não me dá`) | Já há aula em `seed-b1.ts`, mas não é pesquisável no Apanhado. | P1 | `b1-pronomes-colocacao` |
| **Pretérito perfeito composto** (`tenho tentado`, `tem chovido`) | Fecha o mapa de tempos: repetição que chega até agora. Liga a `b2-mapa-tempos`. | P1 | `b2-perfeito-composto` |
| **Imperativo afirmativo/negativo** (`faça`, `não faça`, `não faças`) | `b1-imperativo-educado` cobre cortesia; falta a forma e a negção. | P1 | `b1-imperativo-formas` |
| **Regência verbal e nominal** (`gostar de`, `precisar de`, `ir a`, `interesse em`) | `c1-assistir-regencia` é um caso; o padrão "verbo + preposição" merece cartão próprio. | P1 | `b1-regencia-preposicoes` |
| **Conjunções com subjuntivo** (`embora`, `mesmo que`, `desde que`, `antes que`) | É onde o subjuntivo de `b2-subjuntivo-desejo` se torna uso real. | P1 | `b2-conjuncoes-subjuntivo` |
| **Particípios irregulares** (`feito`, `dito`, `visto`, `escrito`, `posto`) | Necessário para voz passiva e tempo composto; evita "fazido", "dizido". | P1 | `b2-participios-irregulares` |
| **`estar + particípio` resultativo** (`a porta está fechada`) vs gerúndio | Diferencia estado de ação — confusão clássica de quem vem do inglês. | P1 | `b2-estar-participio` |
| **Demonstrativos e deixis** (`este/esse/aquele`, `aqui/ali/lá`) | Ordena o espaço da aula e do texto; liga a `b1-levar-trazer`. | P2 | `b1-demonstrativos` |
| **Indefinidos e numerais** (`algum`, `nenhum`, `todo`, `cada`, `metade`, `primeiro`) | Baixo impacto isolado, mas aparece em leitura e formulários. | P2 | `b1-indefinidos` |
| **Comparativos/superlativos completos** (`tão… quanto`, `o mais… de`) | `a2-comparacao` cobre o básico; falta a estrutura correlativa. | P2 | `b2-correlativos` |
| **Voz passiva com SE + sujeito plural** (`vendem-se livros`) | `b2-se-impessoal` cita, mas merece exercício de concordância. | P2 | `b2-se-passiva-plural` |

### 3.3 Léxico e semântica — **P1**

Hoje: 6 cartões. O português tem verbos "coringa" que carregam conversas inteiras:

| Lacuna | Por que importa | Prioridade | ID sugerido |
|---|---|---|---|
| **`ficar` polissêmico** (`ficar cansado`, `ficar em casa`, `ficar com`, `ficar sabendo`) | Talvez a palavra mais usada do português oral; uma única tradução ("stay") não resolve. | P1 | `b1-ficar` |
| **`dar`, `pegar`, `colocar`, `pôr`** em contextos cotidianos | Verbos de alta frequência com sentidos locais e figurados. | P1 | `a2-verbos-uso-geral` |
| **Falsos cognatos por L1** (`actually`, `eventually`, `pretend`, `sensible`, `constipado`, `pasta`) | Erro previsível e constrangedor; ótimo cartão de "contraste com L1". | P1 | `b1-falsos-cognatos` |
| **`achar / pensar / ter certeza / talvez`** | Expressa grau de certeza — essencial para opinião (`b1-opiniao`). | P1 | `b1-grau-certeza` |
| **Léxico escolar e de trabalho** (`prova`, `nota`, `boletim`, `recuperação`, `reunião`, `prazo`) | Direto com os objetivos `study` e `work` do cadastro do aluno. | P1 | `b1-vocabulario-escola-trabalho` |
| **Sinônimos regionais** (`ônibus/autocarro`, `celular/telemóvel`, `xícara/chávena`) | Evita que o aluno ache que uma variante está "errada". Liga a `c2-tu-voce-variacao`. | P2 | `b2-sinonimos-br-pt` |
| **Números, telefone, endereço e datas** | `a0-horas` cobre hora; falta o resto da sobrevivência urbana. | P2 | `a1-numeros-contato` |

### 3.4 Pragmática e registro — **P1**

Hoje: 9 cartões — é a área com maior peso relativo e merece mais dois ou três:

| Lacuna | Por que importa | Prioridade | ID sugerido |
|---|---|---|---|
| **Pedir repetição e esclarecimento** (`como?`, `pode repetir?`, `mais devagar`, `o que quer dizer…?`) | É a primeira frase que o aluno precisa saber e quase nunca é ensinada. | P1 | `a1-pedir-repeticao` |
| **Cumprimentos de chegada/saída e cortesia** (`com licença`, `desculpe`, `de nada`, `boa noite` como despedida) | `a0-saudacoes` abre a conversa; falta fechá-la e manejar o turno. | P1 | `a1-cortesia-turnos` |
| **Interromper e concordar discordando** (`olha só`, `entendo, mas…`, `na minha visão`) | Dá ao aluno ferramentas para participar sem soar rude. | P1 | `b2-turnos-conversacao` |
| **Recusa educada e suavizadores** (`não posso`, `talvez depois`, `infelizmente`) | Ligado a `b1-imperativo-educado` e `b1-opiniao`. | P2 | `b2-recusa-educada` |
| **Registro de mensagens instantâneas** (áudios, "boa tarde" em texto, emojis) | É onde o aluno realmente escreve hoje; falta descrição de registro. | P2 | `b2-registro-whatsapp` |

### 3.5 Cultura e variação — **P2**

Hoje: 5 cartões. O ponto sensível é tratar variação sem corrigir o aluno:

- **Brasil × Portugal de forma sistemática** (R, S final, `tu`, gerúndio, léxico): `c2-tu-voce-variacao` abre, mas falta um cartão-ponte em B1 para não deixar a descoberta só no C2.
- **Variação regional dentro do Brasil**: sotaques e palavras; útil quando a aula é online e o aluno ouve várias vozes.
- **Linguagem de gênero e formas neutras** (`todes`, `elu`): tema de registro e discussão, não de imposição. O professor precisa de uma postura informada para explicar que é variável e politicamente marcado.
- **Calendário e festas** (Carnaval, Festa Junina, Natal) e **música** (samba, bossa, MPB, sertanejo, funk): a música já está prevista como recurso de aula, mas não há cartão que diga *como usá-la* (ver 3.6).
- **Etiqueta de trabalho** (horário de reunião, tratamento por senhor/doutor, e-mail) — parcial em `b2-email-formal`.

### 3.6 Ensino e estratégias — **P1**

Hoje: 5 cartões (aquecimento, correção de pronúncia, correção geral, pares mínimos, revisão espaçada). Faltam os instrumentos do dia a dia:

| Lacuna | Por que importa | Prioridade | ID sugerido |
|---|---|---|---|
| **Plano completo de 50 minutos** (5 aquecimento / 10 apresentação / 15 prática / 15 produção / 5 fecho) | O `tip-aquecimento` cobre só os 3 minutos iniciais; o professor precisa do ritmo inteiro e do que cortar quando a aula atrasa. | P1 | `tip-plano-50min` |
| **Como usar música em aula** (pré-ensinar palavras → escuta guiada → lacuna → discussão) | Pedido explícito do usuário; sem um roteiro, "colocar uma música" não vira aprendizagem. | P1 | `tip-musica-aula` |
| **Jogos por nível** (bingo de sons em A1, dominó de contrações em A2, debate em B2) | Jogo com alvo linguístico definido; não é recreação genérica. | P1 | `tip-jogos-por-nivel` |
| **Trabalhar com os interesses do aluno** (viagem, trabalho, estudo, futebol, tecnologia) | Já há `goal` e `interests` no cadastro; falta a tradução disso em escolha de texto e tarefa. | P1 | `tip-interesses-aluno` |
| **Corrigir escrita** (ortografia × gramática × coerência, com dois pontos por redação) | Hoje a correção de fala está coberta; a de escrita não. | P2 | `tip-correcao-escrita` |
| **Rubrica simples de progresso e portfólio** | Liga o Apanhado ao módulo de progresso individual já implementado no app. | P2 | `tip-avaliacao-progresso` |
| **Estratégias por L1** (ja: artigos e plurais; ar: vogais e artigo; fr: nasalidade; en: S final e subjuntivo) | As dicas por L1 existem nos cartões, mas falta a visão global de "o que cobrar primeiro" para cada língua materna. | P2 | `tip-estrategias-l1` |

---

## 4. Plano de ação recomendado

### Rodada 1 — P1 imediato (12 cartões, ~1 dia)

Fechar o que o aluno mais pergunta e o que o professor mais usa:

1. `a2-d-ti-palatalizacao`, `a2-vogais-nasais`, `a2-z-final`, `a2-r-final`, `a1-g-j-qu-gu`
2. `b1-infinitivo-pessoal`, `b1-pronomes-colocacao`, `b2-perfeito-composto`, `b1-regencia-preposicoes`
3. `b1-ficar`, `b1-falsos-cognatos`
4. `a1-pedir-repeticao`, `tip-plano-50min`, `tip-musica-aula`, `tip-jogos-por-nivel`

Critério de aceite para cada um: PT → EN → fala → resposta curta → pelo menos três L1 →
palavras-chave que permitam achar o cartão digitando a **dúvida**, não o nome da regra.

### Rodada 2 — P1 complementar (≈15 cartões)

Conjunções com subjuntivo, particípios irregulares, estar+particípio, imperativo,
vocabulário escolar/trabalho, grau de certeza, cortesia e turnos de conversa.

### Rodada 3 — P2 (depende de produto)

Áudio/IPA, entonação, reconhecimento de fala, exercícios adaptativos por L1 e a ponte
cartão → material → exercício → progresso automatizada.

---

## 5. Riscos e ressalvas

1. **Transcrição "como se fala" é aproximada.** Ela usa o alfabeto latino com valor em inglês
   para dar contorno imediato; não substitui IPA nem áudio. Revisão de falante nativo pendente.
2. **Dicas por L1 são hipóteses.** Servem para antecipar erros, nunca para rotular o aluno.
   O mesmo cartão pode ter dica para `en` e `es` e nenhuma para `ja` — isso é cobertura
   desigual, não juízo sobre o aprendiz.
3. **BR é o padrão, PT é a variação comparada.** Exceto onde o cartão diz o contrário
   (`a1-r-inicial`, `c2-tu-voce-variacao`), as regras descritas valem para o português
   brasileiro. O professor deve dizer isso em voz alta na primeira aula.
4. **Cartão não é aula.** Um cartão responde; uma aula de 50 min encadeia apresentação,
   prática, produção e fecho. Use `tip-plano-50min` (quando existir) para transformar os
   cartões em sequência.
5. **Menos é mais.** Inserir 31 cartões de uma vez melhora a busca, mas não significa que o
   aluno deva ver 31 regras. Selecione no máximo **um alvo de som e um alvo de gramática por
   aula**, e recicle ao longo de 1/3/7 dias (`tip-revisao-espacada`).

---

## 6. Referências cruzadas

- Inventário completo e navegável: [`APANHADO-CONHECIMENTO.md`](APANHADO-CONHECIMENTO.md)
- Banco versionado: [`src/lib/domain/knowledge-bank.ts`](src/lib/domain/knowledge-bank.ts)
- Tipos e eixos: [`src/lib/domain/knowledge.ts`](src/lib/domain/knowledge.ts)
- Mapa A1–C2 e tópicos fora de escopo: [`src/lib/domain/curriculum.ts`](src/lib/domain/curriculum.ts)
- Aulas-base que originaram os cartões de fonética: [`scripts/seed-a1.ts`](scripts/seed-a1.ts),
  [`scripts/seed-a2.ts`](scripts/seed-a2.ts), [`scripts/seed-b1.ts`](scripts/seed-b1.ts)
- Planejamento e roadmap: [`PLANEJAMENTO-CONTEUDO-PLE.md`](../PLANEJAMENTO-CONTEUDO-PLE.md)
