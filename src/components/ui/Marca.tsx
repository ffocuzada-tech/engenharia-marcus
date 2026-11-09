import { cn } from "@/lib/cn";
import { nomePublico } from "@/lib/site";

function MarcaSinal({ className, fundo }: { className?: string; fundo: string }) {
  return (
    <svg viewBox="0 0 38 38" aria-hidden="true" className={cn("h-[38px] w-[38px] shrink-0", className)}>
      <rect width="38" height="38" rx="11" fill={fundo} />
      <rect x="11" y="7.5" width="16" height="23" rx="3" fill="none" stroke="#7FAEFF" strokeWidth="1.8" />
      <path d="M20.3 11.5 15.8 19.2h3.6l-1.7 7.3 4.6-7.8h-3.6z" fill="#FFB21E" />
    </svg>
  );
}

export function Marca({
  escuro = false,
  mostrarSubtitulo = true,
  className,
}: {
  escuro?: boolean;
  mostrarSubtitulo?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex min-h-11 items-center gap-3", className)}>
      <MarcaSinal fundo={escuro ? "#112640" : "#0A1A2E"} />
      <span className="flex flex-col leading-tight">
        <strong
          className={cn(
            "font-title text-[1.02rem] font-extrabold tracking-[-0.01em] whitespace-nowrap",
            escuro ? "text-claro" : "text-noite"
          )}
        >
          {nomePublico()}
        </strong>
        {mostrarSubtitulo && (
          <span
            className={cn(
              "text-[0.74rem] tracking-[0.02em] whitespace-nowrap",
              escuro ? "text-claro-2" : "text-texto-3"
            )}
          >
            Projetos · Instalações · Laudos
          </span>
        )}
      </span>
    </span>
  );
}
