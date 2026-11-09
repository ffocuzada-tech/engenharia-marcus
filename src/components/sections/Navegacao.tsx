"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { Marca } from "@/components/ui/Marca";
import { waLink } from "@/lib/contato";
import "./Navegacao.css";

const SERVICOS = [
  { icone: "casa", titulo: "Instalação elétrica", texto: "Obra nova, reforma e ampliação, executadas a partir de projeto." },
  { icone: "planta", titulo: "Projeto elétrico", texto: "Cálculo, plantas e aprovação na concessionária." },
  { icone: "lupa", titulo: "Inspeção e laudo", texto: "Medições e termografia para compra, venda, seguro e vistoria." },
  { icone: "chave", titulo: "Manutenção", texto: "Planos preventivos e atendimento corretivo com histórico." },
] as const;

const LINKS_NAV = [
  { alvo: "diferenciais", nome: "Diferenciais" },
  { alvo: "solucoes", nome: "Soluções" },
  { alvo: "duvidas", nome: "Dúvidas" },
] as const;

function reduzMovimento() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Navegacao() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const btnServRef = useRef<HTMLButtonElement>(null);
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  const btnFecharMenuRef = useRef<HTMLButtonElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef(new Map<string, HTMLElement>());
  const megaTimerRef = useRef<number | undefined>(undefined);

  function registrarLink(alvo: string) {
    return (el: HTMLElement | null) => {
      if (el) linkRefs.current.set(alvo, el);
      else linkRefs.current.delete(alvo);
    };
  }

  // Esconde a barra ao descer, mostra ao subir; nunca some com mega/menu abertos.
  useEffect(() => {
    let ultimoY = window.scrollY;
    function aoRolar() {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (!megaOpen && !mobileOpen) {
        if (y > ultimoY + 6 && y > 260) setHidden(true);
        else if (y < ultimoY - 6 || y < 260) setHidden(false);
      }
      ultimoY = y;
    }
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener("scroll", aoRolar);
  }, [megaOpen, mobileOpen]);

  function abrirMega() {
    window.clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  }
  function fecharMega() {
    window.clearTimeout(megaTimerRef.current);
    setMegaOpen(false);
  }
  function onMegaPointerEnter(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(megaTimerRef.current);
    megaTimerRef.current = window.setTimeout(abrirMega, 90);
  }
  function onMegaPointerLeave(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(megaTimerRef.current);
    megaTimerRef.current = window.setTimeout(fecharMega, 220);
  }

  function abrirMenu() {
    setMobileOpen(true);
    document.documentElement.classList.add("trava");
    window.setTimeout(() => btnFecharMenuRef.current?.focus(), 60);
  }
  function fecharMenu(semFoco?: boolean) {
    setMobileOpen(false);
    document.documentElement.classList.remove("trava");
    if (!semFoco) btnMenuRef.current?.focus();
  }

  // Esc fecha mega e menu do celular; clique fora fecha o mega.
  useEffect(() => {
    function onDocClick(e: globalThis.MouseEvent) {
      const alvo = e.target as Element;
      if (!alvo.closest("#mega-servicos") && !alvo.closest('[aria-controls="mega-servicos"]')) fecharMega();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (megaOpen) {
        fecharMega();
        btnServRef.current?.focus();
      }
      if (mobileOpen) fecharMenu();
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [megaOpen, mobileOpen]);

  // Usado só dentro do menu do celular: fecha o painel e, só depois, rola até a seção.
  function fecharMenuERolar(e: MouseEvent, alvo: string) {
    e.preventDefault();
    fecharMenu(true);
    const elemento = document.getElementById(alvo);
    if (!elemento) return;
    window.setTimeout(
      () => elemento.scrollIntoView({ behavior: reduzMovimento() ? "auto" : "smooth" }),
      reduzMovimento() ? 0 : 30
    );
  }

  // Seção visível no momento: desliza a pílula atrás do link correspondente.
  useEffect(() => {
    const elementos = Array.from(document.querySelectorAll<HTMLElement>("[data-secao]"));
    if (elementos.length === 0) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const id = entrada.target.getAttribute("data-secao");
          if (id) setActiveId(id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    function moverPilula() {
      const pilula = pillRef.current;
      if (!pilula) return;
      const link = activeId ? linkRefs.current.get(activeId) : null;
      if (!link || window.innerWidth <= 1040) {
        pilula.style.opacity = "0";
        return;
      }
      pilula.style.left = `${link.offsetLeft}px`;
      pilula.style.width = `${link.offsetWidth}px`;
      pilula.style.opacity = "1";
    }
    moverPilula();
    window.addEventListener("resize", moverPilula);
    return () => window.removeEventListener("resize", moverPilula);
  }, [activeId]);

  const vidro = scrolled || megaOpen;
  const esconder = hidden && !megaOpen && !mobileOpen;

  return (
    <>
      <header className={`nav-root ${esconder ? "nav-esconde" : ""}`}>
        <div className={`nav-barra ${vidro ? "nav-barra-vidro" : ""}`}>
          <a href="#inicio" aria-label="Página inicial, voltar ao início" className="no-underline">
            <Marca />
          </a>

          <nav aria-label="Principal" className="relative ml-auto hidden min-[1041px]:flex items-center gap-0.5" ref={navLinksRef}>
            <span ref={pillRef} className="nav-indicador" aria-hidden="true" />
            <button
              ref={(el) => {
                btnServRef.current = el;
                registrarLink("servicos")(el);
              }}
              type="button"
              aria-expanded={megaOpen}
              aria-controls="mega-servicos"
              onClick={() => (megaOpen ? fecharMega() : abrirMega())}
              onPointerEnter={onMegaPointerEnter}
              onPointerLeave={onMegaPointerLeave}
              className="relative inline-flex min-h-11 items-center gap-1.5 rounded-[10px] px-3.5 text-[0.95rem] font-semibold text-texto-2 transition-colors hover:text-noite aria-expanded:text-noite"
            >
              Serviços
              <Icone nome="baixo" className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
            </button>

            {LINKS_NAV.map((link) => (
              <a
                key={link.alvo}
                href={`#${link.alvo}`}
                ref={registrarLink(link.alvo)}
                aria-current={activeId === link.alvo}
                className="relative inline-flex min-h-11 items-center rounded-[10px] px-3.5 text-[0.95rem] font-semibold text-texto-2 transition-colors hover:text-noite aria-[current=true]:text-noite"
              >
                {link.nome}
              </a>
            ))}
          </nav>

          <div
            id="mega-servicos"
            role="region"
            aria-label="Serviços"
            onPointerEnter={onMegaPointerEnter}
            onPointerLeave={onMegaPointerLeave}
            className={`nav-mega ${megaOpen ? "nav-mega-aberto" : ""}`}
          >
            {SERVICOS.map((s) => (
              <a key={s.titulo} href="#servicos" onClick={fecharMega} className="nav-mega-item">
                <span className="nav-tile">
                  <Icone nome={s.icone} />
                </span>
                <strong className="font-title text-base text-noite">{s.titulo}</strong>
                <span className="text-[0.88rem] leading-snug text-texto-2">{s.texto}</span>
              </a>
            ))}
            <div className="nav-mega-emerg">
              <span className="nav-tile">
                <Icone nome="alerta" />
              </span>
              <strong className="font-title text-[1.1rem]">Emergência elétrica?</strong>
              <p className="text-[0.9rem] leading-relaxed text-claro-2">
                Fumaça, faísca ou cheiro de queimado: desligue o disjuntor geral, afaste-se do quadro e fale com a
                gente.
              </p>
              <Button
                href={waLink("Olá! Estou com uma emergência elétrica.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="ambar"
                className="mt-auto min-h-[46px]"
              >
                <Icone nome="whats" className="h-5 w-5" />
                Chamar agora
              </Button>
            </div>
          </div>

          <div className="ml-2 hidden min-[1041px]:flex items-center gap-2">
            <a
              href={waLink("Olá! Vim pelo site e gostaria de falar sobre um serviço elétrico.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-gelo-2 text-azul transition-colors hover:bg-azul hover:text-white"
            >
              <Icone nome="whats" />
            </a>
            <Button href="#orcamento" variant="ambar" className="min-h-[46px] px-[18px] text-[0.95rem]">
              Solicitar orçamento
            </Button>
          </div>

          <button
            ref={btnMenuRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="menu-movel"
            aria-label="Abrir menu"
            onClick={abrirMenu}
            className="ml-auto grid h-12 w-12 place-items-center rounded-[13px] bg-noite text-white min-[1041px]:hidden"
          >
            <Icone nome="menu" />
          </button>
        </div>
      </header>

      <div
        id="menu-movel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`nav-menu-movel ${mobileOpen ? "nav-menu-movel-aberto" : ""}`}
      >
        <div className="flex min-h-[68px] items-center justify-between pl-1">
          <Marca mostrarSubtitulo={false} />
          <button
            ref={btnFecharMenuRef}
            type="button"
            aria-label="Fechar menu"
            onClick={() => fecharMenu()}
            className="grid h-12 w-12 place-items-center rounded-[13px] bg-noite text-white"
          >
            <Icone nome="fechar" />
          </button>
        </div>

        <nav aria-label="Menu do celular" className="flex flex-col gap-1">
          <a
            href="#servicos"
            onClick={(e) => fecharMenuERolar(e, "servicos")}
            style={{ "--i": 0 } as CSSProperties}
            className="nav-mm-anim flex min-h-14 items-center justify-between rounded-[10px] px-1.5 font-title text-[1.7rem] font-bold tracking-[-0.02em] text-noite"
          >
            Serviços <Icone nome="seta" className="text-eletrico" />
          </a>
          {LINKS_NAV.map((link, i) => (
            <a
              key={link.alvo}
              href={`#${link.alvo}`}
              onClick={(e) => fecharMenuERolar(e, link.alvo)}
              style={{ "--i": i + 1 } as CSSProperties}
              className="nav-mm-anim flex min-h-14 items-center justify-between rounded-[10px] px-1.5 font-title text-[1.7rem] font-bold tracking-[-0.02em] text-noite"
            >
              {link.nome} <Icone nome="seta" className="text-eletrico" />
            </a>
          ))}
        </nav>

        <div className="grid grid-cols-2 gap-2">
          {SERVICOS.map((s, i) => (
            <a
              key={s.titulo}
              href="#servicos"
              onClick={(e) => fecharMenuERolar(e, "servicos")}
              style={{ "--i": i + 4 } as CSSProperties}
              className="nav-mm-anim flex flex-col gap-2.5 rounded-2xl bg-gelo p-3.5 text-[0.95rem] font-semibold leading-tight text-noite"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-white text-eletrico">
                <Icone nome={s.icone} className="h-5 w-5" />
              </span>
              {s.titulo}
            </a>
          ))}
        </div>

        <div className="mt-auto grid gap-2.5">
          <Button
            href="#orcamento"
            onClick={(e) => fecharMenuERolar(e, "orcamento")}
            variant="ambar"
            style={{ "--i": 8 } as CSSProperties}
            className="nav-mm-anim"
          >
            Solicitar orçamento
          </Button>
          <Button
            href={waLink("Olá! Vim pelo site.")}
            target="_blank"
            rel="noopener noreferrer"
            variant="claro"
            style={{ "--i": 9 } as CSSProperties}
            className="nav-mm-anim"
          >
            <Icone nome="whats" />
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </>
  );
}
