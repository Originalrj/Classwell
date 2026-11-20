# Spec — Rampa PLE

> Especificação de produto e técnica. Documento vivo: muda à medida que o MVP ensina algo novo.

---

## 1. Resumo do produto

Plataforma de acompanhamento **1:1 para professores de Português como Língua Estrangeira (PLE)**.

O professor faz a **primeira aula** e responde a uma entrevista estruturada sobre o aluno. A plataforma converte essas respostas em um **diagnóstico por competência**, cruza com a **meta**, o **prazo** e o **perfil do aluno**, e devolve uma **Rampa de Aprendizado** — uma sequência ordenada de etapas com material, tarefas e marcos. A partir daí, o professor conduz, a IA sugere, o aluno executa e a plataforma mostra a evolução.

**Nome de trabalho:** Rampa. *(alternativas: Trilha, Ponte, Locus)*

---

## 2. Problema e proposta de valor

### O problema

O professor de PLE trabalha com um problema estrutural: **o mesmo material não serve para dois alunos no mesmo nível nominal.** Dois A1 podem estar em pontos completamente distintos — um reconhece o gerúndio, o outro não. E o nível do aluno muda em função de um objetivo que o professor só descobre informalmente: "preciso tirar o A2 na IME", "vou morar em Lisboa", "quero chamar meu neto pelo telefone".

Consequências práticas hoje:

1. **Diagnóstico depende da memória.** O professor sabe o que o aluno sabe, mas não onde isso está registrado de forma estruturada.
2. **Planejamento de aulas é feito do zero toda semana.** Não existe reaproveitamento nem modelo.
3. **Aluno não enxerga progresso.** Sem linha do tempo, a percepção de avanço fica na cabeça do professor.
4. **Material de PLE é fragmentado na internet.** Vídeo solto, PDF de gramática genérico, exercício sem contexto.
5. **Não existe registro de interação.** A conversa com o aluno vive no WhatsApp e some.

### A proposta de valor

| Para o professor | Para o aluno |
|---|---|
| transforming uma conversa em um plano estruturado e reutilizável | saber exatamente onde está e o que vem a seguir |
| reaproveitar material entre alunos, em vez de produzir do zero | conteúdo com o **tom** e os **exemplos** que funcionam para ele |
| ver a evolução por competência, não por impressão | enxergar a própria evolução ao longo das semanas |
| delegar à IA o trabalho braçal de montar e ajustar a rampa | receber material personalizado, não genérico |

### O diferencial defensável

Não é um LMS genérico nem um quadro de tarefas. São **três motores** que só fazem sentido juntos:

1. **Motor de diagnóstico** — entrevista estruturada → vetor de competências.
2. **Motor de rampa** — vetor + meta + prazo + perfil → sequência de etapas.
3. **Motor de personalização** — perfil do aluno → tom, exemplos, escolha de referências.

Somados a uma **biblioteca compartilhada entre professores**, que enriquece com o uso.

---

## 3. Personas

### Professor (usuário primário)

- **Bate-papo no Preply / Italk / Cambly**, ou professor independente com agenda própria.
- Trabalha com 5 a 40 alunos, de A1 a C2, de origens e objetivos os mais variados.
- Herdado da cultura do皱纹 de "professor de idiomas": dá aula, corrige no WhatsApp, não tem sistema.
- **Dores:** pouco tempo administrativo, medo de perder alunos por ausência de método, quer Differenciação sem dobrar o esforço.

### Aluno (usuário secundário, mas é quem vê o produto todo dia)

- 18 a 60 anos. lured por um objetivo concreto: viagem, trabalho, estudo, relacionamento, certificação.
- **Não é** um aluno de cursinho. Pode estar com 10 minutos de disponibilité por semana.
- Tolera mal plataforma complexa. Volta ao WhatsApp.
- Julga a plataforma pela **relevância** do material: "isso é coisa que eu realmente vou usar".

### Professor contribuidor (secundário)

- Escreve conteúdo para a biblioteca e recebe crédito e métricas de uso. Sumir do MVP.

---

## 4. Glossário

| Termo | Significado |
|---|---|
| **Avaliação** | Entrevista diagnóstica respondida pelo professor. Gera um vetor de competências. |
| **Vetor de competências** | Nível por skill (ouvir, falar, ler, escrever, gramática, léxico, pronúncia). |
| **Meta** | Nível CEFR e objetivo do aluno declarados na avaliação. |
| **Rampa** | Sequência ordenada de Etapas que leva do vetor atual à Meta. |
| **Etapa** | Unidade de trabalho. Tem objetivo, conteúdo, material e tarefa. |
| **Marco** | Checkpoint de nível ao longo da Rampa. |
| **Perfil do aluno** | Sopa de dados de personalização: idade,背景, profissão, personalidade, interesses. |
| **Tom** | Configuração de registro, densidade, humor e velocidade que a IA aplica ao falar e ao escrever material. |
| **Tarefa** | Trabalho designado pelo professor para o aluno, com entrega e devolutiva. |
| **Sessão** | Registro de uma aula ao vivo, vinculado a uma Etapa. |

---

## 5. Fluxos principais

### 5.1 Professor — do zero até a primeira aula seguinte

```
Wizard (4 passos)
  1. Dados + Goal
       identificação, e-mail, idade, L1, profissão, país, hobbies
       objetivo (viagem / trabalho / estudo / social / certificação / sonstiges)
       nível desejado + prazo + horas por semana
       autoavaliação do aluno (o aluno preenche, ou o professor marca)
       personality (ver §9)
     → cria aluno (conta criada) e dispara convite por e-mail
  2. Entrevista diagnóstica
       wizard de ~30 itens agrupados por skill
       o professor marca o nível observado + confiança (vi / ouvi / não sei)
       campo livre para anotações
     → vetor de competências
  3. Resultado
       radar por skill, níveis atingidos vs. faltantes
       até 3 lacunas críticas explicadas
       resumo em texto para enviar ao aluno
     → [Botão] Gerar Rampa
  4. Revisar Rampa
       editável: reordenar, remover, adicionar, ajustar sessões estimadas
       cada etapa: objetivo + material sugerido + tarefa sugerida + justificativa
     → publicar → notifica o aluno
```

### 5.2 Aluno

```
Login (convite por e-mail)
  → Dashboard: "Você está em A2. Faltam 4 etapas para B1. Sua tarefa vence amanhã."
  → Rampa: timeline vertical com estados (feito / atual / bloqueado / à frente)
  → Etapa: objetivo → material (leitura, áudio, vídeo) → prática → tarefa
  → Tarefas: lista, escrever / gravar áudio / mandar link / marcar como feita
  → Progresso: gráfico de nível por skill ao longo do tempo + marcos
  → Sessões: histórico e resumos
```

### 5.3 Ciclo semanal do professor (o que a plataforma tem queataloader)

1. Vê o dashboard: quem tem tarefa vencida, quem parou de fazer, quem tem sessão agendada.
2. Abre a ficha do aluno → aba **Rampa** → marca o que foi ensinado hoje.
3. Cria **Sessão** de 60 min, vinculado à Etapa atual, com pauta e próximo foco.
4. Cria **Tarefa** para a semana. Escolhe a sugerida ou cria uma nova.
5. Sem tempo de corrigir → pede feedback à IA → edita → devolve.

---

## 6. Domínio e modelo de dados

### 6.1 Coleções Firestore

