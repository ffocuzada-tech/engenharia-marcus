const sizes = {
  sm: "h-[60px] w-[60px]",
  md: "h-[84px] w-[84px]",
  lg: "h-16 w-16",
};

const letterSizes = {
  sm: "text-[22px]",
  md: "text-[30px]",
  lg: "text-xl",
};

export function Callout({
  letter,
  code,
  size = "md",
  onDark = false,
  className = "",
}: {
  letter: string;
  code: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-shrink-0 flex-col items-center justify-center rounded-full border-2 ${sizes[size]} ${
        onDark ? "border-amber text-on-ink" : "border-ink bg-white"
      } ${className}`}
    >
      <span className={`font-bold leading-none ${letterSizes[size]}`}>{letter}</span>
      <span
        className={`mt-1 border-t pt-0.5 font-mono text-[9px] ${
          onDark ? "border-amber" : "border-ink"
        }`}
      >
        {code}
      </span>
    </div>
  );
}
