import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "outline" | "dark";

const base =
  "inline-flex min-h-12 items-center gap-2 border-[1.5px] border-ink px-6 font-sans text-base no-underline transition-transform duration-150 cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber font-bold text-ink shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-ink)]",
  outline: "bg-transparent font-semibold text-ink hover:bg-white",
  dark: "bg-ink font-semibold text-on-ink hover:bg-[#1C3150]",
};

type CommonProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", arrow = true, className = "", children, ...domProps } = props;
  const classes = twMerge(base, variants[variant], className);

  if (domProps.href !== undefined) {
    return (
      <a className={classes} {...(domProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        {arrow && <span aria-hidden="true">→</span>}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(domProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </button>
  );
}
