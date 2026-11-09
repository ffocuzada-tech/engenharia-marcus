# CLAUDE.md

## Objetivo do site
Gerar pedidos de orçamento (WhatsApp e formulário) para um engenheiro eletricista.
Uma única ação principal em cada tela: pedir orçamento. Nunca dois botões primários competindo.

## Os 4 serviços
| Código | Serviço |
|---|---|
| E-01 | Instalação elétrica |
| E-02 | Projetos elétricos |
| E-03 | Inspeções e laudos |
| E-04 | Manutenção |

## Marcadores — nunca inventar dados
Todo dado real que falta fica entre colchetes: `[NOME]`, `[CIDADE]`, `[ANO]`, `[PRAZO]`, `[X] meses`, etc.
Nunca inventar números, depoimentos, prazos, preços, certificações ou anos reais.
Lista completa em `design-system/DESIGN-SYSTEM.md`, seção 2.5.

## Design system
- A fonte das regras visuais é `design-system/DESIGN-SYSTEM.md`. Leia a parte da direção ativa antes de criar ou alterar qualquer tela.
- Direção ativa: **D2 · institucional com DNA de engenharia**. Ignorar D1 (Prancha técnica) e D3 (Unifilar) neste projeto.
- Os tokens da D2 já foram portados para `src/app/globals.css` via `@theme` do Tailwind 4 (cores, tipografia, sombras). Qualquer token novo deve nascer em `design-system/d2/tokens.css` primeiro e só depois ser replicado em `globals.css`.
- Classes utilitárias disponíveis: `bg-noite`, `bg-noite-2`, `bg-azul`, `text-eletrico`, `bg-gelo`, `bg-gelo-2`, `bg-ambar`, `text-ambar-2`, `text-texto`, `text-texto-2`, `text-texto-3`, `text-claro`, `text-claro-2`, `font-sans` (Figtree, texto), `font-title` (Archivo, títulos), `font-mono` (JetBrains Mono, rótulos e cotas), `text-h1`, `text-h2`, `text-h3`, `text-body-lg`, `text-label`, `shadow-1`, `shadow-2`.
- **Âmbar é sinal, não decoração**: preenchimento de botão primário, pontos de destaque e marcos. Nunca usar âmbar como cor de texto sobre fundo claro — âmbar como texto só sobre fundo escuro (seções `noite`), onde o contraste é suficiente.
- **Cantos arredondados e sombras suaves** (nunca sólidas/deslocadas — isso era D1). Sombra padrão de cartões: `shadow-1`; sombra de elementos flutuantes (menus, modais): `shadow-2`.
- **Nada de linhas divisórias entre itens**: sem `border-top`/`border-bottom` separando itens de lista, sem `divide-y`. Separação por fundo (branco, gelo, azul-noite), espaço e cards.
- Uma ação principal por tela: "Solicitar orçamento", em âmbar.
- Copy em "nós" (primeira pessoa do plural).
- Antes de criar um componente novo, procure um equivalente já descrito em `design-system/DESIGN-SYSTEM.md` (capítulo D2) ou em `src/components/ui`.
- Anotações `[MOMENTO: …]` do protótipo são instruções de animação: implemente a animação e remova a anotação no código final.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS 4 + ESLint, pasta `src/`, alias `@/*`.
- Fontes: Archivo (títulos, eixo `wdth`), Figtree (texto) e JetBrains Mono (rótulos, códigos, cotas das pranchas) via `next/font/google`.
- Animação: GSAP + `@gsap/react` (`useGSAP`) + ScrollTrigger.

## Movimento
- Toda animação é ligada à rolagem (ScrollTrigger) ou a uma interação explícita (hover, clique, digitação) — nunca decorativa sem gatilho.
- Toda animação precisa funcionar (ou desligar graciosamente) com `prefers-reduced-motion: reduce`. Isso já está garantido globalmente em `globals.css`; não desfazer essa regra.

## Precisão técnica
O cliente é engenheiro eletricista. Terminologia, normas (NBR 5410), siglas (ART, CREA, DR, DPS, SPDA) e números devem ser tecnicamente corretos. Consultar o glossário no fim de `design-system/DESIGN-SYSTEM.md` antes de usar um termo técnico novo.

## Desempenho
- Meta: LCP < 2,5 s no celular, peso inicial da página < 1 MB.
- No máximo 3 famílias de fonte (Archivo, Figtree, JetBrains Mono), com `display=swap` (já garantido por `next/font/google`).
- Imagens em WebP/AVIF, `loading="lazy"` abaixo da primeira tela, `width`/`height` definidos.
- WebGL/3D só no computador e só carregado quando a seção se aproxima da tela.

## Fluxo de trabalho (git)
- Cada tarefa em uma branch nova, com pull request.
- **Nunca commitar direto na branch `main`** a partir de agora — o primeiro commit de fundação foi a única exceção, para a Vercel ter uma base.
