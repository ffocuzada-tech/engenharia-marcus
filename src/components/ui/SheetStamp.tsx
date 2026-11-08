"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SHEETS } from "@/lib/sheets";
import { useActiveSheetIndex } from "@/components/providers/SheetProvider";

const ORCAMENTO_ID = "orcamento";

function useDismiss(open: boolean, onClose: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, ref]);
}

// Giro curto: o valor antigo sobe e some, o novo entra de baixo (250ms).
function FlipNumber({ value }: { value: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const prev = useRef(value);

  useGSAP(() => {
    if (prev.current === value) return;
    prev.current = value;

    const mm = gsap.matchMedia();

    mm.add(
      {
        always: "(min-width: 0px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const el = ref.current;
        const wrap = wrapRef.current;
        if (!el || !wrap) return;

        if (reduceMotion) {
          setShown(value);
          return;
        }

        // overflow:hidden só durante o giro — parado, ele deixa a fonte
        // visivelmente menor (artefato de rasterização do Chromium).
        gsap.set(wrap, { overflow: "hidden" });
        const tl = gsap.timeline({
          onComplete: () => gsap.set(wrap, { overflow: "visible" }),
        });
        tl.to(el, { y: -10, opacity: 0, duration: 0.12, ease: "power2.in" })
          .call(() => setShown(value))
          .fromTo(el, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.13, ease: "power2.out" });

        return () => tl.kill();
      }
    );

    return () => mm.revert();
  }, [value]);

  return (
    <span ref={wrapRef} className="relative inline-block align-baseline">
      <span ref={ref} className="inline-block">
        {shown}
      </span>
    </span>
  );
}

// Nome da folha troca em fade (sem deslocamento).
function FadeLabel({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const prev = useRef(value);

  useGSAP(() => {
    if (prev.current === value) return;
    prev.current = value;

    const mm = gsap.matchMedia();

    mm.add(
      {
        always: "(min-width: 0px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const el = ref.current;
        if (!el) return;

        if (reduceMotion) {
          setShown(value);
          return;
        }

        const tl = gsap.timeline();
        tl.to(el, { opacity: 0, duration: 0.1, ease: "power1.in" })
          .call(() => setShown(value))
          .to(el, { opacity: 1, duration: 0.12, ease: "power1.out" });

        return () => tl.kill();
      }
    );

    return () => mm.revert();
  }, [value]);

  return (
    <span ref={ref} className="inline-block">
      {shown}
    </span>
  );
}

function SheetList({ onSelect }: { onSelect: () => void }) {
  return (
    <ul
      role="listbox"
      aria-label="Folhas da página"
      className="w-[280px] border-[1.5px] border-ink bg-white shadow-[8px_8px_0_rgba(15,30,51,.12)]"
    >
      {SHEETS.map((sheet) => (
        <li key={sheet.id} className="border-b border-ink/18 last:border-b-0">
          <a
            href={`#${sheet.id}`}
            onClick={onSelect}
            className="flex items-center gap-3 px-4 py-2.5 no-underline hover:bg-paper-warm"
          >
            <span className="font-mono text-[12px] text-text-3">{sheet.numero}</span>
            <span className="flex-1 font-sans text-[13px] font-medium text-ink">{sheet.nome}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Mini-carimbo fixo (canto inferior direito) que acompanha a leitura.
 * Fica escondido enquanto o carimbo grande do hero está visível e "bate"
 * no canto quando o hero sai da tela. Some na folha de orçamento, porque
 * o formulário já é um carimbo.
 */
export function SheetStamp() {
  const activeIndex = useActiveSheetIndex();
  const active = SHEETS[activeIndex];
  const [open, setOpen] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(open, () => setOpen(false), rootRef);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroPassed(false);
        } else if (entry.boundingClientRect.bottom < 0) {
          setHeroPassed(true);
        } else if (entry.boundingClientRect.top > 0) {
          setHeroPassed(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const isOrcamento = active.id === ORCAMENTO_ID;
  if (!heroPassed || isOrcamento) return null;

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-40 md:right-6 md:bottom-6">
      {open && (
        <div className="absolute right-0 bottom-full z-10 mb-2">
          <SheetList onSelect={() => setOpen(false)} />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Ver lista de folhas"
        className="sheet-stamp-enter flex cursor-pointer border-[1.5px] border-ink bg-white shadow-[var(--shadow-sheet)]"
      >
        <span className="hidden items-center border-r border-ink px-3 py-2.5 font-mono text-[11px] tracking-[.08em] text-text-3 uppercase md:flex">
          <FadeLabel value={active.nome} />
        </span>

        <span className="flex flex-col items-center justify-center gap-0.5 bg-amber px-2.5 py-1.5 text-ink md:px-3.5 md:py-2.5">
          <span className="hidden text-micro uppercase md:block">Folha</span>
          <span className="font-mono text-[11px] font-semibold md:text-[13px]">
            <FlipNumber value={active.numero} />
            <span className="hidden md:inline"> / 11</span>
            <span className="md:hidden">/11</span>
          </span>
        </span>
      </button>
    </div>
  );
}
