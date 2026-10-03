import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdmin, safeNextPath } from "@/lib/auth";
import { getContent } from "@/lib/content";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { next } = await searchParams;
  const destination = safeNextPath(Array.isArray(next) ? next[0] : next);

  if (await isAdmin()) {
    redirect(destination);
  }

  const site = await getContent("settings");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-mint/25 blur-3xl"
      />

      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to site
        </Link>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white">
              {site.logoMark}
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight">
                {site.shortName}
              </p>
              <p className="text-xs text-zinc-500">Admin dashboard</p>
            </div>
          </div>

          <h1 className="mt-8 text-2xl font-semibold tracking-tight">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage applications, jobs, enquiries and site content.
          </p>

          <LoginForm next={destination} />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Forgot the password? Change <code>ADMIN_PASSWORD</code> in the
          Vercel project settings and redeploy.
        </p>
      </div>
    </main>
  );
}
