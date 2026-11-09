import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Etiqueta } from "@/components/ui/Etiqueta";

export function CabecalhoSecao({
  etiqueta,
  titulo,
  tituloId,
  subtitulo,
  align = "esquerda",
  escuro = false,
  className,
}: {
  etiqueta: ReactNode;
  titulo: ReactNode;
  tituloId?: string;
  subtitulo?: ReactNode;
  align?: "esquerda" | "centro";
  escuro?: boolean;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex max-w-[780px] flex-col gap-4",
        align === "centro" && "mx-auto items-center text-center",
        className
      )}
    >
      <Etiqueta escuro={escuro}>{etiqueta}</Etiqueta>
      <h2
        id={tituloId}
        className={cn(
          "font-title text-h2 font-extrabold",
          escuro ? "text-claro" : "text-noite"
        )}
      >
        {titulo}
      </h2>
      {subtitulo && (
        <p
          className={cn(
            "max-w-[640px] text-body-lg",
            escuro ? "text-claro-2" : "text-texto-2",
            align === "centro" && "mx-auto"
          )}
        >
          {subtitulo}
        </p>
      )}
    </header>
  );
}
