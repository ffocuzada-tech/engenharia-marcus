export function FaqItem({
  q,
  a,
  qLabel,
  defaultOpen = false,
}: {
  q: string;
  a?: string;
  qLabel?: string;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen || undefined}
      className="group border-t border-ink/30 py-5 first:border-t-[1.5px] last:border-b-[1.5px] last:border-ink"
    >
      <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
        <span>
          {qLabel && (
            <span className="mr-2.5 font-mono text-[13px] text-amber-text">{qLabel}</span>
          )}
          {q}
        </span>
        <span aria-hidden="true" className="shrink-0 group-open:hidden">
          +
        </span>
        <span aria-hidden="true" className="hidden shrink-0 group-open:inline">
          −
        </span>
      </summary>
      {a && (
        <p className="mt-3.5 text-[15px] leading-relaxed text-text-2 md:ml-[42px]">{a}</p>
      )}
    </details>
  );
}
