"use client";

import { useId, useState } from "react";
import { CabecalhoSecao } from "@/components/ui/CabecalhoSecao";
import { Icone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import { faq } from "@/content/faq";
import "./Duvidas.css";

export function Duvidas() {
  const [aberto, setAberto] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section
      id="duvidas"
      data-secao="duvidas"
      aria-labelledby="faq-titulo"
      className="bg-white py-[clamp(76px,6rem+3vw,136px)]"
    >
      <div className="wrap">
        <Revela>
          <CabecalhoSecao
            etiqueta="Perguntas frequentes"
            titulo="Tire suas dúvidas sobre nossos serviços."
            tituloId="faq-titulo"
            align="centro"
          />
        </Revela>

        <div className="faq-lista mt-[clamp(40px,2rem+2vw,64px)]">
          {faq.map((item, i) => {
            const estaAberto = aberto === i;
            const idPergunta = `${baseId}-q${i}`;
            const idResposta = `${baseId}-r${i}`;
            return (
              <Revela
                key={item.pergunta}
                atraso={Math.min(i, 5) * 0.04}
                className={`faq-item ${estaAberto ? "faq-aberto" : ""}`}
              >
                <h3>
                  <button
                    type="button"
                    id={idPergunta}
                    className="faq-q"
                    aria-expanded={estaAberto}
                    aria-controls={idResposta}
                    onClick={() => setAberto(estaAberto ? null : i)}
                  >
                    <span className="faq-ico" aria-hidden="true">
                      <Icone nome="chev" className="h-[17px] w-[17px]" />
                    </span>
                    <span>{item.pergunta}</span>
                  </button>
                </h3>
                <div id={idResposta} role="region" aria-labelledby={idPergunta} className="faq-r">
                  <div>
                    <p>{item.resposta}</p>
                  </div>
                </div>
              </Revela>
            );
          })}
        </div>
      </div>
    </section>
  );
}
