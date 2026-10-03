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

      <main className="px-6 py-10 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              Recruitment
            </p>
            <h1 className="mt-2 font-display text-4xl">
              Jobs
            </h1>
            <p className="mt-2 text-sm text-muted">
              {open} open · {jobs.length - open} closed. Open roles are
              listed on the public careers page.
            </p>
          </div>

          <Link
            href="/admin/jobs/new"
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-brand"
          >
            New job
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-b border-line text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
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

            <tbody className="divide-y divide-line">
              {jobs.map((job) => (
                <tr key={job.slug} className="hover:bg-paper">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/jobs/${job.slug}`}
                      className="font-medium hover:text-ink hover:underline"
                    >
                      {job.title}
                    </Link>
                    <div className="text-xs text-muted">
                      {[job.department, job.type, job.location].join(" · ")}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        job.is_open
                          ? "bg-brand/10 text-brand"
                          : "bg-neutral-200 text-neutral-600"
                      }`}
                    >
                      {job.is_open ? "Open" : "Closed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    <Link
                      href={`/admin/applications?job=${job.slug}`}
                      className="hover:text-ink hover:underline"
                    >
                      {job.applications}
                      {job.new_applications > 0 && (
                        <span className="text-muted">
                          {" "}
                          ({job.new_applications} new)
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted tabular-nums">
                    {dateFormat.format(new Date(job.updated_at))}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {job.is_open && (
                        <a
                          href={`/careers/${job.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-ink"
                        >
                          View
                        </a>
                      )}
                      <Link
                        href={`/admin/jobs/${job.slug}`}
                        className="text-muted hover:text-ink"
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
                        <SubmitButton className="rounded-md border border-line-strong px-3 py-1 hover:border-ink">
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
                    className="px-4 py-16 text-center text-muted"
                  >
                    No jobs yet.{" "}
                    <Link
                      href="/admin/jobs/new"
                      className="text-ink underline"
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
