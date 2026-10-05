import type { MetadataRoute } from "next";
import { batch, sql } from "@/lib/db";
import { mediaUrl } from "@/lib/media";
import { absoluteUrl } from "@/lib/site";

// Refreshed by admin saves (see the revalidatePath calls) and hourly.
export const revalidate = 3600;

type Row = { updated_at: string | null };
type JobRow = { slug: string; updated_at: string };
type ProjectRow = { image: string | null; updated_at: string };

async function load() {
  try {
    return await batch<[Row[], JobRow[], ProjectRow[]]>([
      sql()`select max(updated_at) as updated_at from site_content`,
      sql()`select slug, updated_at from jobs where is_open order by sort_order, created_at desc`,
      sql()`select image, updated_at from projects where published order by sort_order, created_at`,
    ]);
  } catch (error) {
    console.error("SITEMAP LOAD ERROR:", error);
    return null;
  }
}

const latest = (...dates: (string | Date | null | undefined)[]) => {
  const times = dates
    .filter((date): date is string | Date => Boolean(date))
    .map((date) => new Date(date).getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await load();
  const [content, jobs, projects] = data ?? [[], [], []];

  const contentUpdated = content[0]?.updated_at;
  const projectsUpdated = latest(...projects.map((p) => p.updated_at));
  const jobsUpdated = latest(...jobs.map((j) => j.updated_at));
  const images = projects
    .filter((p) => p.image)
    .map((p) => absoluteUrl(mediaUrl(p.image!)));

  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    lastModified?: Date
  ): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    {
      ...page("/", 1, "weekly", latest(contentUpdated, projectsUpdated)),
      ...(images.length > 0 && { images }),
    },
    {
      ...page("/work", 0.9, "monthly", latest(contentUpdated, projectsUpdated)),
      ...(images.length > 0 && { images }),
    },
    page("/about", 0.8, "monthly", latest(contentUpdated)),
    page("/careers", 0.8, "weekly", latest(contentUpdated, jobsUpdated)),
    page("/contact", 0.7, "yearly", latest(contentUpdated)),
    ...jobs.map((job) =>
      page(`/careers/${job.slug}`, 0.7, "weekly", new Date(job.updated_at))
    ),
  ];
}
