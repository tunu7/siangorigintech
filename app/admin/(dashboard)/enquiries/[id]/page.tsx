import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getEnquiry } from "@/lib/enquiries";
import { ConfirmButton, SubmitButton } from "@/app/admin/components/controls";
import { updateEnquiry } from "../actions";
import MarkRead from "./MarkRead";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.16em] text-muted";

const secondaryButton =
  "w-full rounded-lg border border-line-strong px-4 py-2 text-sm hover:border-ink";

export default async function EnquiryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const enquiry = await getEnquiry(id);

  if (!enquiry) notFound();

  const replySubject = encodeURIComponent(
    enquiry.services.length
      ? `Re: Your ${enquiry.services.join(", ")} enquiry to Siang Origin`
      : "Re: Your enquiry to Siang Origin"
  );

  return (
    <>
      {!enquiry.read_at && <MarkRead id={enquiry.id} />}

      <main className="max-w-5xl px-6 py-10 lg:px-12">
        <Link
          href={enquiry.archived ? "/admin/enquiries?view=archived" : "/admin/enquiries"}
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          ← All enquiries
        </Link>

        <div className="mt-6">
          <h1 className="font-display text-4xl">
            {enquiry.name}
          </h1>
          <p className="mt-2 text-muted">
            <a href={`mailto:${enquiry.email}`} className="hover:text-ink hover:underline">
              {enquiry.email}
            </a>{" "}
            · {dateFormat.format(new Date(enquiry.created_at))}
            {enquiry.archived && " · Archived"}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            {(enquiry.services.length > 0 || enquiry.source) && (
              <section className="grid gap-6 rounded-lg border border-line bg-white p-6 sm:grid-cols-2">
                {enquiry.services.length > 0 && (
                  <div>
                    <h2 className={labelClass}>Interested in</h2>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {enquiry.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-paper-deep px-2.5 py-1 text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {enquiry.source && (
                  <div>
                    <h2 className={labelClass}>Came from</h2>
                    <a
                      href={enquiry.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block break-all text-sm hover:underline"
                    >
                      {enquiry.source}
                    </a>
                  </div>
                )}
              </section>
            )}

            <section className="rounded-lg border border-line bg-white p-6">
              <h2 className={labelClass}>Message</h2>
              <p className="mt-3 whitespace-pre-wrap leading-7">
                {enquiry.message}
              </p>
            </section>
          </div>

          <aside className="space-y-3 rounded-lg border border-line bg-white p-4 lg:self-start">
            <a
              href={`mailto:${enquiry.email}?subject=${replySubject}`}
              className="block w-full rounded-md bg-ink px-4 py-2 text-center text-sm font-medium text-paper hover:bg-brand"
            >
              Reply by email
            </a>

            <form action={updateEnquiry}>
              <input type="hidden" name="ids" value={enquiry.id} />
              <input
                type="hidden"
                name="op"
                value={enquiry.archived ? "unarchive" : "archive"}
              />
              <SubmitButton className={secondaryButton}>
                {enquiry.archived ? "Move to inbox" : "Archive"}
              </SubmitButton>
            </form>

            {!enquiry.archived && enquiry.read_at && (
              <form action={updateEnquiry}>
                <input type="hidden" name="ids" value={enquiry.id} />
                <input type="hidden" name="op" value="unread" />
                <SubmitButton className={secondaryButton}>
                  Mark as unread
                </SubmitButton>
              </form>
            )}

            <form action={updateEnquiry}>
              <input type="hidden" name="ids" value={enquiry.id} />
              <input type="hidden" name="op" value="delete" />
              <ConfirmButton
                message={`Delete this enquiry from ${enquiry.name}? This cannot be undone.`}
                className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Delete
              </ConfirmButton>
            </form>
          </aside>
        </div>
      </main>
    </>
  );
}
