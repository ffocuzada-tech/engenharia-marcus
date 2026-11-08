import { Button } from "@/components/ui/Button";
import { SheetBar } from "@/components/ui/SheetBar";

const ALERTS = [
  {
    title: "Disjuntor desarmando",
    textDesktop:
      "Circuito sobrecarregado ou com fuga de corrente. Religar e torcer não resolve: o disjuntor está avisando.",
    textMobile: "Sobrecarga ou fuga. Religar e torcer não resolve.",
  },
  {
    title: "Cheiro de queimado",
    textDesktop:
      "Isolação de cabo aquecendo. Desligue o circuito no quadro e chame um profissional no mesmo dia.",
    textMobile: "Isolação aquecendo. Desligue o circuito e chame no mesmo dia.",
  },
  {
    title: "Choque ou formigamento",
    textDesktop:
      "Sinal de falta de aterramento ou de DR. É o risco mais direto para quem mora ou trabalha no local.",
    textMobile: "Falta de aterramento ou de DR. Risco direto a pessoas.",
  },
  {
    title: "Tomada ou espelho quente",
    textDesktop:
      "Mau contato ou cabo fino demais para a carga. É assim que muitos incêndios começam.",
    textMobile: "Mau contato ou cabo fino demais. Começo de incêndio.",
  },
];

export function Folha03Alerta() {
  return (
    <section id="alerta" className="bg-grid-night text-on-ink">
      <SheetBar numero="03" titulo="NOTAS DE ATENÇÃO" nota="LEIA ANTES DE RELIGAR" dark />

      <div className="wrap flex flex-col gap-14 py-16 md:gap-20 md:py-28">
        <h2 className="max-w-[1000px] text-display-xl font-bold text-on-ink">
          Quatro sinais que <span className="text-amber">não dá</span> para ignorar.
        </h2>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-20 md:gap-y-14">
          {ALERTS.map((item, i) => (
            <div
              key={item.title}
              className="grid grid-cols-[48px_1fr] gap-4 border-t border-on-ink/30 pt-6 md:grid-cols-[72px_1fr] md:gap-6"
            >
              <svg viewBox="0 0 64 58" className="h-10 w-11 md:h-[58px] md:w-16" aria-hidden="true">
                <path d="M32 3 L61 55 H3 Z" fill="none" stroke="#F2B417" strokeWidth="3.5" />
                <text
                  x="32"
                  y="47"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="22"
                  fontWeight="600"
                  fill="#F2B417"
                >
                  {i + 1}
                </text>
              </svg>
              <div className="flex flex-col gap-1.5 md:gap-2.5">
                <h3 className="text-[22px] font-bold md:text-[30px] md:tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-on-ink-2 md:hidden">
                  {item.textMobile}
                </p>
                <p className="hidden text-[17px] leading-relaxed text-on-ink-2 md:block">
                  {item.textDesktop}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          data-stamp-avoid
          className="flex flex-col gap-3.5 bg-amber p-5 text-ink md:flex-row md:items-center md:justify-between md:gap-6 md:px-[30px] md:py-[26px]"
        >
          <p className="max-w-[640px] text-[16px] leading-snug md:text-[18px]">
            <strong>Fumaça ou faísca?</strong> Desligue o disjuntor geral e afaste-se do quadro.
            <span className="hidden md:inline"> Depois, fale comigo.</span>
          </p>
          <Button
            href="https://wa.me/55XXXXXXXXXXX"
            variant="dark"
            className="w-full justify-center md:w-auto md:justify-start"
          >
            Chamar no WhatsApp agora
          </Button>
        </div>
      </div>
    </section>
  );
}
