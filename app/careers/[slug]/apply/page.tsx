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

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Application Received
          </p>

          <h1 className="mt-6 text-5xl font-medium tracking-tighter md:text-7xl">
            THANK YOU.
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-500">
            Your application has been received. We will review your
            application and get back to you if there is a potential match.
          </p>

          <Link
            href="/careers"
            className="mt-8 inline-block text-sm uppercase tracking-wider underline underline-offset-4"
          >
            Back to Careers →
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="pt-40 pb-24 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        <Link
          href={`/careers/${slug}`}
          className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-black"
        >
          ← Back to Role
        </Link>

        <div className="mt-16">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Application
          </p>

          <h1 className="mt-6 text-5xl font-medium leading-[0.9] tracking-[-0.06em] md:text-7xl">
            APPLY
            <br />
            FOR THIS ROLE.
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-20 space-y-10"
        >

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium"
            >
              Full Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-3 w-full border-b border-neutral-300 bg-transparent py-4 text-lg outline-none transition-colors focus:border-black"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-3 w-full border-b border-neutral-300 bg-transparent py-4 text-lg outline-none transition-colors focus:border-black"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium"
            >
              Phone *
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-3 w-full border-b border-neutral-300 bg-transparent py-4 text-lg outline-none transition-colors focus:border-black"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label
              htmlFor="linkedin"
              className="text-sm font-medium"
            >
              LinkedIn
            </label>

            <input
              id="linkedin"
              name="linkedin"
              type="url"
              className="mt-3 w-full border-b border-neutral-300 bg-transparent py-4 text-lg outline-none transition-colors focus:border-black"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          {/* Portfolio */}
          <div>
            <label
              htmlFor="portfolio"
              className="text-sm font-medium"
            >
              Portfolio / Website
            </label>

            <input
              id="portfolio"
              name="portfolio"
              type="url"
              className="mt-3 w-full border-b border-neutral-300 bg-transparent py-4 text-lg outline-none transition-colors focus:border-black"
              placeholder="https://..."
            />
          </div>

          {/* Cover note */}
          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium"
            >
              Tell us about yourself *
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="mt-3 w-full resize-none border border-neutral-300 bg-transparent p-4 text-lg outline-none transition-colors focus:border-black"
              placeholder="Tell us about your experience, what you have built and why you want to join us."
            />
          </div>

          {/* Resume */}
          <div>
            <label
              htmlFor="resume"
              className="text-sm font-medium"
            >
              Resume / CV *
            </label>

            <input
              id="resume"
              name="resume"
              type="file"
              required
              accept="application/pdf"
              className="mt-3 block w-full cursor-pointer border border-dashed border-neutral-300 p-6 text-sm text-neutral-500"
            />

            <p className="mt-3 text-xs text-neutral-400">
              PDF only · Maximum 10MB
            </p>
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
            className="rounded-full bg-black px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Sending Application..."
              : "Submit Application →"}
          </button>

        </form>

      </div>
    </main>
  );
}