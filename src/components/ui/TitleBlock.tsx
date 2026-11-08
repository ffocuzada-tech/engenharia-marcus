import { twMerge } from "tailwind-merge";

export function TitleBlock({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={twMerge(
        "grid grid-cols-2 border-[1.5px] border-ink bg-white font-mono text-[11px] shadow-[var(--shadow-sheet)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TitleBlockCell({
  wide = false,
  accent = false,
  borderRight = false,
  borderBottom = false,
  hideOnMobile = false,
  className = "",
  children,
}: {
  wide?: boolean;
  accent?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  hideOnMobile?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-1 px-3 py-2.5",
        wide && "col-span-2",
        accent && "bg-amber",
        borderRight && "border-r border-ink",
        borderBottom && "border-b border-ink",
        hideOnMobile && "hidden md:flex",
        className
      )}
    >
      {children}
    </div>
  );
}
