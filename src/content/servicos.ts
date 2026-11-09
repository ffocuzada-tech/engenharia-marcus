export type Servico = {
  id: string;
  icone: string;
  titulo: string;
  texto: string;
  chips: string[];
  /** Índice do item correspondente em solucoes.ts, aberto por "Ver como funciona". */
  solucaoIndice: number;
};

export const servicos: Servico[] = [
  {
    id: "instalacao",
    icone: "casa",
    titulo: "Instalação elétrica",
    texto: "Obras novas, reformas e ampliações executadas a partir de projeto, da entrada de energia à última tomada.",
    chips: ["Quadro identificado", "ART de execução"],
    solucaoIndice: 0,
  },
  {
    id: "projeto",
    icone: "planta",
    titulo: "Projeto elétrico",
    texto: "Dimensionamento de circuitos, proteções e cargas, com documentação pronta para aprovação na concessionária.",
    chips: ["Pranchas PDF e DWG", "Memorial de cálculo"],
    solucaoIndice: 2,
  },
  {
    id: "inspecao",
    icone: "lupa",
    titulo: "Inspeção e laudo",
    texto: "Avaliação da instalação com medições e termografia, para compra, venda, seguro ou vistoria do imóvel.",
    chips: ["Laudo assinado", "Fotos térmicas"],
    solucaoIndice: 3,
  },
  {
    id: "manutencao",
    icone: "chave",
    titulo: "Manutenção",
    texto: "Planos preventivos com visitas programadas e atendimento corretivo quando surge uma falha.",
    chips: ["Relatório por visita", "Histórico do quadro"],
    solucaoIndice: 4,
  },
];
