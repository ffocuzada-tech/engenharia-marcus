"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SHEETS } from "@/lib/sheets";
import { useActiveSheetIndex } from "@/components/providers/SheetProvider";

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

export function SheetIndicatorBar() {
  const activeIndex = useActiveSheetIndex();
  const active = SHEETS[activeIndex];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(open, () => setOpen(false), rootRef);

  return (
    <div ref={rootRef} className="sticky top-0 z-30 hidden border-b border-ink/25 bg-paper md:block">
      <div className="wrap relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label="Ver lista de folhas"
          className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-2.5 font-mono text-[11px] tracking-[.08em] text-text-3 uppercase"
        >
          <span>
            FOLHA <FlipNumber value={active.numero} /> / 11 · {active.nome}
          </span>
          <span aria-hidden="true" className="transition-[translate] duration-150">
            {open ? "▴" : "▾"}
          </span>
        </button>

        {open && (
          <div className="absolute top-full right-0 z-40 mt-1">
            <SheetList onSelect={() => setOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export function SheetIndicatorMobile() {
  const activeIndex = useActiveSheetIndex();
  const active = SHEETS[activeIndex];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(open, () => setOpen(false), rootRef);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Ver lista de folhas"
        className="flex h-11 cursor-pointer items-center border-0 bg-transparent px-1 font-mono text-[12px] text-text-3"
      >
        <FlipNumber value={active.numero} />
        /11
      </button>

      {open && (
        <div className="absolute top-full right-0 z-40 mt-1">
          <SheetList onSelect={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
