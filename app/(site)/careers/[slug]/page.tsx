import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/app/components/motion";
import {
  ButtonLink,
  Container,
  Eyebrow,
  PageBackdrop,
} from "@/app/components/ui";
import { getJobBySlug, jobs } from "@/data/jobs";

type JobPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) return { title: "Role not found" };

  return {
    title: `${job.title} — Careers`,
    description: job.description,
  };
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal as="section" className="border-t border-zinc-200 py-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-zinc-600">
            <span
              aria-hidden
              className="mt-2.75 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
            />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) notFound();

  const facts = [
    { label: "Department", value: job.department },
    { label: "Type", value: job.type },
    { label: "Location", value: job.location },
    { label: "Experience", value: job.experience },
    ...(job.salary ? [{ label: "Salary", value: job.salary }] : []),
  ];

  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="py-16 sm:py-24">
        <Link
          href="/careers"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={16} aria-hidden />
          All positions
        </Link>

        <header className="mt-10 max-w-3xl animate-fade-up">
          <Eyebrow>{job.department}</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {job.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            {job.description}
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <ListSection
              title="Responsibilities"
              items={job.responsibilities}
            />
            <ListSection title="Requirements" items={job.requirements} />
            {job.benefits && job.benefits.length > 0 && (
              <ListSection title="What we offer" items={job.benefits} />
            )}
          </div>

          <aside className="animate-fade-up [animation-delay:200ms] lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
              <dl className="space-y-4 text-sm">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-zinc-500">{fact.label}</dt>
                    <dd className="mt-0.5 font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 [&>a]:w-full">
                <ButtonLink href={`/careers/${job.slug}/apply`} arrow>
                  Apply for this role
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