```
teachers/{teacherId}
users/{uid}                    perfil unificado + role
students/{studentId}
assessments/{assessmentId}      entrevistas diagnósticas
ramps/{rampId}
rampSteps/{stepId}
contents/{contentId}           biblioteca compartilhada
contentReports/{reportId}       denúncias de conteúdo
tasks/{taskId}
taskSubmissions/{submissionId}
sessions/{sessionId}
progressEvents/{eventId}       eventos append-only de evolução
diagnosticItems/{itemId}       banco de itens do diagnóstico (admin)
diagnosticItemsGlobal/{itemId} versão seeding oficial
libraryTags/{tagId}
notificacoes/{notifId}
```

### 6.2 Documentos principais

#### `users/{uid}`

```ts
{
  uid: string
  role: 'teacher' | 'student' | 'admin'
  displayName: string
  email: string
  photoUrl?: string
  locale: 'pt-BR' | 'en' | 'es'
  createdAt: Timestamp
  onboardingStep?: number       // wizard do professor
}
```

#### `teachers/{teacherId}`

```ts
{
  uid: string                    // == users/{uid}
  headline: string               // "Professor de PLE, 8 anos, foco em我公司 beginners"
  bio: string
  country: string
  cefrLevelsTaught: CefrLevel[]
  hourlyRate?: number
  defaultSessionMinutes: number   // 45 | 60
  defaultToneId: string           // tom padrão (§9)
  libraryCredits: number          // pontos por contribuir material
  stats: { students: number, publishedContents: number, totalUses: number }
  createdAt: Timestamp
}
```

#### `students/{studentId}`

```ts
{
  id: string
  teacherId: string
  authUid?: string               // preenchido quando o aluno aceita o convite
  name: string
  email: string                  // convite enviado para cá
  inviteStatus: 'pending' | 'accepted'
  inviteToken: string

  // --- Meta ---
  goal: GoalCode                 // travel | work | study | social | exam | relationship | general
  goalDetail: string             // "vou tirar A2 na IME na Itália em março"
  targetCefr: CefrLevel
  targetDate?: string            // ISO date
  weeklyHours: number
  sessionMinutes: number

  // --- Nível atual (derivado da última avaliação aceita) ---
  currentCefr: CefrLevel
  skillVector: Record<SkillCode, CefrLevel>
  lastAssessmentId: string

  // --- Perfil / personalização ---
  profile: {
    age: number
    birthdate?: string
    l1: string                   // idioma materna
    country: string
    city?: string
    occupation: string
    occupationDomain?: string   // tech, saúde, hotelaria, indústria...
    priorStudyYears: number     // anos de estudo formal de português/linguística
    priorLanguagesStudied: string[]  //aprendeu inglês/spanhol/francês? → analogias
    personality: PersonalityTag[]      // §9
    interests: string[]              // culinária, futebol, música, Games...
    familyStatus?: string            // tem filhos, parceiro lusófono...
    previousLivingAbroad?: boolean
  }

  toneOverride?: Partial<Tone>   // se o professor quiser ajustar à mão
  status: 'active' | 'paused' | 'archived' | 'finished'
  tags: string[]
  createdAt: Timestamp
  lastActiveAt: Timestamp
  lastSessionAt?: Timestamp
}
```

#### `assessments/{assessmentId}`

```ts
{
  id: string
  studentId: string
  teacherId: string
  status: 'draft' | 'submitted' | 'superseded'
  method: 'trial_class' | 'followup' | 'self_assessment' | 'imported'

  items: Array<{
    itemId: string               // referência diagnosticItems
    level: CefrLevel | 'unknown'
    confidence: 'saw_produce' | 'saw_recognize' | 'asked' | 'not_assessed'
    note?: string
  }>

  freeNotes: string
  teacherDeclaredLevel?: CefrLevel   // o que o professor diria de olhos fechados
  studentDeclaredLevel?: CefrLevel   // autoavaliação

  // resultado
  result?: {
    skillVector: Record<SkillCode, CefrLevel>
    overall: CefrLevel
    ceiling: CefrLevel            // o mais alto demonstrado em qualquer item
    floor: CefrLevel              // o mais baixo demonstrado
    gaps: Gap[]                   // §7.4
    summaryText: string           // texto para o aluno
    summaryRequestedAt?: Timestamp
  }

  createdAt: Timestamp
  submittedAt?: Timestamp
  supersededBy?: string
}
```

#### `ramps/{rampId}`

```ts
{
  id: string
  studentId: string
  teacherId: string
  status: 'draft' | 'published' | 'completed' | 'abandoned'
  version: number                // incrementa a cada regeração relevante

  sourceVector: Record<SkillCode, CefrLevel>
  goal: GoalCode
  goalDetail: string
  targetCefr: CefrLevel
  targetDate?: string
  totalWeeksEstimate: number
  totalSessionsEstimate: number

  generation: {
    model: string
    promptVersion: string
    generatedAt: Timestamp
    tokensIn: number
    tokensOut: number
    costUsd: number
    acceptedEdits: number        // quanto o professor editou → métrica de qualidade
  }

  stepIds: string[]              // ordem canônica
  publishedAt?: Timestamp
  createdAt: Timestamp
}
```

#### `rampSteps/{stepId}`

```ts
{
  id: string
  rampId: string
  studentId: string
  teacherId: string
  order: number

  title: string                  // "Pedir informações no aeroporto"
  goal: string                   // o que o aluno DEVE conseguir fazer ao final
  canDo: string[]                // 2-4 can-do statements
  why: string                    // justificativa ligada ao objetivo do aluno

  skills: SkillCode[]
  levelFrom: CefrLevel
  levelTo: CefrLevel
  primaryFocus: 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing' | 'pronunciation' | 'culture'

  grammarPoints: string[]
  lexicalSets: string[]
  culturalNotes?: string

  contentIds: string[]           // material da biblioteca (§10)
  suggestedTaskId?: string       // tarefa sugerida pela IA
  prerequisiteStepIds: string[]

  estimatedSessions: number      // 0.5 - 4
  estimatedMinutes: number

  status: 'locked' | 'available' | 'in_progress' | 'done' | 'skipped'
  progress: number               // 0..1 (derivado de tarefas/sessões)
  startedAt?: Timestamp
  completedAt?: Timestamp
  completedBy: 'teacher' | 'student' | 'auto'

  editedByTeacher: boolean       // marca etapas tocadas à mão (protege da regen)
  generated: boolean
  createdAt: Timestamp
}
```

#### `contents/{contentId}`

```ts
{
  id: string
  title: string
  slug: string
  type: 'explanation' | 'exercise' | 'quiz' | 'audio' | 'video' | 'reading' | 'infographic' | 'worksheet' | 'checklist'

  body?: string                  // markdown (explicações, exercícios, quiz)
  bodyFormat: 'markdown' | 'blocks' | 'media-only'
  media: MediaRef[]              // áudio, vídeo, imagens, PDF (Storage)
  answerKey?: string             // para exercises/quiz

  // metadata de matchmaking (§10.2)
  cefrMin: CefrLevel
  cefrMax: CefrLevel
  skills: SkillCode[]
  primarySkill: SkillCode
  grammarTags: string[]          // "presente indicativo", "ser vs estar"
  lexicalTags: string[]          // "comida", "saúde", "transporte"
  themeTags: string[]            // "viagem", "trabalho", "estudo", "social", "corpo"
  register: 'informal' | 'neutro' | 'formal'  // REQUIRED para PLE
  countryTags: string[]          // PT vs BR
  dialectTags: string[]          // SP, RJ, PT, BR, PA, MZ
  estMinutes: number

  source: 'human' | 'ai' | 'ai_reviewed'
  authorId: string
  status: 'draft' | 'in_review' | 'published' | 'rejected' | 'deprecated'

  // curadoria
  qualityScore: number           // 0..1, recalculado
  usageCount: number
  ratingAvg?: number
  ratingCount: number
  reportCount: number

  version: number
  supersedes?: string
  createdAt: Timestamp
  publishedAt?: Timestamp
}
```

