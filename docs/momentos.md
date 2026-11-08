# Momentos — anotações de animação da referência D1

Extraído dos blocos `[MOMENTO: ...]` das referências `design-system/referencia/paginas/D1-pagina-computador.html`
e `D1-pagina-celular.html`. Nenhuma animação foi implementada nesta etapa (só interação básica:
menu, FAQ, antes/depois). Isto é a lista de pendências para a fase de movimento (ScrollTrigger).

## Folha 01 — Apresentação (`Folha01Hero`)

- **O que se move:** as cotas (linha horizontal e vertical da foto) se desenham de 0 a 100% em
  600 ms; o carimbo do responsável técnico "bate" sobre a foto (escala 1,04 → 1, com a sombra
  crescendo).
- **Gatilho:** carregamento da página.
- **Celular:** sem cotas — só o carimbo entrando de baixo para cima, sem o efeito de desenho
  das cotas.

## Folha 03 — Sinais de alerta (`Folha03Alerta`)

- **O que se move:** cada triângulo de alerta acende em âmbar, um por vez (stagger de 120 ms); o
  título cresce de 0,96 → 1.
- **Gatilho:** seção entra 30% na tela.
- **Celular:** os triângulos acendem ao rolar até cada item; o título não tem o efeito de escala.

## Folha 05 — Por que um engenheiro (`Folha05Engenheiro`)

- **O que se move (3D):** a casa em wireframe isométrico gira 30° e os circuitos acendem em
  âmbar, um a um, até o quadro.
- **Gatilho:** rolagem (scrub, 0 → 100% enquanto a seção passa pela tela).
- **Celular:** sem WebGL — vídeo curto em loop (6s) da casa isométrica acendendo os circuitos,
  disparado quando a seção entra na tela (toca uma vez).

## Folha 06 — Antes e depois (`Folha06AntesDepois`)

- **O que se move:** a linha âmbar do comparador desliza sozinha de 50% → 20% → 80% → 50% uma
  vez, para ensinar o gesto de arrastar; depois do ciclo, o controle fica livre para o usuário.
- **Gatilho:** seção entra na tela.
- **Celular:** não há essa animação de ensino — as abas "Antes/Depois" trocam em fade (250 ms)
  ao toque ou ao deslizar o dedo sobre a foto.

## Folha 08 — Como funciona (`Folha08Processo`)

- **O que se move:** as barras do cronograma crescem da esquerda para a direita, uma por linha
  (stagger de 150 ms); o losango do marco de orçamento "carimba" ao chegar sua vez.
- **Gatilho:** a tabela entra 40% na tela.
- **Celular:** cada barra cresce individualmente quando a sua própria linha entra na tela
  (sem stagger coordenado — é por linha, via rolagem).

## Folhas sem anotação de movimento na referência

02 (Índice de serviços), 04 (Detalhes A–D), 07 (Trajetória), 09 (Notas e FAQ),
10 (Pedido de orçamento) e 11 (Rodapé) não têm blocos `[MOMENTO]` nas referências — ficam só
com a interação básica já implementada (links, `<details>`, formulário).
