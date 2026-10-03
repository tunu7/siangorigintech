import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/app/components/motion";
import { ButtonLink, Container, Eyebrow } from "@/app/components/ui";
import { getOpenJob, listOpenJobs } from "@/lib/jobs";

type JobPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Open roles are prerendered; roles added later render on first visit.
// Admin job changes revalidate everything under /careers.
export async function generateStaticParams() {
  const jobs = await listOpenJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getOpenJob(slug);

  if (!job) return { title: "Role not found" };

  return {
    title: `${job.title} — Careers`,
    description: job.description,
  };
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal as="section" className="border-t border-line py-12 first:border-t-0">
      <Eyebrow>{title}</Eyebrow>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-4 text-lg leading-8 text-ink-soft">
            <span aria-hidden className="mt-[0.95rem] h-px w-4 shrink-0 bg-ink" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getOpenJob(slug);

  if (!job) notFound();

  const facts = [
    { label: "Department", value: job.department },
    { label: "Type", value: job.type },
    { label: "Location", value: job.location },
    { label: "Experience", value: job.experience },
    ...(job.salary ? [{ label: "Compensation", value: job.salary }] : []),
  ];

  return (
    <Container className="pb-24 sm:pb-32">
      <div className="pt-12 sm:pt-16">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
          All roles
        </Link>
      </div>

      <header className="border-b border-line pb-14 pt-12 sm:pb-20">
        <div className="animate-fade-up">
          <Eyebrow>{job.department}</Eyebrow>
        </div>
        <h1 className="font-display mt-6 max-w-4xl animate-fade-up text-5xl text-balance [animation-delay:80ms] sm:text-7xl">
          {job.title}
        </h1>
        <p className="mt-8 max-w-2xl animate-fade-up text-lg leading-8 text-ink-soft [animation-delay:160ms]">
          {job.description}
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
        <div>
          <ListSection title="Responsibilities" items={job.responsibilities} />
          <ListSection title="Requirements" items={job.requirements} />
          {job.benefits.length > 0 && (
            <ListSection title="What we offer" items={job.benefits} />
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start lg:pt-12">
          <dl className="divide-y divide-line border-y border-line text-sm">
            {facts.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-6 py-4">
                <dt className="text-muted">{fact.label}</dt>
                <dd className="text-right font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 [&>a]:w-full">
            <ButtonLink href={`/careers/${job.slug}/apply`} arrow>
              Apply for this role
            </ButtonLink>
          </div>
        </aside>
      </div>
    </Container>
  );
}
