import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Scene3D from "./three/Scene3D";
import type { SceneVariant } from "./three/engine";

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

// Eyebrow, display title and optional intro, used to open home sections.
export function SectionHeading({
  eyebrow,
  index,
  title,
  text,
  tone = "light",
  className = "",
  children,
}: {
  eyebrow: string;
  index?: number;
  title: React.ReactNode;
  text?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-x-12 gap-y-8 ${className}`}
    >
      <div className="max-w-3xl">
        <Eyebrow
          index={index}
          className={dark ? "text-paper/55 [&>span]:text-lime" : ""}
        >
          {eyebrow}
        </Eyebrow>
        <h2 className="font-display mt-5 text-4xl text-balance sm:text-6xl">
          {title}
        </h2>
        {text && (
          <p
            className={`mt-6 max-w-2xl text-lg leading-8 ${
              dark ? "text-paper/65" : "text-ink-soft"
            }`}
          >
            {text}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

// Small rounded label for sub-services and highlights.
export function Tag({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
        tone === "dark"
          ? "border-paper/15 text-paper/75"
          : "border-line-strong bg-paper/60 text-ink-soft"
      }`}
    >
      {children}
    </span>
  );
}

// Dark page header with a 3D scene behind it. Renders full width, so
// pages place it outside their <Container>. "hero" and "globe" put a
// focal object beside the text on wide screens and above it on phones.
export function PageHeader({
  eyebrow,
  title,
  description,
  back,
  scene = "field",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  back?: { href: string; label: string };
  scene?: SceneVariant;
  children?: React.ReactNode;
}) {
  const focus = scene === "hero" || scene === "globe";

  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="dark-panel relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
        <Scene3D variant={scene} className="absolute inset-0 -z-10" />

        <div
          className={`mx-auto max-w-[1280px] px-6 pb-16 sm:px-10 sm:pb-24 ${
            focus ? "pt-[min(80vw,21rem)] lg:pt-28" : "pt-16 sm:pt-28"
          }`}
        >
          <div className={focus ? "lg:max-w-[54%]" : ""}>
            {back && (
              <Link
                href={back.href}
                className="mb-10 inline-flex items-center gap-2 text-sm text-paper/55 transition-colors hover:text-paper"
              >
                <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
                {back.label}
              </Link>
            )}
            <p className="animate-fade-up text-[11px] font-medium uppercase tracking-[0.2em] text-paper/50">
              {eyebrow}
            </p>
            <h1 className="font-display mt-6 max-w-4xl animate-fade-up text-5xl text-balance [animation-delay:80ms] sm:text-7xl">
              {title}
            </h1>
            {description && (
              <p className="mt-8 max-w-2xl animate-fade-up text-lg leading-8 text-paper/65 [animation-delay:160ms]">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
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
  // For forest panels.
  lime: "bg-lime text-forest hover:bg-paper",
  outline: "border border-paper/25 text-paper hover:border-paper",
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
  tone = "light",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 border-b pb-0.5 text-sm font-medium transition-colors ${
        tone === "dark"
          ? "border-paper/40 text-paper hover:border-lime hover:text-lime"
          : "border-ink text-ink hover:border-brand hover:text-brand"
      }`}
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
