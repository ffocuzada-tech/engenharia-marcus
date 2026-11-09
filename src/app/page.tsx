import { Navegacao } from "@/components/sections/Navegacao";
import { Hero } from "@/components/sections/Hero";
import { Rodape } from "@/components/sections/Rodape";
import { IndiceFlutuante } from "@/components/sections/IndiceFlutuante";
import { telefoneE164 } from "@/lib/contato";
import { ehMarcador, site } from "@/lib/site";

function campoOuOmitido(valor: string): string | undefined {
  return ehMarcador(valor) ? undefined : valor;
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: campoOuOmitido(site.nome),
    description: campoOuOmitido(site.descricao),
    url: site.url,
    areaServed: campoOuOmitido(site.cidade),
    telephone: telefoneE164() ?? undefined,
    knowsAbout: ["NBR 5410", "ART", "instalações elétricas"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navegacao />
      <main id="conteudo" className="flex flex-1 flex-col">
        <Hero />
      </main>
      <Rodape />
      <IndiceFlutuante />
    </>
  );
}
