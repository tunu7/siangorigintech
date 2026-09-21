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
    <main className="relative min-h-screen overflow-hidden bg-[#F7FAF7] text-[#06351F]">

      {/* Ambient green glow */}
      <div className="pointer-events-none absolute -right-50 top-[8%] h-130 w-130 rounded-full bg-[#2F7D46]/5 blur-3xl animate-[jobFloat_14s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute bottom-[15%] -left-45 h-105 w-105 rounded-full bg-[#176B3A]/4 blur-3xl animate-[jobFloatReverse_16s_ease-in-out_infinite]" />

      {/* Technical grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0B4D2C 1px, transparent 1px),
              linear-gradient(to bottom, #0B4D2C 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating dots */}
      <div className="pointer-events-none absolute right-[14%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#2F7D46] opacity-50 animate-[jobPulse_4s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute left-[9%] top-[48%] h-1 w-1 rounded-full bg-[#176B3A] opacity-40 animate-[jobPulse_5s_ease-in-out_infinite_1s]" />

      <div className="pointer-events-none absolute bottom-[18%] right-[10%] h-1 w-1 rounded-full bg-[#2F7D46] opacity-40 animate-[jobPulse_6s_ease-in-out_infinite_2s]" />

      <section className="relative z-10 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Back */}
          <Link
            href="/careers"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#617568] transition-colors duration-300 hover:text-[#0B4D2C]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to Careers
          </Link>

          {/* Header */}
          <div className="mt-16 max-w-5xl animate-[jobFadeUp_700ms_ease-out_both]">

            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
              {job.department}
            </p>

            <h1 className="mt-6 text-5xl font-medium leading-[0.9] tracking-[-0.06em] text-[#06351F] md:text-7xl lg:text-8xl">
              {job.title}
            </h1>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#617568]">
              <span>{job.type}</span>
              <span className="text-[#A8D5B4]">•</span>

              <span>{job.location}</span>
              <span className="text-[#A8D5B4]">•</span>

              <span>{job.experience}</span>

              {job.salary && (
                <>
                  <span className="text-[#A8D5B4]">•</span>
                  <span>{job.salary}</span>
                </>
              )}
            </div>
          </div>

          {/* About */}
          <section className="mt-24 grid gap-12 border-t border-[#0B4D2C]/10 pt-12 md:grid-cols-[1fr_2fr]">

            <p className="flex items-start gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7D46]" />
              About the Role
            </p>

            <p className="max-w-3xl text-xl leading-8 text-[#617568] md:text-2xl md:leading-9">
              {job.description}
            </p>

          </section>

          {/* Responsibilities */}
          <section className="mt-24 grid gap-12 border-t border-[#0B4D2C]/10 pt-12 md:grid-cols-[1fr_2fr]">

            <p className="flex items-start gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7D46]" />
              Responsibilities
            </p>

            <ul className="max-w-3xl space-y-5">
              {job.responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="group flex gap-5 text-lg leading-8 text-[#617568]"
                >
                  <span className="text-sm text-[#2F7D46] transition-transform duration-300 group-hover:translate-x-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="transition-colors duration-300 group-hover:text-[#06351F]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

          </section>

          {/* Requirements */}
          <section className="mt-24 grid gap-12 border-t border-[#0B4D2C]/10 pt-12 md:grid-cols-[1fr_2fr]">

            <p className="flex items-start gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7D46]" />
              Requirements
            </p>

            <ul className="max-w-3xl space-y-5">
              {job.requirements.map((item, index) => (
                <li
                  key={index}
                  className="group flex gap-5 text-lg leading-8 text-[#617568]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A8D5B4] transition-all duration-300 group-hover:bg-[#2F7D46] group-hover:scale-125" />

                  <span className="transition-colors duration-300 group-hover:text-[#06351F]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

          </section>

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <section className="mt-24 grid gap-12 border-t border-[#0B4D2C]/10 pt-12 md:grid-cols-[1fr_2fr]">

              <p className="flex items-start gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7D46]" />
                What We Offer
              </p>

              <ul className="max-w-3xl space-y-5">
                {job.benefits.map((item, index) => (
                  <li
                    key={index}
                    className="group flex gap-5 text-lg leading-8 text-[#617568]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A8D5B4] transition-all duration-300 group-hover:bg-[#2F7D46] group-hover:scale-125" />

                    <span className="transition-colors duration-300 group-hover:text-[#06351F]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

            </section>
          )}

          {/* Apply CTA */}
          <section className="mt-32 border-t border-[#0B4D2C]/10 pt-12 lg:mt-40">

            <div className="grid gap-8 md:grid-cols-[1fr_2fr]">

              <p className="flex items-start gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7D46]" />
                Interested?
              </p>

              <div>
                <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] text-[#06351F] md:text-5xl">
                  Let&apos;s build
                  <br />
                  <span className="text-[#2F7D46]">
                    something useful.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-[#617568]">
                  Tell us about yourself, your experience and why you
                  want to join Siang Origin Technologies.
                </p>

                <Link
  href={`/careers/${job.slug}/apply`}
  className="
    group
    mt-8
    inline-flex
    items-center
    gap-4
    rounded-full
    !bg-[#0B4D2C]
    py-2
    pl-7
    pr-2
    text-sm
    font-medium
    uppercase
    tracking-[0.12em]
    !text-white
    shadow-[0_8px_30px_rgba(11,77,44,0.12)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:!bg-[#176B3A]
    hover:shadow-[0_14px_35px_rgba(11,77,44,0.22)]
  "
>
  <span>Apply for this role</span>

  <span
    className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-full
      !bg-[#EAF3EC]
      !text-[#0B4D2C]
      transition-all
      duration-300
      group-hover:translate-x-0.5
      group-hover:!bg-white
      group-hover:!text-[#0B4D2C]
    "
  >
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </span>
</Link>
              </div>

            </div>

          </section>

          {/* Bottom accent */}
          <div className="mt-28 h-px w-full overflow-hidden bg-[#0B4D2C]/10">
            <div className="h-full w-24 bg-[#2F7D46] animate-[jobLineMove_5s_linear_infinite]" />
          </div>

        </div>
      </section>

      {/* Animations */}
      <style>
        {`
          @keyframes jobFadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes jobFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(-30px, 25px, 0);
            }
          }

          @keyframes jobFloatReverse {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(30px, -25px, 0);
            }
          }

          @keyframes jobPulse {
            0%, 100% {
              opacity: 0.15;
              transform: translateY(0);
            }

            50% {
              opacity: 0.65;
              transform: translateY(-8px);
            }
          }

          @keyframes jobLineMove {
            0% {
              transform: translateX(-150%);
            }

            100% {
              transform: translateX(1100%);
            }
          }
        `}
      </style>
    </main>
  );
}