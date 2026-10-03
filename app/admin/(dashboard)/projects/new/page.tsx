import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import ProjectForm from "../ProjectForm";

export default async function NewProjectPage() {
  await requireAdmin();

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
          New project
        </h1>

        <div className="mt-8">
          <ProjectForm />
        </div>
      </main>
    </>
  );
}
