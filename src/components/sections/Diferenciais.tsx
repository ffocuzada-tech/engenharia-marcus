"use client";

import type { PointerEvent } from "react";
import { CabecalhoSecao } from "@/components/ui/CabecalhoSecao";
import { Icone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import {
  IconeAtendimento,
  IconeEquipe,
  IconePlanejamento,
  IconePontualidade,
} from "@/components/diferenciais/Icones";
import { diferenciais } from "@/content/diferenciais";
import "@/components/diferenciais/Diferenciais.css";

const ICONES: Record<string, () => React.ReactElement> = {
  equipe: IconeEquipe,
  planejamento: IconePlanejamento,
  atendimento: IconeAtendimento,
  pontualidade: IconePontualidade,
};

function aoMoverCursor(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Diferenciais() {
  return (
    <section
      id="diferenciais"
      data-secao="diferenciais"
      aria-labelledby="dif-titulo"
      className="dif-section py-[clamp(76px,6rem+3vw,136px)]"
    >
      <div className="wrap relative">
        <Revela className="dif-topo">
          <CabecalhoSecao
            etiqueta="Diferenciais"
            titulo="Engenharia de verdade em cada etapa da sua obra."
            tituloId="dif-titulo"
            escuro
          />
          <p className="max-w-[520px] text-[1.08rem] text-claro-2">
            Nossa forma de trabalhar reduz riscos, evita retrabalho e entrega uma instalação preparada para
            qualquer vistoria.
          </p>
        </Revela>

        <div className="dif-grade mt-[clamp(40px,2rem+2vw,64px)]">
          {diferenciais.map((d, i) => {
            const IconeDif = ICONES[d.id];
            return (
              <Revela key={d.id} as="article" atraso={i * 0.08} className="dif-card" onPointerMove={aoMoverCursor}>
                <span className="dif-icone" aria-hidden="true">
                  <IconeDif />
                </span>
                <h3 className="mt-2 font-title text-[1.32rem] text-claro">{d.titulo}</h3>
                <p className="text-[0.97rem] text-claro-2">{d.texto}</p>
                <span className="dif-spec">
                  <Icone nome="check" className="h-[15px] w-[15px]" />
                  {d.especificacao}
                </span>
              </Revela>
            );
          })}
        </div>
      </div>
    </section>
  );
}
