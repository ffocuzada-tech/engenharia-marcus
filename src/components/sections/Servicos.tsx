"use client";

import type { ComponentType, MouseEvent } from "react";
import { CabecalhoSecao } from "@/components/ui/CabecalhoSecao";
import { Chip } from "@/components/ui/Chip";
import { Icone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import {
  IlustracaoInspecao,
  IlustracaoInstalacao,
  IlustracaoManutencao,
  IlustracaoProjeto,
} from "@/components/servicos/Ilustracoes";
import { servicos } from "@/content/servicos";
import { useSolucoes } from "@/providers/SolucoesProvider";
import "@/components/servicos/Servicos.css";

const ILUSTRACOES: Record<string, ComponentType> = {
  instalacao: IlustracaoInstalacao,
  projeto: IlustracaoProjeto,
  inspecao: IlustracaoInspecao,
  manutencao: IlustracaoManutencao,
};

export function Servicos() {
  const { abrirSolucao } = useSolucoes();

  function verComoFunciona(e: MouseEvent<HTMLButtonElement>, solucaoIndice: number) {
    const card = e.currentTarget.closest("article");
    abrirSolucao(solucaoIndice, card);
  }

  return (
    <section id="servicos" data-secao="servicos" aria-labelledby="serv-titulo" className="bg-white py-[clamp(76px,6rem+3vw,136px)]">
      <div className="wrap">
        <Revela>
          <CabecalhoSecao
            etiqueta="Serviços"
            titulo="Soluções elétricas completas, do projeto à manutenção."
            tituloId="serv-titulo"
            subtitulo="Um único time técnico responde pelo cálculo, pela execução e pela documentação. Você tem um interlocutor do primeiro contato até a entrega."
          />
        </Revela>

        <div className="serv-grade mt-[clamp(40px,2rem+2vw,64px)]">
          {servicos.map((servico, i) => {
            const Ilustracao = ILUSTRACOES[servico.id];
            return (
              <Revela key={servico.id} as="article" atraso={i * 0.08} className="serv-card">
                <div className="serv-ilu" data-midia aria-hidden="true">
                  <Ilustracao />
                </div>
                <div className="serv-corpo">
                  <h3 className="font-title text-h3 text-noite">{servico.titulo}</h3>
                  <p className="text-[0.97rem] text-texto-2">{servico.texto}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {servico.chips.map((chip) => (
                      <Chip key={chip}>
                        <Icone nome="check" className="h-3.5 w-3.5" />
                        {chip}
                      </Chip>
                    ))}
                  </ul>
                  <button type="button" className="link-mais" onClick={(e) => verComoFunciona(e, servico.solucaoIndice)}>
                    Ver como funciona
                    <Icone nome="seta" className="h-[18px] w-[18px]" />
                  </button>
                </div>
              </Revela>
            );
          })}
        </div>
      </div>
    </section>
  );
}
