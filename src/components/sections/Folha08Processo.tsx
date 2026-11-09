"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { SheetBar } from "@/components/ui/SheetBar";

export function Folha08Processo() {
  const tableRef = useRef<HTMLDivElement>(null);
  const mobileTableRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        if (reduceMotion) return;

        // Computador: as 4 barras crescem (scaleX) e o losango "carimba",
        // em sequência (stagger de 150ms), quando a tabela entra 40% na tela.
        const table = tableRef.current;
        const triggers: ScrollTrigger[] = [];

        if (table) {
          const bars = gsap.utils.toArray<HTMLElement>(".gantt-bar-d", table);
          const diamond = table.querySelector<HTMLElement>(".gantt-diamond-d");

          gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
          if (diamond) gsap.set(diamond, { scale: 1.3 });

          const sequence: { el: HTMLElement; kind: "bar" | "diamond" }[] = [
            { el: bars[0], kind: "bar" },
            { el: bars[1], kind: "bar" },
            ...(diamond ? [{ el: diamond, kind: "diamond" as const }] : []),
            { el: bars[2], kind: "bar" },
            { el: bars[3], kind: "bar" },
          ];

          const st = ScrollTrigger.create({
            trigger: table,
            start: "top 60%",
            refreshPriority: -1,
            once: true,
            onEnter: () => {
              const tl = gsap.timeline();
              sequence.forEach(({ el, kind }, i) => {
                const t = i * 0.15;
                if (kind === "bar") {
                  tl.to(el, { scaleX: 1, duration: 0.4, ease: "power1.out" }, t);
                } else {
                  tl.to(el, { scale: 1, duration: 0.3, ease: "stampEase" }, t);
                }
              });
            },
          });
          triggers.push(st);
        }

        // Celular: cada barra cresce quando a sua própria linha entra na
        // tela, sem stagger coordenado entre elas.
        const mobileTable = mobileTableRef.current;
        if (mobileTable) {
          const mobileBars = gsap.utils.toArray<HTMLElement>(".gantt-bar-m", mobileTable);
          const mobileDiamond = mobileTable.querySelector<HTMLElement>(".gantt-diamond-m");

          gsap.set(mobileBars, { scaleX: 0, transformOrigin: "left center" });
          if (mobileDiamond) gsap.set(mobileDiamond, { scale: 1.3 });

          mobileBars.forEach((bar) => {
            triggers.push(
              ScrollTrigger.create({
                trigger: bar,
                start: "top 85%",
                once: true,
                onEnter: () => gsap.to(bar, { scaleX: 1, duration: 0.35, ease: "power1.out" }),
              })
            );
          });

          if (mobileDiamond) {
            triggers.push(
              ScrollTrigger.create({
                trigger: mobileDiamond,
                start: "top 85%",
                once: true,
                onEnter: () => gsap.to(mobileDiamond, { scale: 1, duration: 0.3, ease: "stampEase" }),
              })
            );
          }
        }

        return () => triggers.forEach((trigger) => trigger.kill());
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="processo"
      className="border-t-[1.5px] border-b-[1.5px] border-ink bg-white"
    >
      <SheetBar numero="08" titulo="CRONOGRAMA DE ATENDIMENTO" nota="PRAZOS EM DIAS ÚTEIS" />

      <div className="wrap flex flex-col gap-10 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="max-w-[680px] text-h2 font-bold text-ink">
            Do primeiro contato à ART na sua mão.
          </h2>
          <p className="max-w-[340px] text-[16px] leading-relaxed text-text-2">
            Você sabe o que acontece, e quando, antes de assinar qualquer coisa.
          </p>
        </div>

        {/* Computador: tabela tipo Gantt */}
        <div
          ref={tableRef}
          role="table"
          aria-label="Cronograma de atendimento"
          className="relative hidden border-[1.5px] border-ink bg-white md:block"
        >
          <div
            role="row"
            className="grid grid-cols-[300px_repeat(12,minmax(0,1fr))] border-b-[1.5px] border-ink bg-ink text-on-ink"
          >
            <span role="columnheader" className="px-[18px] py-3 font-mono text-[11px] tracking-[.08em]">
              ETAPA
            </span>
            <span
              role="columnheader"
              className="col-[2/4] border-l border-on-ink/30 px-2.5 py-3 font-mono text-[11px]"
            >
              CONTATO
            </span>
            <span
              role="columnheader"
              className="col-[4/6] border-l border-on-ink/30 px-2.5 py-3 font-mono text-[11px]"
            >
              LEVANTAMENTO
            </span>
            <span
              role="columnheader"
              className="col-[6/11] border-l border-on-ink/30 px-2.5 py-3 font-mono text-[11px]"
            >
              OBRA
            </span>
            <span
              role="columnheader"
              className="col-[11/14] border-l border-on-ink/30 bg-amber px-2.5 py-3 font-mono text-[11px] font-semibold text-ink"
            >
              ENTREGA
            </span>
          </div>

          <div
            role="row"
            className="grid min-h-[92px] grid-cols-[300px_repeat(12,minmax(0,1fr))] items-center border-b border-ink/18"
          >
            <div role="cell" className="flex h-full flex-col justify-center gap-1 border-r-[1.5px] border-ink px-[18px] py-4">
              <span className="text-[18px] font-bold">
                <span className="mr-2 font-mono text-[13px] text-amber-text">01</span>Contato
              </span>
              <span className="text-[14px] leading-snug text-text-3">
                Você descreve o problema e manda fotos do quadro.
              </span>
            </div>
            <div
              role="cell"
              className="gantt-bar-d col-[2/3] mx-1.5 flex h-7 items-center justify-center bg-ink"
            >
              <span className="font-mono text-[11px] text-on-ink">D0</span>
            </div>
            <span role="cell" className="col-[3/6] pl-2 font-mono text-[12px] text-text-3">
              resposta em até [PRAZO]
            </span>
          </div>

          <div
            role="row"
            className="grid min-h-[92px] grid-cols-[300px_repeat(12,minmax(0,1fr))] items-center border-b border-ink/18"
          >
            <div role="cell" className="flex h-full flex-col justify-center gap-1 border-r-[1.5px] border-ink px-[18px] py-4">
              <span className="text-[18px] font-bold">
                <span className="mr-2 font-mono text-[13px] text-amber-text">02</span>Visita técnica
              </span>
              <span className="text-[14px] leading-snug text-text-3">
                Medições no local. [Gratuita / abatida no serviço].
              </span>
            </div>
            <div role="cell" className="gantt-bar-d col-[3/5] mx-1.5 flex h-7 items-center bg-ink pl-2.5">
              <span className="font-mono text-[11px] text-on-ink">[X] DIAS</span>
            </div>
          </div>

          <div
            role="row"
            className="grid min-h-[92px] grid-cols-[300px_repeat(12,minmax(0,1fr))] items-center border-b border-ink/18"
          >
            <div role="cell" className="flex h-full flex-col justify-center gap-1 border-r-[1.5px] border-ink px-[18px] py-4">
              <span className="text-[18px] font-bold">
                <span className="mr-2 font-mono text-[13px] text-amber-text">03</span>Orçamento por
                escrito
              </span>
              <span className="text-[14px] leading-snug text-text-3">
                Escopo, materiais, prazo e valor fechado.
              </span>
            </div>
            <div role="cell" className="col-[5/6] flex items-center gap-2.5 pl-1">
              <span
                aria-hidden="true"
                className="gantt-diamond-d h-[22px] w-[22px] shrink-0 rotate-45 border-2 border-ink bg-amber"
              />
            </div>
            <span role="cell" className="col-[6/10] font-mono text-[12px] font-semibold text-ink">
              ◆ MARCO: você aprova e marcamos a data
            </span>
          </div>

          <div
            role="row"
            className="grid min-h-[92px] grid-cols-[300px_repeat(12,minmax(0,1fr))] items-center border-b border-ink/18"
          >
            <div role="cell" className="flex h-full flex-col justify-center gap-1 border-r-[1.5px] border-ink px-[18px] py-4">
              <span className="text-[18px] font-bold">
                <span className="mr-2 font-mono text-[13px] text-amber-text">04</span>Execução
              </span>
              <span className="text-[14px] leading-snug text-text-3">
                Na data combinada, com o local limpo no fim.
              </span>
            </div>
            <div
              role="cell"
              className="gantt-bar-d col-[6/11] mx-1.5 flex h-7 items-center bg-[repeating-linear-gradient(135deg,#0F1E33_0_10px,#24395A_10px_20px)] pl-3"
            >
              <span className="font-mono text-[11px] text-on-ink">CONFORME ORÇAMENTO · [X] DIAS</span>
            </div>
          </div>

          <div
            role="row"
            className="grid min-h-[92px] grid-cols-[300px_repeat(12,minmax(0,1fr))] items-center bg-paper-warm"
          >
            <div role="cell" className="flex h-full flex-col justify-center gap-1 border-r-[1.5px] border-ink px-[18px] py-4">
              <span className="text-[18px] font-bold">
                <span className="mr-2 font-mono text-[13px] text-amber-text">05</span>Entrega e ART
              </span>
              <span className="text-[14px] leading-snug text-text-3">
                Documentação, ART registrada e garantia.
              </span>
            </div>
            <div
              role="cell"
              className="gantt-bar-d col-[11/13] mx-1.5 flex h-7 items-center border-[1.5px] border-ink bg-amber pl-2.5"
            >
              <span className="font-mono text-[11px] font-semibold">ART ✓</span>
            </div>
          </div>

          {/* D1.12: a linha fica na borda inicial da coluna D0 (não no meio
              da barra), para nunca passar por cima dela. */}
          <div
            aria-hidden="true"
            className="absolute top-10 bottom-0 border-l-2 border-dashed border-amber-text"
            style={{ left: "calc(300px + 4px)" }}
          />
          <span
            className="absolute top-[46px] bg-white px-1 font-mono text-[10px] font-semibold text-amber-text"
            style={{ left: "calc(300px + 12px)" }}
          >
            VOCÊ ESTÁ AQUI
          </span>
        </div>

        <div className="hidden flex-wrap items-center justify-between gap-6 md:flex">
          <div className="flex flex-wrap gap-6 font-mono text-[12px] text-text-2">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-[22px] bg-ink" />
              Etapa com prazo
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rotate-45 border-[1.5px] border-ink bg-amber" />
              Marco de aprovação
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-[22px] bg-[repeating-linear-gradient(135deg,#0F1E33_0_4px,#24395A_4px_8px)]" />
              Duração varia por obra
            </span>
          </div>
          <Button href="#orcamento" variant="primary" data-stamp-avoid>
            Começar pelo D0
          </Button>
        </div>

        {/* Celular: lista simplificada */}
        <div className="flex flex-col gap-5 md:hidden">
          <div
            ref={mobileTableRef}
            role="table"
            aria-label="Cronograma de atendimento"
            className="relative flex flex-col border-[1.5px] border-ink"
          >
            <div
              role="row"
              className="grid grid-cols-4 bg-ink font-mono text-[9px] tracking-[.04em] text-on-ink"
            >
              <span role="columnheader" className="px-1.5 py-2">
                CONTATO
              </span>
              <span role="columnheader" className="border-l border-on-ink/30 px-1.5 py-2">
                LEVANTAM.
              </span>
              <span role="columnheader" className="border-l border-on-ink/30 px-1.5 py-2">
                OBRA
              </span>
              <span role="columnheader" className="border-l border-on-ink/30 bg-amber px-1.5 py-2 font-semibold text-ink">
                ENTREGA
              </span>
            </div>

            <div role="row" className="flex flex-col gap-2 border-b border-ink/18 px-3 py-3.5">
              <span className="text-[16px] font-bold">
                <span className="mr-1.5 font-mono text-[12px] text-amber-text">01</span>Contato{" "}
                <span className="font-mono text-[11px] font-normal text-text-3">
                  · resposta em [PRAZO]
                </span>
              </span>
              <div aria-hidden="true" className="grid h-4 grid-cols-12">
                <div className="gantt-bar-m col-[1/2] bg-ink" />
              </div>
            </div>

            <div role="row" className="flex flex-col gap-2 border-b border-ink/18 px-3 py-3.5">
              <span className="text-[16px] font-bold">
                <span className="mr-1.5 font-mono text-[12px] text-amber-text">02</span>Visita
                técnica{" "}
                <span className="font-mono text-[11px] font-normal text-text-3">· [X] dias</span>
              </span>
              <div aria-hidden="true" className="grid h-4 grid-cols-12">
                <div className="gantt-bar-m col-[2/4] bg-ink" />
              </div>
            </div>

            <div role="row" className="flex flex-col gap-2 border-b border-ink/18 px-3 py-3.5">
              <span className="text-[16px] font-bold">
                <span className="mr-1.5 font-mono text-[12px] text-amber-text">03</span>Orçamento
                escrito{" "}
                <span className="font-mono text-[11px] font-normal text-text-3">· marco</span>
              </span>
              <div aria-hidden="true" className="grid h-4 grid-cols-12 items-center">
                <div className="gantt-diamond-m col-[4/5] mx-auto h-3.5 w-3.5 rotate-45 border-2 border-ink bg-amber" />
              </div>
            </div>

            <div role="row" className="flex flex-col gap-2 border-b border-ink/18 px-3 py-3.5">
              <span className="text-[16px] font-bold">
                <span className="mr-1.5 font-mono text-[12px] text-amber-text">04</span>Execução{" "}
                <span className="font-mono text-[11px] font-normal text-text-3">
                  · conforme orçamento
                </span>
              </span>
              <div aria-hidden="true" className="grid h-4 grid-cols-12">
                <div className="gantt-bar-m col-[5/10] bg-[repeating-linear-gradient(135deg,#0F1E33_0_6px,#24395A_6px_12px)]" />
              </div>
            </div>

            <div role="row" className="flex flex-col gap-2 bg-paper-warm px-3 py-3.5">
              <span className="text-[16px] font-bold">
                <span className="mr-1.5 font-mono text-[12px] text-amber-text">05</span>Entrega e
                ART
              </span>
              <div aria-hidden="true" className="grid h-4 grid-cols-12">
                <div className="gantt-bar-m col-[10/13] border-[1.5px] border-ink bg-amber" />
              </div>
            </div>

            {/* D1.12: linha dentro do padding da linha 01, antes da barra D0 começar. */}
            <div aria-hidden="true" className="absolute top-7 bottom-0 left-1.5 border-l-2 border-dashed border-amber-text" />
          </div>

          <span className="font-mono text-[11px] font-semibold text-amber-text">
            ┆ VOCÊ ESTÁ AQUI: D0
          </span>

          <Button
            href="#orcamento"
            variant="primary"
            className="w-full justify-between"
            data-stamp-avoid
          >
            Começar pelo D0
          </Button>
        </div>
      </div>
    </section>
  );
}
