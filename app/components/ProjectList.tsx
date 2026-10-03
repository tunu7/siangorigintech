import { projects } from "@/data/projects";

export default function ProjectList() {
  return (
    <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
      {projects.map((project, index) => (
        <li
          key={project.title}
          className="grid gap-2 py-8 md:grid-cols-[4rem_1fr_1fr] md:gap-8"
        >
          <span className="text-sm tabular-nums text-zinc-400">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-brand">{project.category}</p>
          </div>

          <p className="text-zinc-600 md:pt-1">{project.description}</p>
        </li>
      ))}
    </ul>
  );
}
