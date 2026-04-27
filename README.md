# Feira de Profissões — Unisanta 2026

Projeto interativo de portfólio criado por alunos da **Universidade Santa
Cecília (Unisanta)** para o estande dos cursos de SI / ADS na Feira de
Profissões 2026, em Santos / SP.

O repositório reúne três peças complementares — todas pensadas para um
visitante que **nunca programou antes** sentar no estande, brincar por
3–10 minutos e sair entendendo o que tecnologia faz no dia a dia.

---

## O que tem aqui

| Peça                    | Arquivo / pasta                | Stack                                  | Propósito                                              |
| ----------------------- | ------------------------------ | -------------------------------------- | ------------------------------------------------------ |
| **TechFair**            | `feira-profissoes.html`        | React 18 via CDN + Babel Standalone    | Site principal com 5 minigames educativos              |
| **PokéCode**            | `pokemon-edu-battle.html`      | HTML / CSS / JS vanilla                | Batalha Pokémon estilo Game Boy controlada por comandos |
| **SENTINEL AI**         | `sentinel-ai/`                 | Vite 5 + React 18 + TypeScript + Tailwind + Spline 3D | Landing page demonstrando boas práticas de front-end moderno |

Todos os três rodam **offline depois de carregados** — não dependem de
backend, login externo ou banco de dados.

---

## Como apresentar na feira

1. **Abra `feira-profissoes.html`** num navegador moderno (Chrome / Edge / Firefox).
   - Não precisa de servidor — clique duplo no arquivo já basta.
   - Na primeira visita aparece um modal explicando como funciona em 30s.
   - Use o botão **"Próximo visitante (resetar)"** no rodapé entre cada visitante.
2. **Abra `pokemon-edu-battle.html`** num segundo computador / aba.
   - Mostra um tutorial de 4 passos antes da batalha (digitação de comandos).
   - Modos **1 jogador (vs CPU)** e **2 jogadores** locais.
3. **SENTINEL AI** (`sentinel-ai/`) precisa de Node.js. É a peça mais
   "profissional" do estande — útil pra mostrar o stack que devs usam
   na prática (Vite, TypeScript, Tailwind, 3D Spline).

```bash
cd sentinel-ai
npm install
npm run dev   # http://localhost:5173
```

---

## TechFair — visão geral

`feira-profissoes.html` é uma SPA single-file com:

- **Home** com tipografia animada, mascote da Atlética da Unisanta (🐉),
  estatísticas e cards dos cursos SI / ADS.
- **Login** simples (apenas nome — nada é enviado pra fora do navegador).
- **Hub** com 5 minigames:
  1. **Code Builder** — arrasta/clica blocos HTML pra montar uma página.
  2. **CSS Battle** — usa sliders pra fazer um quadrado virar igual ao alvo.
  3. **Type Racer** — corrida de digitação de código.
  4. **Debug Detective** — encontre bugs em snippets reais.
  5. **Algoritmo Visual** — escreva `right(3)`, `down(2)`, `for 3:` e leve
     o personagem até a bandeira.
- **Footer** com créditos da Unisanta e botão de reset rápido entre visitantes.

Cada minigame tem um **banner explicando o conceito** (HTML, CSS,
algoritmo, debug...) antes de começar — pra quem nunca viu programação
saber o que está jogando.

### Persistência

- `sessionStorage` guarda nome do visitante e pontuações da sessão atual.
- `localStorage` guarda apenas a flag `techfair_tutorial_seen_v1` pra não
  reabrir o modal de boas-vindas em toda atualização.

---

## PokéCode — visão geral

`pokemon-edu-battle.html` simula uma batalha Pokémon estilo Game Boy
**controlada por comandos digitados**. Foi desenhado pra ensinar
"computer literacy" de forma divertida.

Destaques:

- **Tutorial em 4 passos** explicando como escolher Pokémon, atacar e
  usar vantagem de tipo. Persiste em localStorage
  (`pokecode_tutorial_seen_v2`).
- **Modos 1P (vs CPU)** e **2P** (humano vs humano local).
- **Tabela de tipos** simplificada: grama > água > fogo > grama
  (multiplicadores 1.5× / 0.75×).
- **Sprites em pixel art 9×9** desenhadas no canvas — sem assets externos.
- **Cheatsheet permanente** abaixo do terminal com exemplos de comandos.
- Comandos `help`, `ajuda`, `status` em qualquer momento.

---

## SENTINEL AI — visão geral

`sentinel-ai/` é uma landing page demonstrativa de uma empresa fictícia
de segurança corporativa. Serve pra mostrar a visitantes como é um
projeto front-end moderno **de verdade**:

- Vite 5 + React 18 + TypeScript estrito.
- Tailwind CSS com design tokens HSL (paleta alinhada à TechFair: ciano
  + roxo sobre navy).
- shadcn/ui + class-variance-authority pra variantes de Button.
- Cena 3D Spline carregada com `React.lazy` + `<Suspense>`.
- Animações `fade-up` staggered com `cubic-bezier(0.16, 1, 0.3, 1)`.

Detalhes completos em [`sentinel-ai/README.md`](sentinel-ai/README.md).

---

## Estrutura de pastas

```
.
├── README.md                  # este arquivo
├── LICENSE                    # MIT
├── .gitignore                 # node_modules, dist, .DS_Store, etc.
├── feira-profissoes.html      # TechFair (SPA single-file)
├── pokemon-edu-battle.html    # PokéCode (single-file)
└── sentinel-ai/               # Landing page Vite + React + TS
    ├── README.md
    ├── package.json
    └── ...
```

---

## Decisões de design

**Por que React via CDN no `feira-profissoes.html` em vez de um build?**
Pra que qualquer pessoa do estande consiga abrir o arquivo direto do
pendrive sem precisar instalar Node. O custo é o Babel rodando no
browser (~300ms a mais no primeiro paint), mas vale a portabilidade.

**Por que Vite + TS no `sentinel-ai/`?**
Justamente pra contrastar com o ponto acima — é a peça do estande que
mostra "isso aqui é como devs trabalham profissionalmente".

**Por que mantemos o dragão 🐉?**
É o mascote da **Atlética da Unisanta** — faz parte da identidade da
universidade e os alunos reconhecem na hora.

**Por que sem backend?**
Privacidade do visitante (nada é enviado pra lugar nenhum) e robustez
de demo (Wi-Fi do estande pode falhar — o site continua funcionando).

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
educativos. Se possível, dê crédito à Universidade Santa Cecília.

---

**Universidade Santa Cecília — Unisanta**
Cursos de Sistemas de Informação e Análise e Desenvolvimento de Sistemas
Santos / SP · 2026
