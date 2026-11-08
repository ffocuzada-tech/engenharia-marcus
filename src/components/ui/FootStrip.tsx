export function FootStrip({
  items,
}: {
  items: { label: string; accent?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] border border-on-ink-2/30 font-mono text-[11px] text-on-ink-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`border-r border-on-ink-2/30 px-3 py-2.5 last:border-r-0 ${
            item.accent ? "bg-amber font-semibold text-ink" : ""
          }`}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}
