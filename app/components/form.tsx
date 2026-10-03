export const inputClass =
  "mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3.5 py-2.5 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/15 sm:text-sm";

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
      <label htmlFor={id} className="text-sm font-medium text-zinc-900">
        {label}
        {required ? (
          <span className="text-brand"> *</span>
        ) : (
          <span className="font-normal text-zinc-400"> (optional)</span>
        )}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {message}
    </p>
  );
}
