import Link from "next/link";
import { jobs } from "@/data/jobs";

export const metadata = {
  title: "Careers | Siang Origin Technologies",
  description:
    "Explore career opportunities at Siang Origin Technologies.",
};

export default function CareersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FAF7] text-[#06351F]">
      {/* Ambient green glow */}
      <div className="pointer-events-none absolute -right-50 top-[8%] h-130 w-130 rounded-full bg-[#2F7D46]/5 blur-3xl animate-[careerFloat_14s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute bottom-[15%] -left-45 h-105 w-105 rounded-full bg-[#176B3A]/4 blur-3xl animate-[careerFloatReverse_16s_ease-in-out_infinite]" />

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
      <div className="pointer-events-none absolute right-[15%] top-[24%] h-1.5 w-1.5 rounded-full bg-[#2F7D46] opacity-50 animate-[careerPulse_4s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute left-[9%] top-[46%] h-1 w-1 rounded-full bg-[#176B3A] opacity-40 animate-[careerPulse_5s_ease-in-out_infinite_1s]" />

      <div className="pointer-events-none absolute bottom-[20%] right-[10%] h-1 w-1 rounded-full bg-[#2F7D46] opacity-40 animate-[careerPulse_6s_ease-in-out_infinite_2s]" />

      <section className="relative z-10 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Hero */}
          <div className="max-w-5xl animate-[careerFadeUp_700ms_ease-out_both]">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
              Careers
            </p>

            <h1 className="mt-6 text-6xl font-medium leading-[0.88] tracking-[-0.065em] text-[#06351F] md:text-8xl lg:text-[9rem]">
              BUILD
              <br />
              <span className="text-[#2F7D46]">WITH US.</span>
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-8 text-[#617568] md:text-xl">
              We are building digital products, growth systems and new
              ventures. Join us if you want to work on meaningful problems
              and help turn ideas into reality.
            </p>
          </div>

          {/* Jobs */}
          <section className="mt-32 lg:mt-40">
            <div className="border-t border-[#0B4D2C]/10">

              <div className="py-8">
                <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
                  Open Positions
                </p>
              </div>

              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <Link
  key={job.slug}
  href={`/careers/${job.slug}`}
  className="
    group
    relative
    block
    overflow-hidden
    border-t
    border-[#0B4D2C]/10
    py-8
    transition-all
    duration-300
    hover:bg-[#EAF3EC]/35
  "
  style={{
    animation: "careerFadeUp 700ms ease-out both",
    animationDelay: `${150 + index * 100}ms`,
  }}
>
  {/* Green hover line */}
  <span className="absolute left-0 top-0 h-px w-0 bg-[#2F7D46] transition-all duration-500 group-hover:w-full" />

  <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">

    <div>
      <h2 className="text-2xl font-medium tracking-tight text-[#06351F] transition-colors duration-300 group-hover:text-[#176B3A] md:text-3xl">
        {job.title}
      </h2>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#617568]">
        <span>{job.department}</span>
        <span className="text-[#A8D5B4]">•</span>
        <span>{job.type}</span>
        <span className="text-[#A8D5B4]">•</span>
        <span>{job.location}</span>
      </div>
    </div>

    {/* View Role CTA */}
    <span
      className="
        inline-flex
        w-fit
        items-center
        gap-3
        rounded-full
        border
        border-[#0B4D2C]/20
        bg-white
        px-5
        py-3
        text-xs
        font-medium
        uppercase
        tracking-[0.12em]
        text-[#0B4D2C]
        shadow-sm
        transition-all
        duration-300
        group-hover:border-[#0B4D2C]
        group-hover:bg-[#0B4D2C]
        group-hover:text-white
        group-hover:shadow-[0_8px_25px_rgba(11,77,44,0.15)]
      "
    >
      <span>View Role</span>

      <span
        className="
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          bg-[#EAF3EC]
          text-[#0B4D2C]
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:bg-white
        "
      >
        →
      </span>
    </span>

  </div>
</Link>
                ))
              ) : (
                <div className="border-t border-[#0B4D2C]/10 py-12">
                  <p className="text-lg text-[#617568]">
                    There are no open positions at the moment.
                  </p>
                </div>
              )}

            </div>
          </section>

          {/* General Application */}
          <section className="mt-32 border-t border-[#0B4D2C]/10 pt-12 lg:mt-40">

            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
              Don&apos;t see your role?
            </p>

            <div className="mt-8 max-w-3xl">

              <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] text-[#06351F] md:text-5xl">
                Good people don&apos;t always
                <br />
                <span className="text-[#2F7D46]">
                  fit into job descriptions.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#617568]">
                If you think you can contribute to what we are building,
                introduce yourself.
              </p>

              <a
                href="mailto:careers@siangorigin.com"
                className="group mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-wider text-[#0B4D2C]"
              >
                <span className="relative">
                  Send an Introduction
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-[#2F7D46] transition-transform duration-300 group-hover:scale-x-0" />
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

            </div>
          </section>

          {/* Bottom accent */}
          <div className="mt-28 h-px w-full overflow-hidden bg-[#0B4D2C]/10">
            <div className="h-full w-24 bg-[#2F7D46] animate-[careerLineMove_5s_linear_infinite]" />
          </div>

        </div>
      </section>

      {/* Animations */}
      <style>
        {`
          @keyframes careerFadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes careerFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(-30px, 25px, 0);
            }
          }

          @keyframes careerFloatReverse {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(30px, -25px, 0);
            }
          }

          @keyframes careerPulse {
            0%, 100% {
              opacity: 0.15;
              transform: translateY(0);
            }

            50% {
              opacity: 0.65;
              transform: translateY(-8px);
            }
          }

          @keyframes careerLineMove {
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