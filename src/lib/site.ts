const URL_MARCADOR = "https://engenharia-marcus.vercel.app";

export const site = {
  nome: "[NOME] Engenharia Elétrica",
  descricao:
    "Engenharia elétrica em [CIDADE / REGIÃO]: instalações, projetos, inspeções e manutenção, com ART e responsável técnico, conforme a NBR 5410.",
  cidade: "[CIDADE / REGIÃO]",
  tituloHero: "Elétrica com projeto, cálculo e engenheiro que assina.",
  prazoResposta: "[PRAZO]",
  politicaVisita: "[POLÍTICA DE COBRANÇA DA VISITA TÉCNICA]",
  email: "[EMAIL]",
  horario: "[HORÁRIO DE ATENDIMENTO]",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? URL_MARCADOR,
};

export function ehMarcador(valor: string): boolean {
  return valor.includes("[") || valor.includes("XX");
}

export function nomePublico(): string {
  return ehMarcador(site.nome) ? "Engenharia Elétrica" : site.nome;
}

export function descricaoPublica(): string {
  if (!ehMarcador(site.cidade)) return site.descricao;
  return "Engenharia elétrica: instalações, projetos, inspeções e manutenção, com ART e responsável técnico, conforme a NBR 5410.";
}
