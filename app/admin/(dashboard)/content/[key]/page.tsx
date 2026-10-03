import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import {
  isSectionKey,
  normalizeSection,
  SECTIONS,
} from "@/lib/content-schema";
import { sql } from "@/lib/db";
import ContentEditor from "../ContentEditor";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  await requireAdmin();
  const { key } = await params;

  if (!isSectionKey(key)) notFound();

  const section = SECTIONS[key];

  const rows = (await sql()`
    select value from site_content where key = ${key}
  `) as { value: unknown }[];
  const values = normalizeSection(key, rows[0]?.value);

  return (
    <>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link
          href="/admin/content"
          className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900"
        >
          ← All pages
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {section.title}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">{section.description}</p>
          </div>

          <a
            href={section.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            View live page
          </a>
        </div>

        <div className="mt-8">
          <ContentEditor
            sectionKey={key}
            fields={section.fields}
            initial={values}
            customized={rows.length > 0}
          />
        </div>
      </main>
    </>
  );
}
