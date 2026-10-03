import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import JobForm from "../JobForm";

export default async function NewJobPage() {
  await requireAdmin();

  return (
    <>

      <main className="max-w-4xl px-6 py-10 lg:px-12">
        <Link
          href="/admin/jobs"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          ← All jobs
        </Link>

        <h1 className="mt-6 font-display text-4xl">
          New job
        </h1>

        <div className="mt-8">
          <JobForm />
        </div>
      </main>
    </>
  );
}
