import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Work() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Selected work
            </p>

            <h2 className="mt-5 text-5xl font-medium tracking-tight md:text-7xl">
              Things weve built.
            </h2>
          </div>
        </div>

        <div className="space-y-24">
          {projects.map((project) => (
            <ProjectCard
              key={project.number}
              project={project}
            />
          ))}
        </div>

      </div>
    </section>
  );
}