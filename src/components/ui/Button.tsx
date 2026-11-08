import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

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
  const { variant = "primary", arrow = true, className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
        {arrow && <span aria-hidden="true">→</span>}
      </a>
    );
  }

  const { variant: _v, arrow: _a, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </button>
  );
}
