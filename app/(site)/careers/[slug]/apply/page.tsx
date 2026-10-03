import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container, Eyebrow, PageBackdrop } from "@/app/components/ui";
import { getJobBySlug, jobs } from "@/data/jobs";
import ApplyForm from "./ApplyForm";

type ApplyPageProps = {
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
}: ApplyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  return {
    title: job ? `Apply — ${job.title}` : "Apply",
    robots: { index: false },
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) notFound();

  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="max-w-3xl! py-16 sm:py-24">
        <Link
          href={`/careers/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to role
        </Link>

        <header className="mt-10 animate-fade-up">
          <Eyebrow>Application</Eyebrow>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {job.title}
          </h1>
          <p className="mt-3 text-zinc-600">
            {[job.type, job.location].join(" · ")}
          </p>
        </header>

        <div className="mt-12 animate-fade-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm [animation-delay:150ms] sm:p-10">
          <ApplyForm slug={slug} />
        </div>
      </Container>
    </div>
  );
}
