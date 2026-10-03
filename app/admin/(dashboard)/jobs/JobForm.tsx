"use client";

import { startTransition, useActionState, useState } from "react";
import type { Job } from "@/lib/jobs";
import type { FormState } from "@/app/admin/actions";
import { saveJob } from "./actions";

const inputClass =
  "mt-2 w-full rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-ink";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default function JobForm({ job }: { job?: Job }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveJob,
    {}
  );
  const [slug, setSlug] = useState(job?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(job));

  return (
    <form
      className="space-y-6"
      // Submit manually so React doesn't reset the fields when the
      // server returns a validation error.
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => action(formData));
      }}
    >
      <input type="hidden" name="original" value={job?.slug ?? ""} />

      <section className="space-y-4 rounded-lg border border-line bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" htmlFor="title" required>
            <input
              id="title"
              name="title"
              required
              maxLength={300}
              defaultValue={job?.title}
              onChange={(event) => {
                if (!slugEdited) setSlug(slugify(event.target.value));
              }}
              className={inputClass}
            />
          </Field>

          <Field
            label="URL slug"
            htmlFor="slug"
            required
            hint={
              job
                ? "Can't be changed once applications may reference it."
                : `/careers/${slug || "…"}`
            }
          >
            <input
              id="slug"
              name="slug"
              required
              disabled={Boolean(job)}
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              maxLength={80}
              value={slug}
              onChange={(event) => {
                setSlugEdited(true);
                setSlug(event.target.value.toLowerCase());
              }}
              className={`${inputClass} disabled:bg-paper disabled:text-muted`}
            />
          </Field>

          <Field label="Department" htmlFor="department" required>
            <input
              id="department"
              name="department"
              required
              defaultValue={job?.department}
              placeholder="Marketing"
              className={inputClass}
            />
          </Field>

          <Field label="Employment type" htmlFor="type" required>
            <input
              id="type"
              name="type"
              required
              list="job-types"
              defaultValue={job?.type ?? "Full-time"}
              className={inputClass}
            />
            <datalist id="job-types">
              <option value="Full-time" />
              <option value="Part-time" />
              <option value="Contract" />
              <option value="Internship" />
            </datalist>
          </Field>

          <Field label="Location" htmlFor="location" required>
            <input
              id="location"
              name="location"
              required
              defaultValue={job?.location ?? "Itanagar / Hybrid"}
              className={inputClass}
            />
          </Field>

          <Field label="Experience" htmlFor="experience" required>
            <input
              id="experience"
              name="experience"
              required
              defaultValue={job?.experience}
              placeholder="2–5 years"
              className={inputClass}
            />
          </Field>

          <Field label="Salary" htmlFor="salary">
            <input
              id="salary"
              name="salary"
              defaultValue={job?.salary ?? ""}
              placeholder="₹22,000–₹30,000/month"
              className={inputClass}
            />
          </Field>

          <Field
            label="Sort order"
            htmlFor="sort_order"
            hint="Lower numbers are listed first."
          >
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              step={1}
              defaultValue={job?.sort_order ?? 0}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Summary" htmlFor="description" required>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            maxLength={2000}
            defaultValue={job?.description}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </section>

      <section className="space-y-4 rounded-lg border border-line bg-white p-6">
        <p className="text-xs text-muted">One item per line.</p>

        <ListField
          name="responsibilities"
          label="Responsibilities"
          items={job?.responsibilities}
        />
        <ListField
          name="requirements"
          label="Requirements"
          items={job?.requirements}
        />
        <ListField
          name="benefits"
          label="What we offer"
          items={job?.benefits}
        />
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-white p-6">
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="is_open"
            defaultChecked={job?.is_open ?? true}
            className="h-4 w-4 accent-ink"
          />
          <span>
            <span className="font-medium">Open for applications</span>
            <span className="block text-xs text-muted">
              Closed roles are hidden from the careers page.
            </span>
          </span>
        </label>

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-ink px-5 py-2 text-sm font-medium text-paper hover:bg-brand disabled:opacity-50"
        >
          {pending ? "Saving..." : job ? "Save changes" : "Create job"}
        </button>
      </section>

      {state.error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted"
      >
        {label}
        {required && <span className="text-red-700"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function ListField({
  name,
  label,
  items,
}: {
  name: string;
  label: string;
  items?: string[];
}) {
  return (
    <Field label={label} htmlFor={name}>
      <textarea
        id={name}
        name={name}
        rows={6}
        defaultValue={items?.join("\n")}
        className={`${inputClass} resize-y`}
      />
    </Field>
  );
}
