import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { mediaUrl } from "@/lib/media";
import type { Project } from "@/lib/projects";
import { Reveal } from "./motion";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
      {projects.map((project, index) => (
        <Reveal as="li" key={project.id} delay={(index % 2) * 100}>
          <article className="group relative">
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-paper-deep">
              {project.image ? (
                <Image
                  src={mediaUrl(project.image)}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <span className="font-display text-8xl text-ink/80 transition-transform duration-700 ease-out group-hover:scale-105">
                  {project.mark}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-ink-soft">
                  {project.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 pt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                {project.category}
                {project.url && (
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.75}
                    aria-hidden
                    className="text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
