import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}

// Small uppercase label, optionally numbered ("01 — Work").
export function Eyebrow({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.18em] text-muted ${className}`}
    >
      {index !== undefined && (
        <span className="tabular-nums text-ink">
          {String(index).padStart(2, "0")}
          <span className="mx-2 text-line-strong">—</span>
        </span>
      )}
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line pb-14 pt-20 sm:pb-20 sm:pt-28">
      <div className="animate-fade-up">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h1 className="font-display mt-6 max-w-4xl animate-fade-up text-5xl text-balance [animation-delay:80ms] sm:text-7xl">
        {title}
      </h1>
      {description && (
        <p className="mt-8 max-w-2xl animate-fade-up text-lg leading-8 text-ink-soft [animation-delay:160ms]">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}

// A titled band with the label in a narrow left column on wide screens.
export function Section({
  label,
  index,
  children,
  className = "",
}: {
  label: string;
  index?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`grid gap-8 border-t border-line py-16 sm:py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-12 ${className}`}
    >
      <Eyebrow index={index}>{label}</Eyebrow>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const buttonStyles = {
  primary:
    "bg-ink text-paper hover:bg-brand disabled:opacity-60",
  secondary:
    "border border-line-strong text-ink hover:border-ink",
  inverse: "bg-paper text-ink hover:bg-mint",
};

export function buttonClass(
  variant: keyof typeof buttonStyles = "primary"
) {
  return `group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed ${buttonStyles[variant]}`;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof buttonStyles;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
      {arrow && (
        <ArrowRight
          size={15}
          strokeWidth={1.75}
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border-b border-ink pb-0.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
    >
      {children}
      <ArrowRight
        size={15}
        strokeWidth={1.75}
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
