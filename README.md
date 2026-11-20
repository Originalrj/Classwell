# Classwell (Rampa PLE)

Plataforma de ensino de português para estrangeiros, com trilha por nível (A0, A1, A2...),
rampa de conteúdo, biblioteca, revisão espaçada e acompanhamento individual de alunos.

## Rodando localmente

Requisitos: Node 22+ e JDK 17+ (necessário apenas para os emuladores Firebase).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra <http://localhost:3000>.

### Login e cadastro de alunos

O fluxo de professor (`/professor`, `/professor/alunos`, `/professor/alunos/novo`) exige login.
Para avaliar sem usar um projeto Firebase real, use os emuladores:

```bash
#terminal 1
npm run emulators

# terminal 2
npm run dev
```

Em seguida:

1. Acesse <http://localhost:3000/entrar> e crie uma conta com perfil de professor.
2. Use o menu **Alunos** para cadastrar um aluno e registrar uma avaliação.
3. O painel do aluno mostra o radar de competências e o progresso.

A UI dos emuladores fica em <http://localhost:4000>. O `.env.local` de desenvolvimento usa
`NEXT_PUBLIC_USE_EMULATORS=true`, que conecta o app aos emuladores locais (Auth 9099,
Firestore 8080, Storage 9199).

## Estrutura

- `src/app` — rotas da aplicação (rampa, biblioteca, revisão, perfil, área do professor).
- `src/components` — interface e componentes de animação.
- `src/lib/firebase` — inicialização, repositórios e regras de acesso.
- `src/lib/content` — conteúdo pedagógico e dados de níveis.
- `scripts/verify.ts` — verificação automática da spec (`npm run verify`).
- `SPEC.md` — especificação do produto.
