import { ehMarcador, site } from "@/lib/site";

export type ItemFaq = {
  pergunta: string;
  resposta: string;
};

const itens: Array<ItemFaq | null> = [
  {
    pergunta: "Como solicito um orçamento?",
    resposta:
      "Pelo WhatsApp ou pelo botão de orçamento desta página. Descreva o que precisa e, se puder, envie fotos do quadro e do local. Com isso indicamos o próximo passo: uma visita técnica ou um orçamento direto.",
  },
  ehMarcador(site.politicaVisita)
    ? null
    : {
        pergunta: "A visita técnica é cobrada?",
        resposta: `A análise inicial por fotos é gratuita. Quando a visita técnica é necessária, ${site.politicaVisita}.`,
      },
  {
    pergunta: "Qual a diferença entre contratar um engenheiro e um eletricista?",
    resposta:
      "O eletricista executa. O engenheiro calcula, projeta e assume a responsabilidade técnica pelo serviço com a ART. Na prática, você tem um responsável legal e uma instalação dimensionada para o que vai ligar nela.",
  },
  {
    pergunta: "O que é a ART e por que ela importa?",
    resposta:
      "A Anotação de Responsabilidade Técnica é registrada no CREA e identifica o profissional responsável pelo serviço. Ela é pedida em aprovações, vistorias e pelo seguro, e garante que alguém responde pelo que foi feito.",
  },
  {
    pergunta: "Vocês atendem obras de qualquer porte?",
    resposta:
      "Atendemos desde a reforma de um apartamento até lojas, escritórios, condomínios e pequenas indústrias. A equipe e o cronograma são dimensionados no orçamento de cada obra.",
  },
  ehMarcador(site.prazoResposta)
    ? null
    : {
        pergunta: "Em quanto tempo recebo o orçamento?",
        resposta: `Respondemos o primeiro contato em até ${site.prazoResposta}. Serviços simples são orçados direto pelo WhatsApp; projetos e obras maiores, depois da visita técnica.`,
      },
  {
    pergunta: "Fazem atendimento de emergência?",
    resposta:
      "Sim. Em caso de fumaça, faísca ou cheiro de queimado, desligue o disjuntor geral, afaste-se do quadro e chame pelo WhatsApp.",
  },
  ehMarcador(site.cidade)
    ? null
    : {
        pergunta: "Quais regiões vocês atendem?",
        resposta: `Atendemos ${site.cidade}. Para outras cidades, consulte pelo WhatsApp.`,
      },
];

export const faq: ItemFaq[] = itens.filter((item): item is ItemFaq => item !== null);
