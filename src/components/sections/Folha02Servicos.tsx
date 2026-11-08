import { SheetBar } from "@/components/ui/SheetBar";
import { Tag } from "@/components/ui/Tag";

const SERVICES = [
  {
    code: "E-01",
    letter: "A",
    href: "#det-a",
    title: "Instalação elétrica",
    text: "Obra nova, reforma ou ampliação, da entrada de energia à última tomada.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="#0F1E33"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="14" />
        <path d="M14 17v6M26 17v6M17 29h6" />
      </svg>
    ),
  },
  {
    code: "E-02",
    letter: "B",
    href: "#det-b",
    title: "Projetos elétricos",
    text: "Memorial de cálculo, ART e aprovação na concessionária.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="#0F1E33"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <rect x="7" y="9" width="26" height="22" />
        <path d="M7 25h26M13 25v6M19 9v10h8" />
      </svg>
    ),
  },
  {
    code: "E-03",
    letter: "C",
    href: "#det-c",
    title: "Inspeções e laudos",
    text: "Medições e laudo assinado para imóvel, seguro ou vistoria.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="#0F1E33"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M8 28a14 14 0 0 1 24 0" />
        <path d="M20 28l6-9" />
        <circle cx="20" cy="28" r="2" />
        <path d="M8 33h24" />
      </svg>
    ),
  },
  {
    code: "E-04",
    letter: "D",
    href: "#det-d",
    title: "Manutenção",
    text: "Preventiva com agenda fixa ou corretiva quando algo falha.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="#0F1E33"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M20 6a14 14 0 1 1-12 7" />
        <path d="M8 6v7h7" />
        <path d="M20 13v8l5 4" />
      </svg>
    ),
  },
];

export function Folha02Servicos() {
  return (
    <section id="servicos" className="border-t-[1.5px] border-ink bg-paper/86">
      <SheetBar numero="02" titulo="ÍNDICE DE SERVIÇOS" nota="4 DETALHES" />

      <div className="wrap flex flex-col gap-11 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="max-w-[640px] text-h2 font-bold text-ink">
            Quatro serviços. Um mesmo responsável técnico do começo ao fim.
          </h2>
          <p className="max-w-[360px] text-[16px] leading-relaxed text-text-2">
            Cada um tem uma folha de detalhe logo abaixo: o problema, o que eu faço e o que você
            recebe por escrito.
          </p>
        </div>

        {/* Computador: grade de cards */}
        <div className="hidden border-t-[1.5px] border-l-[1.5px] border-ink bg-white md:grid md:grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))]">
          {SERVICES.map((s) => (
            <a
              key={s.code}
              href={s.href}
              className="flex flex-col gap-4 border-r-[1.5px] border-b-[1.5px] border-ink px-[26px] py-7 no-underline hover:bg-paper-warm"
            >
              <div className="flex items-center justify-between">
                <Tag>{s.code}</Tag>
                {s.icon}
              </div>
              <h3 className="text-h4 font-bold text-ink">{s.title}</h3>
              <p className="flex-1 text-[15px] leading-relaxed text-text-2">{s.text}</p>
              <span className="flex justify-between border-t border-dashed border-ink/35 pt-3.5 font-mono text-[13px] font-semibold text-ink">
                VER DETALHE {s.letter} <span aria-hidden="true">↓</span>
              </span>
            </a>
          ))}
        </div>

        {/* Celular: lista */}
        <nav
          aria-label="Serviços"
          className="flex flex-col border-t-[1.5px] border-r-[1.5px] border-l-[1.5px] border-ink bg-white md:hidden"
        >
          {SERVICES.map((s) => (
            <a
              key={s.code}
              href={s.href}
              className="flex min-h-16 items-center gap-3.5 border-b-[1.5px] border-ink px-4 no-underline"
            >
              <Tag>{s.code}</Tag>
              <span className="flex-1 text-lg font-bold text-ink">{s.title}</span>
              <span aria-hidden="true" className="font-mono text-sm text-ink">
                {s.letter} ↓
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
