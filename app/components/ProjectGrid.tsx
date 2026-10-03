import type { Project } from "@/lib/projects";
import { Reveal, TiltCard } from "./motion";

const covers = [
  "from-brand to-brand-light",
  "from-zinc-900 to-brand",
  "from-brand-light to-mint",
];

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {projects.map((project, index) => (
        <Reveal as="li" key={project.id} delay={index * 120}>
          <TiltCard className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand/10">
            <div
              className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-linear-to-br ${covers[index % covers.length]}`}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(255_255_255/0.15)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.15)_1px,transparent_1px)] [background-size:28px_28px]"
              />
              <div
                aria-hidden
                className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border border-white/20 transition-transform duration-700 group-hover/tilt:scale-125"
              />
              <span className="relative text-6xl font-semibold tracking-tighter text-white/90 transition-transform duration-500 [transform:translateZ(40px)] group-hover/tilt:scale-110">
                {project.mark}
              </span>
              <span className="absolute left-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                {project.category}
              </span>
            </div>

            <div className="p-6">
              <span className="text-xs tabular-nums text-zinc-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0 hover:text-brand"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {project.description}
              </p>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </ul>
  );
}
