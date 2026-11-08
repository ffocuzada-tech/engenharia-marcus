import { SheetBar } from "@/components/ui/SheetBar";

const SPECS = [
  {
    term: "ART",
    lead: "Anotação de Responsabilidade Técnica.",
    rest: "Registro no CREA de quem responde pelo serviço. Se algo der errado, há um responsável com nome.",
    mobile: "Registro no CREA de quem responde pelo serviço.",
  },
  {
    term: "NBR 5410",
    lead: "A norma de instalações de baixa tensão.",
    rest: "Define bitola, proteção, aterramento e DR. É o padrão que seguradoras e vistorias cobram.",
    mobile: "A norma de baixa tensão que seguradoras e vistorias cobram.",
  },
  {
    term: "CREA",
    lead: "Registro profissional verificável.",
    rest: "Você pode consultar o número 000000000-0 no site do conselho antes de contratar.",
    mobile: "Registro verificável: 000000000-0.",
  },
  {
    term: "CÁLCULO",
    lead: 'Nada "no olho".',
    rest: "Seção dos cabos, queda de tensão e corrente de curto calculadas para a sua carga real.",
    mobile: "Cabos, queda de tensão e curto calculados para a sua carga.",
  },
];

export function Folha05Engenheiro() {
  return (
    <section id="engenheiro">
      <SheetBar numero="05" titulo="ESPECIFICAÇÕES" nota="VISTA ISOMÉTRICA" />

      <div className="wrap flex flex-col gap-14 py-14 md:gap-18 md:py-30">
        <h2 className="max-w-[1050px] text-display font-bold text-ink">
          Eletricista instala.{" "}
          <span className="bg-[linear-gradient(transparent_62%,var(--color-amber)_62%)]">
            Engenheiro calcula, instala e responde.
          </span>
        </h2>

        <div className="grid items-start gap-16 md:grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))]">
          <div className="flex flex-col gap-4">
            <div className="relative flex h-[260px] items-center justify-center border-[1.5px] border-dashed border-[#6D28D9] bg-white bg-[repeating-linear-gradient(135deg,rgba(109,40,217,.05)_0_2px,transparent_2px_16px)] md:h-[460px]">
              <svg
                viewBox="0 0 300 240"
                className="h-[176px] w-[220px] md:h-[240px] md:w-[300px]"
                fill="none"
                stroke="#0F1E33"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M150 20 L270 80 L150 140 L30 80 Z" />
                <path d="M30 80 V170 L150 230 V140 M270 80 V170 L150 230" />
                <path d="M90 110 V200 M210 110 V200 M150 80 L210 110" strokeDasharray="4 4" />
                <path d="M60 95 L150 140 L240 95" stroke="#F2B417" strokeWidth="2.4" />
                <circle cx="150" cy="140" r="5" fill="#F2B417" />
              </svg>
              <span className="absolute top-3 left-3.5 font-mono text-[12px] font-semibold text-[#5B21B6]">
                <span className="md:hidden">[ESPAÇO 3D → vídeo no celular]</span>
                <span className="hidden md:inline">[ESPAÇO 3D / WebGL]</span>
              </span>
            </div>
          </div>

          <ol className="hidden flex-col md:flex">
            {SPECS.map((s) => (
              <li
                key={s.term}
                className="grid grid-cols-[150px_1fr] gap-6 border-t border-ink/30 py-[26px] first:border-t-[1.5px] first:border-ink last:border-b-[1.5px] last:border-ink"
              >
                <span className="font-mono text-[26px] font-semibold">{s.term}</span>
                <p className="text-[16px] leading-[1.6] text-text-2">
                  <strong className="text-ink">{s.lead}</strong> {s.rest}
                </p>
              </li>
            ))}
          </ol>

          <dl className="flex flex-col md:hidden">
            {SPECS.map((s) => (
              <div
                key={s.term}
                className="border-t border-ink/30 py-[18px] first:border-t-[1.5px] first:border-ink last:border-b-[1.5px] last:border-ink"
              >
                <dt className="font-mono text-xl font-semibold">{s.term}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-text-2">{s.mobile}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
