// Shared admin building blocks so every dashboard page looks the same.

export const card = "rounded-lg border border-line bg-white";

export const label =
  "text-[11px] font-medium uppercase tracking-[0.16em] text-muted";

export const input =
  "mt-2 w-full rounded-md border border-line-strong bg-white px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink";

const buttons = {
  primary: "bg-ink text-paper hover:bg-brand",
  secondary: "border border-line-strong bg-white text-ink hover:border-ink",
  danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50",
  ghost: "text-muted hover:text-ink",
};

export function button(
  variant: keyof typeof buttons = "primary",
  size: "sm" | "md" = "md"
) {
  return `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
    size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
  } ${buttons[variant]}`;
}

export const table = {
  wrap: `${card} overflow-x-auto`,
  table: "w-full min-w-180 text-left text-sm",
  head: "border-b border-line text-[11px] uppercase tracking-[0.14em] text-muted",
  th: "px-4 py-3 font-medium",
  body: "divide-y divide-line",
  row: "transition-colors hover:bg-paper",
  td: "px-4 py-3.5",
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  back,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  back?: React.ReactNode;
}) {
  return (
    <header className="mb-8">
      {back && <div className="mb-6">{back}</div>}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && <p className={label}>{eyebrow}</p>}
          <h1 className="font-display mt-2 text-4xl leading-tight">{title}</h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  );
}

const tones = {
  neutral: "bg-paper-deep text-ink-soft",
  brand: "bg-brand/10 text-brand",
  solid: "bg-ink text-paper",
  amber: "bg-amber-100 text-amber-900",
  sky: "bg-sky-100 text-sky-900",
  muted: "bg-paper-deep text-muted",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof tones;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-16 text-center text-sm text-muted">{children}</div>
  );
}
