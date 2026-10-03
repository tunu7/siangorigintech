"use client";

import { useState } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { CheckCircle2, FileText, Loader2, Upload } from "lucide-react";
import { Field, FormError, inputClass } from "@/app/components/form";
import { buttonClass } from "@/app/components/ui";
import { MAX_RESUME_BYTES, resumePrefix } from "@/lib/applications";

type Status = "idle" | "uploading" | "submitting" | "success";

function validateResume(file: File) {
  if (
    file.type !== "application/pdf" &&
    !file.name.toLowerCase().endsWith(".pdf")
  ) {
    return "Please upload your resume as a PDF.";
  }

  if (file.size > MAX_RESUME_BYTES) {
    return "Resume must be smaller than 10MB.";
  }

  return "";
}

export default function ApplyForm({ slug }: { slug: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const busy = status === "uploading" || status === "submitting";

  function selectResume(file: File | undefined) {
    if (!file) return;

    const problem = validateResume(file);

    setError(problem);
    setResume(problem ? null : file);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      // 1. Upload the PDF straight to Vercel Blob.
      setStatus("uploading");
      setProgress(0);

      const blob = await upload(`${resumePrefix(slug)}resume.pdf`, resume, {
        access: "private",
        handleUploadUrl: "/api/apply/upload",
        contentType: "application/pdf",
        onUploadProgress: ({ percentage }) => setProgress(percentage),
      }).catch(() => {
        throw new Error(
          "We couldn't upload your resume. Please check your connection and try again."
        );
      });

      // 2. Submit the application details.
      setStatus("submitting");

      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          linkedin: formData.get("linkedin"),
          portfolio: formData.get("portfolio"),
          message: formData.get("message"),
          company: formData.get("company"),
          jobSlug: slug,
          resumePathname: blob.pathname,
          resumeName: resume.name,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to submit application. Please try again."
        );
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setStatus("idle");
      setError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="animate-fade-up py-4 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
          <CheckCircle2 className="text-brand" size={28} aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-semibold">Application received</h2>
        <p className="mt-2 text-zinc-600">
          Thank you for applying. We will review your application and get
          back to you if there is a potential match.
        </p>
        <Link
          href="/careers"
          className="mt-6 inline-block text-sm font-medium text-brand hover:underline"
        >
          Back to careers
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Field id="name" label="Full name" required>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={200}
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="email" label="Email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field id="phone" label="Phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={40}
            autoComplete="tel"
            placeholder="+91"
            className={inputClass}
          />
        </Field>

        <Field id="linkedin" label="LinkedIn">
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/…"
            className={inputClass}
          />
        </Field>

        <Field id="portfolio" label="Portfolio or website">
          <input
            id="portfolio"
            name="portfolio"
            type="url"
            placeholder="https://"
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="message" label="Tell us about yourself" required>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="Your experience, what you have built and why you want to join us."
          className={`${inputClass} resize-y`}
        />
      </Field>

      <Field id="resume" label="Resume" required>
        <label
          htmlFor="resume"
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            selectResume(event.dataTransfer.files[0]);
          }}
          className={`mt-2 flex cursor-pointer items-center gap-4 rounded-md border border-dashed p-5 transition-colors ${
            dragging
              ? "border-brand bg-brand/5"
              : "border-zinc-300 hover:border-zinc-400"
          }`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-600">
            {resume ? (
              <FileText size={20} aria-hidden />
            ) : (
              <Upload size={20} aria-hidden />
            )}
          </span>

          {resume ? (
            <span className="min-w-0 text-sm">
              <span className="block truncate font-medium">
                {resume.name}
              </span>
              <span className="text-zinc-500">
                {(resume.size / 1024 / 1024).toFixed(2)} MB · Click to
                replace
              </span>
            </span>
          ) : (
            <span className="text-sm">
              <span className="block font-medium">
                Upload your resume
              </span>
              <span className="text-zinc-500">
                Drag and drop or click to browse · PDF, max 10MB
              </span>
            </span>
          )}

          <input
            id="resume"
            name="resume"
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={(event) => {
              selectResume(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </label>
      </Field>

      {status === "uploading" && (
        <div
          role="progressbar"
          aria-label="Resume upload"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 overflow-hidden rounded-full bg-zinc-100"
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-200"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      )}

      <FormError message={error} />

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" disabled={busy} className={buttonClass()}>
          {busy && (
            <Loader2 size={16} className="animate-spin" aria-hidden />
          )}
          {status === "uploading"
            ? `Uploading resume… ${Math.round(progress)}%`
            : status === "submitting"
              ? "Submitting…"
              : "Submit application"}
        </button>
        <p className="text-xs text-zinc-500">
          Your details are only used to assess your application.
        </p>
      </div>
    </form>
  );
}
