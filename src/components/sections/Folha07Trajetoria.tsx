import { Photo } from "@/components/ui/Photo";
import { SheetBar } from "@/components/ui/SheetBar";

const MILESTONES = [
  { year: "[ANO]", text: "Formação em Engenharia Elétrica · [UNIVERSIDADE]" },
  { year: "[ANO]", text: "Primeiros anos em [EMPRESA / SETOR]" },
  { year: "[ANO]", text: "Primeiras obras com ART própria" },
  { year: "[ANO]", text: "Abre a [NOME] Engenharia Elétrica" },
  { year: "HOJE", text: "[XXX] clientes em [CIDADE]", now: true },
];

export function Folha07Trajetoria() {
  return (
    <section id="trajetoria">
      <SheetBar numero="07" titulo="TRAJETÓRIA" nota="COTAS EM ANOS" />

      <div className="wrap flex flex-col gap-14 py-16 md:gap-18 md:py-22">
        <div className="grid items-center gap-16 md:grid-cols-[repeat(auto-fit,minmax(420px,100%))]">
          <Photo
            label="[RETRATO REAL do engenheiro]"
            className="order-1 h-[300px] md:order-none md:h-[420px]"
          />
          <div className="order-2 flex flex-col gap-6 md:order-none">
            <h2 className="text-h2 font-bold text-ink">
              [Frase dele: por que escolheu a engenharia elétrica.]
            </h2>
            <p className="text-[16px] leading-relaxed text-text-2 md:hidden">
              [Parágrafo curto na voz dele: formação, primeiros anos, por que atende casas e
              pequenos negócios.]
            </p>
            <p className="hidden text-[18px] leading-[1.65] text-text-2 md:block">
              [Dois parágrafos curtos, na voz dele: onde se formou, o que aprendeu nos primeiros
              anos, por que decidiu atender casas e pequenos negócios com o mesmo rigor de uma
              indústria.]
            </p>
            <div className="hidden w-[280px] flex-col gap-1 border-t border-ink pt-4 md:flex">
              <span
                className="text-[30px] text-[#1C3A66]"
                style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
              >
                [Assinatura]
              </span>
              <span className="font-mono text-[12px] text-text-3">
                Eng. [NOME SOBRENOME] · CREA-SP 000000000-0
              </span>
            </div>
          </div>
        </div>

        {/* Computador: régua horizontal */}
        <div className="hidden flex-col md:flex">
          <div className="grid grid-cols-5 border-b-2 border-ink">
            {MILESTONES.map((m) => (
              <div
                key={m.year + m.text}
                className={`flex flex-col gap-1.5 border-l-2 border-ink py-4 pr-3 pl-3.5 ${
                  m.now ? "bg-amber pt-2.5 pr-2.5" : ""
                }`}
              >
                <span className="font-mono text-[22px] font-semibold">{m.year}</span>
                <span className="text-[15px] leading-snug text-text-2">{m.text}</span>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="grid grid-cols-4 pt-2.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 pr-2 font-mono text-[11px] text-text-3"
              >
                <span>|</span>
                <span className="h-px flex-1 bg-text-3" />
                <span>[X] ANOS</span>
                <span className="h-px flex-1 bg-text-3" />
                <span>|</span>
              </div>
            ))}
          </div>
        </div>

        {/* Celular: linha do tempo vertical */}
        <ol className="mt-2 flex flex-col gap-5 border-l-2 border-ink pl-4.5 md:hidden">
          {MILESTONES.map((m) => (
            <li
              key={m.year + m.text}
              className={`relative flex flex-col gap-0.5 ${m.now ? "bg-amber px-2.5 py-2" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[25px] h-0.5 w-3 bg-ink ${m.now ? "top-3.5" : "top-1.5"}`}
              />
              <span className="font-mono text-[17px] font-semibold">{m.year}</span>
              <span className="text-[15px] text-text-2">{m.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
