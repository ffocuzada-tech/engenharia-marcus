import { Button } from "@/components/ui/Button";
import { Dimension } from "@/components/ui/Dimension";
import { Photo } from "@/components/ui/Photo";
import { SheetBar } from "@/components/ui/SheetBar";
import { TitleBlock, TitleBlockCell } from "@/components/ui/TitleBlock";

export function Folha01Hero() {
  return (
    <section>
      <SheetBar numero="01" titulo="APRESENTAÇÃO" nota="ESC. 1:1 · REV. 2026" />

      <div className="wrap grid items-center gap-16 py-16 md:py-26 lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <h1 className="text-h1 font-bold text-balance text-ink">
            Elétrica com projeto, cálculo e engenheiro que assina.
          </h1>
          <p className="max-w-[520px] text-body-lg text-text-2">
            Instalações, projetos, inspeções e manutenção para casas, comércios e pequenas
            empresas. Cada serviço sai com responsável técnico e ART registrada.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button
              href="#orcamento"
              variant="primary"
              className="w-full justify-between sm:w-auto sm:justify-start"
            >
              Pedir orçamento grátis
            </Button>
            <Button
              href="#alerta"
              variant="outline"
              arrow={false}
              className="w-full justify-center sm:w-auto"
            >
              Tenho um problema agora
            </Button>
          </div>

          <div className="hidden flex-wrap gap-7 font-mono text-[13px] text-text-2 md:flex">
            <span>✓ NBR 5410</span>
            <span>✓ ART em todo serviço</span>
            <span>✓ Orçamento sem compromisso</span>
          </div>
        </div>

        {/* Figura — computador: foto com cotas e carimbo sobreposto */}
        <figure className="relative hidden pt-7 pl-7 md:block">
          <Dimension
            orientation="horizontal"
            label="RESIDENCIAL · COMERCIAL"
            className="absolute top-0 right-0 left-7"
          />
          <Dimension orientation="vertical" label="" className="absolute top-7 bottom-0 left-0" />
          <Photo
            label={"[FOTO REAL]\nEngenheiro em obra, diante de um quadro"}
            className="h-[500px]"
          />
          <TitleBlock className="absolute -right-6 -bottom-8 w-[330px]">
            <TitleBlockCell wide borderBottom>
              <span className="text-text-3">RESPONSÁVEL TÉCNICO</span>
              <span className="font-sans text-base font-bold text-ink">
                Eng. [NOME SOBRENOME]
              </span>
            </TitleBlockCell>
            <TitleBlockCell borderRight borderBottom>
              <span className="text-text-3">CREA-SP</span>
              <span className="text-[13px] font-semibold">000000000-0</span>
            </TitleBlockCell>
            <TitleBlockCell borderBottom>
              <span className="text-text-3">DESDE</span>
              <span className="text-[13px] font-semibold">[ANO]</span>
            </TitleBlockCell>
            <TitleBlockCell borderRight>
              <span className="text-text-3">ÁREA</span>
              <span className="text-[13px] font-semibold">[CIDADE / REGIÃO]</span>
            </TitleBlockCell>
            <TitleBlockCell accent>
              <span>FOLHA</span>
              <span className="text-[13px] font-semibold">01 / 11</span>
            </TitleBlockCell>
          </TitleBlock>
        </figure>

        {/* Figura — celular: sem cotas, carimbo menor sobreposto na foto */}
        <figure className="mt-2 md:hidden">
          <Photo label="[FOTO REAL] Engenheiro em obra" className="h-[260px]" />
          <TitleBlock className="mr-3 ml-7 -mt-10 shadow-[6px_6px_0_rgba(15,30,51,.12)]">
            <TitleBlockCell wide borderBottom>
              <span className="text-text-3">RESPONSÁVEL TÉCNICO</span>
              <span className="font-sans text-[15px] font-bold text-ink">
                Eng. [NOME SOBRENOME]
              </span>
            </TitleBlockCell>
            <TitleBlockCell borderRight>
              <span className="text-text-3">CREA-SP</span>
              <span className="text-[12px] font-semibold">000000000-0</span>
            </TitleBlockCell>
            <TitleBlockCell accent>
              <span>FOLHA</span>
              <span className="text-[12px] font-semibold">01 / 11</span>
            </TitleBlockCell>
          </TitleBlock>
        </figure>
      </div>
    </section>
  );
}
