"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SheetBar } from "@/components/ui/SheetBar";

const SPECS = [
  {
    term: "ART",
    lead: "Anotação de Responsabilidade Técnica.",
    rest: "Registro no CREA de quem responde pelo serviço. Se algo der errado, há um responsável com nome.",
    mobile: "Registro no CREA de quem responde pelo serviço.",
  },
  {
    term: "NBR 5410",
    lead: "A norma de instalações de baixa tensão.",
    rest: "Define bitola, proteção, aterramento e DR. É o padrão que seguradoras e vistorias cobram.",
    mobile: "A norma de baixa tensão que seguradoras e vistorias cobram.",
  },
  {
    term: "CREA",
    lead: "Registro profissional verificável.",
    rest: "Você pode consultar o número 000000000-0 no site do conselho antes de contratar.",
    mobile: "Registro verificável: 000000000-0.",
  },
  {
    term: "CÁLCULO",
    lead: 'Nada "no olho".',
    rest: "Seção dos cabos, queda de tensão e corrente de curto calculadas para a sua carga real.",
    mobile: "Cabos, queda de tensão e curto calculados para a sua carga.",
  },
];

// ---------------------------------------------------------------------------
// Planta isométrica (ilustrativa) — casa térrea: sala, cozinha, 2 quartos e
// banheiro. Projeção isométrica clássica (30°) feita em coordenadas de
// planta (u, v, altura h em metros), convertida para pixels de SVG.
// ---------------------------------------------------------------------------

type Point3 = [number, number, number];

const SCALE = 20; // px por metro
const COS30 = Math.cos(Math.PI / 6) * SCALE;
const SIN30 = Math.sin(Math.PI / 6) * SCALE;
const WALL_H = 2.7; // pé-direito, ilustrativo

function proj(u: number, v: number, h = 0) {
  return { x: (v - u) * COS30, y: (v + u) * SIN30 - h * SCALE };
}

// Paredes: perímetro externo + divisórias internas, em metros (u1,v1,u2,v2).
const WALLS: [number, number, number, number][] = [
  [0, 0, 0, 10],
  [0, 10, 8, 10],
  [8, 10, 8, 0],
  [8, 0, 0, 0],
  [4, 0, 4, 10],
  [0, 6, 4, 6],
  [4, 3.5, 8, 3.5],
  [4, 7, 8, 7],
];

function wallPath([u1, v1, u2, v2]: [number, number, number, number]) {
  const a0 = proj(u1, v1, 0);
  const b0 = proj(u2, v2, 0);
  const b1 = proj(u2, v2, WALL_H);
  const a1 = proj(u1, v1, WALL_H);
  return `M${a0.x},${a0.y} L${b0.x},${b0.y} L${b1.x},${b1.y} L${a1.x},${a1.y} Z`;
}

// Quadro de distribuição, na parede da cozinha (v = 10).
const PANEL_V = 10;
const PANEL_U: [number, number] = [1.6, 2.4];
const PANEL_H: [number, number] = [1, 1.7];
const PANEL_POS: Point3 = [2, PANEL_V, 1.35];

function panelPath() {
  const [u1, u2] = PANEL_U;
  const [h1, h2] = PANEL_H;
  const p1 = proj(u1, PANEL_V, h1);
  const p2 = proj(u2, PANEL_V, h1);
  const p3 = proj(u2, PANEL_V, h2);
  const p4 = proj(u1, PANEL_V, h2);
  return `M${p1.x},${p1.y} L${p2.x},${p2.y} L${p3.x},${p3.y} L${p4.x},${p4.y} Z`;
}

// Circuitos ilustrativos, coerentes com a NBR 5410 (bitola/corrente por uso).
const CIRCUITS: { code: string; spec: string; via: Point3; to: Point3 }[] = [
  { code: "C1", spec: "C1 · 1,5 mm² · 10 A · iluminação", via: [2.5, 3, 1.35], to: [2.5, 3, 2.6] },
  { code: "C2", spec: "C2 · 2,5 mm² · 20 A · tomadas", via: [6, 1, 1.35], to: [6, 1, 0.3] },
  {
    code: "C3",
    spec: "C3 · 2,5 mm² · 20 A · tomadas da cozinha",
    via: [1.5, 8, 1.35],
    to: [1.5, 8, 0.3],
  },
  { code: "C4", spec: "C4 · 6,0 mm² · 32 A · chuveiro", via: [6, 8.5, 1.35], to: [6, 8.5, 1.9] },
];

