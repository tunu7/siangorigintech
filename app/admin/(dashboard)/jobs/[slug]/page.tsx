import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getJobWithCount } from "@/lib/jobs";
import { ConfirmButton } from "@/app/admin/components/controls";
import { deleteJob } from "../actions";
import JobForm from "../JobForm";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAdmin();
  const { slug } = await params;

  const job = await getJobWithCount(slug);

  if (!job) notFound();

  const count = job.applications;

  return (
    <>

      <main className="max-w-4xl px-6 py-10 lg:px-12">
        <Link
          href="/admin/jobs"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          ← All jobs
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-4xl">
            {job.title}
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <Link
              href={`/admin/applications?job=${job.slug}`}
              className="text-muted hover:text-ink"
            >
              {count} application{count === 1 ? "" : "s"}
            </Link>
            {job.is_open && (
              <a
                href={`/careers/${job.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink"
              >
                View live
              </a>
            )}
          </div>
        </div>

        <div className="mt-8">
          <JobForm job={job} />
        </div>

        <div className="mt-6 rounded-lg border border-red-200 bg-white p-6">
          {count === 0 ? (
            <form
              action={deleteJob}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <input type="hidden" name="slug" value={job.slug} />
              <p className="text-sm text-muted">
                Permanently delete this job posting.
              </p>
              <ConfirmButton
                message={`Delete "${job.title}"? This cannot be undone.`}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Delete job
              </ConfirmButton>
            </form>
          ) : (
            <p className="text-sm text-muted">
              This job has applications, so it can&apos;t be deleted. Close it
              instead to hide it from the careers page.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
