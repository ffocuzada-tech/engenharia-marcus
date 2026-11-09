export type Secao = {
  id: string;
  nome: string;
};

/**
 * Seções da página, na ordem em que aparecem. Navegação e índice flutuante
 * leem esta lista. Nesta rodada só existem as seções já construídas; as
 * demais (serviços, diferenciais, soluções, dúvidas, orçamento) entram na
 * rodada 2.
 */
export const secoes: Secao[] = [{ id: "inicio", nome: "Início" }];
