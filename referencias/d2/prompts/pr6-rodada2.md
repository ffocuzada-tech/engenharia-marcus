# PR #6 · Rodada 2 de 2 — Serviços, diferenciais, soluções, dúvidas e orçamento

Continue na branch `feat/d2-pagina` (sem `/clear` se for a mesma sessão; se for sessão nova, leia antes `referencias/d2/prompts/pr6-rodada1.md` para ter as regras da D2). A referência continua sendo `referencias/d2/prototipo-d2.html`.

Valem todas as regras da rodada 1, principalmente: **nada de linhas divisórias**, âmbar só em ação, 360 px primeiro, sem `overflow-x: hidden` para esconder estouro, reduced-motion e acessibilidade.

## 1. Conteúdo centralizado — `src/content/`
Tire os textos dos componentes:
- `servicos.ts`: os 4 serviços com ícone, descrição, chips e o índice da solução que "Ver como funciona" abre.
- `diferenciais.ts`: os 4 diferenciais.
- `solucoes.ts`: as 10 soluções com ícone, foto, posição da foto, etiqueta, título, problema, solução, passos e "você recebe". Os textos estão no array `SOL` do script do protótipo.
- `faq.ts`.
- `passos.ts`: os 4 passos "do contato à entrega".
- Atualize `secoes.ts` com todas as seções: início, serviços, diferenciais, soluções, dúvidas e orçamento.

Textos que dependem do cliente:
- **Prazo, política da visita e região atendida** vêm de campos em `src/lib/site.ts`, com marcador enquanto o cliente não confirmar. Crie os campos que faltarem.
- Enquanto um desses campos for marcador (`ehMarcador()`), a pergunta do FAQ que depende dele **não aparece**. São as perguntas "A visita técnica é cobrada?", "Em quanto tempo recebo o orçamento?" e "Quais regiões vocês atendem?".
- O protótipo usa números de exemplo (24 h, 3 dias úteis, "capital e região metropolitana"). Eles **não entram** no código.
- Frases sobre a empresa que o cliente ainda precisa confirmar ficam com o comentário `// CONFIRMAR COM O CLIENTE`. Exemplos: "profissionais treinados em NR-10" e as 10 soluções oferecidas.

## 2. Fotos
As 10 fotos já estão em `public/fotos/solucoes/` (Unsplash, licença livre; créditos em `referencias/d2/CREDITOS-FOTOS.md`).
- Use `next/image` com `sizes` adequados, `fill` + `object-fit: cover` e a posição de cada foto (campo `pos` no protótipo).
- Lazy loading abaixo da dobra.
- O selo "Imagem ilustrativa" aparece no diálogo.

## 3. Serviços — `src/components/sections/Servicos.tsx`
Porte de `#servicos` e `.serv-card`:
- cabeçalho de seção e 4 cards com a ilustração SVG em traço do protótipo;
- hover: o card sobe, a lupa e a chave giram, o ponto quente pulsa;
- chips e o botão "Ver como funciona", que abre a solução correspondente;
- fundo branco. Grade de 4 colunas, 2 a partir de 1180 px e 1 até 640 px.

## 4. Diferenciais — `src/components/sections/Diferenciais.tsx`
Porte de `#diferenciais` e `.dif-card`:
- fundo azul-noite com o brilho no canto e 4 cards;
- ícones de traço que se desenham ao entrar na tela;
- grade que acende seguindo o cursor (variáveis `--mx` e `--my`);
- etiqueta técnica em mono embaixo de cada card.

## 5. Soluções — `src/components/sections/Solucoes.tsx` + `src/components/solucoes/`
Porte de `#solucoes`, `.sol-card` e do diálogo `.sol-dlg`:
- **Grade:** fundo gelo e 10 cards com foto (retrato 3:4), gradiente embaixo, ícone, botão "+", etiqueta, título e o problema que aparece no hover.
  - 5 colunas no computador, 2 até 1180 px (cards 4:3) e 2 no celular (3:4, só ícone, título e "+").
