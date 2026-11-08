export type Sheet = {
  id: string;
  numero: string;
  nome: string;
};

export const SHEETS: Sheet[] = [
  { id: "hero", numero: "01", nome: "Apresentação" },
  { id: "servicos", numero: "02", nome: "Índice de serviços" },
  { id: "alerta", numero: "03", nome: "Notas de atenção" },
  { id: "detalhes", numero: "04", nome: "Detalhes A–D" },
  { id: "engenheiro", numero: "05", nome: "Especificações" },
  { id: "antes-depois", numero: "06", nome: "Antes × depois" },
  { id: "trajetoria", numero: "07", nome: "Trajetória" },
  { id: "processo", numero: "08", nome: "Cronograma de atendimento" },
  { id: "notas-faq", numero: "09", nome: "Notas de campo e dúvidas" },
  { id: "orcamento", numero: "10", nome: "Pedido de orçamento" },
  { id: "rodape", numero: "11", nome: "Rodapé" },
];
