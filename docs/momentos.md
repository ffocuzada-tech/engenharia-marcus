# Momentos — animação da D1 (GSAP)

Extraído originalmente dos blocos `[MOMENTO: ...]` das referências
`design-system/paginas/D1-pagina-computador.html` e `D1-pagina-celular.html`.
Todos os momentos abaixo foram implementados nesta etapa com GSAP + ScrollTrigger
(ver `src/lib/gsap.ts`). Os blocos `[MOMENTO]` já foram removidos das referências.

Padrão usado em todos: `gsap.matchMedia()` com uma condição sempre verdadeira
("(min-width: 0px)" ou breakpoint real) e uma condição
`"(prefers-reduced-motion: reduce)"` que, quando verdadeira, pula a animação e
deixa o estado final já visível.

## Folha 01 — Apresentação (`Folha01Hero`) — ✅ Feito

- **O que se move:** as cotas (linha horizontal e vertical da foto) se desenham de 0 a 100% em
  600 ms (drawEase); o carimbo do responsável técnico "bate" sobre a foto (escala 1,04 → 1, com a
  sombra crescendo, 420 ms, stampEase).
- **Gatilho:** carregamento da página.
- **Celular:** sem cotas — só o carimbo entrando de baixo para cima, sem o efeito de desenho
  das cotas.

## Folha 03 — Sinais de alerta (`Folha03Alerta`) — ✅ Feito

- **O que se move:** cada triângulo de alerta acende em âmbar, um por vez (stagger de 120 ms); o
  título cresce de 0,96 → 1.
- **Gatilho:** seção entra 30% na tela.
- **Celular:** os triângulos acendem ao rolar até cada item; o título não tem o efeito de escala.

## Folha 04 — Detalhes A–D (`Folha04Detalhes`) — ✅ Feito

- **O que se move:** os itens ☐ da coluna "você recebe" (detalhes A e B, que têm lista) viram ☑
  um a um (stagger de 100 ms), com um traço de caneta desenhando o check (stroke-dashoffset).
- **Gatilho:** a lista de cada detalhe entra na tela.
- **Celular:** a coluna "você recebe" é um texto corrido (sem lista), por isso não participa
  desta animação — comportamento inalterado.

## Folha 05 — Por que um engenheiro (`Folha05Engenheiro`) — ✅ Feito

- **O que se move:** substituído o placeholder "[ESPAÇO 3D / WebGL]" por uma planta isométrica em
  SVG (sem WebGL) — casa térrea com sala, cozinha, 2 quartos e banheiro, traço nanquim 1,4px sobre
  papel milimetrado. Na rolagem: as paredes se desenham (stroke-dashoffset), o quadro de
  distribuição se preenche de âmbar e os 4 circuitos (C1–C4, valores coerentes com a NBR 5410)
  acendem um por vez, do quadro até a carga, cada um com anel pulsante e rótulo.
- **Gatilho:** rolagem (scrub, 0 → 100% enquanto a seção passa pela tela).
- **Celular:** a mesma animação, sem scrub — toca uma vez quando a seção entra na tela.

## Folha 06 — Antes e depois (`Folha06AntesDepois`) — ✅ Feito

- **O que se move:** a linha âmbar do comparador desliza sozinha de 50% → 20% → 80% → 50% uma
  vez, para ensinar o gesto de arrastar; depois do ciclo, o controle fica livre para o usuário.
- **Gatilho:** seção entra na tela.
- **Celular:** não há essa animação de ensino — as abas "Antes/Depois" trocam em crossfade
  (250 ms) ao toque.

## Folha 08 — Como funciona (`Folha08Processo`) — ✅ Feito

- **O que se move:** as barras do cronograma crescem da esquerda para a direita (scaleX), uma por
  linha (stagger de 150 ms); o losango do marco de orçamento "carimba" (escala 1,3 → 1) ao chegar
  sua vez.
- **Gatilho:** a tabela entra 40% na tela.
- **Celular:** cada barra cresce individualmente quando a sua própria linha entra na tela
  (sem stagger coordenado — é por linha, via rolagem).
- **D1.12 corrigida:** a linha tracejada "VOCÊ ESTÁ AQUI" (computador e celular) foi movida para
  antes do início da barra D0, e não cruza mais a barra.

## Folhas sem animação própria nesta etapa

02 (Índice de serviços), 07 (Trajetória), 09 (Notas e FAQ), 10 (Pedido de orçamento) e 11
(Rodapé) não tinham blocos `[MOMENTO]` nas referências e não entraram nesta etapa — ficam só com
a interação básica já implementada (links, `<details>`, formulário).
