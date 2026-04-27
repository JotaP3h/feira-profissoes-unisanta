# SENTINEL AI — Landing Page

Landing page demonstrativa de uma empresa fictícia de segurança corporativa,
construída como peça de portfólio para a **Feira de Profissões da Unisanta**.

> ⚠️ **SENTINEL AI é uma marca fictícia.** Nada aqui representa um produto
> real. O projeto serve para demonstrar boas práticas de front-end moderno
> aos visitantes da feira.

## Stack

| Camada      | Tecnologia                                                   |
| ----------- | ------------------------------------------------------------ |
| Framework   | [React 18](https://react.dev) + [Vite 5](https://vitejs.dev) |
| Linguagem   | TypeScript (strict)                                          |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com) + tailwindcss-animate |
| UI Kit      | [shadcn/ui](https://ui.shadcn.com) (Button)                  |
| 3D          | [@splinetool/react-spline](https://github.com/splinetool/react-spline) |
| Variantes   | class-variance-authority + clsx + tailwind-merge             |
| Tipografia  | Google Fonts — Sora (300, 400, 500, 600, 700)                |

## Como rodar

```bash
cd sentinel-ai
npm install         # ~60s na primeira vez
npm run dev         # http://localhost:5173
```

Para build de produção:

```bash
npm run build       # gera dist/
npm run preview     # serve dist/ localmente
```

## Estrutura

```
sentinel-ai/
├── index.html                # Entry HTML (carrega Sora via Google Fonts)
├── public/
│   └── favicon.svg           # Ícone próprio (escudo + ponto verde)
├── src/
│   ├── main.tsx              # Bootstrap React
│   ├── App.tsx               # Raiz lógica (renderiza Index)
│   ├── index.css             # Tailwind base + variáveis HSL do tema
│   ├── lib/
│   │   └── utils.ts          # cn() — classnames util do shadcn
│   ├── components/
│   │   ├── Navbar.tsx        # Navbar fixa com blur e CTA
│   │   ├── HeroSection.tsx   # Hero com Spline 3D + texto staggered
│   │   └── ui/
│   │       └── button.tsx    # shadcn Button com variants extras
│   └── pages/
│       └── Index.tsx         # Composição final (Navbar + Hero)
├── tailwind.config.ts        # Tokens de tema + keyframes
├── postcss.config.js
├── vite.config.ts            # Aliases @/ e dev server
├── tsconfig*.json
└── components.json           # Config shadcn/ui
```

## Tema

A paleta é alinhada ao TechFair (`feira-profissoes.html`) — base navy/slate
muito escura com ciano e roxo como destaques.

| Token              | HSL              | Uso                              |
| ------------------ | ---------------- | -------------------------------- |
| `--background`     | 222 47% 11%      | Fundo padrão                     |
| `--foreground`     | 210 20% 96%      | Texto principal                  |
| `--primary`        | 187 95% 53%      | Ciano (`#22d3ee`) — CTAs/links   |
| `--accent`         | 271 91% 65%      | Roxo (`#a855f7`) — highlights    |
| `--secondary`      | 217 33% 17%      | Cards/superfícies elevadas       |
| `--muted`          | 217 33% 14%      | Estados sutis                    |
| `--muted-foreground` | 215 20% 65%    | Texto auxiliar                   |
| `--border`         | 217 33% 22%      | Bordas e inputs                  |
| `--nav-button`     | 217 33% 17%      | Fundo do CTA da navbar           |
| `--hero-bg`        | 224 47% 7%       | Fundo do hero (mais escuro)      |

Cores são consumidas via `hsl(var(--token))` para que opacidades possam ser
aplicadas com `/40`, `/80` etc.

## Animações

Definidas em `tailwind.config.ts`:

- **`animate-fade-up`** — opacidade + Y(20px) + blur(4px) → 0, com easing
  `cubic-bezier(0.16, 1, 0.3, 1)` (padrão "smooth-out").
- **`animate-fade-in`** — apenas opacidade.

O hero usa `opacity-0 animate-fade-up` em cada elemento, com
`style={{ animationDelay }}` para criar o stagger.

## 3D / Spline

A cena é carregada via `React.lazy()` + `<Suspense>`. Enquanto a engine
WebGL inicializa, mostramos um fallback com `grid-bg` apenas. URL da cena:

```
https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode
```

> Como a cena ocupa o background inteiro e o overlay textual usa
> `pointer-events-none`, o usuário pode interagir com a cena (orbitar,
> clicar) — exceto sobre os botões CTA, que reativam clique com
> `pointer-events-auto`.

## Responsividade

- Tipografia fluida via `clamp()` no h1, parágrafo e descrição.
- Em `<md` os links centrais e CTA da navbar somem (sem hamburger por
  decisão de design — o hero é auto-explicativo).
- Conteúdo ancorado ao canto inferior-esquerdo via `flex items-end`.

## Licença

MIT — veja o [LICENSE](../LICENSE) na raiz do repositório.
