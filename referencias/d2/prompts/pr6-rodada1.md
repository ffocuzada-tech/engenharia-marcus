# PR #6 · Rodada 1 de 2 — Fundação D2, navegação, hero, índice flutuante e rodapé

## Contexto
O site sai da direção D1 (Prancha técnica) e passa para a **D2**: institucional, com DNA de engenharia. O usuário aprovou um protótipo em HTML puro: **`referencias/d2/prototipo-d2.html`**. Ele é a referência de visual, textos e comportamento (cores, tipografia, espaçamentos, animações). Não copie o arquivo: porte para componentes do Next, mantendo o resultado visual o mais fiel possível.

Este PR é feito em duas rodadas na mesma branch:
- **Rodada 1 (esta):** fundação visual, navegação, hero, índice flutuante e rodapé.
- **Rodada 2:** serviços, diferenciais, soluções, dúvidas e orçamento.

## Antes de começar
1. `git checkout main && git pull` (o PR #5 já está mergeado).
2. `git checkout -b feat/d2-pagina`
3. Leia `AGENTS.md`. O Next 16 tem mudanças; consulte `node_modules/next/dist/docs/` quando tiver dúvida de API.
4. Leia o protótipo inteiro: o `<style>` (tokens em `:root`, `.nav`, `.mega`, `.menu-movel`, `.hero`, `.pilha`, `.folha`, `.fundo-folhas`, `.indice`, `.rodape`) e o `<script>` (funções das pranchas, folhear, navegação, índice).

## Regras da D2 (valem para o PR inteiro)
- **Nada de linhas divisórias entre itens**: sem `border-top`/`border-bottom` separando itens de lista, sem `divide-y`, sem grade com gap de 1 px sobre fundo colorido. Separação por fundo (branco, gelo, azul-noite), espaço e cards (cantos de 16 a 22 px, sombra suave). Linhas só existem dentro dos desenhos das pranchas.
- Sai da interface todo o vocabulário de prancha: "FOLHA XX/11", "ESC.", "REV.", carimbo, cotas decorativas, mini-carimbo.
- Âmbar só em ação e energia (botão primário, pontos, destaques). Nunca texto âmbar sobre fundo claro.
- Uma ação principal por tela: "Solicitar orçamento", em âmbar.
- Mobile first: tudo precisa funcionar em 360 px. Nas grades, use `minmax(0,1fr)` ou `minmax(min(Xpx,100%),1fr)`. Nunca esconda estouro com `overflow-x: hidden` em `html`, `body` ou `main`: corrija a causa. O único recorte permitido é o `overflow: clip` da camada decorativa das pranchas, como no protótipo.
- Movimento: respeite `prefers-reduced-motion`. Mantenha a regra global que já existe em `globals.css`; o `check:layout` testa que as durações computadas ficam em `0s` (o protótipo usa `.01ms`, que não passa nesse teste).
- Acessibilidade:
  - foco visível: contorno azul elétrico de 3 px; âmbar sobre fundo escuro;
  - "Pular para o conteúdo";
  - alvos de toque de pelo menos 44 px;
  - `aria-expanded` nos menus e Esc fecha todos;
  - menu do celular move o foco para o botão de fechar.
- Componentes de `src/components/ui` continuam usando `tailwind-merge`.
- Dados do cliente nunca são inventados. Valores que ainda são marcadores (`ehMarcador()` de `src/lib/site.ts`) não aparecem como fato: o item some ou usa um texto neutro, como descrito abaixo.

## 1. Fundação
- Crie `design-system/d2/tokens.css` com o bloco `:root` do protótipo (cores, sombras, fontes). Ele passa a ser a fonte da verdade da D2.
- `src/app/globals.css`:
  - troque os tokens D1 do `@theme` pelos da D2 (cores, fontes, raios de volta, sombras `shadow-1` e `shadow-2`);
  - escolha nomes consistentes para as classes (ex.: `bg-noite`, `bg-gelo`, `text-texto-2`, `bg-ambar`, `text-eletrico`);
  - remova os utilitários que só existiam na D1 (`bg-grid-paper`, sombras sólidas deslocadas);
  - mantenha a regra global de reduced-motion.
- Fontes em `src/app/layout.tsx`, via `next/font/google`:
  - **Archivo** variável com eixo `wdth` (com `axes`, não passe `weight`);
  - **Figtree**, pesos 400 a 700;
  - **JetBrains Mono**, pesos 400 a 700.

  Mantenha todos os metadados do PR #5. As fontes de `src/app/og-fonts/` (cartão de compartilhamento) ficam como estão por enquanto.
- Componentes base em `src/components/ui`:
  - `Button`, com as variantes `ambar`, `claro` e `vidro`;
  - `Etiqueta`, o rótulo com ponto âmbar;
  - `CabecalhoSecao`: etiqueta + título + subtítulo, alinhado à esquerda ou ao centro, com versão para fundo escuro;
  - `Chip`;
  - `Icone`: os símbolos do sprite SVG do protótipo como componente (24×24, `stroke="currentColor"`).
- Remova os componentes D1 que deixam de existir (confira antes se nada mais os usa):
  - `ui`: `SheetBar`, `SheetStamp`, `FootStrip`, `TitleBlock`, `Dimension`, `Callout`, `Pin`, `Photo`, `Tag`, `Faq`;
  - `providers/SheetProvider`;
  - `lib/sheets.ts`.
- Remova as seções D1 de `src/components/sections/`: `Folha01` a `Folha09`, `Folha11` e `Header`. **Mantenha `Folha10Orcamento.tsx` no repositório, sem renderizar**: a lógica do formulário (WhatsApp) volta na rodada 2.
- Atualize o `CLAUDE.md` para a D2:
  - direção ativa D2, com tokens em `design-system/d2/tokens.css`;
  - fontes Archivo, Figtree e JetBrains Mono;
  - cantos arredondados e sombras suaves;
  - regra de nada de linhas divisórias;
  - âmbar só em ação;
  - copy em "nós".

  Tire as regras que só valiam para a D1. Mantenha objetivo, marcadores, precisão técnica, desempenho e fluxo git.

## 2. Navegação — `src/components/sections/Navegacao.tsx` (client)
Porte de `.nav`, `.mega` e `.menu-movel`.
- **Barra:** flutuante, transparente no topo e em vidro depois de 16 px de rolagem.
  - Some ao descer (passados 260 px) e volta ao subir.
  - Nunca some com o mega menu ou o menu do celular abertos.
- **Links:** Serviços (botão que abre o mega menu), Diferenciais, Soluções e Dúvidas. À direita:
  - botão do WhatsApp (só ícone, com `aria-label`);
  - "Solicitar orçamento" (âmbar), que leva a `#orcamento`.
- **Seção atual:** uma pílula desliza por trás do link da seção visível (IntersectionObserver com `rootMargin: "-45% 0px -50% 0px"`).
  - Crie `src/content/secoes.ts` com a lista `{ id, nome }` das seções. Navegação e índice usam essa lista.
  - Nesta rodada a lista tem só as seções que existem.
- **Mega menu:**
  - 4 serviços (ícone, título, uma linha) e o card escuro "Emergência elétrica?" com botão de WhatsApp;
  - abre com hover de mouse (90 ms de atraso para abrir, 220 ms para fechar) e com clique;
  - Esc e clique fora fecham.
  - Nesta rodada os itens levam a `#servicos`. Na rodada 2 eles passam a abrir a solução correspondente.
- **Até 1040 px:**
  - botão de menu que abre um painel em tela cheia com revelação circular (`clip-path`);
  - no painel: links grandes, os 4 serviços em grade 2×2 e os botões embaixo;
  - a rolagem da página fica travada enquanto o painel está aberto;
  - clicar num link fecha o painel e só depois rola até a seção.
- **WhatsApp:** os links usam `waLink()` de `src/lib/contato.ts`, com `target="_blank" rel="noopener noreferrer"`. As mensagens prontas não afirmam fatos pelo visitante.
- **Logo:** o sinal do protótipo (quadro com raio) + `nomePublico()`.

## 3. Hero — `src/components/sections/Hero.tsx` + pasta `src/components/hero/`
Porte fiel de `.hero`, `.hero-mesa`, `.pilha`, `.folha`, `.fundo-folhas`, `.esteira`, `.legenda-folha` e do script das pranchas.

**Texto**
- Selo "Engenharia elétrica · CREA ativo".
- H1 com "segurança" sublinhado em âmbar (o sublinhado se desenha na abertura).
- Subtítulo, os dois botões e os 3 selos.
- Terceiro selo: "Resposta em até {prazo}" só quando o prazo do cliente não for marcador. Enquanto for, mostre "Contato direto com o engenheiro". Se `site.ts` ainda não tiver o campo de prazo, crie-o com marcador.

**Pranchas**
- As 5 funções que geram o SVG (planta, unifilar, quadro de cargas, detalhe do quadro, memorial) vão para `src/components/hero/pranchas.ts`, como funções que retornam string SVG.
- Renderize com `dangerouslySetInnerHTML`: o conteúdo é estático e não recebe entrada do usuário.
- Mantenha os mesmos valores técnicos; já foram revisados.

**Movimento**
- Pilha em 3D com CSS (`perspective` + `preserve-3d`).
- Folhear com GSAP a cada 3,9 s, usando `useGSAP` de `@gsap/react`, com brilho na folha que vira e varredura na de baixo.
- Legenda da prancha que troca a cada folha.
- Pausa no hover. No computador, clique vira a página. No celular, deslizar o dedo vira (`touch-action: pan-y`).
- Inclinação seguindo o mouse.
- Esteira de folhas ao fundo só a partir de 960 px.
- Abertura: a planta se traça e o texto sobe.

**Atenção (bugs já resolvidos no protótipo)**
- Ao virar, apague as **faces** (`.face`), nunca a `.folha`. Opacidade abaixo de 1 numa folha com `preserve-3d` achata o verso e mostra o desenho espelhado.
- Tracejado com `pathLength=1` vira linha contínua. Só use o efeito de traçar em linhas sólidas e retire a classe de animação quando ela terminar (o protótipo faz isso depois de 3,4 s).
- Pause o folhear quando a hero sai da tela ou a aba fica oculta.
- Com reduced-motion: sem folhear automático, sem abertura e sem inclinação.

**Implementação**
- Use um CSS Module (`Hero.module.css`) para o 3D, as classes das pranchas e os keyframes. Use Tailwind no layout e no texto.
- O texto da hero aparece sem depender de JavaScript, por causa do LCP.
- O GSAP só roda no cliente. Use o `src/lib/gsap.ts` existente e tire dele os `CustomEase` da D1, se ficarem sem uso.

## 4. Índice flutuante — `src/components/sections/IndiceFlutuante.tsx` (client)
Porte de `.indice`:
- botão redondo azul-noite com anel de progresso âmbar;
- aparece depois de 55% da altura da hero;
- lista as seções de `src/content/secoes.ts`, com a atual destacada;
- Esc e clique fora fecham;
- não pode cobrir botões do conteúdo: o rodapé tem espaço embaixo suficiente para ele.

## 5. Rodapé — `src/components/sections/Rodape.tsx`
Porte de `.rodape`:
- dados de `site.ts` e `contato.ts` (`whatsappExibicao()`);
- a linha de baixo é "© {ano} {nomePublico()} · Responsável técnico com registro no CREA";
- **não leve** a frase "Protótipo D2 · fotos ilustrativas…".

## 6. Página
`src/app/page.tsx` monta: `Navegacao` → `<main id="conteudo">` com `Hero` → `Rodape` → `IndiceFlutuante`. Mantenha o JSON-LD do PR #5.

## Verificação e entrega
- Rode `npm run build`, `npm run lint` e `npm run check:layout`. **Não tire prints**: print só do que o check:layout acusar.
- Commits em português, pequenos e descritivos.
- Faça push e abra o PR como **rascunho (draft)**, com o título "PR #6 · D2: nova página (rodada 1 de 2)". Na descrição:
  - o que entrou;
  - o que foi removido;
  - o que fica para a rodada 2.
- Me responda com o link do PR e uma lista curta de qualquer decisão que você tomou e que não estava neste arquivo.
