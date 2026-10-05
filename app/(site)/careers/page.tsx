import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/motion";
import { Container, Eyebrow, PageHeader } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import { listOpenJobs } from "@/lib/jobs";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const careers = await getContent("careers");
  return pageMetadata({
    title: "Careers",
    description: careers.metaDescription,
    path: "/careers",
  });
}

export default async function CareersPage() {
  const [jobs, careers, site] = await Promise.all([
    listOpenJobs(),
    getContent("careers"),
    getContent("settings"),
  ]);

  return (
    <Container className="pb-24 sm:pb-32">
      <JsonLd
        data={webPageJsonLd({
          type: "CollectionPage",
          name: careers.title,
          description: careers.metaDescription,
          path: "/careers",
          breadcrumb: [{ name: "Careers", path: "/careers" }],
        })}
      />
      <PageHeader
        eyebrow={careers.eyebrow}
        title={careers.title}
        description={careers.intro}
      />

      <Reveal as="section" className="py-16 sm:py-20">
        <div className="flex items-baseline justify-between gap-4">
          <Eyebrow>{careers.listTitle}</Eyebrow>
          <span className="text-sm tabular-nums text-muted">
            {String(jobs.length).padStart(2, "0")}
          </span>
        </div>

        {jobs.length > 0 ? (
          <ul className="mt-6 border-t border-ink">
            {jobs.map((job) => (
              <li key={job.slug} className="border-b border-line">
                <Link
                  href={`/careers/${job.slug}`}
                  className="group grid gap-3 py-8 transition-colors md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_auto] md:items-center md:gap-8"
                >
                  <h2 className="font-display text-3xl transition-colors group-hover:text-brand sm:text-4xl">
                    {job.title}
                  </h2>
                  <p className="text-sm text-muted">
                    {[job.department, job.type, job.location].join(" · ")}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    View role
                    <ArrowRight
                      size={15}
                      strokeWidth={1.75}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 border-y border-line py-12 text-lg text-ink-soft">
            {careers.emptyText}
          </p>
        )}
      </Reveal>

      <Reveal
        as="section"
        className="grid gap-8 bg-paper-deep p-8 sm:p-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
      >
        <Eyebrow>{careers.openEyebrow}</Eyebrow>
        <div>
          <h2 className="font-display text-4xl text-balance">
            {careers.openTitle}
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-ink-soft">
            {careers.openText}
          </p>
          <a
            href={`mailto:${site.careersEmail}`}
            className="mt-8 inline-block border-b border-ink pb-0.5 text-sm font-medium hover:border-brand hover:text-brand"
          >
            {site.careersEmail}
          </a>
        </div>
      </Reveal>
    </Container>
  );
}
