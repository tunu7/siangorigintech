import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/app/components/ui";
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
    robots: { index: false, follow: true },
    alternates: { canonical: `/careers/${slug}` },
  };
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;
  const job = await getOpenJob(slug);

  if (!job) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Application"
        title={job.title}
        description={[job.type, job.location].join(" · ")}
        back={{ href: `/careers/${slug}`, label: "Back to role" }}
      />

      <Container className="max-w-3xl! pb-24 sm:pb-32">
        <div className="animate-fade-up pt-12 sm:pt-16 [animation-delay:150ms]">
          <ApplyForm slug={slug} />
        </div>
      </Container>
    </>
  );
}
