import Link from "next/link";
import { jobs } from "@/data/jobs";

export const metadata = {
  title: "Careers | Siang Origin Technologies",
  description:
    "Explore career opportunities at Siang Origin Technologies.",
};

export default function CareersPage() {
  return (
    <main className="pt-40 pb-24 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Hero */}
        <div className="max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Careers
          </p>

          <h1 className="mt-6 text-6xl font-medium leading-[0.88] tracking-[-0.065em] md:text-8xl lg:text-[9rem]">
            BUILD
            <br />
            WITH US.
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-8 text-neutral-500 md:text-xl">
            We are building digital products, growth systems and new
            ventures. Join us if you want to work on meaningful problems
            and help turn ideas into reality.
          </p>
        </div>

        {/* Jobs */}
        <section className="mt-32 lg:mt-40">
          <div className="border-t border-neutral-300">

            <div className="py-8">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Open Positions
              </p>
            </div>

            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Link
                  key={job.slug}
                  href={`/careers/${job.slug}`}
                  className="group block border-t border-neutral-200 py-8 transition-opacity hover:opacity-60"
                >
                  <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">

                    <div>
                      <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                        {job.title}
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-500">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <span className="text-sm uppercase tracking-wider text-neutral-400 transition-transform group-hover:translate-x-1">
                      View Role →
                    </span>

                  </div>
                </Link>
              ))
            ) : (
              <div className="border-t border-neutral-200 py-12">
                <p className="text-lg text-neutral-500">
                  There are no open positions at the moment.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* General Application */}
        <section className="mt-32 border-t border-neutral-300 pt-12 lg:mt-40">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Don't see your role?
          </p>

          <div className="mt-8 max-w-3xl">

            <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
              Good people don't always
              <br />
              fit into job descriptions.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-500">
              If you think you can contribute to what we are building,
              introduce yourself.
            </p>

            <a
              href="mailto:careers@siangorigin.com"
              className="mt-8 inline-block text-sm uppercase tracking-wider underline underline-offset-4"
            >
              Send an Introduction →
            </a>

          </div>

        </section>

      </div>
    </main>
  );
}