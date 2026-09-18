import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs, getJobBySlug } from "@/data/jobs";

type JobPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: JobPageProps) {
  const { slug } = await params;

  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found | Siang Origin Technologies",
    };
  }

  return {
    title: `${job.title} | Careers | Siang Origin Technologies`,
    description: job.description,
  };
}

export default async function JobPage({
  params,
}: JobPageProps) {
  const { slug } = await params;

  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="pt-40 pb-24 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Back */}
        <Link
          href="/careers"
          className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-black"
        >
          ← Back to Careers
        </Link>

        {/* Header */}
        <div className="mt-16 max-w-5xl">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            {job.department}
          </p>

          <h1 className="mt-6 text-5xl font-medium leading-[0.9] tracking-[-0.06em] md:text-7xl lg:text-8xl">
            {job.title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-500">
            <span>{job.type}</span>
            <span>{job.location}</span>
            <span>{job.experience}</span>

            {job.salary && (
              <span>{job.salary}</span>
            )}
          </div>

        </div>

        {/* About */}
        <section className="mt-24 grid gap-12 border-t border-neutral-300 pt-12 md:grid-cols-[1fr_2fr]">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            About the Role
          </p>

          <p className="max-w-3xl text-xl leading-8 text-neutral-600 md:text-2xl md:leading-9">
            {job.description}
          </p>

        </section>

        {/* Responsibilities */}
        <section className="mt-24 grid gap-12 border-t border-neutral-300 pt-12 md:grid-cols-[1fr_2fr]">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Responsibilities
          </p>

          <ul className="max-w-3xl space-y-5">
            {job.responsibilities.map((item, index) => (
              <li
                key={index}
                className="flex gap-5 text-lg leading-8 text-neutral-600"
              >
                <span className="text-sm text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>

        </section>

        {/* Requirements */}
        <section className="mt-24 grid gap-12 border-t border-neutral-300 pt-12 md:grid-cols-[1fr_2fr]">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Requirements
          </p>

          <ul className="max-w-3xl space-y-5">
            {job.requirements.map((item, index) => (
              <li
                key={index}
                className="flex gap-5 text-lg leading-8 text-neutral-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />

                <span>{item}</span>
              </li>
            ))}
          </ul>

        </section>

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <section className="mt-24 grid gap-12 border-t border-neutral-300 pt-12 md:grid-cols-[1fr_2fr]">

            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              What We Offer
            </p>

            <ul className="max-w-3xl space-y-5">
              {job.benefits.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-5 text-lg leading-8 text-neutral-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </section>
        )}

        {/* Apply CTA */}
        <section className="mt-32 border-t border-neutral-300 pt-12 lg:mt-40">

          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">

            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Interested?
            </p>

            <div>
              <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
                Let's build
                <br />
                something useful.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-500">
                Tell us about yourself, your experience and why you
                want to join Siang Origin Technologies.
              </p>

              <Link
                href={`/careers/${job.slug}/apply`}
                className="mt-8 inline-flex rounded-full bg-black px-6 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Apply for this role →
              </Link>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}