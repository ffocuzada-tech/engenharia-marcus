export default function Home() {
  return (
    <main className="bg-grid-paper flex flex-1 flex-col items-start justify-center gap-6 px-8 py-16">
      <span className="font-mono text-label uppercase tracking-[.08em] text-text-3">
        FOLHA 01 / 11 · TESTE DE TOKENS
      </span>

      <h1 className="text-h1 font-bold text-ink">
        [NOME] Engenharia Elétrica
      </h1>

      <a
        href="#orcamento"
        className="inline-flex min-h-12 items-center gap-3 border-[1.5px] border-ink bg-amber px-6 font-sans text-base font-bold text-ink shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-ink)]"
      >
        Pedir orçamento grátis <span aria-hidden="true">→</span>
      </a>
    </main>
  );
}
