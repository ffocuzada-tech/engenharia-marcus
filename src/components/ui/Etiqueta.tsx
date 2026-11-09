import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Etiqueta({
  escuro = false,
  className,
  style,
  children,
}: {
  escuro?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <p
      style={style}
      className={cn(
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
