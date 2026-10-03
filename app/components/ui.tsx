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
    <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium text-brand">{children}</p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 text-balance sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-6 text-lg leading-8 text-zinc-600">
          {description}
        </p>
      )}
    </header>
  );
}

const buttonStyles = {
  primary:
    "bg-brand text-white hover:bg-brand-hover disabled:opacity-60",
  secondary:
    "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-900",
};

export function buttonClass(
  variant: keyof typeof buttonStyles = "primary"
) {
  return `inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed ${buttonStyles[variant]}`;
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
      {arrow && <ArrowRight size={16} aria-hidden />}
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
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 hover:text-brand"
    >
      {children}
      <ArrowRight
        size={16}
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