#### `tasks/{taskId}`

```ts
{
  id: string
  studentId: string
  teacherId: string
  stepId?: string

  title: string
  instructions: string           // markdown
  type: 'exercise' | 'essay' | 'speak' | 'read' | 'project' | 'exam' | 'self_check'

  suggestedContents: string[]    // itens da biblioteca para executar
  dueAt?: Timestamp
  estimatedMinutes?: number

  status: 'assigned' | 'in_progress' | 'submitted' | 'graded' | 'returned' | 'expired'
  createdAt: Timestamp
  returnedAt?: Timestamp
}
```

#### `taskSubmissions/{submissionId}`

```ts
{
  id: string
  taskId: string
  studentId: string
  teacherId: string

  text?: string
  audioUrl?: string
  links: string[]
  attachments: MediaRef[]

  rubric: RubricScores           // §11.3
  overallEstimate?: CefrLevel

  teacherFeedback?: string
  aiFeedback?: string            // rascunho
  aiFeedbackMeta?: { model, promptVersion, accepted: boolean, editedAt }
  nextStepSuggestion?: string

  submittedAt: Timestamp
  gradedAt?: Timestamp
  gradedBy: 'teacher' | 'ai' | 'human_review'
}
```

#### `sessions/{sessionId}`

```ts
{
  id: string
  studentId: string
  teacherId: string
  stepId?: string

  scheduledAt: Timestamp
  durationMinutes: number
  status: 'scheduled' | 'done' | 'no_show' | 'cancelled'

  topicsCovered: string[]
  whatWorked: string
  whatToReview: string[]
  nextFocus: string
  studentMood?: 'great' | 'good' | 'neutral' | 'tired' | 'frustrated'

  createdAt: Timestamp
}
```

#### `progressEvents/{eventId}`

Append-only. Fonte de verdade para os gráficos.

```ts
{
  id: string
  studentId: string
  at: Timestamp
  kind: 'level_change' | 'step_done' | 'milestone' | 'assessment' | 'streak' | 'note'
  skill?: SkillCode
  from?: CefrLevel
  to?: CefrLevel
  delta?: number            // em "meios níveis"
  meta: object
  createdBy: 'system' | 'teacher' | 'student'
}
```

---

## 7. Motor de diagnóstico

### 7.1 Anatomia de um item

```ts
{
  id: string
  skill: SkillCode
  prompt: string                  // "Aluno consegue falar de si mesmo e da rotina diária"
  descriptors: Record<CefrLevel, string>   // o que se espera em cada nível
  order: number                  // ordenação cognitiva dentro da skill
  pillar?: 'canDo' | 'grammar' | 'lexis' | 'phonology' | 'pragmatics'
  tags: string[]
  active: boolean
}
```

### 7.2 Banco de itens (semente inicial)

**Linguagens / skills:** `listening` `speaking` `reading` `writing` `grammar` `vocabulary` `pronunciation` `pragmatics`

| # | Skill | Item (A1) | A2 | B1 | B2 |
|---|---|---|---|---|---|
| 1 | listening | Reconhece nomes e números | Entende instruções simples em lugares públicos | Segue uma conversa em velocidade normal | Compreende Implícitos e humor em conversa |
| 2 | speaking | Se apresenta com frases soltas | Pede informações e relata o dia a dia | Sustenta um argumento simples | Opina e negocia com espontaneidade |
| 3 | reading | Lê placas e etiquetas curtas | Lê um e-mail simples | Lê um artigo de revista | Lê texto opinativo e infere |
| 4 | writing | Escreve frases e números | Escreve uma mensagem curta | Escreve um parágrafo coeso | Escreve texto argumentativo com registro |
| 5 | grammar | Usa "ser/estar" em frases fixas | Presente e pretérito perfeito básico | Pretérito imperfeito e contraste | Concordância complexa, regência, conectivos |
| 6 | vocabulary | Vocabulário temático (100-300 palavras) | 600-800 palavras funcionais | Variedade e/colocação | Parônimos, registros, idiomatismo |
| 7 | pronunciation | Sons-vowel isolatedos | Entonação em perguntas | Ligação de sons, ritmo | Sotaque reconhecível, nuance |
| 8 | pragmatics | Usa "por favor" | Escolhe registro adequado (Você/tu) | Faz pedidos indiretos | Ironia, mitigação, eufemismo |

**Meta:** 60-80 itens. Versão inicial: 40 (5 por skill, ordenados), cresce por curadoria.

### 7.3 Algoritmo de pontuação

Entrada: `items[]` marcados + `confidence[]`.

**Passo 1 — resolver por skill.**
Para cada skill, ordene os itens respondidos por `level` atribuído. Descarte `unknown` para o cálculo (mas mantenha-os para a lista de "não avaliado").

**Passo 2 — nível observado por skill.** Use o **mediano** dos níveis marcados, não a média — evita que um itemAdvanced isolado puxe o resultado. Depois:

```
observed = median(levels)
confidencePenalty = 0.4 * count(confidence == 'not_assessed') / totalItemsInSkill
skillLevel = max(A1, observed - confidencePenalty)
```

**Passo 3 — coerência vertical.** Um aluno não pode estar em C1 ouvindo e A1 escrevendo sem que isso seja explicitado. Se `max(skills) - min(skills) >= 3`, o sistema:
- mantém o vetor como está,
- marca `profileSkew: true` no resultado,
- gera automaticamente duas **etapas de nivelamento** na rampa (uma para o skill mais baixo, uma para o mais alto) com peso maior.

**Passo 4 — nível geral.**
```
overall = min(skills)         // conservador: o que ele CONSEGUE fazer é o gargalo
ceiling = max(skills)         // o que ele já tocou — é onde ancorar aulas motivadoras
```
Mostrar os dois. `overall` é o que vai para o rótulo grande; `ceiling` é o gancho de motivação ("você já tocou B1 na audição").

**Passo 5 — divergência declarada.**
Se `teacherDeclaredLevel != overall`, mostrar um aviso: *"Você marcou A2 no geral, mas o vetor indica B1 em ouvir e A1 em escrever. Você quer nível de entrada保守 (B1) ou paranoid (A1)?"*. Default: **conservador** — a rampa começa pelo skill mais baixo.

### 7.4 Lacunas (`gaps`)

```ts
Gap = {
  skill: SkillCode
  from: CefrLevel
  to: CefrLevel
  criticality: 'critical' | 'important' | 'nice_to_have'
  reason: string       // "bloqueia tudo: sem escrita não dá para fazer a tarefa de trabalho"
}
```

Regra de criticidade: um skill é `critical` se ele está **2+ níveis abaixo** do `overall` ou se está **involuído no objetivo** (`goal`). Exemplo: objetivo `work` → `writing` e `pragmatics` sobem automaticamente para `critical`.

---

## 8. Motor de geração de Rampa

### 8.1 Entradas

