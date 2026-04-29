# Feira de Profissões — Unisanta 2026

Projeto interativo de portfólio criado por alunos da **Universidade Santa
Cecília (Unisanta)** — JP, Igor e Giovanni — para o estande dos cursos de
SI / ADS na **Feira de Profissões 2026**, em Santos / SP.

O repositório reúne **três peças complementares** + uma **landing
unificada** + um **backend serverless** de ranking — todas pensadas para
um visitante que **nunca programou antes** sentar no estande, brincar
por 3–10 minutos e sair entendendo o que tecnologia faz no dia a dia.

> Todos os direitos reservados à **Universidade Santa Cecília
> (Unisanta)**. Distribuído sob [licença MIT](LICENSE) para uso
> educacional.

🌐 **Em produção:**
- Landing + TechFair + PokéCode → **https://feira-profissoes.pages.dev**
- UniFront → **https://unifront-unisanta.pages.dev**

---

## Sumário

- [Visão geral](#visão-geral)
- [1. Landing (`index.html`)](#1-landing-indexhtml)
- [2. TechFair (`feira-profissoes.html`)](#2-techfair-feira-profissoeshtml)
- [3. PokéCode (`pokemon-edu-battle.html`)](#3-pokécode-pokemon-edu-battlehtml)
- [4. UniFront (repo separado)](#4-unifront-repo-separado)
- [5. Backend de ranking (`functions/api/ranking.js`)](#5-backend-de-ranking-functionsapirankings)
- [Como apresentar na feira](#como-apresentar-na-feira)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Decisões de design](#decisões-de-design)
- [Equipe](#equipe)

---

## Visão geral

| Peça | Onde | Stack | Propósito |
| --- | --- | --- | --- |
| **Landing** | `index.html` | HTML5 + CSS3 + JS vanilla + Spline 3D Web Component | Menu unificado com cursor customizado, typewriter e cards 3D tilt |
| **TechFair** | `feira-profissoes.html` | React 18 (CDN) + Babel Standalone + sessionStorage + localStorage | SPA com login, hub e 5 minigames educativos com cronômetro |
| **PokéCode** | `pokemon-edu-battle.html` | HTML / CSS / Canvas 2D / JS vanilla | Batalha Pokémon estilo Game Boy controlada por comandos |
| **UniFront** | repo `unifront-unisanta` | Vite 5 + React 18 + TypeScript + Tailwind + shadcn/ui + Radix | Landing page sobre boas práticas de front-end |
| **Backend** | `functions/api/ranking.js` | Cloudflare Pages Functions + Cloudflare KV | API REST `/api/ranking` (GET/POST/DELETE) para o leaderboard global |

**Hospedagem:** tudo em **Cloudflare Pages** com deploy automático a cada `git push`.

---

## 1. Landing (`index.html`)

Página de entrada que serve como menu pros 3 projetos. Pensada para ser
projetada na TV do estande — uma URL só pra compartilhar.

### Stack

| Camada | Tecnologia |
| --- | --- |
| Marcação | HTML5 single-file |
| Estilos | CSS3 puro com **CSS Custom Properties**, `mask-image`, `backdrop-filter`, `mix-blend-mode`, `clamp()` |
| Comportamento | **JavaScript vanilla** (sem frameworks) — IIFEs encapsulando 4 módulos |
| 3D | [`@splinetool/viewer`](https://github.com/splinetool/spline-viewer) carregado como Web Component via CDN |
| Tipografia | Google Fonts — **Anton** (heading), **JetBrains Mono** (code), **Sora** (body) |
| Acessibilidade | `prefers-reduced-motion`, `aria-live`, `aria-hidden`, fallback para touch screens |

### Recursos

- **Cursor customizado** — anel grande seguindo com easing (lerp 0.18) + ponto interno preciso. Vira roxo grande no hover
- **Typewriter** alternando 6 palavras-chave (`tecnologia`, `programação`, `front-end`, `design`, `código`, `futuro`) com timing diferenciado pra digitar/apagar
- **Cards 3D com tilt** — `requestAnimationFrame` calcula `rotateX`/`rotateY` em perspectiva 1400px baseado na posição do mouse, com glow radial seguindo o cursor dentro do card
- **Cena 3D Spline** carregada lazy via Web Component, com fade-in suave após `load` event (fallback de 4.5s caso não dispare)
- **Camadas de fundo:** grid SVG mascarado por `radial-gradient` + 3 orbs flutuantes com animações fora-de-fase + camada de noise SVG inline
- **Glassmorphism** nos cards (`backdrop-filter: blur(14px)` + bordas `color-mix()`)

### Performance

- Sem build step — abre o arquivo direto do disco
- Spline lazy (`type=module`) não bloqueia first paint
- Fontes pré-conectadas via `<link rel="preconnect">`
- Animações otimizadas com `will-change: transform`

---

## 2. TechFair (`feira-profissoes.html`)

A peça principal — SPA single-file de **~1.950 linhas** com login,
hub, 5 minigames cronometrados e ranking global em tempo real.

### Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | **React 18** carregado via CDN (`react.development.js`) |
| Compilação | **Babel Standalone** transformando JSX no browser |
| Estado | `useState` + `useEffect` + `useContext` + `useRef` (sem Redux/Zustand) |
| Persistência local | `sessionStorage` (sessão atual) + `localStorage` (cache do ranking + flag de tutorial) |
| Persistência global | `fetch` → API `/api/ranking` (Cloudflare Pages Function + KV) |
| Estilos | CSS3 puro com **CSS Custom Properties** + animações `@keyframes` |
| Tipografia | Google Fonts — **Syne** (UI) + **Space Mono** (code/labels) |

### Arquitetura (14 componentes React)

```
AppProvider              ← Context global: user/scores/times/ranking
  └── App
      ├── Navbar
      ├── TutorialModal
      ├── HomePage       ← Hero + cursos SI/ADS + parceiros + mascote dragão
      ├── LoginPage      ← Captura nome do visitante (sem senha)
      ├── HubPage        ← Cards dos 5 jogos + scores + tempo + botão Ranking
      ├── RankingPage    ← Leaderboard global com 6 abas + indicador AO VIVO/OFFLINE
      ├── CodeBuilderGame    🧱  Drag-drop de blocos HTML
      ├── CSSBattleGame      🎯  Sliders de propriedades CSS
      ├── TypeRacerGame      ⌨️  Corrida de digitação (WPM + acurácia)
      ├── DebugDetectiveGame 🕵️  Caça a bugs em snippets reais
      ├── AlgoVisualGame     🧠  Programar robô em labirinto (right/left/up/down + for)
      └── SiteFooter
```

### Hooks customizados

- **`useGameTimer(autoStart = true)`** — cronômetro reutilizável, retorna `{ elapsed, stop, reset, running }`. Tick de 250ms via `setInterval`, source-of-truth em `Date.now()` pra não acumular drift.

### Sistema de ranking

Cada vez que um visitante completa um minigame (todas as fases), o jogo:

1. Para o cronômetro (`timer.stop()`)
2. Salva a pontuação (`addScore(game, pts)`)
3. Salva o tempo (`addTime(game, seconds)`) — guarda só o **melhor** (menor)
4. Faz `POST /api/ranking` com a entrada completa via `saveRankingEntry()`

Polling de 20s atualiza a UI com ranking remoto. Fallback automático
para cache local se a API falhar — indicador visual `AO VIVO / OFFLINE`
no topo da página de ranking.

### Ordenação do leaderboard

```js
// Geral: mais jogos completos > maior pontuação > menor tempo total
sort((a, b) =>
  (b.completedGames - a.completedGames) ||
  (b.totalScore - a.totalScore) ||
  (a.totalTime - b.totalTime)
);

// Por jogo: maior pontuação > menor tempo
sort((a, b) => (b.score - a.score) || (a.time - b.time));
```

### UX para visitantes não-técnicos

- **Modal de tutorial** (4 passos) na primeira visita — flag `localStorage.techfair_tutorial_seen_v1`
- **Banners de conceito** em cada minigame explicando *o que é HTML, CSS, debug, algoritmo, digitação*
- **Botão "🔄 Próximo visitante"** no rodapé pra resetar a sessão entre visitantes
- **"❓ Como funciona"** na navbar reabre o tutorial a qualquer momento

---

## 3. PokéCode (`pokemon-edu-battle.html`)

> 👤 **Autoria:** desenvolvido **individualmente** por **Igor**
> ([@Igor2920](https://github.com/Igor2920)).

Batalha Pokémon estilo Game Boy controlada por **comandos digitados** —
ensina noção de "computer literacy" de forma divertida.

> ⚠️ **AVISO LEGAL — uso educacional sem fins lucrativos.**
> Pokémon® e todos os personagens, sprites e elementos relacionados são
> propriedade da **Nintendo / Game Freak / The Pokémon Company**. Este
> projeto é uma **ferramenta educacional**, sem qualquer geração de
> receita ou benefício financeiro. Se um representante legal solicitar
> a remoção, atenderemos imediatamente.

### Stack

| Camada | Tecnologia |
| --- | --- |
| Marcação | HTML5 single-file (~1.346 linhas) |
| Estilos | CSS3 puro com paleta Game Boy DMG verde-amarelado, animações de hit |
| Lógica | **JavaScript vanilla ES6+** — `'use strict'`, sem frameworks |
| Renderização | **Canvas 2D** pra sprites pixel-art 9×9 |
| Persistência | `localStorage` pra flag de tutorial visto |
| Tipografia | "Press Start 2P" via Google Fonts (estilo retrô) |

### Recursos

- **Tutorial em 4 passos** explicando como escolher Pokémon, atacar e usar vantagem de tipo
- **Modos de jogo:** 1P (vs CPU com IA simples) ou 2P (humano vs humano local)
- **IA do CPU:**
  - `chooseCpuPokemon()` — escolhe Pokémon com vantagem de tipo
  - `cpuTurn()` — 70% das vezes escolhe ataque ótimo, 30% aleatório (parecer humano)
- **Sistema de tipos:** grama > água > fogo > grama (1.5× / 0.75× multiplicadores)
- **Sprites pixel-art 9×9** desenhadas no canvas (sem assets externos)
- **Cheatsheet permanente** abaixo do terminal com exemplos de comandos
- **Comandos universais:** `help`, `ajuda`, `status` em qualquer momento

### Por que vanilla JS?

PokéCode roda em **qualquer navegador** sem dependência alguma — pendrive,
celular antigo, Chromebook do estande. Single-file, < 50KB, sem build.

---

## 4. UniFront (repo separado)

Landing page sobre boas práticas de front-end — **stack moderna real**
pra mostrar a visitantes como devs trabalham na prática.

📦 **Repositório:** [github.com/JotaP3h/unifront-unisanta](https://github.com/JotaP3h/unifront-unisanta)
🌐 **Em produção:** [unifront-unisanta.pages.dev](https://unifront-unisanta.pages.dev)

### Stack

| Camada | Tecnologia |
| --- | --- |
| Build | [**Vite 5**](https://vitejs.dev) com [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react-swc) |
| Framework | [**React 18**](https://react.dev) |
| Linguagem | **TypeScript 5** (strict mode) |
| Estilização | [**Tailwind CSS 3**](https://tailwindcss.com) + [`tailwindcss-animate`](https://github.com/jamiebuilds/tailwindcss-animate) + [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography) |
| UI Kit | [**shadcn/ui**](https://ui.shadcn.com) construído sobre **Radix UI** primitives |
| Componentes Radix | accordion, alert-dialog, dialog, dropdown-menu, popover, select, tabs, tooltip, toast, ~25 outros |
| Roteamento | [**React Router**](https://reactrouter.com) v6 |
| Forms | [**React Hook Form**](https://react-hook-form.com) + [**Zod**](https://zod.dev) (validação) |
| Estado servidor | [**TanStack Query**](https://tanstack.com/query) v5 |
| Variantes de classe | `class-variance-authority` + `clsx` + `tailwind-merge` |
| Ícones | [**Lucide React**](https://lucide.dev) |
| Outros componentes | `cmdk` (command palette), `sonner` (toasts), `vaul` (drawer), `embla-carousel`, `recharts`, `date-fns`, `react-day-picker`, `input-otp`, `react-resizable-panels`, `next-themes` |
| Tipografia | Google Fonts — **Anton** (headings) + **Condiment** (cursive accents) + system mono |
| Testes | [**Vitest**](https://vitest.dev) + [**Testing Library**](https://testing-library.com) + `jsdom` |
| Linting | ESLint 9 (flat config) + `typescript-eslint` + `eslint-plugin-react-hooks` |

### Conceito

UniFront é um portfólio prático demonstrando **clean code,
acessibilidade e performance** com visual espacial imersivo. Cada
seção (Hero / About / Practices Grid / CTA) usa vídeos em loop e
efeito **liquid glass** customizado.

Detalhes completos no
[`README` do próprio repo](https://github.com/JotaP3h/unifront-unisanta).

---

## 5. Backend de ranking (`functions/api/ranking.js`)

API REST minimalista que serve de leaderboard global do TechFair —
**sem servidor próprio**, rodando direto em Cloudflare's edge.

### Stack

| Camada | Tecnologia |
| --- | --- |
| Runtime | **Cloudflare Pages Functions** (V8 Workers Runtime) |
| Persistência | **Cloudflare KV** (key-value store distribuído globalmente) |
| Linguagem | JavaScript ES Modules (sem TypeScript pra simplicidade) |
| API style | REST sobre `fetch` API nativa |
| CORS | Headers liberados em `*` (estande precisa funcionar de qualquer dispositivo) |

### Endpoints

| Método | Path | Descrição |
| --- | --- | --- |
| `GET` | `/api/ranking` | Retorna a lista completa do ranking |
| `POST` | `/api/ranking` | Upsert por `id` (sanitiza payload, faz cap em 500 entries) |
| `DELETE` | `/api/ranking` | Limpa todo o ranking (admin) |
| `OPTIONS` | `/api/ranking` | CORS preflight |

### Sanitização

Toda entrada que chega via `POST` é validada:

- `id`: string ≤ 64 chars
- `name`: string ≤ 40 chars, sem `<`, `>`, espaços-equivalentes
- `scores` / `times`: só aceita as 5 chaves esperadas (`codebuilder`,
  `cssbattle`, `typeracer`, `debugdetective`, `algovisual`), valores
  numéricos ≥ 0 com cap em 99.999 / 9.999
- Payload total ≤ 4KB, lista total ≤ 500 entries

### Setup do KV (uma vez)

1. **Cloudflare Dashboard → Workers & Pages → KV → Create instance**
   - Nome: `RANKING`
2. **Workers & Pages → projeto `feira-profissoes` → Settings → Functions → KV namespace bindings → Add**
   - Variable name: `RANKING` (exatamente assim)
   - KV namespace: o `RANKING` recém-criado
3. **Deployments → último deploy → Retry deployment** pra aplicar a binding

Depois disso, `https://feira-profissoes.pages.dev/api/ranking`
responde com `[]`.

---

## Como apresentar na feira

1. **Projete na TV do estande:** `https://feira-profissoes.pages.dev`
   — landing com 3 cards.
2. **Visitante escolhe um projeto** clicando em um dos 3 cards (TechFair,
   PokéCode, UniFront).
3. **TechFair** abre em SPA: visitante digita o nome, escolhe um
   minigame, joga. Cronômetro corre na tela. Ao terminar, a pontuação
   sobe pro ranking global em ~20s.
4. **Ranking ao vivo** pode ficar exibido em uma segunda TV — todos
   veem quem está em primeiro lugar em tempo real.
5. **Entre visitantes:** botão "🔄 Próximo visitante" no rodapé reseta
   a sessão sem apagar o ranking.

---

## Estrutura de pastas

```
.
├── README.md                    ← este arquivo
├── LICENSE                      ← MIT
├── .gitignore                   ← node_modules, dist, .DS_Store, etc.
├── index.html                   ← Landing (HTML/CSS/JS + Spline)
├── feira-profissoes.html        ← TechFair (React via CDN)
├── pokemon-edu-battle.html      ← PokéCode (HTML/CSS/Canvas/JS)
└── functions/
    └── api/
        └── ranking.js           ← Backend KV (Cloudflare Pages Function)
```

O **UniFront** vive em repositório próprio:
[github.com/JotaP3h/unifront-unisanta](https://github.com/JotaP3h/unifront-unisanta).

---

## Decisões de design

**Por que React via CDN no `feira-profissoes.html` em vez de Vite?**
Pra que qualquer pessoa do estande consiga abrir o arquivo direto do
pendrive sem precisar instalar Node. O custo é o Babel Standalone
rodando no browser (~300ms a mais no first paint), mas vale a
portabilidade — funciona até em Chromebooks corporativos travados.

**Por que Vite + TS no UniFront?**
Justamente pra contrastar — é a peça do estande que mostra "isso aqui
é como devs trabalham profissionalmente, com build, types e testes".

**Por que Cloudflare Pages Functions em vez de Firebase / Supabase?**
Roda no mesmo deploy do site (zero config extra), edge-distributed
(latência baixa), free tier muito generoso, e KV é simples o
suficiente pra um ranking de uma feira. Sem SDK pesado no client.

**Por que vanilla JS no PokéCode?**
Single-file, < 50KB, roda em qualquer navegador sem dependência. Foi
o primeiro projeto e mantém a simplicidade como um exemplo do que dá
pra fazer com fundamentos puros.

**Por que mantemos o dragão 🐉?**
É o mascote da **Atlética da Unisanta** — faz parte da identidade da
universidade e os alunos reconhecem na hora.

**Por que cursor customizado na landing?**
"Portfolio energy" — sinaliza imediatamente que o site foi feito
à mão, não gerado por template. Some em touch devices.

---

## Equipe

Desenvolvido por alunos da **Universidade Santa Cecília (Unisanta)**:

- **JP** ([@JotaP3h](https://github.com/JotaP3h)) — concepção, arquitetura
  front-end, **TechFair / `<Siads>`**, **landing page**, **UniFront** e
  **backend KV** do leaderboard.
- **Igor** ([@Igor2920](https://github.com/Igor2920)) — autor do
  **PokéCode** (Pokedex) por completo.
- **Giovanni** — apoio em testes e validação no estande.

---

## Como contribuir

1. Faça um fork.
2. Abra um Pull Request com sua proposta — qualquer ajuste de copy,
   acessibilidade, novos minigames ou correções de bugs é bem-vindo.
3. Se for um novo minigame, mantenha o padrão: single-file, sem
   dependências externas, e com um banner explicando o conceito.

---

## Licença

[MIT](LICENSE) — fique à vontade pra usar como base em outros eventos
educativos.

**© 2026 — Todos os direitos reservados à Universidade Santa Cecília
(Unisanta).**

---

**Universidade Santa Cecília — Unisanta**
Cursos de Sistemas de Informação e Análise e Desenvolvimento de Sistemas
Santos / SP · 2026
