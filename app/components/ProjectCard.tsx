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

      {/* PROJECT IMAGE */}

      <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-[#EAF3EC]">

        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle green overlay */}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#0B4D2C]/0 via-transparent to-[#0B4D2C]/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Corner accent */}

        <div className="absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full bg-[#A8D5B4] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      </div>

      {/* PROJECT INFORMATION */}

      <div className="mt-6 flex justify-between gap-6">

        <div>

          {/* NUMBER + CATEGORY */}

          <div className="flex items-center gap-3">

            <span className="text-xs font-medium text-[#2F7D46]">
              {project.number}
            </span>

            <span className="h-px w-5 bg-[#2F7D46]/30" />

            <span className="text-xs uppercase tracking-wider text-[#617568]">
              {project.category}
            </span>

          </div>

          {/* TITLE */}

          <h3 className="mt-3 text-3xl font-medium tracking-tight text-[#06351F] transition-colors duration-300 group-hover:text-[#176B3A]">
            {project.title}
          </h3>

          {/* DESCRIPTION */}

          <p className="mt-2 max-w-md text-sm leading-6 text-[#617568]">
            {project.description}
          </p>

        </div>

        {/* ARROW */}

        <div className="flex shrink-0 items-start">

          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0B4D2C]/10 text-[#0B4D2C] transition-all duration-300 group-hover:border-[#2F7D46]/30 group-hover:bg-[#EAF3EC]">

            <ArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />

          </span>

        </div>

      </div>

    </article>
  );
}