```
Avaliação (vetor de competências + notas livres)
  + Meta (goal, goalDetail, targetCefr, targetDate, weeklyHours, sessionMinutes)
  + Perfil do aluno (idade, L1, país, profissão, intérêt, personality)
  + Perfil do professor (nível que ensina, tom padrão)
  + Itens de biblioteca candidatos (§10.3)
  + Rampas anteriores deste aluno (para continuidade)
```

### 8.2 Regras determinísticas (antes da IA)

Estas regras **rodam em código** e a IA trabalha dentro delas. Isso mantém o resultado previsível e barato.

1. **Carga semanal.** `sessionsPerWeek = round(weeklyHours * 60 / sessionMinutes)`. Uma rampa não pode exigir mais que isso, ou vira ficção.
2. **Ordem dehabilitação.** Skills de recepção (ouvir, ler) antes de skills de produção (falar, escrever) nas primeiras etapas — é o padrão didático de PLE e reduz frustração.
3. **Trilha obrigatória.** Se `goal == 'exam'`, inserir uma etapa de "estratégia de prova" na posição que antecede o marco.
4. **Ancoragem de topo.** Se `ceiling > overall`, uma das primeiras 3 etapas deve trabalhar no skill do `ceiling` — é onde o aluno sente avanço imediato.
5. **Serrilha de níveis.** Nenhuma etapa pode pular mais de 1 nível dentro da mesma skill. Etapas sobrepostas de nível são permitidas entre skills diferentes.
6. **Marco obrigatório.** Deve existir pelo menos um `milestone` a cada nível cheio.
7. **Contingência.** Se `targetDate` exigir mais velocidade que a carga semanal permite, gerar duas variants: "realista" e "comprimida", e avisar. Nunca gerar silenciosamente uma rampa impossível.

### 8.3 Chamada à IA

**Modelo:** Claude Sonnet 4.5 (bom custo-benefício para português e para material pedagógico). Fallback para Haiku em rascunhos de baixo risco.

**Prompt — sistema:**

```
Você é designer instrucional especializado em Português como Língua Estrangeira (PLE).
Você projeta rampas de aprendizado personalizadas, com foco em comunicabilidade real,
não em gramática normativa.

REGRAS INEGOCIÁVEIS
1. Respeite EXATAMENTE o vetor de competências e a carga semanal fornecidos.
2. A rampa precisa fechar a lacuna entre o vetor atual e o nível-alvo. Nada mais, nada menos.
3. Todo material deve estar no TOM especificado. Exemplos devem vir dos DOMÍNIOS
   de interesse do aluno, nunca de listas genéricas de textbook.
4. Nunca invente material que não exista na biblioteca quando a biblioteca foi fornecida.
   Se precisar de algo fora dela, descreva o que precisa e marque needsNewContent: true.
5. Cada etapa precisa ser executável em 1-4 sessões de {sessionMinutes} minutos.
6. Nada de listas de 50 palavras isoladas. Tudo em contexto comunicativo.
7. Português como_second_language: o aluno não fala português nativo como L1.
   Não assuma que ele sabe expressões idiomáticas, nem que percebe ironia,
   nem que distingue registro formal de informal sem apoio explícito.
8. Escreva em português do Brasil, com clareza de professor, sem jargão
   metalinguístico desnecessário.

FORMATO DE SAÍDA: JSON estrito (schema abaixo). Sem markdown, sem texto antes/depois.
```

**Schema de saída (structured output):**

```ts
{
  positioningStatement: string,        // 2-3 frases: onde o aluno está e por onde vai
  studentSummaryForSharing: string,     // texto para mandar ao aluno, tom empático
  variants: Array<{ label, warning?, stepIds: string[] }>,   // realista / comprimida
  steps: Array<{
    tempId: string,
    title: string,
    goal: string,
    canDo: string[],
    why: string,
    skills: SkillCode[],
    primaryFocus: FocusCode,
    levelFrom: CefrLevel,
    levelTo: CefrLevel,
    grammarPoints: string[],
    lexicalSets: string[],
    culturalNotes?: string,
    prerequisiteTempIds: string[],
    estimatedSessions: number,
    needsNewContent: boolean,
    contentRequests: Array<{ type, cefr, skills, topic, estMinutes, why }>,
    suggestedTask: {
      title, type, instructions, estMinutes,
      rubricFocus: string[]      // quais dimensões da rubrica esta tarefa exercita
    },
    milestone?: { afterThis: true, label, checkCanDo: string[] }
  }>
}
```

**Duas chamadas, não uma:**

| Chamada | Entrada | Saída | Custo aprox. |
|---|---|---|---|
| `generate-ramp` | vetor + meta + perfil + regras | steps[] | ~$0.12 |
| `match-contents` | steps[] + candidatos da biblioteca | mapeamento step→contentIds[] | ~$0.04 |
| `materialize-content` (N chamadas) | contentRequest | corpo em markdown | ~$0.03 cada |

O passo 2 usa busca determinística (§10.3) com a IA apenas desempatando e Podando top-N. Menos alucinação, mais barato.

### 8.4 Anatomia de uma Etapa (o que o professor e o aluno leem)

```
ETAPA 3 · A2 → B1
Comer no restaurante: escolher, pedir e reclamar

OBJETIVO
Ao final desta etapa o aluno consegue pedir uma refeição completa,
entender as opções ereaWARE mesmo se o garçom falar rápido.

VOCÊ JÁ SABE                                    VOCÊ VAI APRENDER
✓ Pedir um café e um pão de queijo             ✓ Fazer o pedido completo
✓ Dizer o que não gosta                        ✓ Ler e comparar a lista
✓ Pedir a conta                                ✓ Reclamar educadamente
                                                ✓ Usar "está". "va">

POR QUE ESTA ETAPA AGORA
Você vai estar no Brasil em novembro e já reservationou um
restaurante para o aniversário da sua sogra. Este é o cenário
de maior risco do seu objetivo.

MATERIAL
▸ "No restaurante — explicações + diálogo"      (explanation, A2)
▸ "Diálogo: um almoço em São Paulo"            (audio, A2, 4min)
▸ "Vocabulário: o prato principal"             (infographic, A2)
▸ "Exercício: no restaurante"                  (exercise, A2, 15min)

TAREFA SUGERIDA
Monte um cardápio fictício de 3 pratos para o seu
restaurante favorito e escreva o diálogo do garçom.   ⏱ 40min

[ professor: editar ] [ publicar etapa ]
```

### 8.5 Edição e versioning

- Toda alteração manual marca `editedByTeacher: true` e **trava** a etapa contra regeneração automática.
- `regenerate` aceita escopo: `all` | `fromStep` | `onlyUnedited`.
- Diff antes de aplicar: o professor vê "3 etapas alteradas, 1 removida, 2 novas" e aprova.
- Histórico de rampa versionado. `ramp.version` incrementa.

### 8.6 O que acontece quando o aluno trava

Triggers de revisão:
- `currentStep.progress < 0.3` após `estimatedSessions * 1.5` → sugestão de "simplificar etapa".
- 3 tarefas vencidas seguidas → sugestão de "revisar meta e carga".
- Aluno reprova uma tarefa duas vezes → sugerir replanejar a etapa, não punir.

---

## 9. Perfil do aluno e motor de personalização (Tom)

Esta é a camada que diferencia o produto. **O mesmo conteúdo gramatical do "passado" é escrito de cinco jeitos diferentes** dependendo do perfil.

### 9.1 Personality tags

