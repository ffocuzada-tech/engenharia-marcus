"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SheetIndicatorMobile } from "@/components/ui/SheetIndicator";

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#alerta", label: "Sinais de alerta" },
  { href: "#engenheiro", label: "Por que engenheiro" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#processo", label: "Como funciona" },
];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-3 no-underline">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
        <rect x="1" y="1" width="34" height="34" fill="#0F1E33" />
        <path d="M1 35 L35 1 L35 35 Z" fill="#F2B417" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="#F3F1EA" strokeWidth="2" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[17px] font-bold text-ink">[NOME]</span>
        <span className="font-mono text-[11px] uppercase tracking-[.08em] text-text-3">
          Engenharia Elétrica
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-ink/18 bg-paper">
      <div className="wrap flex items-center justify-between gap-6 py-5">
        <Logo />

        <nav
          aria-label="Principal"
          className="hidden flex-wrap gap-7 text-[15px] font-medium md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="no-underline hover:text-amber-text">
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="#orcamento" variant="dark" className="hidden md:inline-flex">
          Pedir orçamento
        </Button>

        <div className="flex items-center gap-3 md:hidden">
          <SheetIndicatorMobile />
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border-[1.5px] border-ink bg-transparent"
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M1 1 L15 15 M15 1 L1 15" stroke="#0F1E33" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
                <path d="M0 1h20M0 7h20M0 13h12" stroke="#0F1E33" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="wrap flex flex-col gap-1 border-t border-ink/18 pb-6 md:hidden">
          <nav aria-label="Principal" className="flex flex-col pt-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="min-h-12 border-b border-ink/18 py-3 text-base font-medium no-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button href="#orcamento" variant="primary" className="mt-4 w-full justify-between" onClick={() => setOpen(false)}>
            Pedir orçamento
          </Button>
        </div>
      )}
    </header>
  );
}
