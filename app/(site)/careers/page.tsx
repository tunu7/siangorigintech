import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, PageHeader } from "@/app/components/ui";
import { jobs } from "@/data/jobs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at Siang Origin Technologies.",
};

export default function CareersPage() {
  return (
    <Container className="py-24">
      <PageHeader
        eyebrow="Careers"
        title="Build with us"
        description="We are building digital products, growth systems and new ventures. Join us if you want to work on meaningful problems and help turn ideas into reality."
      />

      <section className="mt-20">
        <h2 className="text-sm font-medium text-zinc-500">
          Open positions ({jobs.length})
        </h2>

        {jobs.length > 0 ? (
          <ul className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
            {jobs.map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="group flex flex-wrap items-center justify-between gap-4 py-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-brand">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {[job.department, job.type, job.location].join(
                        " · "
                      )}
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
            There are no open positions at the moment.
          </p>
        )}
      </section>

      <section className="mt-20 rounded-xl bg-zinc-50 p-8 sm:p-10">
        <Eyebrow>Don&apos;t see your role?</Eyebrow>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Good people don&apos;t always fit into job descriptions.
        </h2>
        <p className="mt-3 max-w-xl text-zinc-600">
          If you think you can contribute to what we are building, send
          us a short introduction and your resume.
        </p>
        <a
          href={`mailto:${site.careersEmail}`}
          className="mt-6 inline-block text-sm font-medium text-brand hover:underline"
        >
          {site.careersEmail}
        </a>
      </section>
    </Container>
  );
}
