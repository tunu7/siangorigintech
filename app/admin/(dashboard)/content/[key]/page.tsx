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

      <main className="max-w-4xl px-6 py-10 lg:px-12">
        <Link
          href="/admin/content"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          ← All pages
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl">
              {section.title}
            </h1>
            <p className="mt-2 text-sm text-muted">{section.description}</p>
          </div>

          <a
            href={section.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink"
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
