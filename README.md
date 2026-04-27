# Feira de Profissões — Unisanta 2026

Projeto interativo de portfólio criado por alunos da **Universidade Santa
Cecília (Unisanta)** — JP, Igor e Giovanni — para o estande dos cursos de
SI / ADS na Feira de Profissões 2026, em Santos / SP.

O repositório reúne três peças complementares — todas pensadas para um
visitante que **nunca programou antes** sentar no estande, brincar por
3–10 minutos e sair entendendo o que tecnologia faz no dia a dia.

> Todos os direitos reservados à **Universidade Santa Cecília (Unisanta)**.

---

## O que tem aqui

| Peça                    | Onde                            | Stack                                  | Propósito                                              |
| ----------------------- | ------------------------------- | -------------------------------------- | ------------------------------------------------------ |
| **TechFair**            | `feira-profissoes.html`         | React 18 via CDN + Babel Standalone    | Site principal com 5 minigames educativos              |
| **PokéCode**            | `pokemon-edu-battle.html`       | HTML / CSS / JS vanilla                | Batalha Pokémon estilo Game Boy controlada por comandos |
| **UniFront**            | repo separado (link abaixo)     | front-end moderno + animações com IA   | Portfólio com bastidores, mapas de estudo, Clean Code  |

Os arquivos `.html` rodam **offline depois de carregados** — não dependem
de backend, login externo ou banco de dados. O UniFront é um projeto
front-end completo hospedado em repositório próprio (link abaixo).

---

## UniFront — bastidores do projeto

> *"E aí, dev! Se você explorou esse universo de boas práticas e chegou
> até aqui, deve estar se perguntando como tudo isso surgiu."*

O **UniFront** nasceu com um propósito claro: ser um **portfólio prático
e prova de conceito**. Foi idealizado e desenvolvido por **JP**, com
foco em ser apresentado na Feira de Profissões da Unisanta.

A missão é mostrar pra galera que está pensando em entrar na área de
tecnologia (e pra quem já está dando os primeiros passos) que o
front-end vai muito além de pintar telas — é sobre **arquitetura,
performance e inclusão**, tudo isso envelopado em um visual que dá
vontade de navegar.

### Como essa galáxia foi construída

- **Fundação teórica.** Todo o conhecimento técnico, mapas de estudo e
  conceitos de Clean Code presentes no UniFront vieram de muito estudo,
  validado com materiais da própria **Universidade Santa Cecília
  (Unisanta)** e com a didática dos cursos da **Alura**.
- **Vibe coding no conceito.** A identidade visual, o roteiro das
  informações e a arquitetura das ideias foram desenhados através de
  *vibe coding* — iteração contínua pra garantir que o site tivesse
  uma "alma" própria antes da primeira linha de código.
- **Animações e visuais com IA.** O visual imersivo, as camadas
  espaciais e as animações que dão vida ao projeto foram geradas e
  refinadas com auxílio de IA. É a prova prática de como devs podem
  usar IA como parceira pra escalar o design e o impacto das aplicações.

> No fim das contas, o **UniFront** é isso: um projeto nascido na
> faculdade, feito pra comunidade, provando que com a base certa de
> estudos e curiosidade pra explorar novas ferramentas, código limpo
> vira experiência incrível.

### Repositório

**🔗 https://github.com/JotaP3h/unifront-unisanta**

Pra rodar localmente, clone o repo do UniFront ao lado deste projeto:

```powershell
cd ..
git clone https://github.com/JotaP3h/unifront-unisanta.git
cd unifront-unisanta
# siga as instruções do README do próprio repo
```

---

## Como apresentar na feira

1. **Abra `feira-profissoes.html`** num navegador moderno (Chrome / Edge / Firefox).
   - Não precisa de servidor — clique duplo no arquivo já basta.
   - Na primeira visita aparece um modal explicando como funciona em 30s.
   - Use o botão **"Próximo visitante (resetar)"** no rodapé entre cada visitante.
2. **Abra `pokemon-edu-battle.html`** num segundo computador / aba.
   - Mostra um tutorial de 4 passos antes da batalha.
   - Modos **1 jogador (vs CPU)** e **2 jogadores** locais.
3. **UniFront** roda em repositório próprio — abra o link acima.

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

## Estrutura de pastas

```
.
├── README.md                  # este arquivo
├── LICENSE                    # MIT
├── .gitignore                 # node_modules, dist, .DS_Store, etc.
├── feira-profissoes.html      # TechFair (SPA single-file)
└── pokemon-edu-battle.html    # PokéCode (single-file)
```

O **UniFront** vive em repositório próprio:
[github.com/JotaP3h/unifront-unisanta](https://github.com/JotaP3h/unifront-unisanta).

---

## Decisões de design

**Por que React via CDN no `feira-profissoes.html` em vez de um build?**
Pra que qualquer pessoa do estande consiga abrir o arquivo direto do
pendrive sem precisar instalar Node. O custo é o Babel rodando no
browser (~300ms a mais no primeiro paint), mas vale a portabilidade.

**Por que mantemos o dragão 🐉?**
É o mascote da **Atlética da Unisanta** — faz parte da identidade da
universidade e os alunos reconhecem na hora.

**Por que sem backend?**
Privacidade do visitante (nada é enviado pra lugar nenhum) e robustez
de demo (Wi-Fi do estande pode falhar — o site continua funcionando).

---

## Equipe

Desenvolvido por alunos da **Universidade Santa Cecília (Unisanta)**:

- **JP** ([@JotaP3h](https://github.com/JotaP3h)) — concepção, front-end,
  identidade visual, vibe coding do UniFront.
- **Igor** — desenvolvimento e testes.
- **Giovanni** — desenvolvimento e testes.

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

**Todos os direitos reservados à Universidade Santa Cecília (Unisanta).**

---

**Universidade Santa Cecília — Unisanta**
Cursos de Sistemas de Informação e Análise e Desenvolvimento de Sistemas
Santos / SP · 2026
