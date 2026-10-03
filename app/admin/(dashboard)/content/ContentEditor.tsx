"use client";

import { useEffect, useState, useTransition } from "react";
import type {
  ContentValue,
  FieldDef,
  SimpleField,
} from "@/lib/content-schema";
import type { FormState } from "@/app/admin/actions";
import { resetContent, saveContent } from "./actions";

type Values = Record<string, ContentValue>;

const inputClass =
  "mt-2 w-full rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-ink";

const labelClass = "text-[11px] font-medium uppercase tracking-[0.16em] text-muted";

const smallButton =
  "rounded-md border border-line-strong bg-white px-2.5 py-1 text-xs hover:border-ink disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-inherit";

export default function ContentEditor({
  sectionKey,
  fields,
  initial,
  customized,
}: {
  sectionKey: string;
  fields: FieldDef[];
  initial: Values;
  customized: boolean;
}) {
  const [values, setValues] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [state, setState] = useState<FormState>({});
  const [pending, startTransition] = useTransition();

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;

    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function set(key: string, value: ContentValue) {
    setValues((current) => ({ ...current, [key]: value }));
    setDirty(true);
    setState({});
  }

  function save() {
    startTransition(async () => {
      const result = await saveContent(sectionKey, values);
      setState(result);
      if (result.saved) setDirty(false);
    });
  }

  function reset() {
    if (
      !window.confirm(
        "Discard all edits to this page and restore the original text?"
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await resetContent(sectionKey);
      setState(result);
      if (result.saved) {
        setDirty(false);
        // Reload so the editor picks up the restored defaults.
        window.location.reload();
      }
    });
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
    >
      {groupByHeading(fields).map((block, index) => (
        <section
          key={index}
          className="space-y-4 rounded-lg border border-line bg-white p-6"
        >
          {block.heading && (
            <h2 className="text-sm font-semibold">{block.heading}</h2>
          )}

          {block.fields.map((field) => (
            <FieldInput
              key={field.key}
              id={`${sectionKey}-${field.key}`}
              field={field}
              value={values[field.key]}
              onChange={(value) => set(field.key, value)}
            />
          ))}
        </section>
      ))}

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-white/95 p-4 shadow-lg shadow-ink/5 backdrop-blur">
        <div className="text-sm">
          {state.error ? (
            <span role="alert" className="text-red-600">
              {state.error}
            </span>
          ) : dirty ? (
            <span className="text-amber-700">Unsaved changes</span>
          ) : state.saved ? (
            <span className="text-brand">Saved. The live site is updated.</span>
          ) : (
            <span className="text-muted">
              {customized ? "Edited" : "Showing the original text"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {customized && (
            <button
              type="button"
              onClick={reset}
              disabled={pending}
              className="text-sm text-muted hover:text-red-700 disabled:opacity-50"
            >
              Restore original
            </button>
          )}
          <button
            type="submit"
            disabled={pending || !dirty}
            className="rounded-md bg-ink px-5 py-2 text-sm font-medium text-paper hover:bg-brand disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}

function groupByHeading(fields: FieldDef[]) {
  const blocks: {
    heading?: string;
    fields: Exclude<FieldDef, { type: "heading" }>[];
  }[] = [];

  for (const field of fields) {
    if (field.type === "heading") {
      blocks.push({ heading: field.label, fields: [] });
    } else {
      if (!blocks.length) blocks.push({ fields: [] });
      blocks[blocks.length - 1].fields.push(field);
    }
  }

  return blocks;
}

function FieldInput({
  id,
  field,
  value,
  onChange,
}: {
  id: string;
  field: Exclude<FieldDef, { type: "heading" }>;
  value: ContentValue | undefined;
  onChange: (value: ContentValue) => void;
}) {
  if (field.type === "lines") {
    const lines = (value as string[] | undefined) ?? [];

    return (
      <div>
        <label htmlFor={id} className={labelClass}>
          {field.label}
        </label>
        <textarea
          id={id}
          rows={Math.min(12, Math.max(4, lines.length + 1))}
          value={lines.join("\n")}
          onChange={(event) => onChange(event.target.value.split("\n"))}
          className={`${inputClass} resize-y`}
        />
        {field.hint && (
          <p className="mt-1 text-xs text-muted">{field.hint}</p>
        )}
      </div>
    );
  }

  if (field.type === "group") {
    return (
      <GroupInput
        id={id}
        field={field}
        items={(value as Record<string, string>[] | undefined) ?? []}
        onChange={onChange}
      />
    );
  }

  return (
    <SimpleInput
      id={id}
      field={field}
      value={(value as string | undefined) ?? ""}
      onChange={onChange}
    />
  );
}

function SimpleInput({
  id,
  field,
  value,
  onChange,
}: {
  id: string;
  field: SimpleField;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {field.label}
        {field.type !== "select" && field.required && (
          <span className="text-red-700"> *</span>
        )}
      </label>

      {field.type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} capitalize`}
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          maxLength={field.max ?? 5000}
          required={field.required}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={field.type === "link" ? "text" : field.type}
          value={value}
          maxLength={field.max ?? 300}
          required={field.required}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      )}

      {field.type !== "select" && field.hint && (
        <p className="mt-1 text-xs text-muted">{field.hint}</p>
      )}
    </div>
  );
}

function GroupInput({
  id,
  field,
  items,
  onChange,
}: {
  id: string;
  field: Extract<FieldDef, { type: "group" }>;
  items: Record<string, string>[];
  onChange: (value: Record<string, string>[]) => void;
}) {
  const max = field.max ?? 20;

  const move = (from: number, to: number) => {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const blank = () =>
    Object.fromEntries(
      field.fields.map((sub) => [
        sub.key,
        sub.type === "select" ? sub.options[0] : "",
      ])
    );

  return (
    <div>
      <p className={labelClass}>{field.label}</p>

      <ol className="mt-2 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="space-y-3 rounded-lg border border-line bg-paper p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted">
                {field.itemLabel} {index + 1}
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                  className={smallButton}
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => move(index, index + 1)}
                  className={smallButton}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChange(items.filter((_, other) => other !== index))
                  }
                  className={`${smallButton} hover:border-red-300! hover:text-red-700!`}
                >
                  Remove
                </button>
              </div>
            </div>

            {field.fields.map((sub) => (
              <SimpleInput
                key={sub.key}
                id={`${id}-${index}-${sub.key}`}
                field={sub}
                value={item[sub.key] ?? ""}
                onChange={(value) =>
                  onChange(
                    items.map((other, otherIndex) =>
                      otherIndex === index
                        ? { ...other, [sub.key]: value }
                        : other
                    )
                  )
                }
              />
            ))}
          </li>
        ))}
      </ol>

      <button
        type="button"
        disabled={items.length >= max}
        onClick={() => onChange([...items, blank()])}
        className={`${smallButton} mt-3`}
      >
        + Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}
