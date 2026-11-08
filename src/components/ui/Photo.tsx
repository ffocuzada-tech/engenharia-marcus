import { twMerge } from "tailwind-merge";

export function Photo({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center border border-ink bg-placeholder bg-[repeating-linear-gradient(135deg,rgba(15,30,51,.07)_0_2px,transparent_2px_14px)]",
        className
      )}
    >
      <span className="whitespace-pre-line text-center font-mono text-[12px] text-text-3">
        {label}
      </span>
    </div>
  );
}
