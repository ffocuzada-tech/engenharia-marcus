import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Etiqueta } from "@/components/ui/Etiqueta";

export function CabecalhoSecao({
  etiqueta,
  titulo,
  subtitulo,
  align = "esquerda",
  escuro = false,
  className,
}: {
  etiqueta: ReactNode;
  titulo: ReactNode;
  subtitulo?: ReactNode;
  align?: "esquerda" | "centro";
  escuro?: boolean;
  className?: string;
}) {
  return (
    <header
      className={twMerge(
        "flex max-w-[780px] flex-col gap-4",
        align === "centro" && "mx-auto items-center text-center",
        className
      )}
    >
      <Etiqueta escuro={escuro}>{etiqueta}</Etiqueta>
      <h2
        className={twMerge(
          "font-title text-h2 font-extrabold",
          escuro ? "text-claro" : "text-noite"
        )}
      >
        {titulo}
      </h2>
      {subtitulo && (
        <p
          className={twMerge(
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
