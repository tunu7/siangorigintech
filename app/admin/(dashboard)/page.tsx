import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { overviewData } from "@/lib/admin-queries";
import { requireAdmin } from "@/lib/auth";
import StatusBadge from "@/app/admin/components/StatusBadge";
import {
  button,
  card,
  Empty,
  label,
  PageHeader,
} from "@/app/admin/components/ui";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: "Asia/Kolkata",
});

const greetingFormat = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

function greeting() {
  const hour = Number(greetingFormat.format(new Date()));
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default async function OverviewPage() {
  await requireAdmin();
  const { stats, applications, enquiries, jobs } = await overviewData();

  const tiles = [
    {
      label: "New applications",
      value: stats.new_applications,
      hint: `${stats.applications_week} this week`,
      href: "/admin/applications?status=new",
    },
    {
      label: "In progress",
      value: stats.active_applications,
      hint: "Reviewing or shortlisted",
      href: "/admin/applications",
    },
    {
      label: "Unread enquiries",
      value: stats.unread_enquiries,
      hint: "From the contact form",
      href: "/admin/enquiries?view=unread",
    },
    {
      label: "Open roles",
      value: stats.open_jobs,
      hint: `${stats.published_projects} projects published`,
      href: "/admin/jobs",
    },
  ];

  return (
    <main className="px-6 py-10 lg:px-12">
      <PageHeader
        eyebrow="Overview"
        title={greeting()}
        description="What needs your attention across recruitment, the inbox and the website."
        actions={
          <>
            <Link href="/admin/jobs/new" className={button("secondary")}>
              <Plus size={15} strokeWidth={1.75} aria-hidden />
              New job
            </Link>
            <Link href="/admin/projects/new" className={button("secondary")}>
              <Plus size={15} strokeWidth={1.75} aria-hidden />
              New project
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className={`${card} group p-5 transition-colors hover:border-ink`}
          >
            <p className={label}>{tile.label}</p>
            <p className="font-display mt-4 text-4xl tabular-nums sm:text-5xl">
              {tile.value}
            </p>
            <p className="mt-2 text-xs text-muted">{tile.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel title="Latest applications" href="/admin/applications">
          {applications.length ? (
            <ul className="divide-y divide-line">
              {applications.map((row) => (
                <li key={row.id}>
                  <Link
                    href={`/admin/applications/${row.id}`}
                    className="flex items-center gap-4 px-5 py-3.5 text-sm transition-colors hover:bg-paper"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">
                        {row.name}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {row.job_title}
                      </span>
                    </span>
                    <StatusBadge status={row.status} />
                    <span className="w-14 text-right text-xs tabular-nums text-muted">
                      {dateFormat.format(new Date(row.created_at))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No applications yet.</Empty>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Inbox" href="/admin/enquiries">
            {enquiries.length ? (
              <ul className="divide-y divide-line">
                {enquiries.map((row) => (
                  <li key={row.id}>
                    <Link
                      href={`/admin/enquiries/${row.id}`}
                      className="block px-5 py-3.5 text-sm transition-colors hover:bg-paper"
                    >
                      <span className="flex items-center gap-2">
                        {!row.read_at && (
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                            aria-label="Unread"
                          />
                        )}
                        <span
                          className={`flex-1 truncate ${row.read_at ? "" : "font-medium"}`}
                        >
                          {row.name}
                        </span>
                        <span className="text-xs tabular-nums text-muted">
                          {dateFormat.format(new Date(row.created_at))}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted">
                        {row.message}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>No enquiries yet.</Empty>
            )}
          </Panel>

          <Panel title="Open roles" href="/admin/jobs">
            {jobs.length ? (
              <ul className="divide-y divide-line">
                {jobs.map((job) => (
                  <li key={job.slug}>
                    <Link
                      href={`/admin/applications?job=${job.slug}`}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm transition-colors hover:bg-paper"
                    >
                      <span className="truncate font-medium">{job.title}</span>
                      <span className="shrink-0 text-xs tabular-nums text-muted">
                        {job.applications} applied
                        {job.new_applications > 0 &&
                          ` · ${job.new_applications} new`}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>
                No open roles.{" "}
                <Link href="/admin/jobs/new" className="text-ink underline">
                  Post one
                </Link>
              </Empty>
            )}
          </Panel>
        </div>
      </div>
    </main>
  );
}

function Panel({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className={card}>
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h2 className="text-sm font-medium">{title}</h2>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink"
        >
          View all
          <ArrowRight size={13} strokeWidth={1.75} aria-hidden />
        </Link>
      </div>
      {children}
    </section>
  );
}
