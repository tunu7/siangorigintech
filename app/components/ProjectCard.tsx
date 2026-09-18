import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <article className="group cursor-pointer">

      <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-neutral-200">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="mt-6 flex justify-between gap-6">

        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400">
              {project.number}
            </span>

            <span className="text-xs uppercase tracking-wider text-neutral-400">
              {project.category}
            </span>
          </div>

          <h3 className="mt-3 text-3xl font-medium tracking-tight">
            {project.title}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
            {project.description}
          </p>
        </div>

        <ArrowUpRight
          size={22}
          className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />

      </div>

    </article>
  );
}