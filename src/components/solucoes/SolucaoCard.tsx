"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { Icone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import type { Solucao } from "@/content/solucoes";
import { useSolucoes } from "@/providers/SolucoesProvider";

export function SolucaoCard({ solucao, indice, atraso }: { solucao: Solucao; indice: number; atraso: number }) {
  const { abrirSolucao } = useSolucoes();

  function aoClicar(e: MouseEvent<HTMLButtonElement>) {
    abrirSolucao(indice, e.currentTarget);
  }

  return (
    <Revela
      as="button"
      type="button"
      atraso={atraso}
      data-sol-card={indice}
      aria-haspopup="dialog"
      className="sol-card"
      onClick={aoClicar}
    >
      <div className="sol-midia" data-midia>
        <Image
          src={solucao.foto}
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 1180px) 50vw, 20vw"
          style={{ objectPosition: solucao.posicaoFoto }}
        />
      </div>
      <span className="sol-icone" aria-hidden="true">
        <Icone nome={solucao.icone} className="h-5 w-5" />
      </span>
      <span className="sol-mais" aria-hidden="true">
        <Icone nome="mais" className="h-5 w-5" />
      </span>
      <span className="sol-info">
        <span className="sol-tag">{solucao.etiqueta}</span>
        <h3>{solucao.titulo}</h3>
        <span className="sol-prob">
          <span>{solucao.problema}</span>
        </span>
      </span>
    </Revela>
  );
}
