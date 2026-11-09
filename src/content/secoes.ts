export type Secao = {
  id: string;
  nome: string;
};

/** Seções da página, na ordem em que aparecem. Navegação e índice flutuante leem esta lista. */
export const secoes: Secao[] = [
  { id: "inicio", nome: "Início" },
  { id: "servicos", nome: "Serviços" },
  { id: "diferenciais", nome: "Diferenciais" },
  { id: "solucoes", nome: "Soluções" },
  { id: "duvidas", nome: "Dúvidas" },
  { id: "orcamento", nome: "Orçamento" },
];
