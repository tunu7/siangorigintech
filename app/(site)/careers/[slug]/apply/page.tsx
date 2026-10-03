import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container, Eyebrow } from "@/app/components/ui";
import { getOpenJob, listOpenJobs } from "@/lib/jobs";
import ApplyForm from "./ApplyForm";

type ApplyPageProps = {
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
}: ApplyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getOpenJob(slug);

  return {
    title: job ? `Apply — ${job.title}` : "Apply",
    robots: { index: false },
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;
  const job = await getOpenJob(slug);

  if (!job) notFound();

  return (
    <Container className="max-w-3xl! pb-24 sm:pb-32">
      <div className="pt-12 sm:pt-16">
        <Link
          href={`/careers/${slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
          Back to role
        </Link>
      </div>

      <header className="border-b border-line pb-12 pt-12 animate-fade-up">
        <Eyebrow>Application</Eyebrow>
        <h1 className="font-display mt-6 text-5xl text-balance sm:text-6xl">
          {job.title}
        </h1>
        <p className="mt-4 text-muted">
          {[job.type, job.location].join(" · ")}
        </p>
      </header>

      <div className="animate-fade-up pt-12 [animation-delay:150ms]">
        <ApplyForm slug={slug} />
      </div>
    </Container>
  );
}
