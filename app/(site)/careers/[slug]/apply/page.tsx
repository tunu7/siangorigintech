import { notFound } from "next/navigation";
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

export async function generateMetadata({ params }: ApplyPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  return { title: job ? `Apply — ${job.title}` : "Apply" };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;

  if (!getJobBySlug(slug)) notFound();

  return <ApplyForm slug={slug} />;
}
