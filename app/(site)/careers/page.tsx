import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/motion";
import {
  Container,
  Eyebrow,
  PageBackdrop,
  PageHeader,
} from "@/app/components/ui";
import { listOpenJobs } from "@/lib/jobs";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const careers = await getContent("careers");
  return { title: "Careers", description: careers.metaDescription };
}

export default async function CareersPage() {
  const [jobs, careers, site] = await Promise.all([
    listOpenJobs(),
    getContent("careers"),
    getContent("settings"),
  ]);

  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="py-24">
        <PageHeader
          eyebrow={careers.eyebrow}
          title={careers.title}
          description={careers.intro}
        />

        <Reveal as="section" className="mt-20">
          <h2 className="text-sm font-medium text-zinc-500">
            {careers.listTitle} ({jobs.length})
          </h2>

          {jobs.length > 0 ? (
            <ul className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
              {jobs.map((job) => (
                <li key={job.slug}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="group -mx-4 flex flex-wrap items-center justify-between gap-4 rounded-lg px-4 py-6 transition-colors hover:bg-zinc-50"
                  >
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-brand">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        {[job.department, job.type, job.location].join(" · ")}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 group-hover:text-brand">
                      View role
                      <ArrowRight
                        size={16}
                        aria-hidden
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 border-y border-zinc-200 py-10 text-zinc-500">
              {careers.emptyText}
            </p>
          )}
        </Reveal>

        <Reveal
          as="section"
          className="mt-20 rounded-xl border border-zinc-200 bg-zinc-50 p-8 sm:p-10"
        >
          <Eyebrow>{careers.openEyebrow}</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {careers.openTitle}
          </h2>
          <p className="mt-3 max-w-xl text-zinc-600">{careers.openText}</p>
          <a
            href={`mailto:${site.careersEmail}`}
            className="mt-6 inline-block text-sm font-medium text-brand hover:underline"
          >
            {site.careersEmail}
          </a>
        </Reveal>
      </Container>
    </div>
  );
}
