# Classwell (Rampa PLE)

Plataforma de ensino de português para estrangeiros, com trilha por nível (A0, A1, A2...),
rampa de conteúdo, biblioteca, revisão espaçada e acompanhamento individual de alunos.

## Prévia visual

- **GitHub Pages:** <https://originalrj.github.io/Classwell/> — versão estática interativa,
  servida diretamente de [`docs/index.html`](docs/index.html) (não precisa rodar nada).
- **App local:** <http://localhost:3000/prototipo> com o servidor Next rodando (código em
  [`src/app/prototipo/page.tsx`](src/app/prototipo/page.tsx)).

O Pages já está ativado e aponta para `main` / `/docs` (configurado via API em
`POST /repos/{owner}/{repo}/pages`). Cada push no `main` dispara um novo build.

> A versão do Pages é autônoma (HTML/CSS/JS puros) e reproduz as interações da vitrine:
> troca de nível e de frase, dicas por L1, blocos da aula de 50 min, quiz e radar.

![Prévia visual do protótipo](docs/prototipo.png)

A vitrine mostra: cartão de frase PT → EN → "como se fala", dicas por idioma materno,
plano de aula de 50 minutos, mini-jogo, temas de interesse e radar de competências.

## Rodando localmente

Requisitos: **Node 22+** (Node 21 quebra com `ERR_REQUIRE_ESM`) e **JDK 17+** (necessário
apenas para os emuladores Firebase).

```bash
npm install
npm run emulators      # terminal 1
npm run seed:all       # terminal 2 (popular Auth + Firestore)
npm run dev            # terminal 3
```

Abra <http://localhost:3000>. A prévia visual interativa fica em
<http://localhost:3000/prototipo>.

> O `.env.local` de desenvolvimento já vem com `NEXT_PUBLIC_USE_EMULATORS=true`, que conecta
> o app aos emuladores locais (Auth 9099, Firestore 8080, UI 4000). O script `emulators`
> usa `--import/--export-on-exit` em `./emulator-data`, para os dados sobreviverem ao
> reinício. Se preferir começar do zero, use `npm run emulators:clear` e rode `npm run seed:all`.

## Login e cadastro de alunos

O fluxo de professor (`/professor`, `/professor/alunos`, `/professor/alunos/novo`) exige login.

**Contas de demonstração:**

- Professor: `professor@demo.com` / `Demo1234!`
- Aluno: `aluno.teste@demo.com` / `Senha123!`

A conta de professor vem com a aluna Ana Silva, avaliação e radar de competências. A biblioteca já é semeada
com **24 aulas** (A1 a C1, ~37 h), publicadas no Firestore.

Para recriar os dados depois de `emulators:clear` (ou se o emulador tiver sido reiniciado
sem persistência):

```bash
npm run seed:all
```

O login/cadastro (professor ou aluno) fica **na tela inicial** e também em `/entrar`, com
o mesmo formulário. O aluno autenticado é levado para `/aluno`.

## Aprovação de professores e admin

Qualquer pessoa pode se cadastrar como professor, mas a conta nasce como
`approval: 'pending'` e cai em `/aguardando-aprovacao`. Somente o administrador pode
aprovar, em `/admin/professores` (menu **Aprovações** do painel, visível só para admin).
Contas antigas sem o campo `approval` continuam valendo como aprovadas.

Depois de aprovados, os professores **compartilham** alunos, rampas e biblioteca — não
existe mais isolamento por `teacherId`. Configurações pessoais (`teachers/{uid}`) continuam
sendo editáveis apenas pelo dono ou pelo admin.

A conta admin local é criada via variáveis de ambiente (a senha nunca entra no repositório):

```bash
$env:ADMIN_EMAIL = "seu@email.com"
$env:ADMIN_PASSWORD = "senha-temporaria"
node scripts/seed-admin.mjs
```

## Apanhado de conhecimento

Em `/professor/biblioteca/apanhado` (menu **Apanhado**) está o índice de consulta rápida do
professor. São **72 informações** organizadas em três eixos:

- **Nível:** A0, A1, A2, B1, B2, C1, C2 (A0 é pré-nível pedagógico).
- **Tipo de conhecimento:** gramática, léxico, fonética/pronúncia, pragmática/registro,
  cultura/variação e ensino/estratégias.
- **Formato:** pergunta comum, regra/explicação, contraste com L1 e dica de aula.

Cada cartão traz a frase em **português**, a ponte em **inglês**, a versão **“como se fala”**,
a resposta curta para a aula e dicas de transferência por idioma materno (en, es, fr, de, it,
ja, zh, ar). A busca ignora acentos e combina termos — digitar `pronuncia` encontra
`pronúncia`. O professor também pode filtrar por nível, tipo, formato, L1 e tema.

O botão **“Criar material na biblioteca”** leva o cartão para o formulário de
`/professor/biblioteca` já preenchido (título, corpo PT/EN/fala, nível, competências e tags),
pronto para revisão e publicação. O acervo é código versionado em
[`src/lib/domain/knowledge-bank.ts`](src/lib/domain/knowledge-bank.ts); o inventário completo
está em [`APANHADO-CONHECIMENTO.md`](APANHADO-CONHECIMENTO.md).

Alguns exemplos do que o professor encontra: por que `deixar` soa com CH e `próximo` com S
(`a1-x-quatro-sons`), a diferença entre SS e S entre vogais (`a1-ss-som-unico`), R/RR
(`a1-r-inicial`), NH/LH (`a1-nh-lh`), o mapa dos tempos verbais (`b2-mapa-tempos`), voz
passiva (`b2-voz-passiva`) e concordância (`b2-concordancia-verbal`). As lacunas ainda
abertas e a priorização P0/P1/P2 estão em
[`AVALIACAO-LACUNAS-PLE.md`](AVALIACAO-LACUNAS-PLE.md).

## Estrutura

- `src/app` — rotas da aplicação (rampa, biblioteca, revisão, perfil, área do professor).
- `src/app/prototipo` — vitrine visual interativa do produto planejado.
- `src/components` — interface e componentes de animação.
- `src/lib/domain` — currículo, banco de diagnóstico, apanhado de conhecimento e regras de nível.
- `src/app/professor/biblioteca/apanhado` — busca e filtros do acervo de consulta do professor.
- `src/lib/firebase` — inicialização, repositórios e regras de acesso.
- `scripts/seed-a1.ts` … `seed-c1.ts` — as 24 aulas-base em markdown.
- `scripts/seed-biblioteca.ts` — publica as aulas na coleção `contents`.
- `scripts/seed-demo.mjs` — cria professor, aluna e avaliação de demonstração.
- `scripts/seed-admin.mjs` — cria o admin a partir de `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
- `scripts/verify.ts` — verificação automática da spec (`npm run verify`), incluindo o gate de aprovação.
- `SPEC.md` — especificação do produto.

## Verificação

```bash
npm run typecheck
npm run verify
```