function circuitPath(c: (typeof CIRCUITS)[number]) {
  const p0 = proj(...PANEL_POS);
  const p1 = proj(...c.via);
  const p2 = proj(...c.to);
  return `M${p0.x},${p0.y} L${p1.x},${p1.y} L${p2.x},${p2.y}`;
}

const ROOMS: { label: string; at: Point3 }[] = [
  { label: "SALA", at: [2, 3, 0] },
  { label: "COZINHA", at: [2, 8, 0] },
  { label: "QUARTO 1", at: [6, 1.75, 0] },
  { label: "QUARTO 2", at: [6, 5.25, 0] },
  { label: "BANHEIRO", at: [6, 8.5, 0] },
];

const ALL_POINTS = [
  ...WALLS.flatMap(([u1, v1, u2, v2]) => [
    proj(u1, v1, 0),
    proj(u2, v2, 0),
    proj(u1, v1, WALL_H),
    proj(u2, v2, WALL_H),
  ]),
  proj(PANEL_U[0], PANEL_V, PANEL_H[0]),
  proj(PANEL_U[1], PANEL_V, PANEL_H[0]),
  proj(PANEL_U[0], PANEL_V, PANEL_H[1]),
  proj(PANEL_U[1], PANEL_V, PANEL_H[1]),
  ...CIRCUITS.flatMap((c) => [proj(...PANEL_POS), proj(...c.via), proj(...c.to)]),
];

const PAD = 34;
const MIN_X = Math.min(...ALL_POINTS.map((p) => p.x)) - PAD;
const MAX_X = Math.max(...ALL_POINTS.map((p) => p.x)) + PAD;
const MIN_Y = Math.min(...ALL_POINTS.map((p) => p.y)) - PAD;
const MAX_Y = Math.max(...ALL_POINTS.map((p) => p.y)) + PAD;
const VB_W = MAX_X - MIN_X;
const VB_H = MAX_Y - MIN_Y;
const VIEWBOX = `${MIN_X} ${MIN_Y} ${VB_W} ${VB_H}`;

function pct(point: Point3) {
  const p = proj(...point);
  return { left: ((p.x - MIN_X) / VB_W) * 100, top: ((p.y - MIN_Y) / VB_H) * 100 };
}

