import { CabecalhoSecao } from "@/components/ui/CabecalhoSecao";
import { Revela } from "@/components/ui/Revela";
import { SolucaoCard } from "@/components/solucoes/SolucaoCard";
import { solucoes } from "@/content/solucoes";
import "@/components/solucoes/Solucoes.css";

export function Solucoes() {
  return (
    <section id="solucoes" data-secao="solucoes" aria-labelledby="sol-titulo-sec" className="bg-gelo py-[clamp(76px,6rem+3vw,136px)]">
      <div className="wrap">
        <Revela>
          <CabecalhoSecao
            etiqueta="Soluções"
            titulo="Uma solução para cada etapa do seu projeto."
            tituloId="sol-titulo-sec"
            subtitulo="Toque em uma solução para ver o problema que ela resolve e como executamos, passo a passo."
          />
        </Revela>

        <div className="sol-grade mt-[clamp(40px,2rem+2vw,64px)]">
          {solucoes.map((solucao, i) => (
            <SolucaoCard key={solucao.id} solucao={solucao} indice={i} atraso={(i % 5) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
