"use client";

import { startTransition, useActionState, useState } from "react";
import type { Project } from "@/lib/projects";
import type { FormState } from "@/app/admin/actions";
import { saveProject } from "./actions";
import ImageField from "./ImageField";

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand";

const labelClass = "text-xs uppercase tracking-wider text-zinc-500";

export default function ProjectForm({ project }: { project?: Project }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveProject,
    {}
  );
  const [uploading, setUploading] = useState(false);

  return (
    <form
      className="space-y-6"
      // Submit manually so React doesn't reset the fields on an error.
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => action(formData));
      }}
    >
      <input type="hidden" name="id" value={project?.id ?? ""} />

      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <ImageField
          initial={project?.image ?? null}
          onUploadingChange={setUploading}
        />
      </section>

      <section className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title <span className="text-brand">*</span>
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={300}
            defaultValue={project?.title}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Category <span className="text-brand">*</span>
          </label>
          <input
            id="category"
            name="category"
            required
            maxLength={300}
            defaultValue={project?.category}
            placeholder="Digital Product"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="mark" className={labelClass}>
            Cover letters
          </label>
          <input
            id="mark"
            name="mark"
            maxLength={3}
            defaultValue={project?.mark}
            placeholder="AB"
            className={`${inputClass} uppercase`}
          />
          <p className="mt-1 text-xs text-zinc-400">
            Up to 3 letters shown on the card when there&apos;s no image.
          </p>
        </div>

        <div>
          <label htmlFor="url" className={labelClass}>
            Website link
          </label>
          <input
            id="url"
            name="url"
            type="text"
            inputMode="url"
            maxLength={500}
            defaultValue={project?.url ?? ""}
            placeholder="https://example.com"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-zinc-400">
            Optional. Makes the card clickable.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelClass}>
            Description <span className="text-brand">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            maxLength={1000}
            defaultValue={project?.description}
            className={`${inputClass} resize-y`}
          />
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={project?.published ?? true}
              className="h-4 w-4 accent-brand"
            />
            <span>
              <span className="font-medium">Published</span>
              <span className="block text-xs text-zinc-500">
                Shown on the work page.
              </span>
            </span>
          </label>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project?.featured ?? true}
              className="h-4 w-4 accent-brand"
            />
            <span>
              <span className="font-medium">Featured</span>
              <span className="block text-xs text-zinc-500">
                Also shown on the home page.
              </span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={pending || uploading}
          className="rounded-lg bg-brand px-5 py-2 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-50"
        >
          {pending
            ? "Saving..."
            : project
              ? "Save changes"
              : "Create project"}
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
