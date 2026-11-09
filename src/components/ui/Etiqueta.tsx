import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function Etiqueta({
  escuro = false,
  className,
  children,
}: {
  escuro?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={twMerge(
        "inline-flex items-center gap-2.5 font-sans text-label font-bold tracking-[0.12em] uppercase",
        escuro ? "text-eletrico-claro" : "text-eletrico",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-ambar shadow-[0_0_0_4px_rgba(255,178,30,0.22)]"
      />
      {children}
    </p>
  );
}
