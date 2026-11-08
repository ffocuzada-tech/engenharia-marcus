import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Dimension } from "@/components/ui/Dimension";
import { Photo } from "@/components/ui/Photo";
import { SheetBar } from "@/components/ui/SheetBar";

function DualText({
  desktop,
  mobile,
  className = "",
}: {
  desktop: string;
  mobile: string;
  className?: string;
}) {
  return (
    <>
      <p className={`md:hidden ${className}`}>{mobile}</p>
      <p className={`hidden md:block ${className}`}>{desktop}</p>
    </>
  );
}

function SpecCol({ k, v, last = false }: { k: string; v: React.ReactNode; last?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-3 p-6 ${
        last ? "bg-paper-warm" : "border-b border-ink/25 md:border-r md:border-b-0"
      }`}
    >
      <span className="font-mono text-[11px] tracking-[.08em] text-amber-text uppercase">
        {k}
      </span>
      {v}
    </div>
  );
}

function Checklist({ items, mobileInline }: { items: string[]; mobileInline: string }) {
  return (
    <>
      <p className="text-[15px] leading-relaxed md:hidden">{mobileInline}</p>
      <ul className="hidden flex-col gap-2 text-[15px] md:flex">
        {items.map((it) => (
          <li key={it} className="before:content-['☐_']">
            {it}
          </li>
        ))}
      </ul>
    </>
  );
}

function DetailHeader({
  letter,
  code,
  title,
  reverse = false,
}: {
  letter: string;
  code: string;
  title: string;
  reverse?: boolean;
}) {
  const circle = (
    <>
      <Callout letter={letter} code={code} className="hidden md:flex" />
      <Callout letter={letter} code={code} size="sm" className="md:hidden" />
    </>
  );
  return (
    <div
      className={`flex items-center gap-3.5 md:gap-[18px] ${reverse ? "justify-end" : ""}`}
    >
      {!reverse && circle}
      <h3
        className={`text-h3 font-bold text-ink ${reverse ? "text-right" : ""}`}
      >
        {title}
      </h3>
      {reverse && circle}
    </div>
  );
}

function DetailCard({
  variant,
  letter,
  code,
  title,
  problem,
  doThis,
  receive,
}: {
  variant: "dark" | "light";
  letter: string;
  code: string;
  title: string;
  problem: { desktop: string; mobile: string };
  doThis: { desktop: string; mobile: string };
  receive: { desktop: string; mobile: string };
}) {
  const dark = variant === "dark";
  return (
    <article
      id={`det-${letter.toLowerCase()}`}
      className={`flex flex-col gap-6 p-9 ${
        dark ? "bg-ink text-on-ink" : "border-[1.5px] border-ink bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <Callout letter={letter} code={code} size="lg" onDark={dark} />
        <h3 className="text-h3 font-bold">{title}</h3>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className={`font-mono text-[11px] ${dark ? "text-amber" : "text-amber-text"}`}>
          01 · O PROBLEMA
        </span>
        <DualText
          desktop={problem.desktop}
          mobile={problem.mobile}
          className={`text-[16px] leading-relaxed ${dark ? "text-on-ink-2" : "text-text-2"}`}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className={`font-mono text-[11px] ${dark ? "text-amber" : "text-amber-text"}`}>
          02 · O QUE EU FAÇO
        </span>
        <DualText
          desktop={doThis.desktop}
          mobile={doThis.mobile}
          className={`text-[16px] leading-relaxed ${dark ? "text-on-ink-2" : "text-text-2"}`}
        />
      </div>
      <div
        className={`flex flex-col gap-2 md:border-t md:border-dashed md:pt-[18px] ${
          dark ? "md:border-on-ink/35" : "md:border-ink/35"
        }`}
      >
        <span className={`font-mono text-[11px] ${dark ? "text-amber" : "text-amber-text"}`}>
          03 · VOCÊ RECEBE
        </span>
        <DualText desktop={receive.desktop} mobile={receive.mobile} className="text-[16px] leading-relaxed" />
      </div>
    </article>
  );
}

export function Folha04Detalhes() {
  return (
    <section id="detalhes" className="border-b-[1.5px] border-ink">
      <SheetBar numero="04" titulo="DETALHES A–D" nota="ESC. 1:10" />

      <div className="wrap flex flex-col gap-9 py-14 md:gap-0 md:py-18">
        {/* Detalhe A — Instalação elétrica */}
        <article id="det-a" className="grid gap-12 pb-0 md:grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] md:pb-16">
          <div className="flex flex-col gap-5">
            <DetailHeader letter="A" code="E-01" title="Instalação elétrica" />
            <Photo
              label="[FOTO REAL] quadro novo montado"
              className="hidden h-[260px] md:flex"
            />
          </div>
          <div className="grid self-start border-[1.5px] border-ink bg-white md:grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]">
            <SpecCol
              k="01 · O PROBLEMA"
              v={
                <DualText
                  className="text-[16px] leading-relaxed"
                  desktop="A obra está andando e ninguém calculou a carga. Ou a casa é antiga e não aguenta ar, chuveiro e forno ao mesmo tempo."
                  mobile="Casa antiga que não aguenta ar, chuveiro e forno juntos, ou obra sem carga calculada."
                />
              }
            />
            <SpecCol
              k="02 · O QUE EU FAÇO"
              v={
                <DualText
                  className="text-[16px] leading-relaxed"
                  desktop="Dimensiono circuitos e quadro, instalo com material certificado e identifico cada circuito na porta do quadro."
                  mobile="Dimensiono circuitos e quadro e instalo com material certificado."
                />
              }
            />
            <SpecCol
              last
              k="03 · VOCÊ RECEBE"
              v={
                <Checklist
                  items={[
                    "Quadro identificado",
                    "Diagrama colado na porta",
                    "ART de execução",
                    "Garantia de [X] meses",
                  ]}
                  mobileInline="☐ Quadro identificado ☐ Diagrama na porta ☐ ART ☐ Garantia [X] meses"
                />
              }
            />
          </div>
        </article>

        <Dimension label="DETALHE B" className="hidden md:flex" />

        {/* Detalhe B — Projetos elétricos */}
        <article id="det-b" className="grid gap-12 py-0 md:grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] md:py-16">
          <div className="grid self-start border-[1.5px] border-ink bg-white md:order-1 md:grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]">
            <SpecCol
              k="01 · O PROBLEMA"
              v={
                <DualText
                  className="text-[16px] leading-relaxed"
                  desktop="A concessionária pediu projeto, ou o arquiteto precisa da parte elétrica para a obra começar."
                  mobile="A concessionária ou o arquiteto pediram o projeto elétrico."
                />
              }
            />
            <SpecCol
              k="02 · O QUE EU FAÇO"
              v={
                <DualText
                  className="text-[16px] leading-relaxed"
                  desktop="Levanto as cargas, calculo seção dos cabos, queda de tensão e curto-circuito, e desenho planta e diagrama unifilar."
                  mobile="Cálculo de cabos, queda de tensão e curto; planta e diagrama unifilar."
                />
              }
            />
            <SpecCol
              last
              k="03 · VOCÊ RECEBE"
              v={
                <Checklist
                  items={["Pranchas em PDF e DWG", "Memorial de cálculo", "Lista de materiais", "ART de projeto"]}
                  mobileInline="☐ PDF e DWG ☐ Memorial ☐ Lista de materiais ☐ ART"
                />
              }
            />
          </div>
          <div className="flex flex-col gap-5 md:order-2">
            <DetailHeader letter="B" code="E-02" title="Projetos elétricos" reverse />
            <div className="relative hidden h-[260px] overflow-hidden border border-ink bg-white md:block">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 520 260"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                stroke="#0F1E33"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <rect x="40" y="30" width="440" height="200" />
                <path d="M240 30v120h240M240 150v80M120 30v90H40" />
                <circle cx="90" cy="70" r="6" />
                <circle cx="180" cy="190" r="6" />
                <circle cx="360" cy="80" r="6" />
                <path
                  d="M90 70 Q140 120 180 190 M180 190 Q300 170 360 80"
                  stroke="#F2B417"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
                <rect x="440" y="180" width="26" height="36" fill="#F2B417" stroke="#0F1E33" />
              </svg>
              <span className="absolute bottom-2.5 left-3 font-mono text-[11px] text-text-3">
                Trecho de planta · ilustrativo
              </span>
            </div>
          </div>
        </article>

        <Dimension label="DETALHES C · D" className="hidden md:flex" />

        {/* Detalhes C e D — Inspeções e Manutenção */}
        <div className="grid gap-9 pt-0 md:grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))] md:gap-10 md:pt-16">
          <DetailCard
            variant="dark"
            letter="C"
            code="E-03"
            title="Inspeções e laudos"
            problem={{
              desktop:
                "Vai comprar um imóvel, renovar o seguro ou passar em vistoria, e não sabe o estado real da instalação.",
              mobile: "Compra de imóvel, seguro ou vistoria sem saber o estado real da instalação.",
            }}
            doThis={{
              desktop:
                "Inspeção visual, medição de isolamento e aterramento, termografia do quadro e verificação do SPDA.",
              mobile: "Medições de isolamento e aterramento, termografia e SPDA.",
            }}
            receive={{
              desktop: "Laudo assinado · fotos térmicas · não conformidades por prioridade · ART",
              mobile: "Laudo assinado · fotos térmicas · prioridades · ART",
            }}
          />
          <DetailCard
            variant="light"
            letter="D"
            code="E-04"
            title="Manutenção"
            problem={{
              desktop: "O disjuntor desarma, a luz pisca, a conta subiu. Ou a empresa simplesmente não pode parar.",
              mobile: "Disjuntor desarma, luz pisca, a empresa não pode parar.",
            }}
            doThis={{
              desktop:
                "Diagnóstico, reaperto de conexões, troca de componentes, teste de DR e DPS. Preventiva com agenda fixa.",
              mobile: "Diagnóstico, reaperto, troca de componentes, teste de DR e DPS.",
            }}
            receive={{
              desktop: "Relatório de cada visita · histórico do quadro · prioridade para contratos",
              mobile: "Relatório por visita · histórico · prioridade",
            }}
          />
        </div>

        <Button href="#orcamento" variant="dark" className="mt-14 hidden self-center md:inline-flex">
          Pedir orçamento para um desses serviços
        </Button>
      </div>
    </section>
  );
}
