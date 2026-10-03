"use client";

import { useFormStatus } from "react-dom";

// Submit button that asks for confirmation before submitting its form.
export function ConfirmButton({
  message,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { message: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`disabled:opacity-50 ${className ?? ""}`}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function SubmitButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`disabled:opacity-50 ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Header checkbox that toggles every row checkbox bound to `form`.
export function SelectAll({ form }: { form: string }) {
  return (
    <input
      type="checkbox"
      aria-label="Select all"
      className="h-4 w-4 accent-brand"
      onChange={(event) => {
        document
          .querySelectorAll<HTMLInputElement>(
            `input[type=checkbox][name=ids][form="${form}"]`
          )
          .forEach((box) => {
            box.checked = event.currentTarget.checked;
          });
      }}
    />
  );
}

// Bulk action bar. Row checkboxes live in the table and join this form via
// their `form` attribute.
export function BulkForm({
  id,
  action,
  options,
}: {
  id: string;
  action: (formData: FormData) => Promise<void>;
  options: { value: string; label: string }[];
}) {
  return (
    <form
      id={id}
      action={action}
      className="flex flex-wrap items-center gap-2 text-sm"
      onSubmit={(event) => {
        const form = event.currentTarget;
        const count = document.querySelectorAll(
          `input[name=ids][form="${id}"]:checked`
        ).length;

        if (!count) {
          event.preventDefault();
          window.alert("Select at least one row first.");
          return;
        }

        const op = new FormData(form).get("op");

        if (
          op === "delete" &&
          !window.confirm(
            `Permanently delete ${count} item${count === 1 ? "" : "s"}? This cannot be undone.`
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <label htmlFor={`${id}-op`} className="text-zinc-500">
        With selected:
      </label>
      <select
        id={`${id}-op`}
        name="op"
        className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 outline-none focus:border-brand"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <SubmitButton className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 hover:border-brand hover:text-brand">
        Apply
      </SubmitButton>
    </form>
  );
}