export function Folha05Engenheiro() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

          if (reduceMotion) return;

          const root = containerRef.current;
          const section = sectionRef.current;
          if (!root || !section) return;

          const walls = gsap.utils.toArray<SVGPathElement>(".iso-wall", root);
          const panel = root.querySelector<SVGPathElement>(".iso-panel");
          const lines = gsap.utils.toArray<SVGPathElement>(".iso-circuit-line", root);
          const rings = gsap.utils.toArray<SVGCircleElement>(".iso-circuit-ring", root);
          const codes = gsap.utils.toArray<HTMLElement>(".iso-circuit-code", root);
          const legend = gsap.utils.toArray<HTMLElement>(".iso-circuit-legend", root);

          gsap.set(walls, { strokeDashoffset: 1 });
          gsap.set(panel, { opacity: 0 });
          gsap.set(lines, { strokeDashoffset: 1 });
          gsap.set(rings, { opacity: 0, scale: 0.4, transformOrigin: "center" });
          gsap.set(codes, { opacity: 0 });
          gsap.set(legend, { opacity: 0.3 });

          const tl = gsap.timeline({ paused: true });
          tl.to(walls, { strokeDashoffset: 0, duration: 1, stagger: 0.05, ease: "drawEase" }, 0);
          tl.to(panel, { opacity: 1, duration: 0.4, ease: "power1.out" }, 1.1);

          lines.forEach((line, i) => {
            const start = 1.6 + i * 0.9;
            tl.to(line, { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" }, start);
            tl.to(codes[i], { opacity: 1, duration: 0.2 }, start + 0.1);
            tl.to(legend[i], { opacity: 1, duration: 0.2 }, start + 0.1);
            tl.fromTo(
              rings[i],
              { opacity: 1, scale: 0.4 },
              { opacity: 0, scale: 2, duration: 0.45, ease: "power1.out" },
              start + 0.35
            );
          });

          if (isDesktop) {
            const st = ScrollTrigger.create({
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              refreshPriority: -1,
              scrub: true,
              animation: tl,
            });

            return () => {
              st.kill();
              tl.kill();
            };
          }

          const st = ScrollTrigger.create({
            trigger: section,
            start: "top 75%",
            refreshPriority: -1,
            once: true,
            onEnter: () => tl.play(),
          });

          return () => {
            st.kill();
            tl.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="engenheiro" ref={sectionRef}>
      <SheetBar numero="05" titulo="ESPECIFICAÇÕES" nota="VISTA ISOMÉTRICA" />

      <div className="wrap flex flex-col gap-14 py-14 md:gap-18 md:py-30">
        <h2 className="max-w-[1050px] text-display font-bold text-ink">
          Eletricista instala.{" "}
          <span className="bg-[linear-gradient(transparent_62%,var(--color-amber)_62%)]">
            Engenheiro calcula, instala e responde.
          </span>
        </h2>

        <div className="grid items-start gap-16 md:grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))]">
          <div className="flex flex-col gap-4">
            <div
              ref={containerRef}
              className="relative w-full border-[1.5px] border-ink bg-grid-paper"
              style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
            >
              <svg
                viewBox={VIEWBOX}
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                {WALLS.map((w) => (
                  <path
                    key={w.join("-")}
                    className="iso-wall"
                    d={wallPath(w)}
                    stroke="#0F1E33"
                    strokeWidth={1.4}
                    vectorEffect="non-scaling-stroke"
                    pathLength={1}
                    strokeDasharray={1}
                  />
                ))}

                <path
                  className="iso-panel"
                  d={panelPath()}
                  fill="#F2B417"
                  stroke="#0F1E33"
                  strokeWidth={1.4}
                  vectorEffect="non-scaling-stroke"
                />

                {CIRCUITS.map((c) => (
                  <path
                    key={c.code}
                    className="iso-circuit-line"
                    d={circuitPath(c)}
                    stroke="#F2B417"
                    strokeWidth={1.6}
                    strokeDasharray="4 3"
                    vectorEffect="non-scaling-stroke"
                    pathLength={1}
                  />
                ))}

                {CIRCUITS.map((c) => {
                  const p = proj(...c.to);
                  return (
                    <circle
                      key={c.code}
                      className="iso-circuit-ring"
                      cx={p.x}
                      cy={p.y}
                      r={7}
                      fill="none"
                      stroke="#F2B417"
                      strokeWidth={1.4}
                      vectorEffect="non-scaling-stroke"
                      opacity={0}
                    />
                  );
                })}
              </svg>

              {ROOMS.map((r) => {
                const { left, top } = pct(r.at);
                return (
                  <span
                    key={r.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[.04em] text-text-3 md:text-[10px]"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    {r.label}
                  </span>
                );
              })}

              {CIRCUITS.map((c) => {
                const { left, top } = pct(c.to);
                return (
                  <span
                    key={c.code}
                    className="iso-circuit-code absolute -translate-y-1/2 pl-2 font-mono text-[11px] font-semibold text-amber-text"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    {c.code}
                  </span>
                );
              })}

              <span className="absolute bottom-2 left-2.5 font-mono text-[11px] text-text-3">
                Planta isométrica · ilustrativo
              </span>
            </div>

            <ul className="flex flex-col gap-1.5 font-mono text-[11px] text-text-2">
              {CIRCUITS.map((c) => (
                <li key={c.code} className="iso-circuit-legend flex items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-amber" />
                  {c.spec}
                </li>
              ))}
            </ul>
          </div>

          <ol className="hidden flex-col md:flex">
            {SPECS.map((s) => (
              <li
                key={s.term}
                className="grid grid-cols-[150px_1fr] gap-6 border-t border-ink/30 py-[26px] first:border-t-[1.5px] first:border-ink last:border-b-[1.5px] last:border-ink"
              >
                <span className="font-mono text-[26px] font-semibold">{s.term}</span>
                <p className="text-[16px] leading-[1.6] text-text-2">
                  <strong className="text-ink">{s.lead}</strong> {s.rest}
                </p>
              </li>
            ))}
          </ol>

          <dl className="flex flex-col md:hidden">
            {SPECS.map((s) => (
              <div
                key={s.term}
                className="border-t border-ink/30 py-[18px] first:border-t-[1.5px] first:border-ink last:border-b-[1.5px] last:border-ink"
              >
                <dt className="font-mono text-xl font-semibold">{s.term}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-text-2">{s.mobile}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
