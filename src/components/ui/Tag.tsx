import { twMerge } from "tailwind-merge";

export function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={twMerge(
        "inline-block bg-ink px-2 py-1 font-mono text-[13px] font-semibold text-on-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
