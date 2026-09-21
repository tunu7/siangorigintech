import { projects } from "@/data/projects";
import ProjectCard from "@/app/components/ProjectCard";

export const metadata = {
  title: "Work | Siang Origin Technologies",
  description: "Selected work by Siang Origin Technologies.",
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FAF7] text-[#06351F]">
      {/* Ambient green glow */}
      <div className="pointer-events-none absolute -right-45 top-[10%] h-125 w-125 rounded-full bg-[#2F7D46]/5 blur-3xl animate-[workFloat_14s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute bottom-[15%] -left-45 h-105 w-105 rounded-full bg-[#176B3A]/4 blur-3xl animate-[workFloatReverse_16s_ease-in-out_infinite]" />

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

      {/* Floating technical dots */}
      <div className="pointer-events-none absolute right-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#2F7D46] opacity-50 animate-[workPulse_4s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute left-[10%] top-[48%] h-1 w-1 rounded-full bg-[#176B3A] opacity-40 animate-[workPulse_5s_ease-in-out_infinite_1s]" />

      <div className="pointer-events-none absolute bottom-[20%] right-[8%] h-1 w-1 rounded-full bg-[#2F7D46] opacity-40 animate-[workPulse_6s_ease-in-out_infinite_2s]" />

      {/* Main content */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-4xl animate-[workFadeUp_700ms_ease-out_both]">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
              Our work
            </p>

            <h1 className="mt-6 text-6xl font-medium leading-[0.88] tracking-[-0.065em] text-[#06351F] md:text-8xl">
              BUILT FOR
              <br />
              <span className="text-[#2F7D46]">THE REAL WORLD.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#617568]">
              Digital products, platforms and experiences designed to solve
              real problems and create meaningful business outcomes.
            </p>
          </div>

          {/* Projects */}
          <div className="mt-24 space-y-28">
            {projects.map((project, index) => (
              <div
                key={project.number}
                className="animate-[workFadeUp_700ms_ease-out_both]"
                style={{
                  animationDelay: `${150 + index * 120}ms`,
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Bottom accent */}
          <div className="mt-28 h-px w-full overflow-hidden bg-[#0B4D2C]/10">
            <div className="h-full w-24 bg-[#2F7D46] animate-[workLineMove_5s_linear_infinite]" />
          </div>

        </div>
      </section>

      {/* Animations */}
      <style>
        {`
          @keyframes workFadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes workFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(-30px, 25px, 0);
            }
          }

          @keyframes workFloatReverse {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(30px, -25px, 0);
            }
          }

          @keyframes workPulse {
            0%, 100% {
              opacity: 0.15;
              transform: translateY(0);
            }

            50% {
              opacity: 0.65;
              transform: translateY(-8px);
            }
          }

          @keyframes workLineMove {
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