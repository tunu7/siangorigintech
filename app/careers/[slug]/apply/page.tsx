"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ApplyPage() {
  const params = useParams();

  const slug = params.slug as string;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("jobSlug", slug);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong."
        );
      }

      setSuccess(true);
      setResume(null);
      form.reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleResumeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      setResume(null);
      return;
    }

    // PDF validation
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please upload a PDF file.");
      setResume(null);
      event.target.value = "";
      return;
    }

    // 10MB validation
    if (file.size > 10 * 1024 * 1024) {
      setError("Resume must be smaller than 10MB.");
      setResume(null);
      event.target.value = "";
      return;
    }

    setError("");
    setResume(file);
  }

  /* ---------------- SUCCESS ---------------- */

  if (success) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7FAF7] px-6 text-[#06351F]">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-45 top-[10%] h-112.5 w-112.5 rounded-full bg-[#2F7D46]/5 blur-3xl animate-[applyFloat_14s_ease-in-out_infinite]" />

        <div className="pointer-events-none absolute bottom-[5%] -left-45 h-100 w-100 rounded-full bg-[#176B3A]/4 blur-3xl animate-[applyFloatReverse_16s_ease-in-out_infinite]" />

        {/* Grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0B4D2C 1px, transparent 1px),
                linear-gradient(to bottom, #0B4D2C 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-xl text-center animate-[applyFadeUp_700ms_ease-out_both]">

          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
            Application Received
          </p>

          <h1 className="mt-6 text-5xl font-medium tracking-[-0.06em] text-[#06351F] md:text-7xl">
            THANK
            <br />
            <span className="text-[#2F7D46]">YOU.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#617568]">
            Your application has been received. We will review your
            application and get back to you if there is a potential match.
          </p>

          <Link
            href="/careers"
            className="group mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-wider text-[#0B4D2C]"
          >
            <span className="relative">
              Back to Careers
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-[#2F7D46] transition-transform duration-300 group-hover:scale-x-0" />
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

        {/* Bottom accent */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-px w-32 -translate-x-1/2 overflow-hidden bg-[#0B4D2C]/10">
          <div className="h-full w-12 bg-[#2F7D46] animate-[applyLineMove_4s_linear_infinite]" />
        </div>

        <style>
          {`
            @keyframes applyFadeUp {
              from {
                opacity: 0;
                transform: translateY(25px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes applyFloat {
              0%, 100% {
                transform: translate3d(0, 0, 0);
              }

              50% {
                transform: translate3d(-30px, 25px, 0);
              }
            }

            @keyframes applyFloatReverse {
              0%, 100% {
                transform: translate3d(0, 0, 0);
              }

              50% {
                transform: translate3d(30px, -25px, 0);
              }
            }

            @keyframes applyLineMove {
              0% {
                transform: translateX(-200%);
              }

              100% {
                transform: translateX(500%);
              }
            }
          `}
        </style>

      </main>
    );
  }

  /* ---------------- APPLICATION FORM ---------------- */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FAF7] text-[#06351F]">

      {/* Ambient green glow */}
      <div className="pointer-events-none absolute -right-50 top-[8%] h-130 w-130 rounded-full bg-[#2F7D46]/5 blur-3xl animate-[applyFloat_14s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute bottom-[10%] -left-45 h-105 w-105 rounded-full bg-[#176B3A]/4 blur-3xl animate-[applyFloatReverse_16s_ease-in-out_infinite]" />

      {/* Technical grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0B4D2C 1px, transparent 1px),
              linear-gradient(to bottom, #0B4D2C 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating dots */}
      <div className="pointer-events-none absolute right-[14%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#2F7D46] opacity-50 animate-[applyPulse_4s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute left-[8%] top-[48%] h-1 w-1 rounded-full bg-[#176B3A] opacity-40 animate-[applyPulse_5s_ease-in-out_infinite_1s]" />

      <section className="relative z-10 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">

          {/* Back */}
          <Link
            href={`/careers/${slug}`}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#617568] transition-colors duration-300 hover:text-[#0B4D2C]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to Role
          </Link>

          {/* Header */}
          <div className="mt-16 animate-[applyFadeUp_700ms_ease-out_both]">

            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
              Application
            </p>

            <h1 className="mt-6 text-5xl font-medium leading-[0.9] tracking-[-0.06em] text-[#06351F] md:text-7xl">
              APPLY
              <br />
              <span className="text-[#2F7D46]">
                FOR THIS ROLE.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#617568]">
              Tell us about yourself, your experience and what you can
              bring to Siang Origin Technologies.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-20 space-y-10 animate-[applyFadeUp_700ms_ease-out_150ms_both]"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-[#06351F]"
              >
                Full Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-3 w-full border-b border-[#0B4D2C]/15 bg-transparent py-4 text-lg text-[#06351F] outline-none transition-colors duration-300 placeholder:text-[#AAB8AF] focus:border-[#2F7D46]"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#06351F]"
              >
                Email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-3 w-full border-b border-[#0B4D2C]/15 bg-transparent py-4 text-lg text-[#06351F] outline-none transition-colors duration-300 placeholder:text-[#AAB8AF] focus:border-[#2F7D46]"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-[#06351F]"
              >
                Phone *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-3 w-full border-b border-[#0B4D2C]/15 bg-transparent py-4 text-lg text-[#06351F] outline-none transition-colors duration-300 placeholder:text-[#AAB8AF] focus:border-[#2F7D46]"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label
                htmlFor="linkedin"
                className="text-sm font-medium text-[#06351F]"
              >
                LinkedIn
              </label>

              <input
                id="linkedin"
                name="linkedin"
                type="url"
                className="mt-3 w-full border-b border-[#0B4D2C]/15 bg-transparent py-4 text-lg text-[#06351F] outline-none transition-colors duration-300 placeholder:text-[#AAB8AF] focus:border-[#2F7D46]"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            {/* Portfolio */}
            <div>
              <label
                htmlFor="portfolio"
                className="text-sm font-medium text-[#06351F]"
              >
                Portfolio / Website
              </label>

              <input
                id="portfolio"
                name="portfolio"
                type="url"
                className="mt-3 w-full border-b border-[#0B4D2C]/15 bg-transparent py-4 text-lg text-[#06351F] outline-none transition-colors duration-300 placeholder:text-[#AAB8AF] focus:border-[#2F7D46]"
                placeholder="https://..."
              />
            </div>

            {/* Cover note */}
            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-[#06351F]"
              >
                Tell us about yourself *
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="mt-3 w-full resize-none border border-[#0B4D2C]/15 bg-transparent p-4 text-lg text-[#06351F] outline-none transition-colors duration-300 placeholder:text-[#AAB8AF] focus:border-[#2F7D46]"
                placeholder="Tell us about your experience, what you have built and why you want to join us."
              />
            </div>

            {/* Resume */}
            <div>
              <label
                htmlFor="resume"
                className="text-sm font-medium text-[#06351F]"
              >
                Resume / CV *
              </label>

              <label
                htmlFor="resume"
                className="mt-3 flex cursor-pointer flex-col items-center justify-center border border-dashed border-[#0B4D2C]/20 bg-[#EAF3EC]/40 p-8 text-center transition-all duration-300 hover:border-[#2F7D46] hover:bg-[#EAF3EC]/70"
              >
                {resume ? (
                  <>
                    {/* PDF Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0B4D2C] text-xs font-bold tracking-wider text-white shadow-sm">
                      PDF
                    </div>

                    {/* File name */}
                    <span className="mt-4 max-w-full truncate px-4 text-sm font-medium text-[#0B4D2C]">
                      {resume.name}
                    </span>

                    {/* File size */}
                    <span className="mt-2 text-xs text-[#617568]">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB · PDF
                    </span>

                    {/* Replace text */}
                    <span className="mt-3 text-xs font-medium text-[#2F7D46]">
                      Click to replace
                    </span>
                  </>
                ) : (
                  <>
                    {/* Upload icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#0B4D2C]/15 bg-white text-[#0B4D2C]">
                      ↑
                    </div>

                    <span className="mt-4 text-sm font-medium text-[#0B4D2C]">
                      Upload your resume
                    </span>

                    <span className="mt-2 text-xs text-[#617568]">
                      PDF only · Maximum 10MB
                    </span>
                  </>
                )}

                <input
                  id="resume"
                  name="resume"
                  type="file"
                  required
                  accept="application/pdf,.pdf"
                  className="sr-only"
                  onChange={handleResumeChange}
                />
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center gap-4 rounded-full bg-[#0B4D2C] px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#176B3A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>
                {loading
                  ? "Sending Application..."
                  : "Submit Application"}
              </span>

              {!loading && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}

              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
            </button>

          </form>

          {/* Bottom accent */}
          <div className="mt-28 h-px w-full overflow-hidden bg-[#0B4D2C]/10">
            <div className="h-full w-24 bg-[#2F7D46] animate-[applyLineMove_5s_linear_infinite]" />
          </div>

        </div>
      </section>

      {/* Animations */}
      <style>
        {`
          @keyframes applyFadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes applyFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(-30px, 25px, 0);
            }
          }

          @keyframes applyFloatReverse {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(30px, -25px, 0);
            }
          }

          @keyframes applyPulse {
            0%, 100% {
              opacity: 0.15;
              transform: translateY(0);
            }

            50% {
              opacity: 0.65;
              transform: translateY(-8px);
            }
          }

          @keyframes applyLineMove {
            0% {
              transform: translateX(-150%);
            }

            100% {
              transform: translateX(1100%);
            }
          }
        `}
      </style>

    </main>
  );
}