```ts
PersonalityTag =
  | 'shy'            // tímido — precisa de tempo de aquecimento, não gosta de simular em público
  | 'anxious'        // ansioso com erros — precisa de segurança e elogio específico
  | 'talkative'      // falante — avança rápido, cansa com gramática seca
  | 'analytical'     // analítico — gosta de entender a regra, funciona bem com texto
  | 'visual'         // visual — aprende com diagrama, mapa, cor
  | 'auditory'       // auditivo — precisa ouvir antes de ler
  | 'kinesthetic'    // kinestésico — aprende fazendo, movendo
  | 'perfectionist'  // perfeccionista — precisa de rubrica explícita
  | 'impatient'      // impaciente —遭 odia abstração, precisa de resultado rápido
  | 'curious'        // curioso — aproveita desvio cultural
  | 'structured'     // metódico — gosta de plano visível
  | 'freeform'       // avesso a plano — precisa de flexibilidade
```

Selecionadas pelo professor, com uma pergunta aberta: *"Como é o aluno na aula? O que funciona, o que trava?"*.

### 9.2 O objeto `Tone`

```ts
Tone = {
  formality: 'tu' | 'você' | 'misto'          // registrado -> Brasil usa 'você'
  addressStyle: 'firstName' | 'formal'
  humor: 'none' | 'light' | 'playful'
  explanationDepth: 'minimal' | 'standard' | 'deep'
  exampleCulture: 'target' | 'learnerL1' | 'both'   // exemplos de Portugal/Brasil, da L1, ou de ambos
  tempoPace: 'slow' | 'medium' | 'fast'
  scaffolding: 'high' | 'medium' | 'low'     // quanto apoio visual/estrutural
  errorCorrection: 'immediate' | 'delayed' | 'at_end'
  challengeTone: 'encouraging' | 'direct' | 'playful'
  metaphorSource?: string                       // ex.: "usa analogias com|dfjasculinino None
}
```

### 9.3 Como o Tom é aplicado

O `Tone` entra **como instrução no system prompt** de toda geração (conteúdo, tarefa, feedback, resumo). O modelo de conteúdo recebe:

> **TOM:** você está falando com Yuki, 34 anos, engenheira de software em Berlim, tímida e
> analítica, aprendendo com inglês como L1. Enderece por "Yuki" e não por "você".
> Explique com profundidade padrão. Exemplos devem vir do cotidiano dela
> (trabalho de TI, café, metrô). Corrija erros no final da atividade, não no meio.
> Sem piadas.

**De onde vem cada campo:**

| Campo | Origem |
|---|---|
| `formality` | país do aluno (regra: BR → você; PT → tu) + ajuste do professor |
| `addressStyle` | `firstName` se idade < 30 ou `shy`/`anxious`; `formal` se idade > 50 ou `perfectionist` |
| `humor` | `shy` → `light`; `talkative` → `playful`; `impatient` → `light` (senão frustram) |
| `explanationDepth` | `analytical` → `deep`; `impatient` → `minimal`; default `standard` |
| `exampleCulture` | `priorLanguagesStudied.length > 0` → `learnerL1` (analogia com inglês); senão `target` |
| `tempoPace` | `weeklyHours < 3` → `slow`; `weeklyHours > 10` → `fast` |
| `scaffolding` | `anxious`/`shy` → `high`; `perfectionist` → `high`; `talkative`/`impatient` → `low` |
| `errorCorrection` | `anxious` → `delayed`; `analytical` → `immediate`; default `at_end` |

O professor vê o `Tone` resolvido na ficha do aluno e pode sobrescrever qualquer campo à mão (`toneOverride`). **Nada de caixa-preta:** o professor sempre vê e edita.

### 9.4 Onde o Tom aparece para o aluno

1. **Copy da interface** — "Olá, Yuki" vs. "Boa aula, Sr. Tanaka".
2. **Exemplos e conteúdo** — os cenários dos exercícios.
3. **Feedback** — "Excelente! Você acertou a concordância. Um detalhe: no plural também precisa do 's'." vs. "Bom. Vamos ver dois pontos: ..."
4. **Rótulos de dificuldade** — "Um pouquinho difícil" vs. "Avançado".
5. **Sugestões de ritmo** — "Você tem 2h por semana. Esta rampa cabe, mas é puxada."

---

## 10. Biblioteca compartilhada

### 10.1 Princípio

Material **não** é propriedade de um aluno. Material é da **plataforma**, e fica melhor com o uso de todos os professores. Aluno nunca vê material de outro aluno explicitamente — vê o que serve para ele.

### 10.2 Metadata para matchmaking

Toda peça de conteúdo carrega:

- **Nível:** `cefrMin`, `cefrMax`
- **Competência:** `skills`, `primarySkill`
- **Tema:** `themeTags` —这也是 o gancho do `goal` (viagem, trabalho, estudo, social, corpo, casa, tecnologia, cultura)
- **Conteúdo linguístico:** `grammarTags`, `lexicalTags`
- **Registro:** `register` (crítico para PLE — english≠português em formalidade)
- **Variedade:** `dialectTags` (BR, PT, SP, RJ…), `countryTags`
- **Peso:** `estMinutes`
- **Qualidade:** `qualityScore`, `ratingAvg`, `reportCount`

### 10.3 Busca e ranking

**Busca determinística (código, sem IA):**

```ts
candidates = contents
  .filter(c => c.status === 'published')
  .filter(c => c.skills intersects step.skills)
  .filter(c => c.cefrMin <= step.levelTo && c.cefrMax >= step.levelFrom)
  .filter(c => c.themeTags intersects [goal, ...student.interests])
  .filter(c => c.dialectTags includes student.country ?? 'BR')
  .filter(c => !c.isDeprecatedFor(student.id))
```

**Ranking:**

```
score = 0.30 * nivelMatch                 // proximidade ao centro da faixa da etapa
      + 0.25 * goalRelevance             // overlap de themeTags com goal + interests
      + 0.20 * qualityScore              // curadoria
      + 0.10 * log10(usageCount + 1)     // batalha de Matthews: o que funciona é usado
      + 0.10 * coverageBonus              // executa o que a etapa pede (se变身?)
      + 0.05 * freshness                 // penaliza conteúdo sem uso há > 6 meses
```

A IA recebe o **top-30** por etapa e devolve uma seleção final de 3-5 itens, mais `needsNewContent` quando a cobertura é insuficiente.

### 10.4 Ciclo de vida de um conteúdo

```
draft ──▶ in_review ──▶ published ──▶ deprecated
   │           │             │
   └───────────┴─────────────┴──▶ rejected
```

- **Criação por professor:** qualquer professor escreve e submete para revisão.
- **Revisão:** pair review (outro professor) + check automático de qualidade (schema, nível coerente, register preenchido, `answerKey` presente em exercícios, mínimo de 300 palavras em explicações).
- **Publicação:** exige 1 revisão humana + score automático ≥ 0.7.
- **Crédito:** autor recebe `libraryCredits` proportional ao `usageCount` (destravável em features).
- **Depreciação:** conteúdo com `reportCount ≥ 3` ou 0 usos em 12 meses entra em revisão.

### 10.5 Reset de rampa com biblioteca nova

Quando a biblioteca cresce, o professor pode rodar `refresh-ramp`: o motor de matchmaking re-seleciona material das etapas `generated && !editedByTeacher` e sugere substituições, **sem tocar nas editadas à mão**.

---

## 11. Tarefas e avaliação

### 11.1 Tipos de tarefa

