import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplication } from "@/lib/admin-queries";
import { requireAdmin } from "@/lib/auth";
import AdminHeader from "../../components/AdminHeader";
import StatusBadge from "../../components/StatusBadge";
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

  return (
    <>
      <AdminHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link
          href="/admin"
          className="text-xs uppercase tracking-[0.2em] text-[#617568] hover:text-[#0B4D2C]"
        >
          ← All applications
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-[-0.04em]">
              {application.name}
            </h1>
            <p className="mt-2 text-[#617568]">
              {application.job_title} · Applied{" "}
              {dateFormat.format(new Date(application.created_at))}
            </p>
          </div>

          <StatusBadge status={application.status} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="rounded-xl border border-[#0B4D2C]/10 bg-white p-6">
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <Field label="Email">
                  <a
                    href={`mailto:${application.email}`}
                    className="hover:text-[#2F7D46]"
                  >
                    {application.email}
                  </a>
                </Field>
                <Field label="Phone">
                  <a
                    href={`tel:${application.phone}`}
                    className="hover:text-[#2F7D46]"
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

            <div className="rounded-xl border border-[#0B4D2C]/10 bg-white p-6">
              <h2 className="text-xs uppercase tracking-wider text-[#617568]">
                About the applicant
              </h2>
              <p className="mt-3 whitespace-pre-wrap leading-7">
                {application.message}
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <a
              href={`/admin/applications/${application.id}/resume`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-[#0B4D2C]/10 bg-white p-4 transition-colors hover:border-[#2F7D46]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0B4D2C] text-xs font-bold text-white">
                PDF
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {application.resume_name}
                </span>
                <span className="text-xs text-[#2F7D46]">
                  Open resume
                </span>
              </span>
            </a>

            <UpdateForm
              id={application.id}
              status={application.status}
              notes={application.notes ?? ""}
            />
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
      <dt className="text-xs uppercase tracking-wider text-[#617568]">
        {label}
      </dt>
      <dd className="mt-1 truncate">{children}</dd>
    </div>
  );
}

function ExternalLink({ url }: { url: string | null }) {
  if (!url) return <span className="text-[#AAB8AF]">—</span>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#2F7D46]"
    >
      {url.replace(/^https?:\/\/(www\.)?/, "")}
    </a>
  );
}
