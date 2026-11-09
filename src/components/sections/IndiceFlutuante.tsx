"use client";

import { useEffect, useRef, useState } from "react";
import { Icone } from "@/components/ui/Icone";
import { secoes } from "@/content/secoes";
import "./IndiceFlutuante.css";

const RAIO = 25.5;
const CIRCUNFERENCIA = 2 * Math.PI * RAIO;

export function IndiceFlutuante() {
  const [visivel, setVisivel] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [ativo, setAtivo] = useState<string | null>(null);

  const botaoRef = useRef<HTMLButtonElement>(null);

  // Progresso de rolagem da página + visibilidade após 55% da altura da hero.
  useEffect(() => {
    function aoRolar() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgresso(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      const hero = document.getElementById("inicio");
      setVisivel(hero ? y > hero.offsetHeight * 0.55 : false);
    }
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Seção visível no momento, para destacar o item ativo na lista.
  useEffect(() => {
    const elementos = Array.from(document.querySelectorAll<HTMLElement>("[data-secao]"));
    if (elementos.length === 0) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const id = entrada.target.getAttribute("data-secao");
          if (id) setAtivo(id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!(e.target as Element).closest("[data-indice-raiz]")) setAberto(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && aberto) {
        setAberto(false);
        botaoRef.current?.focus();
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [aberto]);

  return (
    <div data-indice-raiz className={`indice-raiz ${visivel ? "indice-mostra" : ""}`}>
      <div
        id="indice-lista"
        role="navigation"
        aria-label="Seções da página"
        className={`indice-lista ${aberto ? "indice-lista-aberta" : ""}`}
      >
        <p className="indice-lista-titulo">Nesta página</p>
        {secoes.map((secao, i) => (
          <a
            key={secao.id}
            href={`#${secao.id}`}
            onClick={() => setAberto(false)}
            aria-current={ativo === secao.id}
            className={`indice-item ${ativo === secao.id ? "indice-item-ativo" : ""}`}
          >
            <span className="indice-item-numero">{String(i + 1).padStart(2, "0")}</span>
            {secao.nome}
          </a>
        ))}
      </div>
      <button
        ref={botaoRef}
        type="button"
        aria-expanded={aberto}
        aria-controls="indice-lista"
        aria-label="Seções da página"
        onClick={() => setAberto((v) => !v)}
        className="indice-botao"
      >
        <svg className="indice-anel" viewBox="0 0 58 58" aria-hidden="true">
          <circle className="indice-trilho" cx="29" cy="29" r={RAIO} />
          <circle
            className="indice-progresso"
            cx="29"
            cy="29"
            r={RAIO}
            style={{
              strokeDasharray: CIRCUNFERENCIA,
              strokeDashoffset: CIRCUNFERENCIA * (1 - progresso),
            }}
          />
        </svg>
        <Icone nome="indice" />
      </button>
    </div>
  );
}