| Tipo | Entrega | Uso típico |
|---|---|---|
| `exercise` | respostas em forms | fixação de item gramatical/vocab |
| `essay` | texto | `writing`, todos os níveis |
| `speak` | áudio (≤ 3 min) | `speaking`, `pronunciation` |
| `read` | respostas de leitura | `reading` |
| `project` | texto + mídia + links | objetivos `work`, `study`, `social` |
| `exam` | prova cronometrada | objetivos `exam` |
| `self_check` | checklist do aluno | `anxious`/`shy`, baixa carga emocional |

### 11.2 Fluxo de entrega

```
professor: cria tarefa → dueAt
aluno: vê no dashboard → executa → entrega (texto / áudio / link)
sistema: notifica o professor
professor: abre entrega → [IA: rascunho de feedback] → edita → devolve
sistema: grava nota, cria progressEvent, atualiza skillVector se a nota mover
```

### 11.3 Rubrica

Escala CEFR-ish de 4 níveis (1–4) em 5 dimensões. Só as dimensões relevantes à tarefa são avaliadas.

```ts
RubricScores = {
  taskAchievement: 1|2|3|4   // cumpriu o que foi pedido?
  coherence:       1|2|3|4   // a mensagem se sustenta?
  range:           1|2|3|4   // variedade de recursos
  accuracy:        1|2|3|4   // gramática, ortografia, pontuação
  pronunciation?:  1|2|3|4   // só em tarefas de `speak`
}
```

**Mapeamento para nível (regra determinística):**

```
avg = média das dimensões aplicáveis
overallEstimate = avg < 1.75 ? 'A1'
                : avg < 2.50 ? 'A2'
                : avg < 3.25 ? 'B1'
                : 'B2'
```

Para tarefas `speak`, `accuracy` é substituída por `pronunciation` e `range` por `fluency`.

### 11.4 Feedback (IA + professor)

O modelo de feedback recebe: tarefa, instrução, entrega do aluno, rubrica, `Tone`, nível, e o `goal`. Produz:

1. **1-2 frases de abertura** — o que o aluno fez de bom. **Sempre.** (Motor `anxious`/`shy` exige isso explicitamente no prompt.)
2. **Pontos** — no máximo 3, ordenados por impacto, cada um com o exemplo do próprio aluno ("você escreveu *'eu vou no mercado'*, o correto é *'vou ao mercado'"*).
3. **Uma pergunta** que force o aluno a produzir a frase certa. Não entregue a resposta.
4. **Próximo passo** — 1 sugestão concreta ligada ao objetivo dele.
5. **Versão em `en`/outro idioma**, se o aluno precisar de ponte.

O professor tem **três ações**: aceitar como está, editar, ou descartar e escrever do zero. Cada ação treina o prompt (§18).

---

## 12. Progresso e motivação

### 12.1 Gráficos

1. **Evolução por skill** — linha do tempo, `progressEvents`, granularidade semanal. Mostra quando o aluno "sobe" e onde empaca.
2. **Radar atual × meta** — o两张 gráfico mais consultado.
3. **Burndown da rampa** — etapas concluídas × semanas restantes. "Você está 2 etapas atrasado no plano, ajuste a carga."
4. **Heatmap de atividade** — tipo GitHub, reforça constância.
5. **Timeline de marcos** — cada promoção de nível com a data e o que foi feito para chegar lá.

### 12.2 Mecânicas

- **Streak** de dias com tarefa feita. Congela em fim de semana se o `weeklyHours` ≤ 3 (senão é punição, não motivação).
- **Badges** — 5第一批: primeira tarefa, primeira semana completa, primeira promoção de nível, 10 sessões, rampa completa. Poucas e Verbais. Mais de 10 vira gamificação casada e irrita adulto.
- **Marco textual** — a cada promoção de nível, a plataforma gera um parágrafo curto do progresso, com dados do aluno, pronto para o professor mandar. Isso é o que o aluno compartilha.

---

## 13. IA: onde entra

| Ponto | Chamada | Modelo | Risco | Fallback |
|---|---|---|---|---|
| Resumo da avaliação | `summarize-assessment` | Sonnet | baixo | texto template |
| Gerar rampa | `generate-ramp` | Sonnet | médio | rampa template por `goal`+nível |
| Match de material | `match-contents` | Haiku (desempate) | baixo | top-5 do scoring |
| Criar conteúdo | `materialize-content` | Sonnet | médio | deixa `needsNewContent` |
| Gerar exercício | `generate-exercise` | Sonnet | baixo |库里 existente |
| Feedback de tarefa | `draft-feedback` | Sonnet | **alto** | professor escreve |
| Traduzir/ponte de idioma | `bridge-language` | Haiku | baixo | — |
| Resumo de sessão | `summarize-session` | Haiku | baixo | campos do professor |
| Sugerir badges/parabéns | `generate-celebration` | Haiku | baixo | template |

**Regra de ouro:** IA **nunca** escreve algo que vai direto para o aluno sem passar pelo professor. A exceção é o conteúdo gerado automatico, que entra como **rascunho** na biblioteca.

### 13.1 Guardrails

- Structured output (JSON schema) em toda geração.
- Validação Zod no backend antes de persistir.
- Auditoria: `generatedBy` + `promptVersion` em todo documento gerado.
- Detector de alucinação de conteúdo: se a IA citar um `contentId` que não existe ou cujo `cefrMax` não cobre a etapa, a chamada é rejeitada e cai no fallback.
- Sanitização de PII: nome e	local do aluno são substituídos por placeholders antes de ir para o modelo, exceto quando o `exampleCulture` exige.

---

## 14. Telas e navegação

### 14.1 Professor

```
/professor
├── /dashboard              alunos ativos · tarefas vencidas · sessões da semana
├── /alunos
│   ├── /novo               wizard 4 passos (§5.1)
│   └── /[studentId]
│       ├── (visão geral)   radar atual×meta · progresso · última sessão
│       ├── /avaliacao      entrevistas · histórico de nível
│       ├── /rampa          timeline editável · regen · diff
│       ├── /tarefas        criar · revisar · feedback
│       ├── /sessoes        agenda · histórico
│       ├── /progresso      gráficos · marcos
│       └── /perfil         §9 — meta, perfil, tom editável
├── /biblioteca             meus conteúdos + comunitária
├── /alunos/[id]/relatorio  gera relatório imprimível/PDF
└── /config                 perfil · tom padrão · assinatura
```

### 14.2 Aluno

```
/aluno
├── (dashboard)             "você está em A2" · próxima tarefa · etapa atual
├── /rampa                  timeline com estados
├── /etapa/[stepId]         objetivo · material · prática · tarefa
├── /tarefas                lista · executar · enviar
├── /progresso              gráficos · marcos · badges
├── /sessoes                histórico com resumos
└── /perfil                 meta declarada · interesses · "sugerir ajuste"
```

### 14.3 Regras de navegação

- `redirect` por papel no login: `teacher → /professor/dashboard`, `student → /aluno`.
- Aluno nunca vê rota de `/professor`, e vice-versa. Aplicado no middleware **e** nas rules.
- Deep link de conteúdo: `/conteudo/[slug]` acessível dos dois lados (o aluno vê a versão适配ada ao tom dele).

---

## 15. Auth, papéis e permissões

