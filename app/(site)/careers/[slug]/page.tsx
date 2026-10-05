import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/app/components/motion";
import { ButtonLink, Container, Eyebrow } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import { getOpenJob, listOpenJobs, type Job } from "@/lib/jobs";
import {
  breadcrumbJsonLd,
  JsonLd,
  ORGANIZATION_ID,
  pageMetadata,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

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

  return pageMetadata({
    title: `${job.title} — Careers`,
    description: job.description,
    path: `/careers/${job.slug}`,
  });
}

const EMPLOYMENT_TYPES: [RegExp, string][] = [
  [/full/i, "FULL_TIME"],
  [/part/i, "PART_TIME"],
  [/contract|freelance/i, "CONTRACTOR"],
  [/intern/i, "INTERN"],
  [/temp/i, "TEMPORARY"],
];

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const htmlList = (title: string, items: string[]) =>
  items.length
    ? `<h3>${title}</h3><ul>${items
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul>`
    : "";

// Google for Jobs structured data. Free-text fields are mapped to the
// schema.org vocabulary on a best-effort basis.
function jobPostingJsonLd(
  job: Job,
  site: { name: string; location: string }
) {
  const remote = /remote/i.test(job.location);
  const employmentType = EMPLOYMENT_TYPES.find(([pattern]) =>
    pattern.test(job.type)
  )?.[1];

  // "Itanagar / Hybrid" → locality "Itanagar"; the studio's own region is
  // filled in when the role is at the studio's city.
  const [siteLocality, siteRegion] = site.location
    .split(",")
    .map((part) => part.trim());
  const [jobLocality, jobRegion] = job.location
    .replace(/\b(?:hybrid|remote|on-?site|in-office|wfh)\b/gi, "")
    .split(/[,/|·()]/)
    .map((part) => part.trim())
    .filter(Boolean);
  const locality = jobLocality ?? siteLocality;
  const region =
    jobRegion ?? (locality === siteLocality ? siteRegion : undefined);
  const years = job.experience.match(/\d+/)?.[0];

  return {
    "@type": "JobPosting",
    title: job.title,
    description: [
      `<p>${escapeHtml(job.description)}</p>`,
      htmlList("Responsibilities", job.responsibilities),
      htmlList("Requirements", job.requirements),
      htmlList("What we offer", job.benefits),
    ].join(""),
    identifier: { "@type": "PropertyValue", name: site.name, value: job.slug },
    datePosted: new Date(job.created_at).toISOString(),
    // Listings are re-checked well within this window; closed roles 404.
    validThrough: new Date(
      new Date(job.updated_at).getTime() + 1000 * 60 * 60 * 24 * 90
    ).toISOString(),
    ...(employmentType && { employmentType }),
    hiringOrganization: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      sameAs: absoluteUrl("/"),
      logo: absoluteUrl("/apple-icon.png"),
    },
    directApply: true,
    url: absoluteUrl(`/careers/${job.slug}`),
    occupationalCategory: job.department,
    ...(years && {
      experienceRequirements: {
        "@type": "OccupationalExperienceRequirements",
        monthsOfExperience: Number(years) * 12,
      },
    }),
    ...(remote && {
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: "India" },
    }),
    // Fully remote roles have no office; hybrid ones list both.
    ...((jobLocality || !remote) && {
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: locality,
          ...(region && { addressRegion: region }),
          addressCountry: "IN",
        },
      },
    }),
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
  const [job, site] = await Promise.all([
    getOpenJob(slug),
    getContent("settings"),
  ]);

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
      <JsonLd
        data={{
          "@graph": [
            jobPostingJsonLd(job, site),
            breadcrumbJsonLd([
              { name: "Careers", path: "/careers" },
              { name: job.title, path: `/careers/${job.slug}` },
            ]),
          ],
        }}
      />
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
