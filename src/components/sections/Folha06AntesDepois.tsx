"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Pin } from "@/components/ui/Pin";
import { SheetBar } from "@/components/ui/SheetBar";

export function Folha06AntesDepois() {
  const [split, setSplit] = useState(50);
  const [mobileTab, setMobileTab] = useState<"antes" | "depois">("depois");
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // No computador, ensina o gesto de arrastar: a linha desliza sozinha
  // 50 -> 20 -> 80 -> 50% uma vez, ao entrar na seção; depois solta o
  // controle (o estado React "split" nunca saiu de 50, então o repouso
  // bate exatamente com o left:50% do JSX).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          if (!isDesktop || reduceMotion) return;

          const track = trackRef.current;
          const targets = [lineRef.current, handleRef.current];
          if (!track) return;

          const st = ScrollTrigger.create({
            trigger: track,
            start: "top 70%",
            refreshPriority: -1,
            once: true,
            onEnter: () => {
              const width = track.getBoundingClientRect().width;
              const tl = gsap.timeline();
              tl.to(targets, { x: -0.3 * width, duration: 0.6, ease: "power2.inOut" })
                .to(targets, { x: 0.3 * width, duration: 0.6, ease: "power2.inOut" })
                .to(targets, { x: 0, duration: 0.6, ease: "power2.inOut" })
                .set(targets, { clearProps: "x" });
            },
          });

          return () => st.kill();
        }
      );

      return () => mm.revert();
    },
    { scope: trackRef }
  );

  function selectTab(tab: "antes" | "depois") {
    if (tab === mobileTab) {
      setMobileTab(tab);
      return;
    }

    const el = mobileContentRef.current;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!el || reduceMotion) {
      setMobileTab(tab);
      return;
    }

    const tl = gsap.timeline();
    tl.to(el, { opacity: 0, duration: 0.125, ease: "power1.in" })
      .call(() => setMobileTab(tab))
      .to(el, { opacity: 1, duration: 0.125, ease: "power1.out" });
  }

  function updateFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(100, Math.max(0, pct)));
  }

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  }
  function onPointerUp() {
    dragging.current = false;
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") setSplit((s) => Math.max(0, s - 2));
    if (e.key === "ArrowRight") setSplit((s) => Math.min(100, s + 2));
  }

  return (
    <section id="antes-depois" className="bg-grid-night text-on-ink">
      <SheetBar numero="06" titulo="ANTES × DEPOIS" nota="REV. 0 → REV. 1" dark />

      <div className="wrap flex flex-col gap-10 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="text-h2 font-bold text-on-ink">O mesmo quadro, em duas revisões.</h2>
          <p className="hidden max-w-[380px] text-[16px] leading-relaxed text-on-ink-2 md:block">
            [Cliente / bairro / tipo de imóvel]. Arraste a linha para comparar.
          </p>
        </div>

        {/* Computador: comparador com linha arrastável */}
        <div
          ref={trackRef}
          className="relative hidden h-[560px] grid-cols-2 border-[1.5px] border-on-ink select-none md:grid"
        >
          <div className="relative flex items-center justify-center overflow-hidden bg-[#3A3A3A] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.05)_0_2px,transparent_2px_14px)]">
            <span className="font-mono text-[13px] text-[#D0D0D0]">[FOTO REAL · ANTES]</span>
            <span className="absolute top-4 left-4 bg-on-ink px-2 py-1 font-mono text-[12px] font-semibold text-ink">
              REV. 0 · ANTES
            </span>
            <Pin n={1} label="Emendas expostas" className="absolute top-[30%] left-[22%]" />
            <Pin n={2} label="Sem DR, sem identificação" className="absolute top-[62%] left-[34%]" />
          </div>
          <div className="relative flex items-center justify-center bg-placeholder bg-[repeating-linear-gradient(135deg,rgba(15,30,51,.07)_0_2px,transparent_2px_14px)]">
            <span className="font-mono text-[13px] text-text-3">[FOTO REAL · DEPOIS]</span>
            <span className="absolute top-4 right-4 bg-amber px-2 py-1 font-mono text-[12px] font-semibold text-ink">
              REV. 1 · DEPOIS
            </span>
            <Pin
              n={1}
              variant="after"
              label="Barramento e DPS"
              className="absolute top-[30%] right-[18%] flex-row-reverse"
            />
            <Pin
              n={2}
              variant="after"
              label="DR + circuitos identificados"
              className="absolute top-[62%] right-[24%] flex-row-reverse"
            />
          </div>

          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[3px] -translate-x-1/2 bg-amber"
            style={{ left: `${split}%` }}
          />
          <button
            ref={handleRef}
            aria-label="Arrastar para comparar antes e depois"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onKeyDown={onKeyDown}
            style={{ left: `${split}%` }}
            className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-ink bg-amber text-lg font-bold text-ink"
          >
            ↔
          </button>
        </div>

        {/* Celular: abas Antes / Depois */}
        <div className="flex flex-col gap-5 md:hidden">
          <p className="text-[16px] leading-relaxed text-on-ink-2">
            [Cliente / bairro / tipo de imóvel]. Toque para comparar.
          </p>
          <div
            role="tablist"
            aria-label="Comparar"
            data-stamp-avoid
            className="grid grid-cols-2 border-[1.5px] border-on-ink"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === "antes"}
              onClick={() => selectTab("antes")}
              className={`min-h-12 border-0 font-sans text-[15px] ${
                mobileTab === "antes" ? "bg-amber font-bold text-ink" : "bg-transparent font-semibold text-on-ink"
              }`}
            >
              Rev. 0 · Antes
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === "depois"}
              onClick={() => selectTab("depois")}
              className={`min-h-12 border-0 font-sans text-[15px] ${
                mobileTab === "depois" ? "bg-amber font-bold text-ink" : "bg-transparent font-semibold text-on-ink"
              }`}
            >
              Rev. 1 · Depois
            </button>
          </div>

          <div
            ref={mobileContentRef}
            className="relative flex h-[380px] items-center justify-center border-[1.5px] border-on-ink bg-placeholder bg-[repeating-linear-gradient(135deg,rgba(15,30,51,.07)_0_2px,transparent_2px_12px)]"
          >
            {mobileTab === "depois" ? (
              <>
                <span className="font-mono text-[12px] text-text-3">[FOTO REAL · DEPOIS]</span>
                <Pin
                  n={1}
                  variant="after"
                  label="Barramento e DPS"
                  className="absolute top-[20%] left-3.5"
                />
                <Pin
                  n={2}
                  variant="after"
                  label="DR + identificação"
                  className="absolute bottom-[18%] right-3.5 flex-row-reverse"
                />
              </>
            ) : (
              <>
                <span className="font-mono text-[12px] text-[#D0D0D0]">[FOTO REAL · ANTES]</span>
                <Pin n={1} label="Emendas expostas" className="absolute top-[20%] left-3.5" />
                <Pin n={2} label="Sem DR, sem identificação" className="absolute bottom-[18%] left-3.5" />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
