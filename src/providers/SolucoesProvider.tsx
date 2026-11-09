"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { Icone } from "@/components/ui/Icone";
import { solucoes } from "@/content/solucoes";
import { waLink } from "@/lib/contato";
import "@/components/solucoes/Solucoes.css";

type SolucoesContextValue = {
  abrirSolucao: (indice: number, elementoOrigem?: HTMLElement | null) => void;
};

const SolucoesContext = createContext<SolucoesContextValue | null>(null);

export function useSolucoes(): SolucoesContextValue {
  const ctx = useContext(SolucoesContext);
  if (!ctx) throw new Error("useSolucoes precisa estar dentro de <SolucoesProvider>");
  return ctx;
}

function reduzMovimento() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type RetanguloEstilo = {
  left: string;
  top: string;
  width: string;
  height: string;
  borderRadius: string;
};

function retanguloEstilo(r: DOMRect, raio: string): RetanguloEstilo {
  return { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, borderRadius: raio };
}

function midiaOrigemDe(el: HTMLElement): HTMLElement {
  return el.querySelector<HTMLElement>("[data-midia]") ?? el;
}

export function SolucoesProvider({ children }: { children: ReactNode }) {
  const [aberto, setAberto] = useState<number | null>(null);
  const [pronto, setPronto] = useState(false);
  const [fechando, setFechando] = useState(false);

  const animandoRef = useRef(false);
  const origemRef = useRef<HTMLElement | null>(null);
  const pendingAbrirRef = useRef(false);
  const pendingFecharRef = useRef(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const fotoAlvoRef = useRef<HTMLDivElement>(null);
  const fecharBotaoRef = useRef<HTMLButtonElement>(null);

  const abrirComOrigem = useCallback((indice: number, elementoOrigem: HTMLElement) => {
    if (animandoRef.current) return;
    animandoRef.current = true;
    origemRef.current = elementoOrigem;
    pendingAbrirRef.current = true;
    setFechando(false);
    setPronto(false);
    setAberto(indice);
  }, []);

  const abrirSolucao = useCallback(
    (indice: number, elementoOrigem?: HTMLElement | null) => {
      if (elementoOrigem) {
        abrirComOrigem(indice, elementoOrigem);
        return;
      }
      const card = document.querySelector<HTMLElement>(`[data-sol-card="${indice}"]`);
      if (!card) return;
      const reduz = reduzMovimento();
      card.scrollIntoView({ block: "center", behavior: reduz ? "auto" : "smooth" });
      window.setTimeout(() => abrirComOrigem(indice, card), reduz ? 0 : 650);
    },
    [abrirComOrigem]
  );

  const fecharSolucao = useCallback(() => {
    if (animandoRef.current || aberto === null) return;
    animandoRef.current = true;
    pendingFecharRef.current = true;
    setFechando(true);
    setPronto(false);
  }, [aberto]);

  // Abre: a foto do card de origem voa até o diálogo (técnica FLIP).
  useLayoutEffect(() => {
    if (aberto === null || !pendingAbrirRef.current) return;
    pendingAbrirRef.current = false;

    const dlg = dialogRef.current;
    const painel = painelRef.current;
    const fotoAlvo = fotoAlvoRef.current;
    const elementoOrigem = origemRef.current;
    if (!dlg || !painel || !fotoAlvo || !elementoOrigem) {
      animandoRef.current = false;
      return;
    }

    if (!dlg.open) {
      dlg.showModal();
      document.documentElement.classList.add("trava");
    }

    const sol = solucoes[aberto];
    const midiaOrigem = midiaOrigemDe(elementoOrigem);
    const r0 = midiaOrigem.getBoundingClientRect();
    const r1 = fotoAlvo.getBoundingClientRect();
    const raioAlvo = getComputedStyle(fotoAlvo).borderRadius;
    const reduz = reduzMovimento();
    const dur = reduz ? 0 : 620;

    const voo = document.createElement("div");
    voo.className = "sol-voo";
    voo.innerHTML = `<img src="${sol.foto}" alt="" style="object-position:${sol.posicaoFoto}">`;
    Object.assign(voo.style, retanguloEstilo(r0, "20px"));
    dlg.appendChild(voo);
    fotoAlvo.style.visibility = "hidden";
    elementoOrigem.classList.add("sol-voando");

    painel.animate(
      [
        { opacity: 0, transform: "translateY(18px) scale(.985)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: reduz ? 0 : 420, delay: reduz ? 0 : 140, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }
    );

    function finalizar() {
      fotoAlvo!.style.visibility = "";
      voo.remove();
      setPronto(true);
      animandoRef.current = false;
      window.setTimeout(() => fecharBotaoRef.current?.focus({ preventScroll: true }), 0);
    }

    if (dur === 0) {
      finalizar();
    } else {
      const anim = voo.animate([retanguloEstilo(r0, "20px"), retanguloEstilo(r1, raioAlvo)], {
        duration: dur,
        easing: "cubic-bezier(.65,0,.2,1)",
        fill: "forwards",
      });
      anim.onfinish = finalizar;
    }
  }, [aberto]);

  // Fecha: a foto volta do diálogo até o card de origem (ou só desaparece, se ele não estiver visível).
  useLayoutEffect(() => {
    if (!fechando || !pendingFecharRef.current) return;
    pendingFecharRef.current = false;

    const dlg = dialogRef.current;
    const painel = painelRef.current;
    const fotoAlvo = fotoAlvoRef.current;
    const elementoOrigem = origemRef.current;
    const indiceAtual = aberto;
    if (!dlg || !painel || !fotoAlvo || indiceAtual === null) {
      animandoRef.current = false;
      return;
    }

    const reduz = reduzMovimento();
    const raioAlvo = getComputedStyle(fotoAlvo).borderRadius;
    const r1 = fotoAlvo.getBoundingClientRect();

    let r0: DOMRect | null = null;
    if (elementoOrigem) {
      const midiaOrigem = midiaOrigemDe(elementoOrigem);
      const rr = midiaOrigem.getBoundingClientRect();
      if (rr.bottom > 0 && rr.top < window.innerHeight) r0 = rr;
    }
    const dur = reduz || !r0 ? 0 : 520;

    let voo: HTMLDivElement | null = null;
    if (dur) {
      const sol = solucoes[indiceAtual];
      voo = document.createElement("div");
      voo.className = "sol-voo";
      voo.innerHTML = `<img src="${sol.foto}" alt="" style="object-position:${sol.posicaoFoto}">`;
      Object.assign(voo.style, retanguloEstilo(r1, raioAlvo));
      dlg.appendChild(voo);
      fotoAlvo.style.visibility = "hidden";
    }

    painel.animate([{ opacity: 1 }, { opacity: 0 }], { duration: reduz ? 0 : 260, easing: "ease-out", fill: "both" });

    function terminar() {
      voo?.remove();
      fotoAlvo!.style.visibility = "";
      dlg!.close();
      document.documentElement.classList.remove("trava");
      elementoOrigem?.classList.remove("sol-voando");
      elementoOrigem?.focus({ preventScroll: true });
      setFechando(false);
      setAberto(null);
      animandoRef.current = false;
    }

    if (!dur || !voo) {
      terminar();
      return;
    }
    const anim = voo.animate([retanguloEstilo(r1, raioAlvo), retanguloEstilo(r0!, "20px")], {
      duration: dur,
      easing: "cubic-bezier(.65,0,.2,1)",
      fill: "forwards",
    });
    anim.onfinish = terminar;
  }, [fechando, aberto]);

  const sol = aberto !== null ? solucoes[aberto] : null;

  return (
    <SolucoesContext.Provider value={{ abrirSolucao }}>
      {children}

      <dialog
        ref={dialogRef}
        className={`sol-dlg ${fechando ? "sol-dlg-fechando" : ""} ${pronto ? "sol-dlg-pronto" : ""}`}
        aria-labelledby="sol-titulo"
        onCancel={(e) => {
          e.preventDefault();
          fecharSolucao();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) fecharSolucao();
        }}
      >
        <div ref={painelRef} className="sol-painel">
          <div className="sol-foto">
            <div ref={fotoAlvoRef} className="sol-midia">
              {sol && (
                <Image
                  src={sol.foto}
                  alt=""
                  fill
                  sizes="(max-width: 959px) 100vw, 44vw"
                  style={{ objectPosition: sol.posicaoFoto }}
                />
              )}
            </div>
            <span className="selo-ilustra">Imagem ilustrativa</span>
          </div>

          {sol && (
            <div className="sol-conteudo">
              <Etiqueta style={{ "--i": 0 } as CSSProperties}>{sol.etiqueta}</Etiqueta>
              <h2 id="sol-titulo" style={{ "--i": 1 } as CSSProperties} className="font-title font-extrabold text-noite">
                {sol.titulo}
              </h2>
              <div className="sol-pares" style={{ "--i": 2 } as CSSProperties}>
                <div className="sol-par sol-problema">
                  <h3>
                    <Icone nome="alerta" className="h-[18px] w-[18px]" />O problema
                  </h3>
                  <p>{sol.problema}</p>
                </div>
                <div className="sol-par sol-solucao">
                  <h3>
                    <Icone nome="check" className="h-[18px] w-[18px]" />A solução
                  </h3>
                  <p>{sol.solucao}</p>
                </div>
              </div>
              <h3 className="sol-sub font-title" style={{ "--i": 3 } as CSSProperties}>
                Como executamos
              </h3>
              <ol className="sol-passos" style={{ "--i": 4 } as CSSProperties}>
                {sol.passos.map((passo) => (
                  <li key={passo}>{passo}</li>
                ))}
              </ol>
              <h3 className="sol-sub font-title" style={{ "--i": 5 } as CSSProperties}>
                Você recebe
              </h3>
              <ul className="flex flex-wrap gap-1.5" style={{ "--i": 6 } as CSSProperties}>
                {sol.recebe.map((item) => (
                  <Chip key={item}>
                    <Icone nome="check" className="h-3.5 w-3.5" />
                    {item}
                  </Chip>
                ))}
              </ul>
              <div className="sol-acoes" style={{ "--i": 7 } as CSSProperties}>
                <Button
                  href={waLink(`Olá! Vim pelo site e gostaria de um orçamento de ${sol.titulo.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ambar"
                >
                  <Icone nome="whats" />
                  Solicitar orçamento
                </Button>
                <Button type="button" variant="claro" onClick={fecharSolucao}>
                  Ver outras soluções
                </Button>
              </div>
            </div>
          )}

          <button
            ref={fecharBotaoRef}
            type="button"
            className="sol-fechar"
            aria-label="Fechar"
            onClick={fecharSolucao}
          >
            <Icone nome="fechar" />
          </button>
        </div>
      </dialog>
    </SolucoesContext.Provider>
  );
}
