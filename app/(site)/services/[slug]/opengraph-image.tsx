import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { findService, serviceSlug } from "@/lib/content-schema";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Service by Siang Origin Technologies";

// Prerendered with the service pages; admin saves revalidate the site.
export async function generateStaticParams() {
  const services = await getContent("services");
  return services.categories.map((service) => ({
    slug: serviceSlug(service.title),
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = findService(await getContent("services"), (await params).slug);
  if (!service) notFound();

  return ogImage({
    eyebrow: `Services · ${service.summary}`,
    title: service.title,
  });
}
