import Link from "next/link";
import {
  dashboardData,
  PAGE_SIZE,
  parseFilters,
  SORTS,
} from "@/lib/admin-queries";
import { APPLICATION_STATUSES } from "@/lib/applications";
import { requireAdmin } from "@/lib/auth";
import { bulkUpdateApplications } from "@/app/admin/actions";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { BulkForm, SelectAll } from "@/app/admin/components/controls";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const filters = parseFilters(await searchParams);

  const { rows, total, counts, jobs } = await dashboardData(filters);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const query = (overrides: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    const merged = { ...filters, ...overrides };

    for (const [key, value] of Object.entries(merged)) {
      if (value && !(key === "page" && value === 1)) {
        params.set(key, String(value));
      }
    }

    const search = params.toString();
    return search ? `?${search}` : "";
  };

  const exportParams = new URLSearchParams(
    Object.entries({
      q: filters.q,
      job: filters.job,
      status: filters.status,
      sort: filters.sort,
    }).filter((entry): entry is [string, string] => Boolean(entry[1]))
  ).toString();

  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Careers
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Applications
            </h1>
          </div>

          <a
            href={`/admin/export${exportParams ? `?${exportParams}` : ""}`}
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
          >
            Export CSV
          </a>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            label="Total"
            value={counts.total}
            href={query({ status: undefined, page: 1 })}
            active={!filters.status}
          />
          {APPLICATION_STATUSES.map((status) => (
            <StatCard
              key={status}
              label={status}
              value={counts.byStatus[status]}
              href={query({ status, page: 1 })}
              active={filters.status === status}
            />
          ))}
        </div>

        {/* Filters */}
        <form className="mt-8 flex flex-wrap gap-3">
          <input
            name="q"
            defaultValue={filters.q}
            placeholder="Search name, email or phone"
            className="min-w-0 flex-1 basis-60 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
          />

          <select
            name="job"
            defaultValue={filters.job ?? ""}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
          >
            <option value="">All roles</option>
            {jobs.map((job) => (
              <option key={job.slug} value={job.slug}>
                {job.title}
              </option>
            ))}
          </select>

          <select
            name="status"
            defaultValue={filters.status ?? ""}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-brand"
          >
            <option value="">All statuses</option>
            {APPLICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            name="sort"
            defaultValue={filters.sort ?? "newest"}
            aria-label="Sort by"
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
          >
            {Object.keys(SORTS).map((sort) => (
              <option key={sort} value={sort}>
                {SORT_LABELS[sort as keyof typeof SORTS]}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover"
          >
            Filter
          </button>

          {(filters.q || filters.job || filters.status || filters.sort) && (
            <Link
              href="/admin"
              className="self-center text-sm text-zinc-500 underline-offset-4 hover:underline"
            >
              Clear
            </Link>
          )}
        </form>

        {/* Bulk actions */}
        {rows.length > 0 && (
          <div className="mt-6">
            <BulkForm
              id="bulk"
              action={bulkUpdateApplications}
              options={[
                ...APPLICATION_STATUSES.map((status) => ({
                  value: status,
                  label: `Mark as ${status}`,
                })),
                { value: "delete", label: "Delete" },
              ]}
            />
          </div>
        )}

        {/* Table */}
        <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="w-10 py-3 pl-4">
                  <SelectAll form="bulk" />
                </th>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Applied</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-50">
                  <td className="py-3 pl-4">
                    <input
                      type="checkbox"
                      name="ids"
                      value={row.id}
                      form="bulk"
                      aria-label={`Select ${row.name}`}
                      className="h-4 w-4 accent-brand"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/applications/${row.id}`}
                      className="font-medium hover:text-brand"
                    >
                      {row.name}
                    </Link>
                    <div className="text-xs text-zinc-500">
                      {row.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.job_title}</td>
                  <td className="px-4 py-3 tabular-nums">{row.phone}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-zinc-500 tabular-nums">
                    {dateFormat.format(new Date(row.created_at))}
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-16 text-center text-zinc-500"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
            <span>
              Page {filters.page} of {pages} · {total} results
            </span>
            <div className="flex gap-2">
              {filters.page > 1 && (
                <Link
                  href={query({ page: filters.page - 1 })}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 hover:border-brand"
                >
                  Previous
                </Link>
              )}
              {filters.page < pages && (
                <Link
                  href={query({ page: filters.page + 1 })}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 hover:border-brand"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const SORT_LABELS: Record<keyof typeof SORTS, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  name: "Name (A–Z)",
  updated: "Recently updated",
};

function StatCard({
  label,
  value,
  href,
  active,
}: {
  label: string;
  value: number;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href || "/admin"}
      className={`rounded-xl border bg-white p-4 transition-colors hover:border-brand ${
        active ? "border-brand" : "border-zinc-200"
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-zinc-500 capitalize">
        {label}
      </div>
      <div className="mt-1 text-2xl font-medium tabular-nums">
        {value}
      </div>
    </Link>
  );
}
