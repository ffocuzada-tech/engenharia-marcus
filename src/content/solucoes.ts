export type Solucao = {
  id: string;
  icone: string;
  foto: string;
  posicaoFoto: string;
  etiqueta: string;
  titulo: string;
  problema: string;
  solucao: string;
  passos: string[];
  recebe: string[];
};

// As 10 soluções oferecidas e seus textos ainda precisam de validação do cliente.
// CONFIRMAR COM O CLIENTE
export const solucoes: Solucao[] = [
  {
    id: "instalacao",
    icone: "casa",
    foto: "/fotos/solucoes/sol-01-instalacao.jpg",
    posicaoFoto: "30% 40%",
    etiqueta: "Obra nova e reforma",
    titulo: "Instalação elétrica completa",
    problema:
      "Instalação feita sem projeto: circuitos sobrecarregados, disjuntores que desarmam e fiação que esquenta. O problema costuma aparecer quando a obra já terminou.",
    solucao:
      "Executamos a instalação a partir de um projeto calculado, com materiais certificados e cada circuito identificado no quadro.",
    passos: [
      "Levantamento das cargas e do uso de cada ambiente",
      "Projeto e lista de materiais",
      "Passagem de eletrodutos e cabos",
      "Montagem do quadro e ligação dos pontos",
      "Testes de isolamento, aterramento e DR",
    ],
    recebe: ["ART de execução", "Quadro identificado", "Diagrama do quadro"],
  },
  {
    id: "quadro",
    icone: "quadro",
    foto: "/fotos/solucoes/sol-02-quadro.jpg",
    posicaoFoto: "50% 50%",
    etiqueta: "Troca e adequação",
    titulo: "Quadro de distribuição",
    problema:
      "Quadro antigo, com fusíveis ou disjuntores sem identificação, sem DR e sem DPS. É o ponto da instalação com maior risco de aquecimento.",
    solucao:
      "Substituímos ou adequamos o quadro conforme a NBR 5410, com barramento, proteção diferencial e proteção contra surtos.",
    passos: [
      "Inspeção e medição do quadro atual",
      "Dimensionamento dos disjuntores por circuito",
      "Montagem com barramento, DR e DPS",
      "Identificação de cada circuito",
      "Teste de funcionamento",
    ],
    recebe: ["Quadro novo ou adequado", "Etiquetas por circuito", "ART"],
  },
  {
    id: "projeto",
    icone: "planta",
    foto: "/fotos/solucoes/sol-03-projeto.jpg",
    posicaoFoto: "55% 50%",
    etiqueta: "Concessionária e prefeitura",
    titulo: "Projeto elétrico e aprovação",
    problema:
      "Sem projeto aprovado, a ligação nova ou o aumento de carga fica parado na concessionária, e a obra acaba executada no improviso.",
    solucao: "Desenvolvemos o projeto completo e cuidamos da documentação até a aprovação.",
    passos: [
      "Briefing e levantamento de cargas",
      "Cálculo de circuitos, quedas de tensão e proteções",
      "Plantas, diagrama unifilar e quadro de cargas",
      "Memorial descritivo e ART",
      "Protocolo e acompanhamento da aprovação",
    ],
    recebe: ["Pranchas em PDF e DWG", "Memorial de cálculo", "ART de projeto"],
  },
  {
    id: "laudo",
    icone: "lupa",
    foto: "/fotos/solucoes/sol-04-laudo.jpg",
    posicaoFoto: "40% 50%",
    etiqueta: "Compra, venda e seguro",
    titulo: "Laudo e inspeção",
    problema:
      "Você vai comprar, vender ou segurar um imóvel e não sabe em que estado está a elétrica. Seguradoras e vistorias pedem comprovação.",
    solucao:
      "Inspecionamos a instalação com medições e termografia e emitimos laudo técnico assinado, com as não conformidades por prioridade.",
    passos: [
      "Inspeção visual do quadro e dos pontos",
      "Medição de isolamento e aterramento",
      "Termografia para localizar pontos quentes",
      "Classificação das não conformidades",
      "Laudo assinado com recomendações",
    ],
    recebe: ["Laudo técnico", "Fotos térmicas", "ART"],
  },
  {
    id: "manutencao",
    icone: "chave",
    foto: "/fotos/solucoes/sol-05-manutencao.jpg",
    posicaoFoto: "72% 50%",
    etiqueta: "Empresas e condomínios",
    titulo: "Manutenção preventiva",
    problema:
      "Falhas elétricas param a operação e queimam equipamentos. Quase sempre dão sinais antes: aquecimento, ruído e desarmes.",
    solucao: "Visitas programadas para reaperto, medições e testes, com histórico de cada quadro.",
    passos: [
      "Diagnóstico inicial e plano de visitas",
      "Reaperto de conexões e limpeza",
      "Medições e teste de DR e DPS",
      "Termografia periódica",
      "Relatório com prioridades",
    ],
    recebe: ["Relatório por visita", "Histórico do quadro", "Agenda fixa"],
  },
  {
    id: "surtos",
    icone: "terra",
    foto: "/fotos/solucoes/sol-06-surtos.jpg",
    posicaoFoto: "25% 60%",
    etiqueta: "DPS e malha de terra",
    titulo: "Aterramento e proteção contra surtos",
    problema:
      "Choques em torneiras e eletrodomésticos, aparelhos queimados depois de tempestades e tomadas com o pino de terra sem ligação.",
    solucao: "Projetamos e executamos o sistema de aterramento e instalamos DPS adequados à instalação.",
    passos: [
      "Medição da resistência de aterramento",
      "Projeto da malha e das hastes",
      "Execução e interligação ao quadro",
      "Instalação dos DPS",
      "Medição final",
    ],
    recebe: ["Relatório de medição", "DPS instalados", "ART"],
  },
  {
    id: "spda",
    icone: "spda",
    foto: "/fotos/solucoes/sol-07-spda.jpg",
    posicaoFoto: "60% 70%",
    etiqueta: "Edificações e galpões",
    titulo: "SPDA (para-raios)",
    problema:
      "Prédios, galpões e condomínios precisam de proteção contra descargas atmosféricas, e o Corpo de Bombeiros cobra o laudo em dia.",
    solucao: "Projeto, instalação e inspeção periódica de SPDA conforme a NBR 5419.",
    passos: [
      "Análise de risco conforme a NBR 5419",
      "Projeto de captação, descidas e aterramento",
      "Instalação",
      "Medição de continuidade e de aterramento",
      "Laudo para o AVCB",
    ],
    recebe: ["Projeto de SPDA", "Laudo de inspeção", "ART"],
  },
  {
    id: "padrao",
    icone: "padrao",
    foto: "/fotos/solucoes/sol-08-padrao.jpg",
    posicaoFoto: "50% 50%",
    etiqueta: "Ligação nova",
    titulo: "Padrão de entrada e aumento de carga",
    problema:
      "Ar-condicionado novo, forno elétrico ou ampliação: a carga cresce, o padrão de entrada não acompanha e o disjuntor geral começa a desarmar.",
    solucao: "Calculamos a nova demanda, fazemos o pedido na concessionária e executamos o padrão dentro das normas dela.",
    passos: [
      "Cálculo da nova demanda",
      "Pedido de aumento de carga na concessionária",
      "Execução do padrão de entrada",
      "Vistoria da concessionária",
      "Ligação e testes",
    ],
    recebe: ["Padrão aprovado", "Projeto de entrada", "ART"],
  },
  {
    id: "carregador",
    icone: "carro",
    foto: "/fotos/solucoes/sol-09-carregador.jpg",
    posicaoFoto: "62% 50%",
    etiqueta: "Residencial e comercial",
    titulo: "Carregador de carro elétrico",
    problema: "Ligar o carregador em uma tomada comum sobrecarrega o circuito e pode danificar a instalação e o veículo.",
    solucao: "Avaliamos a capacidade da instalação e montamos um circuito exclusivo para o carregador, com proteção própria.",
    passos: [
      "Avaliação da carga disponível",
      "Escolha do ponto e da potência do carregador",
      "Circuito exclusivo com DR e DPS",
      "Instalação e configuração",
      "Teste de recarga",
    ],
    recebe: ["Circuito exclusivo", "Teste de recarga", "ART"],
  },
  {
    id: "nr10",
    icone: "escudo",
    foto: "/fotos/solucoes/sol-10-nr10.jpg",
    posicaoFoto: "40% 30%",
    etiqueta: "Segurança para empresas",
    titulo: "Adequação à NR-10",
    problema:
      "Empresas com carga instalada acima de 75 kW precisam manter o Prontuário das Instalações Elétricas, e a fiscalização cobra.",
    solucao: "Diagnosticamos as instalações e montamos a documentação exigida pela NR-10.",
    passos: [
      "Levantamento das instalações",
      "Diagnóstico de conformidade",
      "Plano de adequação por prioridade",
      "Diagramas e documentação",
      "Prontuário das Instalações Elétricas",
    ],
    recebe: ["Relatório de conformidade", "Prontuário (PIE)", "ART"],
  },
];
