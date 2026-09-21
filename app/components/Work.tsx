import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Work() {
  return (
    <section className="border-t border-[#0B4D2C]/10 bg-[#F7FAF7] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* SECTION HEADER */}

        <div className="mb-16 flex items-end justify-between gap-8">

          <div>

            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
              Selected work
            </p>

            <h2 className="mt-5 text-5xl font-medium tracking-tight text-[#06351F] md:text-7xl">
              Things we&apos;ve built.
            </h2>

          </div>

        </div>

        {/* PROJECTS */}

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