| Ação | Professor (dono) | Professor (outro) | Aluno | Anônimo |
|---|:--:|:--:|:--:|:--:|
| Ver perfil do aluno | ✅ | ❌ | ✅ (o próprio) | ❌ |
| Criar avaliação | ✅ | ❌ | ❌ | ❌ |
| Editar rampa | ✅ | ❌ | ❌ | ❌ |
| Marcar etapa como feita | ✅ | ❌ | ❌ | ❌ |
| Criar tarefa | ✅ | ❌ | ❌ | ❌ |
| Entregar tarefa | ❌ | ❌ | ✅ | ❌ |
| Ver entregas | ✅ | ❌ | ✅ (as próprias) | ❌ |
| Ler biblioteca publicada | ✅ | ✅ | ✅ (filtrada) | ❌ |
| Publicar na biblioteca | ✅ | ✅ | ❌ | ❌ |
| Ver dashboard | ✅ | ❌ | ✅ | ❌ |

### 15.1 Convite do aluno

1. Professor cria o aluno com e-mail.
2. Sistema cria `users/{uid}` com `role: student` **e senha aleatória**, gera `inviteToken`, e grava `students/{id}.inviteStatus = 'pending'`.
3. Mandamos um e-mail com link `/convite/{token}`.
4. No aceite: define senha → `students/{id}.authUid = uid` → `inviteStatus = 'accepted'`.
5. Tokens expiram em 14 dias. Professor pode reenviar ou gerar link manual (útil para aluno noWhatsApp).

---