- **Diálogo:** `<dialog>` com `showModal()`. A foto **voa do card até o diálogo** (técnica FLIP: um clone posicionado com `fixed` dentro do `<dialog>`, animado com Web Animations de um retângulo ao outro). Ao fechar, faz o caminho de volta.
  - Fecha com Esc (evento `cancel` com `preventDefault` + animação), clique no fundo, botão X e "Ver outras soluções".
  - Trava a rolagem da página e devolve o foco ao card.
  - Conteúdo: etiqueta, título, "O problema" e "A solução" lado a lado, "Como executamos" com passos numerados em cards, "Você recebe" em chips e o botão "Solicitar orçamento", que abre o WhatsApp com `waLink()` e o nome da solução.
  - No celular, ocupa a tela inteira: foto em cima (36svh) e conteúdo rolando embaixo.
  - Com reduced-motion, abre e fecha sem o voo.
- **Ligações:** "Ver como funciona" (serviços), os itens do mega menu e os serviços do menu do celular abrem a solução certa.
  - Quando a origem é o menu: fecha o menu, rola até o card e abre a partir dele.
  - Use um contexto React (ex.: `SolucoesProvider` com `abrirSolucao(indice, elementoOrigem)`) ou outra solução limpa. Nada de variáveis globais em `window`.

## 6. Dúvidas — `src/components/sections/Duvidas.tsx`
Porte de `#duvidas` e `.faq-item`:
- cabeçalho centralizado e perguntas em **cards independentes**: fundo branco, sombra suave, cantos de 18 px, ícone redondo âmbar que gira e vira azul quando abre;
- uma aberta por vez;
- altura animada com `grid-template-rows: 0fr → 1fr`;
- quando fechada, a resposta sai da árvore de acessibilidade (`visibility: hidden` depois da transição);
- `button` com `aria-expanded` e `aria-controls`.

## 7. Orçamento — `src/components/sections/Orcamento.tsx`
**O formulário continua** (decisão do usuário). Reaproveite **toda a lógica** de `Folha10Orcamento.tsx`: campos, validação personalizada, mensagem montada, tela de confirmação com o link e `waLink()`. Depois apague `Folha10Orcamento.tsx`.

Visual D2:
- seção `#orcamento` em azul-noite com o mesmo brilho do protótipo (`.cta`), em duas colunas;
- **à esquerda:** etiqueta "Orçamento", o título "Conte o que você precisa. A resposta vem com os próximos passos.", o texto, os contatos (WhatsApp com `whatsappExibicao()`, e-mail, área, horário) e os 4 passos em cards 2×2 (`.passo`). **Esconda os contatos que ainda forem marcador.**
- **à direita:** o formulário num card branco (cantos de 22 px, `shadow-2`):
  - rótulos visíveis e campos com cantos arredondados;
  - serviço como chips de rádio (os 4 serviços);
  - aviso das fotos do quadro;
  - botão âmbar "Enviar pelo WhatsApp".
- **No celular, a ordem é:** título e texto → formulário → contatos → passos.

## 8. Revelar ao rolar
Porte de `.revela`/`.pre`. Só ganham o estado escondido os elementos que começam **abaixo da dobra** no carregamento; o que já está visível nunca some. Faça isso com um componente ou hook pequeno. Com reduced-motion, nada se esconde.

## 9. Página e verificação
- `page.tsx`: `Navegacao` → `main` (`Hero`, `Servicos`, `Diferenciais`, `Solucoes`, `Duvidas`, `Orcamento`) → `Rodape` → `IndiceFlutuante`, tudo dentro do provider das soluções.
- Estenda `scripts/check-layout/check-layout.mjs`. Em 360 px e 1440 px:
  - falhar se aparecer erro no console;
  - abrir o menu do celular (em 360 px) e checar estouro;
  - abrir uma solução (clicar no primeiro `.sol-card` ou equivalente), esperar a animação e checar estouro e se o `<dialog>` está aberto;
  - abrir uma pergunta do FAQ.
- Rode `npm run build`, `npm run lint` e `npm run check:layout`. **Não tire prints**: print só do que o check:layout acusar.
- Commits em português. Atualize a descrição do PR e **tire do rascunho** ("Ready for review"), com o título "PR #6 · D2: nova página".
- Me responda com o link do PR e uma lista curta das decisões que você tomou e que não estavam escritas aqui.
