export type Passo = {
  numero: number;
  titulo: string;
  texto: string;
};

export const passos: Passo[] = [
  { numero: 1, titulo: "Contato", texto: "Você descreve o serviço e envia fotos pelo WhatsApp." },
  { numero: 2, titulo: "Visita técnica", texto: "Medições e levantamento no local, quando o serviço pede." },
  { numero: 3, titulo: "Proposta", texto: "Escopo, prazo e valor por escrito, antes de qualquer serviço." },
  { numero: 4, titulo: "Execução e entrega", texto: "Serviço testado circuito a circuito e entregue com ART." },
];
