import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import ProjectForm from "../ProjectForm";

export default async function NewProjectPage() {
  await requireAdmin();

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
          New project
        </h1>

        <div className="mt-8">
          <ProjectForm />
        </div>
      </main>
    </>
  );
}
