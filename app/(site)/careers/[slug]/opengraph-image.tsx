import { notFound } from "next/navigation";
import { getOpenJob, listOpenJobs } from "@/lib/jobs";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Open role at Siang Origin Technologies";

// Prerendered with the job pages; admin job changes revalidate /careers.
export async function generateStaticParams() {
  const jobs = await listOpenJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const job = await getOpenJob((await params).slug);
  if (!job) notFound();

  return ogImage({
    eyebrow: `Careers · ${[job.type, job.location].join(" · ")}`,
    title: job.title,
  });
}
