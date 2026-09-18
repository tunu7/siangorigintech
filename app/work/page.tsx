import { projects } from "@/data/projects";
import ProjectCard from "@/app/components/ProjectCard";

export const metadata = {
  title: "Work",
  description: "Selected work by Siang Origin Technologies.",
};

export default function WorkPage() {
  return (
    <section className="pt-40 pb-24 lg:pt-48 lg:pb-32">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Our work
          </p>

          <h1 className="mt-6 text-6xl font-medium tracking-tighter md:text-8xl">
            BUILT FOR
            <br />
            THE REAL WORLD.
          </h1>
        </div>

        <div className="mt-24 space-y-28">
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