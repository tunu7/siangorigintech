import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { SECTIONS, type SectionKey } from "@/lib/content-schema";
import { sql } from "@/lib/db";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function ContentPage() {
  await requireAdmin();

  const rows = (await sql()`
    select key, updated_at from site_content
  `) as { key: string; updated_at: string }[];

  const edited = new Map(rows.map((row) => [row.key, row.updated_at]));

  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          Website
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Pages &amp; content
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Edit the text on every page of the public site. Changes go live as
          soon as you save.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(SECTIONS) as SectionKey[]).map((key) => {
            const section = SECTIONS[key];
            const updated = edited.get(key);

            return (
              <li key={key}>
                <Link
                  href={`/admin/content/${key}`}
                  className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-brand"
                >
                  <span className="font-medium">{section.title}</span>
                  <span className="mt-1 flex-1 text-sm text-zinc-500">
                    {section.description}
                  </span>
                  <span className="mt-4 text-xs text-zinc-400">
                    {updated
                      ? `Edited ${dateFormat.format(new Date(updated))}`
                      : "Original text"}
                  </span>
                </Link>
              </li>
            );
          })}

          <li>
            <Link
              href="/admin/projects"
              className="flex h-full flex-col rounded-xl border border-dashed border-zinc-300 bg-white p-5 transition-colors hover:border-brand"
            >
              <span className="font-medium">Projects</span>
              <span className="mt-1 flex-1 text-sm text-zinc-500">
                Portfolio shown on the home and work pages.
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/jobs"
              className="flex h-full flex-col rounded-xl border border-dashed border-zinc-300 bg-white p-5 transition-colors hover:border-brand"
            >
              <span className="font-medium">Jobs</span>
              <span className="mt-1 flex-1 text-sm text-zinc-500">
                Roles listed on the careers page.
              </span>
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
