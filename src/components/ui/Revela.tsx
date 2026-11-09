"use client";

import { useRef, type ComponentPropsWithoutRef, type CSSProperties, type ElementType } from "react";

type RevelaProps<T extends ElementType> = {
  as?: T;
  atraso?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Porte de .revela/.pre: só ganham o estado escondido os elementos que
 * começam abaixo da dobra no carregamento; o que já está visível nunca some.
 * Com prefers-reduced-motion, nada se esconde.
 */
export function Revela<T extends ElementType = "div">({
  as,
  atraso = 0,
  className,
  style,
  children,
  ...rest
}: RevelaProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const observadoRef = useRef(false);

  function aoMontar(el: HTMLElement | null) {
    if (!el || observadoRef.current) return;
    observadoRef.current = true;

    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;

    el.classList.add("revela-pre");
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            el.classList.remove("revela-pre");
            observador.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observador.observe(el);
  }

  return (
    <Tag
      ref={aoMontar}
      className={`revela ${className ?? ""}`}
      style={
        {
          ...(style as CSSProperties),
          ...(atraso ? { "--atraso": `${atraso}s` } : {}),
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
