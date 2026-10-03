import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getProject } from "@/lib/projects";
import { ConfirmButton } from "@/app/admin/components/controls";
import { deleteProject } from "../actions";
import ProjectForm from "../ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const project = await getProject(id);

  if (!project) notFound();

  return (
    <>

      <main className="max-w-4xl px-6 py-10 lg:px-12">
        <Link
          href="/admin/projects"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          ← All projects
        </Link>

        <h1 className="mt-6 font-display text-4xl">
          {project.title}
        </h1>

        <div className="mt-8">
          <ProjectForm project={project} />
        </div>

        <form
          action={deleteProject}
          className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-red-200 bg-white p-6"
        >
          <input type="hidden" name="id" value={project.id} />
          <p className="text-sm text-muted">
            Permanently delete this project. Hide it instead if you might
            want it back.
          </p>
          <ConfirmButton
            message={`Delete "${project.title}"? This cannot be undone.`}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            Delete project
          </ConfirmButton>
        </form>
      </main>
    </>
  );
}
