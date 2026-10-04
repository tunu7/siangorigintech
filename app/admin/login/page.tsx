import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdmin, safeNextPath } from "@/lib/auth";
import { getContent } from "@/lib/content";
import Logo from "@/app/components/Logo";
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
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-ink p-12 text-paper lg:flex">
        <div className="flex items-center gap-3">
          <Logo className="h-6 w-auto" />
          <span className="text-sm font-medium">{site.shortName}</span>
        </div>
        <p className="font-display max-w-md text-5xl leading-[1.05]">
          Everything behind the site, in one quiet place.
        </p>
        <p className="text-xs text-paper/50">
          Applications · Jobs · Enquiries · Pages · Projects
        </p>
      </section>

      <section className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
            Back to site
          </Link>

          <p className="mt-16 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            Admin
          </p>
          <h1 className="font-display mt-4 text-5xl">Sign in</h1>
          <p className="mt-3 text-sm text-muted">
            Enter the team password to continue.
          </p>

          <LoginForm next={destination} />

          <p className="mt-16 text-xs leading-5 text-muted">
            Forgot the password? Change <code>ADMIN_PASSWORD</code> in the
            Vercel project settings and redeploy.
          </p>
        </div>
      </section>
    </main>
  );
}
