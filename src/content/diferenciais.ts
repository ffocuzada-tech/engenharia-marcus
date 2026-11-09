export type Diferencial = {
  id: string;
  titulo: string;
  texto: string;
  especificacao: string;
};

export const diferenciais: Diferencial[] = [
  {
    id: "equipe",
    titulo: "Equipe qualificada",
    // CONFIRMAR COM O CLIENTE
    texto: "Engenheiro eletricista responsável por cada projeto e profissionais treinados em NR-10 na execução.",
    especificacao: "CREA ativo · NR-10",
  },
  {
    id: "planejamento",
    titulo: "Planejamento detalhado",
    texto:
      "Antes da obra, cada circuito é calculado e documentado: carga, cabo, proteção e materiais. Nada fica para decidir no improviso.",
    especificacao: "Memorial de cálculo",
  },
  {
    id: "atendimento",
    titulo: "Atendimento personalizado",
    texto: "Você fala direto com o engenheiro do seu projeto, do primeiro contato à entrega da documentação.",
    especificacao: "Contato direto",
  },
  {
    id: "pontualidade",
    titulo: "Pontualidade e qualidade",
    texto: "Prazo combinado por escrito e materiais certificados. A entrega só acontece depois dos testes de cada circuito.",
    especificacao: "Testado antes da entrega",
  },
];