## 16. Security Rules (esboço)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() { return request.auth != null; }
    function me() { return get(/databases/$(database)/documents/users/$(request.auth.uid)).data; }
    function isTeacher() { return isSignedIn() && me().role == 'teacher'; }

    function ownsStudent(sid) {
      return isTeacher()
        && get(/databases/$(database)/documents/students/$(sid)).data.teacherId == request.auth.uid;
    }
    function amStudent(sid) {
      return isSignedIn()
        && get(/databases/$(database)/documents/students/$(sid)).data.authUid == request.auth.uid;
    }
    function inStudentScope(sid) { return ownsStudent(sid) || amStudent(sid); }

    match /users/{uid} {
      allow read, write: if isSignedIn() && request.auth.uid == uid;
    }

    match /students/{sid} {
      allow read:  if inStudentScope(sid);
      allow create, delete: if isTeacher();
      allow update: if ownsStudent(sid)
        && request.resource.data.teacherId == resource.data.teacherId; // professor não pode trocar de dono
    }

    match /assessments/{aid} {
      allow read:  if inStudentScope(resource.data.studentId);
      allow write: if ownsStudent(resource.data.studentId);
    }

    match /ramps/{rid} {
      allow read:  if inStudentScope(resource.data.studentId);
      allow write: if ownsStudent(resource.data.studentId);
    }

    match /rampSteps/{steId} {
      allow read:  if inStudentScope(resource.data.studentId);
      // aluno só pode disparar ações de estado que não alterem conteúdo pedagógico
      allow update: if ownsStudent(resource.data.studentId)
        || (amStudent(resource.data.studentId)
            && request.resource.data.diff(resource.data).affectedKeys()
                 .hasOnly(['progress','status','completedAt','completedBy']));
    }

    match /tasks/{tid} {
      allow read: if inStudentScope(resource.data.studentId);
      allow write: if ownsStudent(resource.data.studentId);
    }

    match /taskSubmissions/{subId} {
      allow read: if inStudentScope(resource.data.studentId);
      allow create: if amStudent(resource.data.studentId)
        && request.resource.data.studentId == request.auth.uid;
      allow update: if ownsStudent(resource.data.studentId);
    }

    match /sessions/{sessId} {
      allow read: if inStudentScope(resource.data.studentId);
      allow write: if ownsStudent(resource.data.studentId);
    }

    match /progressEvents/{eid} {
      allow read: if inStudentScope(resource.data.studentId);
      allow create: if isTeacher();
      allow update, delete: if false;   // append-only
    }

    match /contents/{cid} {
      allow read: if isSignedIn() && (me().role == 'teacher' || resource.data.status == 'published');
      allow create, update: if isTeacher();
      allow delete: if isTeacher() && resource.data.authorId == request.auth.uid && resource.data.status == 'draft';
    }

    match /diagnosticItems/{itemId} { allow read: if isTeacher(); allow write: if me().role == 'admin'; }
    match /{document=**} { allow read, write: if false; }
  }
}
```

---

## 17. Stack, arquitetura e custos

### 17.1 Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Frontend | **Next.js 15** (App Router, TypeScript) | SSR para rotas por papel, server actions para escrita, deploy direto no App Hosting |
| UI | shadcn/ui + Tailwind | componentes acessíveis, sem vendor lock |
| Estado | TanStack Query + Zustand | cache de leitura, estado efêmero |
| Auth | Firebase Auth (e-mail/senha + Google) | suficiente para o modelo de convite |
| DB | **Firestore** | documentos, leitura simples por aluno, custo baixo nesse volume |
| Arquivos | Cloud Storage | áudio, vídeo, PDF, imagens |
| Backend | **Cloud Functions 2nd gen** (Node 20, TypeScript) | todas as chamadas de IA, jobs de notificação, webhook de e-mail |
| IA | Claude Sonnet 4.5 + Haiku 4.5 | melhor PT pedagógico do lineup / custo-benefício |
| E-mail | Resend (ou extension SMTP) | convite, notificação de tarefa, resumo de progresso |
| Gráficos | Recharts | leve, SSR-friendly |
| Validação | Zod | em todas as bordas (server actions, functions, forms) |
| Testes | Vitest (lógica) + Playwright (fluxos críticos) | |

### 17.2 Por que Firestore e não Postgres (para este caso)

O modelo é **document-heavy**, o acesso é quase sempre "carregue a ficha deste aluno e suas coleções", e a escala alvo (dezenas de milhares de usuários) não justifica o custo operacional de Postgres gerenciado. A transição seria painful mas possível: o acesso já passa por repositórios, não por SQL espalhado.

**Se o negócio escalar para multi-tenant organizacional (escolas,，应用 Franco-Italianas), aí sim Postgres.**

### 17.3 Custos estimados (100 alunos ativos, 30 professores)

| Item | Cálculo | $/mês |
|---|---|---|
| App Hosting | web + SSR | 25 |
| Cloud Functions | ~40k invocações | 5 |
| Firestore | ~2M reads, 200k writes | 12 |
| Storage + egress | ~20 GB, mídia de fala | 15 |
| Auth | 130 MAU | 0 |
| **Claude API** | ver abaixo | **~40** |
| Resend | 3k e-mails | 0 |
| **Total** | | **~$97** |

**Detalhe da IA (100 alunos):**

| Chamada | qtd/mês | unit | subtotal |
|---|---|---|---|
| `generate-ramp` | 25 (novos alunos) | $0.12 | $3.00 |
| `match-contents` | 25 | $0.04 | $1.00 |
| `materialize-content` | 60 | $0.03 | $1.80 |
| `draft-feedback` | 400 | $0.03 | $12.00 |
| `summarize-*` | 200 | $0.01 | $2.00 |
| cache hits (–60%) | | | –$10 |
| | | | **~$10** |

Margem generosa. O gargalo real é **tempo do professor**, não infraestrutura.

### 17.4 Estrutura de repositório

```
ple-rampas/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── professor/{dashboard,alunos,biblioteca,config}/
│   │   ├── aluno/{rampa,etapa,tarefas,progresso,sessoes,perfil}/
│   │   ├── conteudo/[slug]/
│   │   └── api/
│   ├── components/
│   │   ├── ui/                    # shadcn
│   │   ├── professor/
│   │   ├── aluno/
│   │   └── diagnostics/
│   ├── lib/
│   │   ├── firebase/{client,admin,firestore}.ts
│   │   ├── domain/                # regras puras, sem I/O
│   │   │   ├── diagnosis.ts       # §7
│   │   │   ├── ramp.ts            # §8.2
│   │   │   ├── tone.ts            # §9
│   │   │   ├── matching.ts        # §10.3
│   │   │   └── rubric.ts          # §11.3
│   │   ├── ai/
│   │   │   ├── prompts/
│   │   │   └── clients/
│   │   ├── validation/schemas.ts
│   │   └── repositories/          # única camada que fala com Firestore
│   ├── server/actions/             # server actions por domínio
│   └── types/
├── functions/
│   └── src/
│       ├── ai/prompts/
│       ├── triggers/
│       └── jobs/
├── scripts/seed/
├── firestore.rules
├── firestore.indexes.json
└── SPEC.md
```

**Princípio arquitetural:** `src/lib/domain/` é TypeScript puro, sem Firebase, sem React, testável unitariamente. É onde mora o valor: o diagnóstico, a rampa, o tom e o matching são **testáveis sem infra**. As Cloud Functions são apenas adaptadores de IO em volta dessa lógica.

---

## 18. Roadmap

### Fase 0 — Fundação (1 semana)
- Setup do projeto, Firebase, Auth com papéis
- Schemas Zod de todos os documentos
- `firestore.rules` com os papéis
- Repositórios + testes unitários de `lib/domain`
- Seed do banco de itens de diagnóstico

### Fase 1 — MVPProfessor (3 semanas)
**Critério de pronto:** um professor consegue criar um aluno, avaliar, gerar rampa e designar uma tarefa. O aluno consegue entrar, ver a rampa, entregar a tarefa.

- Wizard de novo aluno (dados → perfil/tom)
- Entrevista diagnóstica (motor §7 determinístico, sem IA)
- Resultado: radar + gaps
- Geração de rampa com IA + revisão
- Editor de rampa (reordenar, editar, remover, adicionar)
- Biblioteca mínima: CRUD + conteúdo seedado
- Tarefas: criar, receber entrega, ver feedback do professor
- Dashboards básicos dos dois lados

### Fase 2 — Aluno completo (2 semanas)
- Visualização da rampa (timeline com estados)
- Página da etapa com material embutido
- Progresso: gráficos básicos (evolução por skill + radar)
- Convite por e-mail funcional
- Notificação de tarefa (in-app + e-mail)

### Fase 3 — Automação e IA (2 semanas)
- `materialize-content` + revisão
- `draft-feedback` com rubrica
- `match-contents` automático nas etapas
- `summarize-assessment` / `summarize-session`
- Biblioteca com revisão e busca

### Fase 4 — Retenção e escala (contínuo)
- Badges, marcos, celebrações geradas
- Relatório exportável para o aluno
- Refresh de rampa com biblioteca nova
- Multi-tenant (escolas/franquias)
- App mobile (PWA primeiro)

---

## 19. Métricas de sucesso

### North star
**Professores ativos semanais com ≥ 3 alunos avaliados.** Indica que a plataforma virou parte do fluxo de trabalho, não uma vitrine.

### De produto
| Métrica | Meta (90 dias) |
|---|---|
| Avaliações concluídas / mês | 300 |
| Rampas publicadas / mês | 250 |
| Professor que edita ≥ 1 etapa por rampa | > 60% (se for < 30%, a IA está ruim) |
| Taxa de aceite de feedback IA | > 50% |
| Alunos que abrem a plataforma 2×/semana | > 40% |
| Tarefas com entrega em 7 dias | > 65% |

### De qualidade da rampa
| Métrica | Meta |
|---|---|
| Rampas completadas | > 30% em 6 meses |
| Promoções de nível registradas | > 50% dos alunos |
| Replanejamento de rampa (regen) | < 15% |

### De conteúdo
| Métrica | Meta |
|---|---|
| Itens publicados | 500 |
| Uso médio por item | > 8 alunos |
| Itens com `needsNewContent` gerados automaticamente | > 30% dos requests (sinal de que a biblioteca está crescendo) |

---

## 20. Riscos e decisões em aberto

### Riscos

| Risco | Mitigação |
|---|---|
| **Cold start da biblioteca** — sem conteúdo, a rampa não tem o que mostrar | Seed com 40 itens de alta qualidade gerados por的一 IA + revisados por 2 professores antes do beta. Fechar com 3 professores coautores |
| **Professor não adota** —习惯 do WhatsApp é forte | O valor precisa aparecer em < 2 min: diagnosticar e ver a rampa. Onboarding com um aluno real na conta |
| **Aluno não volta** — não é um LMS, é uma aula por semana | Notificação de tarefa + marco textual compartilhável. O produto não pode virar "c Plataforma de estudo", tem que ser "a próxima aula" |
| **IA gera material errado** — alucina gramática, nível inconsistente | Structured output + validação Zod + revisão humana obrigatória na biblioteca + o professor sempre edita |
| **PII de aluno vai para o modelo** | Placeholders antes da chamada; logging sem conteúdo |
| **Escopo** — PLE é amplo; tentar cobrir tudo | Começar em `goal ∈ {travel, work, exam}`. `social` e `relationship` depois |
| **Cold start de Professores** — ninguém publica conteúdo sem alunos | Mostrar conteúdo da comunidade primeiro, permitir "usar e dar crédito" desde o dia 1 |

### Decisões em aberto

1. **Nível de referência:** usar o CEFR clássico (A1-C2) ou adaptar a escala do **Cambridge / Instituto Cervantes / ACTFL**? Recomendo **CEFR com rótulos em português** ("Iniciante", "Elementar", "Intermediário", "Avançado", "Domínio") na UI, e o código CEFR no dado.
2. **PT vs BR como padrão.** Recomendo **BR por padrão** (maioria dos alunos de Preply), com dialeto como tag e um seletor no perfil do aluno. BR-only agora simplifica muito o conteúdo seedado.
3. **Preço.** Freemium (1 aluno grátis) + plano Professor (R$39/mês, 20 alunos) + plano Escola. Precisa de validação antes.
4. **Modelo de revisão da biblioteca:** pair review entre professores (gratuito, alinhado com o espírito) ou moderação central? Recomendo pair review com escrow: se o revisor for o autor, a publicação espera 7 dias.
5. **Fechar o `goal` de certificação.** Quais certificados cobrir primeiro? IME/DAP (Itália), DELE (Espanha), CELPE-Brasil,PLE exam? Isso define metade do conteúdo de `goal`.
6. **Áudio do aluno.** Gravação de fala em production é o killer feature para PLE, mas traz custo de Storage e risco de moderação. Considerar começar só com texto e adicionar áudio na Fase 3.

---

## Apêndice A — Vocabulário de CefrLevel

```
A1  — Iniciante
A2  — Elementar
B1  — Intermediário
B2  — Intermediário avançado
C1  — Avançado
C2  — Domínio
```

## Apêndice B — SkillCode

```
listening    — ouvir / compreensão oral
speaking     — falar / produção oral
reading      — ler / compreensão escrita
writing      — escrever / produção escrita
grammar      — morfossintaxe
vocabulary   — léxico
pronunciation— fonética e prosódia
pragmatics   — registro, cortesia, interação
```

## Apêndice C — GoalCode

```
travel       — viajar / turismo
work         — trabalho / profissional
study        — estudo / universidade
social       — fazer amigos / convivência
exam         — certificação
relationship — relacionamento interpessoal
general      — interesse geral
```

---

*Fim da spec. Próximo passo: Fase 0.*
