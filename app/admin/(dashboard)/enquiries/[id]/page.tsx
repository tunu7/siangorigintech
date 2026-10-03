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

const secondaryButton =
  "w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:border-brand hover:text-brand";

export default async function EnquiryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const enquiry = await getEnquiry(id);

  if (!enquiry) notFound();

  const replySubject = encodeURIComponent("Re: Your enquiry to Siang Origin");

  return (
    <>
      {!enquiry.read_at && <MarkRead id={enquiry.id} />}

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link
          href={enquiry.archived ? "/admin/enquiries?view=archived" : "/admin/enquiries"}
          className="text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-900"
        >
          ← All enquiries
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {enquiry.name}
          </h1>
          <p className="mt-2 text-zinc-500">
            <a href={`mailto:${enquiry.email}`} className="hover:text-brand">
              {enquiry.email}
            </a>{" "}
            · {dateFormat.format(new Date(enquiry.created_at))}
            {enquiry.archived && " · Archived"}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_280px]">
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xs uppercase tracking-wider text-zinc-500">
              Message
            </h2>
            <p className="mt-3 whitespace-pre-wrap leading-7">
              {enquiry.message}
            </p>
          </section>

          <aside className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 lg:self-start">
            <a
              href={`mailto:${enquiry.email}?subject=${replySubject}`}
              className="block w-full rounded-lg bg-brand px-4 py-2 text-center text-sm font-medium text-white hover:bg-brand-hover"
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
