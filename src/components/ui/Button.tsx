import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Icone } from "@/components/ui/Icone";

type Variant = "ambar" | "claro" | "vidro";

const base =
  "group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl px-[22px] text-center font-sans text-base font-semibold no-underline transition-[background-color,color,box-shadow,transform] duration-200 cursor-pointer";

const variants: Record<Variant, string> = {
  ambar:
    "bg-ambar text-tinta-ambar shadow-[0_10px_24px_-12px_rgba(219,143,6,0.9)] hover:bg-ambar-2 hover:-translate-y-0.5",
  claro: "bg-white text-noite shadow-1 hover:shadow-2 hover:-translate-y-0.5",
  vidro: "bg-white/10 text-claro inset-ring inset-ring-white/15 hover:bg-white/15",
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
  const { variant = "ambar", arrow = false, className = "", children, ...domProps } = props;
  const classes = twMerge(base, variants[variant], className);

  const arrowIcon = arrow && (
    <Icone nome="seta" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
  );

  if (domProps.href !== undefined) {
    return (
      <a className={classes} {...(domProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        {arrowIcon}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(domProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {arrowIcon}
    </button>
  );
}
