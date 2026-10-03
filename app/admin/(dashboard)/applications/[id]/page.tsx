import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getApplicationWithRelated,
} from "@/lib/admin-queries";
import { requireAdmin } from "@/lib/auth";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { deleteApplication } from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/components/controls";
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

  const data = await getApplicationWithRelated(id);

  if (!data) notFound();

  const { application, related } = data;
  const emailSubject = encodeURIComponent(
    `Your application for ${application.job_title} at Siang Origin`
  );

  return (
    <>

      <main className="max-w-5xl px-6 py-10 lg:px-12">
        <Link
          href="/admin/applications"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          ← All applications
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl">
              {application.name}
            </h1>
            <p className="mt-2 text-muted">
              {application.job_title} · Applied{" "}
              {dateFormat.format(new Date(application.created_at))}
            </p>
            {new Date(application.updated_at).getTime() !==
              new Date(application.created_at).getTime() && (
              <p className="mt-1 text-xs text-muted">
                Last updated{" "}
                {dateFormat.format(new Date(application.updated_at))}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={application.status} />
            <a
              href={`mailto:${application.email}?subject=${emailSubject}`}
              className="rounded-md border border-line-strong bg-white px-4 py-1.5 text-sm transition-colors hover:border-ink"
            >
              Email applicant
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="rounded-lg border border-line bg-white p-6">
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <Field label="Email">
                  <a
                    href={`mailto:${application.email}`}
                    className="hover:text-ink hover:underline"
                  >
                    {application.email}
                  </a>
                </Field>
                <Field label="Phone">
                  <a
                    href={`tel:${application.phone}`}
                    className="hover:text-ink hover:underline"
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

            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                About the applicant
              </h2>
              <p className="mt-3 whitespace-pre-wrap leading-7">
                {application.message}
              </p>
            </div>

            {related.length > 0 && (
              <div className="rounded-lg border border-line bg-white p-6">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  Other applications from this person
                </h2>
                <ul className="mt-3 divide-y divide-line text-sm">
                  {related.map((other) => (
                    <li
                      key={other.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-3"
                    >
                      <Link
                        href={`/admin/applications/${other.id}`}
                        className="font-medium hover:text-ink hover:underline"
                      >
                        {other.job_title}
                      </Link>
                      <span className="flex items-center gap-3 text-muted">
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
              className="flex items-center gap-4 rounded-lg border border-line bg-white p-4 transition-colors hover:border-ink"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-ink text-xs font-bold text-paper">
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
              className="rounded-lg border border-red-200 bg-white p-4"
            >
              <input type="hidden" name="id" value={application.id} />
              <p className="text-xs text-muted">
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
      <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 truncate">{children}</dd>
    </div>
  );
}

function ExternalLink({ url }: { url: string | null }) {
  if (!url) return <span className="text-muted">—</span>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-ink hover:underline"
    >
      {url.replace(/^https?:\/\/(www\.)?/, "")}
    </a>
  );
}
