import Link from "next/link";
import { jobs } from "@/data/jobs";
import {
  listApplications,
  PAGE_SIZE,
  parseFilters,
  statusCounts,
} from "@/lib/admin-queries";
import { APPLICATION_STATUSES } from "@/lib/applications";
import { requireAdmin } from "@/lib/auth";
import AdminHeader from "./components/AdminHeader";
import StatusBadge from "./components/StatusBadge";

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

  const [{ rows, total }, counts] = await Promise.all([
    listApplications(filters),
    statusCounts(),
  ]);

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
    }).filter((entry): entry is [string, string] => Boolean(entry[1]))
  ).toString();

  return (
    <>
      <AdminHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#617568]">
              Careers
            </p>
            <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em]">
              Applications
            </h1>
          </div>

          <a
            href={`/admin/export${exportParams ? `?${exportParams}` : ""}`}
            className="rounded-full border border-[#0B4D2C]/15 bg-white px-4 py-2 text-sm transition-colors hover:border-[#2F7D46] hover:text-[#2F7D46]"
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
            className="min-w-0 flex-1 basis-60 rounded-lg border border-[#0B4D2C]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#2F7D46]"
          />

          <select
            name="job"
            defaultValue={filters.job ?? ""}
            className="rounded-lg border border-[#0B4D2C]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#2F7D46]"
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
            className="rounded-lg border border-[#0B4D2C]/15 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-[#2F7D46]"
          >
            <option value="">All statuses</option>
            {APPLICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-lg bg-[#0B4D2C] px-4 py-2 text-sm font-medium text-white hover:bg-[#176B3A]"
          >
            Filter
          </button>

          {(filters.q || filters.job || filters.status) && (
            <Link
              href="/admin"
              className="self-center text-sm text-[#617568] underline-offset-4 hover:underline"
            >
              Clear
            </Link>
          )}
        </form>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-[#0B4D2C]/10 bg-white">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-b border-[#0B4D2C]/10 text-xs uppercase tracking-wider text-[#617568]">
              <tr>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Applied</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#0B4D2C]/5">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#EAF3EC]/40">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/applications/${row.id}`}
                      className="font-medium hover:text-[#2F7D46]"
                    >
                      {row.name}
                    </Link>
                    <div className="text-xs text-[#617568]">
                      {row.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.job_title}</td>
                  <td className="px-4 py-3 tabular-nums">{row.phone}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-[#617568] tabular-nums">
                    {dateFormat.format(new Date(row.created_at))}
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-16 text-center text-[#617568]"
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
          <div className="mt-6 flex items-center justify-between text-sm text-[#617568]">
            <span>
              Page {filters.page} of {pages} · {total} results
            </span>
            <div className="flex gap-2">
              {filters.page > 1 && (
                <Link
                  href={query({ page: filters.page - 1 })}
                  className="rounded-lg border border-[#0B4D2C]/15 bg-white px-3 py-1.5 hover:border-[#2F7D46]"
                >
                  Previous
                </Link>
              )}
              {filters.page < pages && (
                <Link
                  href={query({ page: filters.page + 1 })}
                  className="rounded-lg border border-[#0B4D2C]/15 bg-white px-3 py-1.5 hover:border-[#2F7D46]"
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
      className={`rounded-xl border bg-white p-4 transition-colors hover:border-[#2F7D46] ${
        active ? "border-[#2F7D46]" : "border-[#0B4D2C]/10"
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-[#617568] capitalize">
        {label}
      </div>
      <div className="mt-1 text-2xl font-medium tabular-nums">
        {value}
      </div>
    </Link>
  );
}
