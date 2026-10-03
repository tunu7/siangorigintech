import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getApplication,
  relatedApplications,
} from "@/lib/admin-queries";
import { requireAdmin } from "@/lib/auth";
import AdminHeader from "../../components/AdminHeader";
import StatusBadge from "../../components/StatusBadge";
import { deleteApplication } from "../../actions";
import { ConfirmButton } from "../../components/controls";
import UpdateForm from "./UpdateForm";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const application = await getApplication(id);

  if (!application) notFound();

  const related = await relatedApplications(application);
  const emailSubject = encodeURIComponent(
    `Your application for ${application.job_title} at Siang Origin`
  );

  return (
    <>
      <AdminHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link
          href="/admin"
          className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900"
        >
          ← All applications
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {application.name}
            </h1>
            <p className="mt-2 text-zinc-500">
              {application.job_title} · Applied{" "}
              {dateFormat.format(new Date(application.created_at))}
            </p>
            {new Date(application.updated_at).getTime() !==
              new Date(application.created_at).getTime() && (
              <p className="mt-1 text-xs text-zinc-400">
                Last updated{" "}
                {dateFormat.format(new Date(application.updated_at))}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={application.status} />
            <a
              href={`mailto:${application.email}?subject=${emailSubject}`}
              className="rounded-md border border-zinc-300 bg-white px-4 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
            >
              Email applicant
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <Field label="Email">
                  <a
                    href={`mailto:${application.email}`}
                    className="hover:text-brand"
                  >
                    {application.email}
                  </a>
                </Field>
                <Field label="Phone">
                  <a
                    href={`tel:${application.phone}`}
                    className="hover:text-brand"
                  >
                    {application.phone}
                  </a>
                </Field>
                <Field label="LinkedIn">
                  <ExternalLink url={application.linkedin} />
                </Field>
                <Field label="Portfolio">
                  <ExternalLink url={application.portfolio} />
                </Field>
              </dl>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xs uppercase tracking-wider text-zinc-500">
                About the applicant
              </h2>
              <p className="mt-3 whitespace-pre-wrap leading-7">
                {application.message}
              </p>
            </div>

            {related.length > 0 && (
              <div className="rounded-xl border border-zinc-200 bg-white p-6">
                <h2 className="text-xs uppercase tracking-wider text-zinc-500">
                  Other applications from this person
                </h2>
                <ul className="mt-3 divide-y divide-zinc-100 text-sm">
                  {related.map((other) => (
                    <li
                      key={other.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-3"
                    >
                      <Link
                        href={`/admin/applications/${other.id}`}
                        className="font-medium hover:text-brand"
                      >
                        {other.job_title}
                      </Link>
                      <span className="flex items-center gap-3 text-zinc-500">
                        {dateFormat.format(new Date(other.created_at))}
                        <StatusBadge status={other.status} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <a
              href={`/admin/applications/${application.id}/resume`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-brand"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white">
                PDF
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {application.resume_name}
                </span>
                <span className="text-xs text-brand">
                  Open resume
                </span>
              </span>
            </a>

            <UpdateForm
              id={application.id}
              status={application.status}
              notes={application.notes ?? ""}
            />

            <form
              action={deleteApplication}
              className="rounded-xl border border-red-200 bg-white p-4"
            >
              <input type="hidden" name="id" value={application.id} />
              <p className="text-xs text-zinc-500">
                Permanently removes this application and its resume.
              </p>
              <ConfirmButton
                message={`Delete ${application.name}'s application and resume? This cannot be undone.`}
                className="mt-3 w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Delete application
              </ConfirmButton>
            </form>
          </aside>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 truncate">{children}</dd>
    </div>
  );
}

function ExternalLink({ url }: { url: string | null }) {
  if (!url) return <span className="text-zinc-400">—</span>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-brand"
    >
      {url.replace(/^https?:\/\/(www\.)?/, "")}
    </a>
  );
}
