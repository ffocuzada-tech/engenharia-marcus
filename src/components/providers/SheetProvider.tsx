"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SHEETS } from "@/lib/sheets";

const ActiveSheetContext = createContext(0);

export function useActiveSheetIndex() {
  return useContext(ActiveSheetContext);
}

export function SheetProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // "(min-width: 0px)" é sempre verdadeira — sem ela o matchMedia não
    // dispara o callback de forma confiável em alguns navegadores.
    mm.add("(min-width: 0px)", () => {
      const triggers = SHEETS.map((sheet, index) => {
        const el = document.getElementById(sheet.id);
        if (!el) return null;

        return ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          // Protege o refresh caso uma folha seguinte venha a travar a
          // tela (pin) em uma próxima etapa de movimento.
          refreshPriority: -1,
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(index);
          },
        });
      });

      return () => {
        triggers.forEach((trigger) => trigger?.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return <ActiveSheetContext.Provider value={activeIndex}>{children}</ActiveSheetContext.Provider>;
}
