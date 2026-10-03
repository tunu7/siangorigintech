import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import AdminHeader from "../../components/AdminHeader";
import JobForm from "../JobForm";

export default async function NewJobPage() {
  await requireAdmin();

  return (
    <>
      <AdminHeader />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link
          href="/admin/jobs"
          className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900"
        >
          ← All jobs
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          New job
        </h1>

        <div className="mt-8">
          <JobForm />
        </div>
      </main>
    </>
  );
}
