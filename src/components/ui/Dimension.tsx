/** Cota de desenho técnico. Só aparece no computador — o consumidor deve
 * envolver em "hidden md:flex" quando o celular não deve exibi-la. */
export function Dimension({
  label,
  orientation = "horizontal",
  className = "",
}: {
  label: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  if (orientation === "vertical") {
    return (
      <div
        aria-hidden="true"
        className={`flex w-3.5 flex-col items-center justify-center border-y border-ink ${className}`}
      >
        <div className="w-px flex-1 bg-ink" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative flex h-3.5 items-center border-x border-ink ${className}`}
    >
      <div className="h-px flex-1 bg-ink" />
      <span className="absolute left-1/2 -translate-x-1/2 bg-paper px-2 font-mono text-[11px]">
        {label}
      </span>
    </div>
  );
}
