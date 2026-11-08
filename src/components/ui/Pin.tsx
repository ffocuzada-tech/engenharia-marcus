export function Pin({
  n,
  label,
  variant = "before",
  className = "",
}: {
  n: number;
  label: string;
  variant?: "before" | "after";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 text-[13px] ${className}`}>
      <span
        className={`flex h-[26px] w-[26px] items-center justify-center rounded-full font-bold text-ink ${
          variant === "after" ? "bg-amber" : "bg-paper"
        }`}
      >
        {n}
      </span>
      <span className="bg-ink/85 px-2 py-1 text-on-ink">{label}</span>
    </span>
  );
}
