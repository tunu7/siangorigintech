import { Suspense } from "react";
import Link from "next/link";
import { sql } from "@/lib/db";
import { signOut } from "../actions";
import AdminNav from "./AdminNav";

async function NavWithCounts() {
  let counts = { applications: 0, enquiries: 0 };

  try {
    const [row] = (await sql()`
      select
        (select count(*)::int from applications where status = 'new') as applications,
        (select count(*)::int from enquiries
          where read_at is null and not archived) as enquiries
    `) as (typeof counts)[];
    counts = row;
  } catch (error) {
    console.error("ADMIN COUNTS ERROR:", error);
  }

  return <AdminNav counts={counts} />;
}

export default function AdminHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/admin"
            className="text-sm font-semibold tracking-[-0.02em]"
          >
            SIANG ORIGIN{" "}
            <span className="font-normal text-zinc-500">/ Admin</span>
          </Link>

          {/* Counts stream in without blocking the page. */}
          <Suspense
            fallback={<AdminNav counts={{ applications: 0, enquiries: 0 }} />}
          >
            <NavWithCounts />
          </Suspense>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-900"
          >
            View site
          </a>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md border border-zinc-300 px-4 py-1.5 transition-colors hover:border-brand hover:text-brand"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
