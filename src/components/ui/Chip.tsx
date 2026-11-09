import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function Chip({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <li
      className={twMerge(
        "inline-flex items-center gap-1.5 rounded-full bg-gelo px-[11px] py-1.5 text-[0.8rem] leading-tight font-semibold text-azul",
        className
      )}
    >
      {children}
    </li>
  );
}
