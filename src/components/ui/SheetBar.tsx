export function SheetBar({
  numero,
  titulo,
  nota,
  dark = false,
}: {
  numero: string;
  titulo: string;
  nota: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`wrap flex flex-wrap justify-between gap-4 border-b pt-5 pb-2 font-mono text-[10px] tracking-[.08em] uppercase sm:text-[11px] ${
        dark ? "border-on-ink-3/25 text-on-ink-3" : "border-ink/25 text-text-3"
      }`}
    >
      <span>
        FOLHA {numero} / 11 · {titulo}
      </span>
      <span>{nota}</span>
    </div>
  );
}
