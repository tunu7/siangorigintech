export const inputClass =
  "mt-1 block w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink";

export function Field({
  id,
  label,
  required = false,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted"
      >
        {label}
        {!required && (
          <span className="normal-case tracking-normal text-muted/70">
            {" "}
            — optional
          </span>
        )}
      </label>
      {children}
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="border-l-2 border-red-600 bg-red-50/60 px-4 py-3 text-sm text-red-800"
    >
      {message}
    </p>
  );
}
