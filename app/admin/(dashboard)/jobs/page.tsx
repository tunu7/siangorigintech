import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listJobsWithCounts } from "@/lib/jobs";
import { SubmitButton } from "@/app/admin/components/controls";
import { setJobOpen } from "./actions";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeZone: "Asia/Kolkata",
});

export default async function AdminJobsPage() {
  await requireAdmin();
  const jobs = await listJobsWithCounts();
  const open = jobs.filter((job) => job.is_open).length;

  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Careers
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Jobs
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              {open} open · {jobs.length - open} closed. Open roles are
              listed on the public careers page.
            </p>
          </div>

          <Link
            href="/admin/jobs/new"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover"
          >
            New job
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Applications</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {jobs.map((job) => (
                <tr key={job.slug} className="hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/jobs/${job.slug}`}
                      className="font-medium hover:text-brand"
                    >
                      {job.title}
                    </Link>
                    <div className="text-xs text-zinc-500">
                      {[job.department, job.type, job.location].join(" · ")}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        job.is_open
                          ? "bg-brand/10 text-brand-hover"
                          : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {job.is_open ? "Open" : "Closed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    <Link
                      href={`/admin?job=${job.slug}`}
                      className="hover:text-brand"
                    >
                      {job.applications}
                      {job.new_applications > 0 && (
                        <span className="text-zinc-500">
                          {" "}
                          ({job.new_applications} new)
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 tabular-nums">
                    {dateFormat.format(new Date(job.updated_at))}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {job.is_open && (
                        <a
                          href={`/careers/${job.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-zinc-900"
                        >
                          View
                        </a>
                      )}
                      <Link
                        href={`/admin/jobs/${job.slug}`}
                        className="text-zinc-500 hover:text-zinc-900"
                      >
                        Edit
                      </Link>
                      <form action={setJobOpen}>
                        <input type="hidden" name="slug" value={job.slug} />
                        <input
                          type="hidden"
                          name="open"
                          value={String(!job.is_open)}
                        />
                        <SubmitButton className="rounded-md border border-zinc-300 px-3 py-1 hover:border-brand hover:text-brand">
                          {job.is_open ? "Close" : "Reopen"}
                        </SubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-16 text-center text-zinc-500"
                  >
                    No jobs yet.{" "}
                    <Link
                      href="/admin/jobs/new"
                      className="text-brand hover:underline"
                    >
                      Create the first one
                    </Link>
                    .
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
