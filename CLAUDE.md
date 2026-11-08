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
- Direção ativa: **D1 · Prancha técnica**. Ignorar D3 (Unifilar) neste projeto.
- Os tokens da D1 já foram portados para `src/app/globals.css` via `@theme` do Tailwind 4 (cores, tipografia). Qualquer token novo deve nascer em `design-system/d1/tokens.css` primeiro e só depois ser replicado em `globals.css`.
- Classes utilitárias disponíveis: `bg-paper`, `text-ink`, `bg-amber`, `text-amber-text`, `bg-paper-warm`, `bg-night`, `text-text-2`, `text-text-3`, `font-mono`, `text-label`, `text-h1`...`text-display-xl`, `bg-grid-paper` (malha milimetrada).
- **Âmbar é sinal, não decoração**: `bg-amber` é sempre preenchimento (botão primário, marcos). Nunca usar âmbar como cor de texto sobre papel — para isso existe `text-amber-text` (#8A5A00, contraste 5,2:1). `bg-amber` + texto usa `text-ink`.
- **Cantos sempre retos.** `--radius-*` já está zerado em `globals.css`; a única exceção são símbolos circulares (chamada de detalhe, marcadores), que usam `rounded-full` manualmente.
- Sombras são sempre deslocadas e sólidas (nunca desfocadas): botão primário `4px 4px 0 var(--color-ink)`; carimbo/notas `8px 8px 0 rgba(15,30,51,.12)` (`var(--shadow-sheet)`); formulário-carimbo `12px 12px 0 var(--color-amber)` (`var(--shadow-form)`).
- Antes de criar um componente novo, procure um equivalente já descrito em `design-system/DESIGN-SYSTEM.md` (capítulo D1.7) ou em `design-system/d1/components.css`.
- Anotações `[MOMENTO: …]` do protótipo são instruções de animação: implemente a animação e remova a anotação no código final.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS 4 + ESLint, pasta `src/`, alias `@/*`.
- Fontes: IBM Plex Sans (texto) e IBM Plex Mono (rótulos, códigos, cotas, carimbo) via `next/font/google`.
- Animação: GSAP + `@gsap/react` + ScrollTrigger.

## Movimento
- Toda animação é ligada à rolagem (ScrollTrigger) ou a uma interação explícita (hover, clique, digitação) — nunca decorativa sem gatilho.
- Toda animação precisa funcionar (ou desligar graciosamente) com `prefers-reduced-motion: reduce`. Isso já está garantido globalmente em `globals.css`; não desfazer essa regra.

## Precisão técnica
O cliente é engenheiro eletricista. Terminologia, normas (NBR 5410), siglas (ART, CREA, DR, DPS, SPDA) e números devem ser tecnicamente corretos. Consultar o glossário no fim de `design-system/DESIGN-SYSTEM.md` antes de usar um termo técnico novo.

## Desempenho
- Meta: LCP < 2,5 s no celular, peso inicial da página < 1 MB.
- No máximo 2 famílias de fonte, com `display=swap` (já garantido por `next/font/google`).
- Imagens em WebP/AVIF, `loading="lazy"` abaixo da primeira tela, `width`/`height` definidos.
- WebGL/3D só no computador e só carregado quando a seção se aproxima da tela.

## Fluxo de trabalho (git)
- Cada tarefa em uma branch nova, com pull request.
- **Nunca commitar direto na branch `main`** a partir de agora — o primeiro commit de fundação foi a única exceção, para a Vercel ter uma base.
