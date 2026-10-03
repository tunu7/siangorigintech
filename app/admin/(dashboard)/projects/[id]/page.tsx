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

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link
          href="/admin/projects"
          className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900"
        >
          ← All projects
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          {project.title}
        </h1>

        <div className="mt-8">
          <ProjectForm project={project} />
        </div>

        <form
          action={deleteProject}
          className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-red-200 bg-white p-6"
        >
          <input type="hidden" name="id" value={project.id} />
          <p className="text-sm text-zinc-500">
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
