# [NOME] Engenharia Elétrica · Produção de vídeo, loops, 3D e fotos

**Versão 1.0 · novembro de 2026** · complemento do `DESIGN-SYSTEM.md`

Este guia lista cada peça de movimento do site, nas duas direções, com tudo o que é preciso para produzi-la: onde entra, o que mostra, a referência a reunir, a especificação técnica e o prompt pronto. Cada peça tem um **ID** (por exemplo `D3-3D-01`) que é usado no nome do arquivo, no código e nas conversas.

---

## Sumário

0. [Antes de começar](#0-antes-de-começar)
1. [Especificações técnicas comuns](#1-especificações-técnicas-comuns)
2. [D1 · Prancha técnica](#2-d1--prancha-técnica)
3. [D3 · Unifilar](#3-d3--unifilar)
4. [Fotografia: lista de cenas e prompts de ambiente](#4-fotografia-lista-de-cenas-e-prompts-de-ambiente)
5. [Checklist de aprovação de cada peça](#5-checklist-de-aprovação-de-cada-peça)

---

## 0. Antes de começar

### 0.1 Quatro rotas de produção

Cada peça indica a rota mais adequada. Escolha pela qualidade necessária e pelo orçamento.

| Rota | Quando usar | Ferramentas |
|---|---|---|
| **A · Código** | Linhas, diagramas, cotas, malhas, ondas: tudo o que é geométrico. É a rota mais leve, mais nítida e mais fácil de ajustar. | SVG + CSS, Canvas 2D, three.js, gerado pelo Claude Code |
| **B · Vetor animado** | Animações de traço com muitos detalhes ou com tempo fino de edição. | After Effects + Bodymovin → Lottie (JSON), ou Rive (interativo) |
| **C · 3D** | Objetos com volume, material e luz (casa, quadro, cabo). | three.js procedural (Claude Code), ou Blender → GLB, ou Spline (mais simples) |
| **D · Vídeo** | Coisas reais: mãos, cobre, lâmpada, caneta no papel. | Filmagem própria (preferível) ou IA de vídeo (Veo, Runway, Kling, Sora) |

### 0.2 Regra de honestidade (importante)

- **Imagens geradas por IA só servem para ambiente e detalhe genérico:** macros de cobre, uma lâmpada, uma caneta no papel.
- **Nunca usar IA para:**
  - o rosto do engenheiro;
  - obras "antes e depois";
  - quadros de clientes;
  - imagens térmicas apresentadas como medições reais;
  - qualquer coisa apresentada como trabalho dele.
- Essas peças precisam ser **fotos e vídeos reais**, e o site não deve sugerir o contrário.
- Num site de engenharia, uma prova falsa destrói justamente a confiança que o site quer construir.

### 0.3 O que pedir ao cliente (referências reais)

Reúna isto antes de produzir, porque várias peças dependem desse material:

1. **Uma planta elétrica real** (PDF ou DWG) de um projeto dele, com autorização do cliente, para virar a base de `D1-V-01` e `D3-V-01`. Dados pessoais e endereço devem ser removidos.
2. **Um diagrama unifilar real** de um quadro feito por ele.
3. **Fotos de um quadro antes e depois** da mesma obra, no mesmo enquadramento.
4. **3 a 5 imagens térmicas** de inspeções reais (arquivo da câmera, com a escala de cores).
5. **O modelo dos disjuntores e do quadro que ele mais usa** (marca e linha), para o 3D ficar fiel.
6. **Uma sessão de fotos de meio período** com ele (ver a lista do capítulo 4).
7. **A assinatura dele** escaneada em fundo branco (para a animação da assinatura na D1).

### 0.4 Nomes de arquivo e pastas

```
/assets/motion/
  d1-v-01-prancha-energia/
    d1-v-01-desktop.mp4      ← H.264
    d1-v-01-desktop.webm     ← VP9
    d1-v-01-mobile.mp4       ← versão vertical ou recortada
    d1-v-01-poster.webp      ← primeiro quadro
    d1-v-01.json             ← se for Lottie
/assets/3d/
  d3-3d-02-quadro.glb        ← Draco + texturas KTX2
  d3-3d-02-quadro-poster.webp
```

---

## 1. Especificações técnicas comuns

### 1.1 Vídeos em loop

| Item | Valor |
|---|---|
| Duração | 6–12 s, com loop perfeito (o último quadro emenda no primeiro) |
| Resolução | 1920×1080 no computador; 1080×1350 (4:5) ou 1080×1920 (9:16) no celular |
| Quadros por segundo | 30 (24 para os vídeos reais com cara de cinema) |
| Peso | até 2 MB no computador e 1 MB no celular |
| Formatos | MP4 H.264 e WebM VP9, mais um pôster WebP |
| Áudio | nenhum (remover a faixa) |
| No HTML | `autoplay muted loop playsinline preload="none"`, pausado fora da tela e com botão de pausa visível se passar de 5 s |

**Conversão (ffmpeg):**

```bash
# MP4 H.264 (rápido, boa compressão)
ffmpeg -i entrada.mov -an -vf "scale=1920:-2,fps=30" -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -movflags +faststart saida.mp4
# WebM VP9
ffmpeg -i entrada.mov -an -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 saida.webm
# Pôster
ffmpeg -i saida.mp4 -frames:v 1 -q:v 80 poster.webp
# Loop perfeito: funde o primeiro segundo no final (para vídeos sem emenda natural)
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 entrada.mp4)   # duração em segundos
OFFSET=$(echo "$D - 2" | bc)                                                  # onde começa a fusão
ffmpeg -i entrada.mp4 -an -filter_complex \
  "[0]split[a][b];[a]trim=0:1,setpts=PTS-STARTPTS[inicio];[b]trim=1,setpts=PTS-STARTPTS[resto];[resto][inicio]xfade=transition=fade:duration=1:offset=$OFFSET" \
  -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p loop.mp4
```

### 1.2 Lottie e SVG

- Lottie com no máximo 150 KB, sem imagens embutidas, só formas e traços.
- Traços com as cores dos tokens: D1 nanquim `#0F1E33` e âmbar `#F2B417`; D3 cobre `#D0844A` sobre petróleo `#0E2F2E`.
- Espessura de linha: 1,4–2 px na D1 e 2–4 px na D3.

### 1.3 3D / WebGL

| Item | Valor |
|---|---|
| Biblioteca | three.js (r16x), sem framework obrigatório |
| Modelo | GLB com compressão Draco; texturas KTX2 (Basis) com 1024 px no máximo |
| Orçamento | até 80 mil triângulos por cena; 2 MB por GLB |
| Luz | 1 luz de ambiente (HDRI pequeno, 256 px) + 1 direcional; sombras só se necessárias |
| Carregamento | só quando a seção estiver a 1 tela de distância (IntersectionObserver); pôster WebP no lugar até carregar |
| Celular e "reduzir movimento" | sem WebGL: usar o vídeo ou a imagem de substituição indicada em cada peça |
| Pausa | `renderer.setAnimationLoop(null)` quando a seção sai da tela |

---

## 2. D1 · Prancha técnica

**Paleta de movimento:** nanquim `#0F1E33` sobre papel `#F3F1EA`, âmbar `#F2B417` para a energia e os marcos. Linhas finas e precisas, sem brilho, sem partículas, sem lens flare: aqui a energia é **desenho**, não fogo.

---

### D1-V-01 · A prancha que liga (peça principal)

| | |
|---|---|
| **Onde entra** | Fundo da seção 05 (Por que um engenheiro) ou transição entre as seções 04 e 05 |
| **Rota** | A (SVG animado por código) ou B (Lottie). **Não usar IA de vídeo**: ela não mantém linhas técnicas estáveis |
| **Duração** | 12 s em loop |
| **Referência** | Planta elétrica real do cliente (item 0.3-1), simplificada |

**O que acontece, quadro a quadro**

| Tempo | Ação |
|---|---|
| 0,0–1,0 s | A planta baixa aparece em nanquim, com paredes, portas e símbolos (tomadas, luminárias, interruptores), em traço de 1,4 px. Tudo parado, como uma folha impressa. |
| 1,0–1,5 s | O quadro de distribuição (retângulo no canto) se preenche de âmbar. |
| 1,5–8,0 s | **A energia sai do quadro** num traço âmbar de 2 px que percorre os eletrodutos (linhas tracejadas da planta), um circuito por vez. Cada circuito leva ~1,2 s. Quando chega num ponto, o símbolo acende em âmbar com um pequeno anel que se expande e some (300 ms). Ao lado de cada circuito surge o rótulo em mono: `C1 · 2,5 mm² · 20 A`, `C2 · 4,0 mm² · 25 A`… |
| 8,0–9,5 s | Com todos os pontos acesos, a planta inteira "respira" uma vez (âmbar 100% → 70% → 100%). |
| 9,5–11,0 s | O carimbo aparece no canto inferior direito: "PROJETO · ENG. [NOME] · FOLHA 05/11". |
| 11,0–12,0 s | Tudo se apaga suavemente, em fade, até a planta só em nanquim, que é o quadro 0. O loop recomeça. |

**Especificação**
- Base: SVG com camadas `paredes`, `simbolos`, `eletrodutos-c1…c6`, `rotulos`, `carimbo`.
- Animação dos traços: `stroke-dasharray` / `stroke-dashoffset`, curva `cubic-bezier(.65,0,.35,1)`.
- Movimento reduzido: mostrar o quadro final (tudo aceso) como imagem estática.
- Celular: a mesma planta recortada em 4:5, só com 3 circuitos.

**Prompt para o Claude Code (rota A)**
```
Crie o componente D1-V-01 "prancha que liga" como um SVG animado em /components/d1-prancha-energia/.
Base: o arquivo /assets/ref/planta-simplificada.svg (planta baixa de uma casa, com camadas paredes, simbolos, eletrodutos-c1 a c6).
Cores: paredes e símbolos em #0F1E33 (1.4px), energia em #F2B417 (2px), fundo transparente sobre #F3F1EA.
Linha do tempo de 12 s em loop: (0–1s) planta parada; (1–1.5s) quadro preenche âmbar; (1.5–8s) um circuito por vez percorre seu eletroduto com stroke-dashoffset (1.2s cada, cubic-bezier(.65,0,.35,1)); cada símbolo atingido acende em âmbar com anel que expande e some em 300ms; rótulo mono "C1 · 2,5 mm² · 20 A" aparece ao lado; (8–9.5s) a planta respira (opacidade do âmbar 1→.7→1); (9.5–11s) carimbo aparece no canto; (11–12s) fade de volta ao quadro 0.
Use Web Animations API, inicie só quando 40% do componente estiver visível, pause fora da tela, e em prefers-reduced-motion mostre o estado final estático. Fonte dos rótulos: IBM Plex Mono 11px.
```

**Se não houver planta real:** peça ao Claude Code uma planta fictícia simples (casa térrea de 2 quartos, 70 m²) desenhada em SVG com símbolos elétricos da NBR 5444, marcada como ilustrativa.

---

### D1-3D-01 · A casa que se revela (WebGL)

| | |
|---|---|
| **Onde entra** | Seção 05, no quadro tracejado roxo "[ESPAÇO 3D / WebGL]" |
| **Rota** | C: three.js procedural (recomendado) ou Blender → GLB |
| **Interação** | rolagem controla a animação (scrub de 0 a 100% enquanto a seção atravessa a tela); o mouse gira a casa ±8° |
| **Celular** | vídeo de 6 s em loop renderizado da mesma cena (1080×1350) |

**A cena**
- Uma casa térrea simples (sala, cozinha, 2 quartos, banheiro, área de serviço) em **vista isométrica** (câmera ortográfica, 35° de elevação, 45° de rotação).
- Tudo em **wireframe nanquim** (linhas de 1 px, sem faces sólidas), sobre o papel milimetrado.
- Dentro das paredes: eletrodutos como tubos finos; caixas de tomada e luminárias como pequenos cubos e discos; o quadro de distribuição na parede da cozinha.

**Linha do tempo (pela rolagem)**

| Progresso | O que acontece |
|---|---|
| 0–20% | Casa fechada em wireframe, girando lentamente. |
| 20–45% | **Vista explodida:** telhado sobe 40 unidades, paredes externas se afastam 15 unidades para fora. Os eletrodutos ficam à mostra. |
| 45–80% | **Os circuitos acendem em âmbar**, um a um, a partir do quadro, com um pulso de luz correndo dentro de cada tubo até o ponto final. Ao acender, cada circuito ganha um rótulo flutuante em HTML sobreposto: `C3 · 4,0 mm² · 25 A · chuveiro`. |
| 80–100% | A casa se fecha de volta; os circuitos continuam acesos através das paredes (linhas âmbar visíveis no wireframe). O carimbo HTML aparece no canto. |

**Materiais:** `LineBasicMaterial` nanquim `#0F1E33` para as paredes; tubos com `MeshBasicMaterial` nanquim que passam para âmbar `#F2B417` (com um leve `emissive` se usar `MeshStandardMaterial`). Não usar bloom, para não perder o caráter de desenho.

**Prompt para o Claude Code (procedural)**
```
Crie D1-3D-01 em /components/d1-casa-3d/ com three.js (r16x, módulo ES), sem modelo externo: gere a geometria proceduralmente.
Casa térrea isométrica (câmera OrthographicCamera, elevação 35°, azimute 45°), cômodos: sala 4x5, cozinha 3x4, 2 quartos 3x3.5, banheiro 2x2.5, área de serviço 2x2. Paredes como EdgesGeometry em LineSegments cor #0F1E33, sem faces. Telhado de duas águas em arestas.
Eletrodutos: TubeGeometry (raio 0.04) seguindo caminhos dentro das paredes, saindo de um quadro (Box 0.6x0.8x0.15 na parede da cozinha) até 12 pontos (tomadas como Box pequenos, luminárias como Circle no teto). Agrupe por circuito C1–C6.
Animação controlada por scroll (progresso 0→1 da seção, via IntersectionObserver + scroll listener com lerp): 0–.2 casa fechada girando devagar; .2–.45 telhado sobe e paredes externas se afastam (vista explodida); .45–.8 circuitos acendem em sequência (#F2B417) com um pulso percorrendo o tubo (shader simples com uniform uProgress no comprimento do tubo) e rótulos HTML (CSS2DRenderer, IBM Plex Mono 11px) "C3 · 4,0 mm² · 25 A"; .8–1 casa se fecha com circuitos ainda acesos.
Mouse: rotação ±8° com amortecimento. Fundo transparente (a seção tem papel milimetrado em CSS).
Carregue só quando a seção estiver a 1 viewport; pause o loop fora da tela; em telas < 1024px ou prefers-reduced-motion, não inicie o WebGL e mostre /assets/motion/d1-3d-01-mobile.mp4 (ou o pôster).
```

**Briefing alternativo para um modelador (Blender)**
- Modelar a mesma casa com arestas marcadas (Freestyle ou geometria de linha).
- Exportar em GLB com animações nomeadas: `explode` (0–1 s), `circuit_C1` … `circuit_C6` (1 s cada) e `close` (1 s).
- Os tubos devem ter coordenada UV ao longo do comprimento, para o pulso de luz por shader.
- Entregar: GLB Draco com até 2 MB, o vídeo 4:5 para celular e o pôster.

---

### D1-3D-02 · Do projeto à realidade (opcional)

| | |
|---|---|
| **Onde entra** | Seção 06 (Antes × depois), ao lado do comparador |
| **Rota** | C (Blender → GLB) ou D (vídeo renderizado de 6 s, mais simples) |
| **Referência** | Foto real do quadro "depois" (item 0.3-3) e o modelo de disjuntor usado (0.3-5) |

**O que mostra:** o quadro de distribuição começa como desenho técnico (vista frontal em linhas nanquim, com cotas) e, numa varredura da esquerda para a direita, vai ganhando material: chapa cinza, disjuntores brancos, barramento de cobre e cabos identificados. Termina igual à foto real do "depois". Duração de 6 s, com uma pausa de 2 s no fim.

**Prompt para IA de vídeo (se for a rota D, só como ilustração)**
```
Front view of a residential electrical distribution panel, starting as a precise technical line drawing in dark navy ink on off-white drafting paper with dimension lines, then a clean left-to-right wipe transforms it into the real photographic panel: grey steel enclosure, row of white DIN-rail circuit breakers, copper busbar, neatly labeled wires. Locked-off camera, no camera movement, soft even daylight, documentary realism, 6 seconds.
Negative: sparks, smoke, people, text overlays, logos, fisheye, dramatic lighting, cartoon style.
```
> Como esta peça representa "um quadro bem feito" de forma genérica, a IA é aceitável **se** a legenda não disser que é obra do cliente. O ideal é o quadro real.

---

### D1-V-02 · O plotter

| | |
|---|---|
| **Onde entra** | Tela de carregamento (primeiros 1–2 s) ou fundo alternativo do hero |
| **Rota** | A (canvas) para versão abstrata, ou D (vídeo) para versão real |
| **Duração** | 8 s em loop |

**O que mostra:** uma cabeça de plotter (um pequeno carro com caneta, visto de cima) percorre a folha de um lado ao outro, desenhando linha por linha a planta de D1-V-01. A cada passada, uma nova faixa da planta aparece.

**Prompt para IA de vídeo (versão real)**
```
Top-down macro shot of a large-format pen plotter drawing a precise architectural electrical floor plan on cream drafting paper with a fine navy ink pen, the plotter head moving left to right in smooth passes, crisp thin lines appearing behind it, shallow depth of field, soft cool daylight from a window, quiet documentary feel, 8 second seamless loop.
Negative: printer brand logos, colored ink other than navy, people, hands, text, glitch, fast motion.
```

---

### D1-V-03 · Do lápis ao nanquim

| | |
|---|---|
| **Onde entra** | Faixa horizontal fina (120–160 px de altura) entre seções; também no título do hero |
| **Rota** | A (SVG) |
| **Duração** | 4 s, toca uma vez ao entrar na tela |

**O que mostra:** uma linha de construção a lápis, cinza (`#9AA3AF`, falhada com `stroke-dasharray` irregular), atravessa a faixa; logo atrás, uma linha nanquim firme (`#0F1E33`, 1,5 px) a cobre. No meio do caminho, a linha passa por um símbolo (tomada ou luminária), que é "passado a nanquim" junto.

**Prompt para o Claude Code**
```
Crie D1-V-03 como SVG de largura 100% e altura 140px: uma linha horizontal com um símbolo elétrico (tomada NBR 5444) no centro. Camada 1: traço "lápis" #9AA3AF 1px com stroke-dasharray irregular (simule falhas), desenhada da esquerda para a direita em 1.6s. Camada 2: traço "nanquim" #0F1E33 1.5px desenhado com 400ms de atraso e duração 1.6s, cobrindo o lápis; ao terminar, o lápis some em 300ms. Dispara uma vez quando 50% visível. Em prefers-reduced-motion, mostre só a linha nanquim.
```

---

### D1-V-04 · A cota viva

| | |
|---|---|
| **Onde entra** | Divisor entre seções claras (por exemplo, 02→04 e 07→08) |
| **Rota** | A (CSS + JS) |
| **Duração** | 1,2 s, toca uma vez |

**O que mostra:** as duas marcas de extremidade da cota aparecem nas bordas do contêiner; a linha cresce do centro para os lados; o número no meio conta de `0` até a largura real do contêiner em milímetros de prancha (por exemplo `1.200 mm`), em IBM Plex Mono.

**Prompt para o Claude Code**
```
Crie o divisor .d1-dimension--live: ao entrar 60% na tela, as marcas laterais aparecem (opacity 0→1, 150ms), a linha cresce do centro para as bordas (scaleX 0→1, 600ms, cubic-bezier(.65,0,.35,1)) e o rótulo central conta de 0 até o valor de data-mm (ex.: 1200) formatado "1.200 mm" com tabular-nums, em 800ms. Uma vez só. Reduzir movimento: estado final direto.
```

---

### D1-V-05 · A caneta real

| | |
|---|---|
| **Onde entra** | Fundo escurecido (overlay nanquim a 80%) de uma seção de respiro, como a 03 ou a 10 |
| **Rota** | D: **filmagem própria recomendada** (celular em 4K/60 fps, depois desacelerado) |
| **Duração** | 8 s em loop |

**Roteiro de filmagem:** close de 10 cm da ponta de uma caneta técnica (0,3 mm) traçando uma linha reta com régua sobre papel vegetal; luz lateral de janela; fundo desfocado. Filmar 3 tomadas de 15 s e escolher a mais estável.

**Prompt para IA de vídeo (alternativa)**
```
Extreme macro, slow motion: the tip of a technical drafting pen (0.3 mm) drawing a perfectly straight navy ink line along a metal ruler on translucent vellum paper, ink flowing smoothly, soft side window light, very shallow depth of field, cool neutral tones, calm and precise, seamless 8 second loop, 24fps cinematic.
Negative: hands visible beyond fingertips, text, logos, smudges, shaky camera, warm orange tones.
```

---

### D1-V-06 · A malha que respira

| | |
|---|---|
| **Onde entra** | Fundo de papel milimetrado de toda a página (opcional, muito sutil) |
| **Rota** | A (canvas ou shader CSS) |
| **Duração** | contínuo, ciclo de 14 s |

**O que mostra:** uma onda diagonal de âmbar muito suave (opacidade de no máximo 8%) percorre as linhas da malha de 24 px, de canto a canto, a cada 14 s. Ela quase não se nota, mas dá vida ao papel.

**Prompt para o Claude Code**
```
Crie um canvas fixo atrás do conteúdo da D1 que desenhe a malha de 24px (#0F1E33 a 6%) e, a cada 14s, uma faixa diagonal de 240px de largura que tinge as linhas cruzadas de #F2B417 até 8% de opacidade, percorrendo a tela do canto superior esquerdo ao inferior direito. requestAnimationFrame limitado a 30fps, pausado quando a aba está oculta, desligado em prefers-reduced-motion e em telas < 640px.
```

---

### D1-V-07 · A prancha que se dobra (envio do formulário)

| | |
|---|---|
| **Onde entra** | Confirmação do envio do formulário-carimbo (seção 10) |
| **Rota** | A (CSS 3D transforms) ou B (Lottie) |
| **Duração** | 1,8 s, uma vez |

**O que acontece**

| Tempo | Ação |
|---|---|
| 0–0,4 s | Um carimbo "RECEBIDO · DD/MM/AAAA · Nº 0042" bate sobre o formulário (escala 1,3 → 1, rotação −4°, cor âmbar-texto `#8A5A00` com textura de tinta). |
| 0,4–1,4 s | A folha se dobra **em sanfona**, como as pranchas de arquivo: dobra vertical em 3 partes, depois dobra horizontal, até virar um retângulo A4. |
| 1,4–1,8 s | O "A4" desliza para baixo e some; no lugar aparece a mensagem: "Pedido recebido. Respondo em até [PRAZO] pelo WhatsApp." |

**Prompt para o Claude Code**
```
No envio bem-sucedido do .d1-formblock, rode: (1) um selo "RECEBIDO · {data} · Nº {número}" em IBM Plex Mono bold, cor #8A5A00, borda dupla, rotação -4°, que entra com scale 1.3→1 em 400ms cubic-bezier(.2,1.4,.4,1); (2) dobra em sanfona com CSS 3D (perspective 1200px): divida o formulário em 3 painéis verticais que giram em rotateY alternado (±180°) em 500ms, depois o bloco resultante gira em rotateX 180° no meio da altura em 500ms; (3) o bloco desce 40px e some (300ms) e é substituído pela mensagem de confirmação. Reduzir movimento: só a mensagem.
```

---

## 3. D3 · Unifilar

**Paleta de movimento:** cobre `#D0844A` (energia) sobre petróleo `#0E2F2E`; papel `#F1ECE2` nas seções claras. Aqui a energia tem **brilho e matéria**: metal, reflexo, partículas. Mas ainda é engenharia: nada de raios, explosões ou faíscas exageradas.

---

### D3-3D-01 · O tronco de cobre (peça principal)

| | |
|---|---|
| **Onde entra** | A linha-tronco inteira, do hero ao rodapé, por cima da borda CSS de 3 px (que continua existindo como substituto) |
| **Rota** | C: three.js procedural, com shader |
| **Interação** | velocidade da corrente acompanha a velocidade da rolagem; brilho mais forte nos nós; instabilidade na seção de faltas |
| **Celular** | sem WebGL: a borda CSS de 3 px com um gradiente de "pulso" descendo a cada 4 s |

**A peça**
- **O cabo:** um único cabo de cobre que desce verticalmente pela página, na mesma posição da borda do tronco.
  - Visto de frente, parece uma linha de 3–4 px, mas com volume e reflexo metálico (cobre polido).
  - Dentro dele, **partículas de luz** (elétrons) correm para baixo.
- **Como a corrente responde à página:**
  - **Rolagem:** parada, as partículas andam devagar; rolando, aceleram na mesma proporção, com amortecimento.
  - **Nós:** ao passar por um nó de seção, o nó emite 3 a 5 faíscas pequenas, curtas (200 ms) e na cor cobre-claro `#E8A574`.
  - **Faltas (seção 03):** o cabo fica instável, com ruído no brilho e as partículas tremendo por 600 ms, e depois estabiliza.
  - **Circuito ligado (seção 04):** o cabo fica 20% mais brilhante.
- **Rodapé:** a corrente entra no símbolo de terra e se dissipa em 3 pulsos.

**Prompt para o Claude Code**
```
Crie D3-3D-01 em /components/d3-tronco-3d/: um canvas WebGL (three.js r16x) position:fixed, pointer-events:none, alinhado horizontalmente à linha-tronco da D3 (lê a posição x de .d3-trunk via getBoundingClientRect a cada resize). Altura = viewport; a cena simula um cabo vertical infinito que "rola" junto com a página.
Cabo: CylinderGeometry fina (raio equivalente a 2px na tela, câmera ortográfica), MeshPhysicalMaterial cor #D0844A, metalness 1, roughness .28, envMap de um HDRI pequeno (256px) neutro.
Partículas: 300 Points dentro do cabo com shader aditivo cor #E8A574, movendo para baixo; velocidade base 40px/s, multiplicada por (1 + |velocidade de scroll| * 0.02) com lerp .08.
Eventos (via data-attributes nas seções): ao cruzar um .d3-node, emitir 4 faíscas (pontos com vida de 200ms, velocidade radial); dentro de [data-fault] aplicar ruído no brilho (simplex) por 600ms; quando um circuito .d3-circuit não tiver .is-off, aumentar emissive em 20%. No rodapé, 3 pulsos que se dissipam no .d3-ground.
Pausar com document.hidden; não iniciar em < 1024px nem em prefers-reduced-motion (manter a borda CSS). Alvo: 60fps em notebook integrado; limite devicePixelRatio a 1.5.
```

---

### D3-3D-02 · O quadro explodido

| | |
|---|---|
| **Onde entra** | Seção 06, no quadro "[ESPAÇO 3D / WebGL · quadro]" |
| **Rota** | C: Blender → GLB (recomendado, pela fidelidade), ou three.js procedural (versão estilizada) |
| **Referência obrigatória** | Modelo de quadro e disjuntores que o engenheiro usa (0.3-5) e a foto "depois" real (0.3-3) |
| **Celular** | imagem estática da vista explodida + abas antes/depois |

**O modelo**
- Quadro de distribuição de embutir com 12 a 18 módulos e porta.
- Por dentro: trilho DIN, disjuntor geral bipolar, DR tetrapolar, DPS, de 8 a 12 disjuntores monopolares e bipolares, barramento de cobre, cabos coloridos pelo padrão brasileiro (fase preto/vermelho/branco conforme o projeto, neutro azul-claro, terra verde/verde-amarelo) e etiquetas de identificação.
- Materiais:
  - chapa cinza fosca;
  - plástico branco dos disjuntores (com leve subsuperfície);
  - cobre polido no barramento;
  - etiquetas em papel com texto real ("C1 · TOMADAS SALA").

**Clipes de animação (nomeados no GLB)**

| Clipe | Duração | Ação |
|---|---|---|
| `door_open` | 0,8 s | porta abre 100° |
| `explode` | 1,5 s | tampa (espelho) sai para frente 20 cm; disjuntores se afastam do trilho 5 cm, em leque; barramento recua 3 cm; cabos ficam |
| `breaker_close_01…12` | 0,25 s cada | alavanca de cada disjuntor sobe (de OFF a ON) |
| `assemble` | 1,2 s | inverso de `explode` |

**Interação**
- **Arrastar:** gira o quadro de −35° a +35° no eixo vertical.
- **Rolar:** o progresso da seção controla `explode`.
- **Botão "Religar":** roda os `breaker_close` em sequência, com 120 ms entre eles e um clique sonoro opcional.
- **Pontos clicáveis** (HTML sobreposto) em DR, DPS, disjuntor geral e barramento, com uma explicação de uma linha:
  - "DR: desliga se houver fuga de corrente para uma pessoa";
  - "DPS: protege contra surtos da rede";
  - "Geral: desliga a casa toda";
  - "Barramento: distribui a energia entre os circuitos".

**Briefing para o modelador (Blender)**
```
Peça: quadro de distribuição residencial de embutir, [MARCA/LINHA informada pelo cliente], 18 módulos, porta metálica.
Escala real em metros. Origem no centro da caixa. Eixo Y para cima.
Polígonos: até 60 mil triângulos no total. Disjuntores como instâncias (um modelo de monopolar, um de bipolar).
Materiais PBR: chapa (cinza #9AA0A6, roughness .6), plástico (#F4F4F2, roughness .45), cobre (#B87333, metalness 1, roughness .25), cabos com cores do padrão.
Etiquetas: textura 1024px com textos "C1 TOMADAS SALA", "C2 ILUMINAÇÃO", "C3 CHUVEIRO", "C4 COZINHA"… em fonte monoespaçada.
Animações (NLA, nomes exatos): door_open, explode, assemble, breaker_close_01 … breaker_close_12 (alavanca rotaciona de -20° para +20°).
Entregas: quadro.glb (Draco, KTX2, ≤ 2 MB), quadro-explodido.webp (2000px, fundo transparente, para celular), quadro-poster.webp, arquivo .blend.
```

**Prompt para o Claude Code (integração)**
```
Integre /assets/3d/d3-3d-02-quadro.glb na seção 06 da D3 com three.js (GLTFLoader + DRACOLoader + KTX2Loader). Fundo transparente sobre #F1ECE2, luz: HDRI pequeno + DirectionalLight suave. Arraste horizontal gira o objeto entre -35° e 35° (com inércia). O progresso de scroll da seção (0→1) controla o AnimationAction "explode" (setTime manual). Botão HTML "Religar" toca breaker_close_01…12 em sequência com 120ms entre eles. Hotspots com CSS2DRenderer em DR, DPS, geral e barramento (textos do DESIGN-SYSTEM D3.10). Carregar só a 1 viewport de distância; pôster até carregar; em < 1024px ou reduzir movimento, mostrar quadro-explodido.webp.
```

---

### D3-3D-03 · O cabo em corte (bônus, fundo do hero)

| | |
|---|---|
| **Onde entra** | Fundo do hero, à direita, atrás do formulário (opacidade 35%) |
| **Rota** | C renderizado como vídeo (Blender ou IA de vídeo) |
| **Duração** | 10 s em loop |

**O que mostra:** macro de um cabo elétrico cortado. Vê-se a capa preta, a isolação colorida e os fios de cobre trançados, girando muito lentamente em torno do próprio eixo, com luz lateral quente que faz o cobre brilhar sobre fundo verde-petróleo escuro.

**Prompt para IA de vídeo**
```
Extreme macro product shot of a freshly cut electrical cable cross-section, stranded bright copper wires twisted together inside colored insulation, rotating very slowly on its axis, warm copper highlights from a single side light, deep dark teal background (#0E2F2E), shallow depth of field, premium industrial aesthetic, no text, seamless 10 second loop, 24fps.
Negative: sparks, fire, smoke, hands, tools, logos, blue electricity effects, lightning, cartoon.
```

---

### D3-V-01 · O diagrama que liga

| | |
|---|---|
| **Onde entra** | Transição entre o hero e o barramento (faixa de 240–320 px) ou fundo da seção 05 (Legenda) |
| **Rota** | A (SVG) ou B (Lottie). Não usar IA |
| **Duração** | 10 s em loop |
| **Referência** | Um diagrama unifilar real feito pelo engenheiro (0.3-2) |

**Linha do tempo**

| Tempo | Ação |
|---|---|
| 0–1,5 s | Sobre o petróleo, o diagrama se desenha em cobre: entrada, medidor, disjuntor geral, DR, barramento e 6 circuitos com os disjuntores **abertos**. |
| 1,5–2 s | O disjuntor geral fecha (lâmina de −35° para 0°, com "clique" visual) e a entrada acende até o barramento. |
| 2–6 s | Os disjuntores dos circuitos fecham, um a cada 0,6 s; a cada fechamento, o ramal acende e a carga no fim (lâmpada, tomada, chuveiro, em símbolo) se ilumina com um halo suave. |
| 6–8 s | Tudo ligado; uma onda de brilho percorre o diagrama de cima para baixo. |
| 8–10 s | Os disjuntores abrem todos juntos (sem drama, 400 ms) e o diagrama esmaece até o quadro inicial. |

**Prompt para o Claude Code**
```
Crie D3-V-01 como SVG animado (Web Animations API) em /components/d3-diagrama-liga/, fundo transparente sobre #0E2F2E. Desenhe um diagrama unifilar: entrada, medidor (círculo com "kWh"), disjuntor geral, DR, barramento horizontal e 6 ramais com disjuntor (símbolo: fio, X, lâmina, fio) e carga (símbolos de lâmpada, tomada, chuveiro). Traço #D0844A 2.5px; desligado #B9B0A0. Linha do tempo 10s em loop: desenho (0–1.5s, stroke-dashoffset); geral fecha (lâmina -35°→0°, 250ms cubic-bezier(.3,1.6,.5,1)) e entrada acende; ramais fecham a cada 600ms acendendo até a carga, que ganha halo (#E8A574, blur 6px, 300ms); onda de brilho 6–8s; abre tudo e esmaece 8–10s. Rótulos DM Mono 11px #E8A574 (C1…C6). Inicia com 40% visível, pausa fora da tela, estático (tudo ligado) em reduzir movimento.
```

---

### D3-V-02 · O clique

| | |
|---|---|
| **Onde entra** | Entre as seções 04 e 05, em faixa cheia de 360–480 px de altura (corte seco) |
| **Rota** | D: **filmagem própria recomendada** (é a "foto-símbolo" da D3 em movimento) |
| **Duração** | 4 s em loop |

**Roteiro de filmagem**
- Close lateral de uma mão (a do engenheiro, com a manga da camisa de trabalho) fechando um disjuntor num quadro real.
- Celular em câmera lenta (240 fps), com luz lateral quente e o fundo do quadro escuro.
- Repetir 10 vezes e escolher a tomada em que a alavanca "estala".
- **Edição:** 1,2 s antes do clique, o clique em câmera lenta e 1,5 s depois. Corte seco para o início, para o loop.
- **Cor:** puxar sombras para petróleo e altas luzes para cobre.

**Prompt para IA de vídeo (alternativa, sem identificar a pessoa)**
```
Close-up side view, slow motion: a hand in a work shirt sleeve firmly flips a white DIN-rail circuit breaker lever from OFF to ON inside a residential electrical panel, tactile click moment, warm side light glinting on a copper busbar, deep teal shadows, shallow depth of field, cinematic color grade teal and copper, 4 second seamless loop, 24fps.
Negative: face, sparks, fire, electricity effects, text, brand logos, gloves in bright colors, shaky camera.
```

---

### D3-V-03 · O cobre

| | |
|---|---|
| **Onde entra** | Fundo escurecido do hero (alternativa ao D3-3D-03) |
| **Rota** | D (filmagem macro ou IA) |
| **Duração** | 8 s em loop |

**Prompt para IA de vídeo**
```
Extreme macro, slow motion: a wire stripper removes black insulation from an electrical cable, revealing bright shiny copper strands that catch a warm side light, tiny copper reflections, dark teal background, shallow depth of field, satisfying precise motion, cinematic, seamless 8 second loop, 24fps.
Negative: sparks, blood, burns, text, logos, fast cuts, blue tint.
```

---

### D3-V-04 · A senoide

| | |
|---|---|
| **Onde entra** | Faixa fina (64–96 px) que divide seções escuras; também como fundo sutil da Legenda |
| **Rota** | A (canvas 2D) |
| **Duração** | contínuo |

**O que mostra:** uma senoide de 60 Hz em cobre, de 2 px, desliza da direita para a esquerda como na tela de um osciloscópio, sobre uma grade de divisões muito sutil. A amplitude respira devagar (±10%). Ao passar o mouse, a onda ganha uma segunda fase defasada em 120° (trifásico), em cobre-claro.

**Prompt para o Claude Code**
```
Crie D3-V-04 em canvas 2D (100% de largura, 80px de altura): grade de osciloscópio (linhas rgba(241,236,226,.06) a cada 16px), senoide #D0844A 2px deslizando para a esquerda a 60px/s, 3 ciclos visíveis, amplitude 26px variando ±10% em 6s. No hover, adicionar duas fases defasadas 120° e 240° em #E8A574 a 60% de opacidade, com fade de 300ms. 30fps, pausa fora da tela, estático em reduzir movimento.
```

---

### D3-V-05 · A lâmpada que respira

| | |
|---|---|
| **Onde entra** | Divisor entre seções escuras (07 → 08) ou junto ao título "Ligue o seu circuito." da seção 10 |
| **Rota** | D (filmagem ou IA) |
| **Duração** | 6 s em loop |

**Prompt para IA de vídeo**
```
A single vintage filament light bulb hanging in darkness against a deep teal background, the copper-colored filament slowly brightening from a faint glow to full warm light and dimming back, like breathing, subtle glass reflections, centered composition, minimal, cinematic, seamless 6 second loop, 24fps.
Negative: flicker strobing, multiple bulbs, room interior, text, logos, sparks, broken glass.
```

---

### D3-V-06 · O calor que vai embora

| | |
|---|---|
| **Onde entra** | Dentro da leitura de campo do C3 (inspeção), na seção 09 |
| **Rota** | **Somente material real:** vídeo da câmera térmica ou sequência de imagens térmicas do mesmo quadro antes e depois da manutenção |
| **Duração** | 6 s em loop |

**Como produzir**
- Com a câmera térmica do engenheiro, gravar 10 s de um ponto quente num quadro (com autorização do cliente) e, depois do reaperto, gravar o mesmo ponto.
- **Montagem:** fusão de 2 s entre as duas tomadas, com a escala de temperatura real visível e a legenda "Leitura real · [data] · [tipo de imóvel]".
- **Não usar IA:** é uma prova técnica.

**Prompt para o Claude Code (montagem)**
```
Monte D3-V-06 a partir de /assets/ref/termica-antes.mp4 e termica-depois.mp4 (mesmo enquadramento): 2s do antes, fusão cruzada de 2s, 2s do depois, loop. Mantenha a escala de temperatura original visível. Exporte MP4 H.264 e WebM VP9 em 1080x1080, ≤ 1MB, e um pôster. Adicione no HTML a legenda "Leitura real · [data] · [tipo de imóvel]" em DM Mono 11px.
```

---

### D3-V-07 · O aterramento

| | |
|---|---|
| **Onde entra** | Rodapé, no símbolo de terra |
| **Rota** | A (CSS) |
| **Duração** | contínuo, ciclo de 3 s |

**O que mostra:** um pulso de luz cobre desce os últimos 56 px do tronco e, ao chegar ao símbolo de terra, as três barras se acendem em sequência, da maior para a menor (100 ms entre elas), e se apagam. O pulso se repete a cada 3 s.

**Prompt para o Claude Code**
```
Anime o .d3-ground do rodapé: um gradiente linear (transparente → #E8A574 → transparente, 24px) desce pelo trecho final do tronco em 900ms; ao chegar, as três barras do símbolo acendem em sequência (opacity .4→1, 100ms de intervalo) e voltam em 400ms. Ciclo de 3s, infinito, pausado fora da tela, desligado em reduzir movimento.
```

---

## 4. Fotografia: lista de cenas e prompts de ambiente

### 4.1 Sessão com o engenheiro (obrigatória, real)

Meio período, com um fotógrafo ou um bom celular com tripé. Locais: um quadro real organizado (obra recente) e um ambiente de escritório com planta impressa.

| # | Cena | D1 | D3 | Uso |
|---|---|---|---|---|
| 1 | Retrato de três quartos, segurando planta impressa, quadro aberto atrás, luz natural | ✓ | | hero D1 (4:5) |
| 2 | Retrato de perfil, luz lateral quente, rosto meio na sombra, fundo escuro | | ✓ | trajetória D3 (4:5) |
| 3 | Retrato frontal, sério e calmo, fundo neutro | ✓ | ✓ | hero D3 (círculo de 72 px), carimbo |
| 4 | Mãos com caneta técnica e régua sobre planta | ✓ | | detalhe B, transições |
| 5 | Mão fechando um disjuntor (vários ângulos, também em vídeo 240 fps) | | ✓ | foto-símbolo D3, D3-V-02 |
| 6 | Alicate amperímetro num cabo, visor legível | ✓ | ✓ | detalhe D / C4 |
| 7 | Multímetro em close, número nítido | ✓ | ✓ | leituras |
| 8 | Câmera térmica apontada para um quadro (e a tela dela) | ✓ | ✓ | detalhe C / C3 |
| 9 | Quadro "depois": organizado, etiquetado, diagrama na porta | ✓ | ✓ | comparador |
| 10 | Quadro "antes" do mesmo cliente, mesmo enquadramento | ✓ | ✓ | comparador |
| 11 | Fachadas de 2 ou 3 clientes (casa, comércio) ao entardecer, luzes acesas | | ✓ | leituras de campo |
| 12 | Detalhe de etiquetas de circuito ("C1 TOMADAS SALA") | ✓ | ✓ | ícones, carimbo |

**Tratamento**
- D1: duotone nanquim (sombras `#0F1E33`, luzes `#F3F1EA`), grão leve.
- D3: sombras puxadas para `#0E2F2E`, luzes para `#D0844A`, grão de filme, contraste alto.

### 4.2 Prompts de imagem para ambiente (IA permitida)

Use só como textura, fundo ou detalhe genérico, **nunca** como obra ou pessoa do cliente.

**D1 · Papel e instrumentos**
```
Top-down flat lay on cream drafting paper (#F3F1EA) with faint grid: a technical drafting pen, a metal scale ruler, a printed electrical floor plan with navy ink lines and small amber highlights, soft cool daylight from the left, minimal, precise, lots of negative space, documentary photography, 4:5.
Negative: people, coffee cups, laptops, plants, logos, readable brand names, warm vintage filter.
```

**D1 · Detalhe de planta**
```
Macro photograph of a printed electrical installation drawing on vellum paper, navy ink symbols for outlets and lights, dimension lines with numbers in a monospace font, one circuit path highlighted with an amber marker, shallow depth of field, cool neutral light, 16:10.
Negative: color photos, people, logos, coffee stains, blur on the main line.
```

**D3 · Cobre e disjuntores**
```
Dramatic macro photograph of a row of white DIN-rail circuit breakers in a residential electrical panel, a polished copper busbar catching warm side light, deep teal shadows, shallow depth of field, editorial industrial aesthetic, film grain, 16:9.
Negative: brand logos, readable labels with brand names, sparks, burned parts, messy wiring, people.
```

**D3 · Textura de fundo**
```
Abstract close-up of tightly twisted bright copper wire strands, warm metallic highlights against a very dark teal background (#0E2F2E), soft bokeh, minimal, premium, usable as a website background with space for text on the left, 16:9.
Negative: text, logos, sparks, rust, blue light.
```

---

## 5. Checklist de aprovação de cada peça

Antes de colocar qualquer peça no site, confira:

- [ ] O ID da peça está no nome do arquivo e no código.
- [ ] As cores batem com os tokens da direção (nanquim e âmbar na D1; petróleo e cobre na D3).
- [ ] O loop é perfeito (sem salto visível na emenda).
- [ ] O peso está dentro do limite (2 MB no computador, 1 MB no celular, 2 MB por GLB).
- [ ] Há pôster, a versão de celular e o estado de "reduzir movimento".
- [ ] A peça pausa fora da tela e não roda em aba oculta.
- [ ] Nenhuma imagem de IA é apresentada como obra, pessoa ou medição real do cliente.
- [ ] Peças com mais de 5 s têm botão de pausa acessível.
- [ ] O CTA "Pedir orçamento" continua visível e legível por cima ou ao lado da peça.
- [ ] O 3D mantém 60 fps num notebook comum (aba "Performance" do navegador) e não atrasa a primeira tela.
- [ ] A anotação `[MOMENTO: …]` correspondente foi removida do HTML.
