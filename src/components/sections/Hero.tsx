"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { FOLHAS } from "@/components/hero/pranchas";
import { ehMarcador, site } from "@/lib/site";
import "./Hero.css";

const N = FOLHAS.length;
const SEQUENCIA_ESTEIRA = [1, 2, 3, 4, 0, 3, 4, 0, 1, 2];

function reduzMovimento() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pos(k: number) {
  return { x: k * 5, y: k * 6, z: (N - k) * 1.8, rotation: k === 0 ? 0 : k % 2 ? -0.9 : 0.7 };
}

export function Hero() {
  const [atual, setAtual] = useState(0);
  const [legendaTrocando, setLegendaTrocando] = useState(false);
  const [animandoAbertura, setAnimandoAbertura] = useState(false);
  const [mostrarEsteira, setMostrarEsteira] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const pilhaRef = useRef<HTMLDivElement>(null);
  const folhaDivRefs = useRef<(HTMLDivElement | null)[]>([]);
  const brilhoRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const varreduraRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ordemRef = useRef<HTMLDivElement[]>([]);
  const indiceOriginalRef = useRef(new Map<HTMLDivElement, number>());

  const virandoRef = useRef(false);
  const virarRef = useRef(() => {});
  const timerRef = useRef<number | undefined>(undefined);
  const pausadoRef = useRef(false);
  const heroVisivelRef = useRef(true);
  const x0Ref = useRef<number | null>(null);
  const y0Ref = useRef<number | null>(null);
  const rxRef = useRef(0);
  const rzRef = useRef(0);
  const alvoRxRef = useRef(0);
  const alvoRzRef = useRef(0);
  const rodandoTiltRef = useRef(false);

  useGSAP(
    () => {
      setMostrarEsteira(window.innerWidth >= 960);

      const folhas = folhaDivRefs.current.filter((el): el is HTMLDivElement => el !== null);
      folhas.forEach((el, i) => indiceOriginalRef.current.set(el, i));
      ordemRef.current = folhas.slice();

      ordemRef.current.forEach((el, k) => {
        const p = pos(k);
        gsap.set(el, { x: p.x, y: p.y, z: p.z, rotation: p.rotation, rotationY: 0, transformOrigin: "0% 50%" });
      });

      function mostrarLegenda(indice: number) {
        setLegendaTrocando(true);
        window.setTimeout(
          () => {
            setAtual(indice);
            setLegendaTrocando(false);
          },
          reduzMovimento() ? 0 : 260
        );
      }

      function virar() {
        if (virandoRef.current) return;
        virandoRef.current = true;
        const ordem = ordemRef.current;
        const topo = ordem[0];
        const prox = ordem[1];
        const dur = reduzMovimento() ? 0.01 : 1.15;
        const faces = Array.from(topo.children) as HTMLElement[];
        const indiceProx = indiceOriginalRef.current.get(prox) ?? 0;
        const brilhoTopo = brilhoRefs.current[indiceOriginalRef.current.get(topo) ?? 0];
        const varreduraProx = varreduraRefs.current[indiceProx];

        const tl = gsap.timeline({
          onComplete: () => {
            virandoRef.current = false;
          },
        });
        tl.to(topo, { rotationY: -178, z: "+=6", duration: dur, ease: "power2.inOut" }, 0);
        if (brilhoTopo) {
          tl.to(brilhoTopo, { opacity: 0.55, duration: dur * 0.5, ease: "sine.in" }, 0).to(
            brilhoTopo,
            { opacity: 0, duration: dur * 0.3 },
            dur * 0.5
          );
        }
        if (varreduraProx) {
          tl.fromTo(
            varreduraProx,
            { opacity: 0, xPercent: -10 },
            { opacity: 0.6, xPercent: 25, duration: dur * 0.55, ease: "sine.out" },
            dur * 0.12
          ).to(varreduraProx, { opacity: 0, xPercent: 70, duration: dur * 0.45 }, dur * 0.67);
        }
        tl.to(faces, { opacity: 0, duration: dur * 0.34, ease: "power1.in" }, dur * 0.6);
        tl.call(() => mostrarLegenda(indiceProx), undefined, dur * 0.45);
        ordem.slice(1).forEach((el, k) => {
          const p = pos(k);
          tl.to(
            el,
            { x: p.x, y: p.y, z: p.z, rotation: p.rotation, duration: reduzMovimento() ? 0.01 : 0.6, ease: "power2.out" },
            dur * 0.72
          );
        });
        tl.call(
          () => {
            ordem.push(ordem.shift() as HTMLDivElement);
            const p = pos(N - 1);
            gsap.set(topo, { x: p.x, y: p.y, z: p.z, rotation: p.rotation, rotationY: 0 });
            gsap.to(faces, { opacity: 1, duration: reduzMovimento() ? 0.01 : 0.5, delay: 0.05 });
          },
          undefined,
          dur + 0.04
        );
      }
      virarRef.current = virar;

      function agendar(ms: number) {
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(tique, ms);
      }
      function tique() {
        if (!pausadoRef.current && heroVisivelRef.current && !document.hidden && !reduzMovimento()) virarRef.current();
        agendar(3900);
      }
      agendar(reduzMovimento() ? 999999 : 3600);

      const secaoEl = sectionRef.current;
      let observador: IntersectionObserver | undefined;
      if (secaoEl) {
        observador = new IntersectionObserver((entradas) => {
          heroVisivelRef.current = entradas[0]?.isIntersecting ?? true;
        });
        observador.observe(secaoEl);
      }

      // Abertura: traça a planta e sobe o texto (uma vez, ao montar).
      if (!reduzMovimento()) {
        setAnimandoAbertura(true);
        window.setTimeout(() => setAnimandoAbertura(false), 3400);
      }

      function baseRx() {
        return window.innerWidth < 960 ? 50 : 52;
      }
      function baseRz() {
        return window.innerWidth < 960 ? -26 : -30;
      }
      pilhaRef.current?.style.setProperty("--rx", `${baseRx()}deg`);
      pilhaRef.current?.style.setProperty("--rz", `${baseRz()}deg`);

      function aoRedimensionar() {
        pilhaRef.current?.style.setProperty("--rx", `${baseRx() + rxRef.current}deg`);
        pilhaRef.current?.style.setProperty("--rz", `${baseRz() + rzRef.current}deg`);
      }
      window.addEventListener("resize", aoRedimensionar);

      function laco() {
        rxRef.current += (alvoRxRef.current - rxRef.current) * 0.06;
        rzRef.current += (alvoRzRef.current - rzRef.current) * 0.06;
        pilhaRef.current?.style.setProperty("--rx", `${(baseRx() + rxRef.current).toFixed(2)}deg`);
        pilhaRef.current?.style.setProperty("--rz", `${(baseRz() + rzRef.current).toFixed(2)}deg`);
        if (Math.abs(alvoRxRef.current - rxRef.current) > 0.01 || Math.abs(alvoRzRef.current - rzRef.current) > 0.01) {
          requestAnimationFrame(laco);
        } else {
          rodandoTiltRef.current = false;
        }
      }

      function aoMoverMouse(e: PointerEvent) {
        if (e.pointerType !== "mouse" || reduzMovimento()) return;
        alvoRxRef.current = -(e.clientY / window.innerHeight - 0.5) * 6;
        alvoRzRef.current = (e.clientX / window.innerWidth - 0.5) * 7;
        if (!rodandoTiltRef.current) {
          rodandoTiltRef.current = true;
          requestAnimationFrame(laco);
        }
      }
      secaoEl?.addEventListener("pointermove", aoMoverMouse);

      return () => {
        window.clearTimeout(timerRef.current);
        observador?.disconnect();
        window.removeEventListener("resize", aoRedimensionar);
        secaoEl?.removeEventListener("pointermove", aoMoverMouse);
      };
    },
    { scope: sectionRef }
  );

  function onWrapPointerEnter(e: ReactPointerEvent) {
    if (e.pointerType === "mouse") pausadoRef.current = true;
  }
  function onWrapPointerLeave(e: ReactPointerEvent) {
    if (e.pointerType === "mouse") pausadoRef.current = false;
  }
  function onWrapPointerDown(e: ReactPointerEvent) {
    x0Ref.current = e.clientX;
    y0Ref.current = e.clientY;
  }
  function onWrapPointerUp(e: ReactPointerEvent) {
    if (x0Ref.current === null) return;
    const dx = e.clientX - x0Ref.current;
    const dy = e.clientY - (y0Ref.current ?? 0);
    x0Ref.current = null;
    const foiSwipe = Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy);
    const foiClique = e.pointerType === "mouse" && Math.abs(dx) < 6 && Math.abs(dy) < 6;
    if (foiSwipe || foiClique) {
      virarRef.current();
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => virarRef.current(), 5200);
    }
  }

  const terceiroSelo = ehMarcador(site.prazoResposta)
    ? "Contato direto com o engenheiro"
    : `Resposta em até ${site.prazoResposta}`;

  return (
    <section
      id="inicio"
      data-secao="inicio"
      aria-labelledby="hero-titulo"
      ref={sectionRef}
      className="hero-section"
    >
      <div className="hero-mesa">
        {mostrarEsteira && (
          <div className="hero-fundo-folhas" aria-hidden="true">
            <div className="hero-mesa-fundo">
              <div className="hero-esteira">
                {SEQUENCIA_ESTEIRA.slice(0, 5)
                  .concat(SEQUENCIA_ESTEIRA.slice(0, 5))
                  .concat(SEQUENCIA_ESTEIRA.slice(5, 10))
                  .concat(SEQUENCIA_ESTEIRA.slice(5, 10))
                  .map((indiceFolha, i) => (
                    <div key={i} className="hero-f-fundo">
                      <svg
                        className="hero-prancha"
                        viewBox="0 0 1414 1000"
                        aria-hidden="true"
                        focusable="false"
                        dangerouslySetInnerHTML={{ __html: FOLHAS[indiceFolha].fn() }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        <p className="hero-dica-swipe" aria-hidden="true">
          Deslize para folhear
        </p>

        <div
          className="hero-pilha-wrap"
          role="img"
          aria-label="Pranchas de um projeto elétrico: planta, diagrama unifilar, quadro de cargas, detalhe do quadro e memorial de cálculo"
          onPointerEnter={onWrapPointerEnter}
          onPointerLeave={onWrapPointerLeave}
          onPointerDown={onWrapPointerDown}
          onPointerUp={onWrapPointerUp}
        >
          <div ref={pilhaRef} className="hero-pilha">
            <div className="hero-sombra-pilha" />
            {FOLHAS.map((f, i) => (
              <div
                key={f.nome}
                ref={(el) => {
                  folhaDivRefs.current[i] = el;
                }}
                className={`hero-folha ${i === 0 ? "hero-folha-principal" : ""} ${
                  i === 0 && animandoAbertura ? "hero-animando" : ""
                }`}
              >
                <div className="hero-face hero-frente">
                  <svg
                    viewBox="0 0 1414 1000"
                    aria-hidden="true"
                    focusable="false"
                    dangerouslySetInnerHTML={{ __html: f.fn() }}
                  />
                  <span
                    ref={(el) => {
                      brilhoRefs.current[i] = el;
                    }}
                    className="hero-brilho"
                  />
                  <span
                    ref={(el) => {
                      varreduraRefs.current[i] = el;
                    }}
                    className="hero-varredura"
                  />
                </div>
                <div className="hero-face hero-verso" />
              </div>
            ))}
          </div>
        </div>

        <p className={`hero-legenda ${legendaTrocando ? "hero-legenda-troca" : ""}`} aria-hidden="true">
          <span className="hero-legenda-num">{`0${atual + 1}/0${N}`}</span>
          <span>
            <strong>{FOLHAS[atual].nome}</strong>
            <span className="block text-texto-3">{FOLHAS[atual].det}</span>
          </span>
        </p>
      </div>

      <div className="hero-veu" aria-hidden="true" />

      <div className="wrap relative z-[1] flex min-h-[600px] items-center">
        <div className={`hero-texto ${animandoAbertura ? "hero-animando" : ""}`}>
          <p className="hero-selo-topo">
            <span className="hero-selo-topo-icone">
              <Icone nome="raio" className="h-[15px] w-[15px]" />
            </span>
            Engenharia elétrica · CREA ativo
          </p>
          <h1 id="hero-titulo" className="font-title text-h1 font-extrabold text-noite">
            Projetos e instalações elétricas com a <span className="hero-destaque">segurança</span> de um
            engenheiro.
          </h1>
          <p className="hero-sub">
            Projetos, instalações, laudos e manutenção para residências, comércios e empresas. Cálculo técnico, ART
            registrada e conformidade com a NBR 5410 em cada serviço.
          </p>
          <div className="hero-acoes">
            <Button href="#orcamento" variant="ambar">
              <Icone nome="whats" />
              Solicitar orçamento
            </Button>
            <Button href="#servicos" variant="claro" arrow>
              Conhecer serviços
            </Button>
          </div>
          <ul className="hero-selos" aria-label="Garantias">
            <li className="hero-selo">
              <span className="hero-selo-icone">
                <Icone nome="doc" className="h-[18px] w-[18px]" />
              </span>
              ART em todo serviço
            </li>
            <li className="hero-selo">
              <span className="hero-selo-icone">
                <Icone nome="escudo" className="h-[18px] w-[18px]" />
              </span>
              Conforme NBR 5410
            </li>
            <li className="hero-selo">
              <span className="hero-selo-icone">
                <Icone nome="relogio" className="h-[18px] w-[18px]" />
              </span>
              {terceiroSelo}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
