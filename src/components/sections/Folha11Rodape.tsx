import { FootStrip } from "@/components/ui/FootStrip";

const FOOTER_NAV = [
  { href: "#servicos", label: "Serviços" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#alerta", label: "Sinais de alerta" },
  { href: "#processo", label: "Como funciona" },
  { href: "#engenheiro", label: "Por que engenheiro" },
  { href: "#orcamento", label: "Pedir orçamento" },
];

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="34" height="34" fill="#F3F1EA" />
      <path d="M1 35 L35 1 L35 35 Z" fill="#F2B417" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="#0F1E33" strokeWidth="2" />
    </svg>
  );
}

export function Folha11Rodape() {
  return (
    <footer className="bg-night text-on-ink-2">
      {/* Computador */}
      <div className="wrap hidden flex-col gap-10 py-14 pb-8 md:flex">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[360px] flex-col gap-3.5">
            <span className="flex items-center gap-3">
              <Logo />
              <span className="text-[17px] font-bold text-on-ink">[NOME] Engenharia Elétrica</span>
            </span>
            <p className="text-[14px] leading-relaxed">
              Instalação, projeto, inspeção e manutenção elétrica para casas, comércios e
              pequenas empresas em [CIDADE E REGIÃO].
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-[14px]">
            {FOOTER_NAV.map((link) => (
              <a key={link.href} href={link.href} className="text-on-ink-2 no-underline hover:text-amber">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 font-mono text-[13px]">
            <span>(11) 90000-0000</span>
            <span>contato@nomeengenharia.com.br</span>
            <span>CREA-SP 000000000-0</span>
            <span>CNPJ 00.000.000/0001-00</span>
          </div>
        </div>

        <FootStrip
          items={[
            { label: "© 2026 [NOME] ENGENHARIA" },
            { label: "RESP. TÉC.: ENG. [NOME]" },
            { label: "NORMA: NBR 5410" },
            { label: "FOLHA 11 / 11 · FIM", accent: true },
          ]}
        />
      </div>

      {/* Celular */}
      <div className="wrap flex flex-col gap-6 py-10 pb-7 md:hidden">
        <span className="text-[17px] font-bold text-on-ink">[NOME] Engenharia Elétrica</span>
        <div className="flex flex-col gap-1.5 font-mono text-[12px]">
          <span>CREA-SP 000000000-0</span>
          <span>CNPJ 00.000.000/0001-00</span>
          <span>[CIDADE E REGIÃO]</span>
        </div>
        <FootStrip items={[{ label: "© 2026 [NOME]" }, { label: "FOLHA 11/11 · FIM", accent: true }]} />
      </div>
    </footer>
  );
}
