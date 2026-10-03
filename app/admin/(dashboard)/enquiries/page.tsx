import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import {
  ENQUIRY_PAGE_SIZE,
  ENQUIRY_VIEWS,
  enquiryInbox,
  isEnquiryView,
} from "@/lib/enquiries";
import { BulkForm, SelectAll } from "@/app/admin/components/controls";
import { updateEnquiries } from "./actions";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const first = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

  const viewParam = first(params.view);
  const view = isEnquiryView(viewParam) ? viewParam : "inbox";
  const q = first(params.q)?.slice(0, 100);
  const page = Math.max(1, Math.floor(Number(first(params.page))) || 1);

  const { rows, total, counts } = await enquiryInbox({ view, q, page });

  const pages = Math.max(1, Math.ceil(total / ENQUIRY_PAGE_SIZE));

  const href = (overrides: Record<string, string | number | undefined>) => {
    const search = new URLSearchParams();
    const merged = { view, q, page, ...overrides };

    for (const [key, value] of Object.entries(merged)) {
      if (
        value &&
        !(key === "page" && value === 1) &&
        !(key === "view" && value === "inbox")
      ) {
        search.set(key, String(value));
      }
    }

    const query = search.toString();
    return `/admin/enquiries${query ? `?${query}` : ""}`;
  };

  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          Contact form
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Enquiries
        </h1>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex gap-1 rounded-lg border border-zinc-200 bg-white p-1 text-sm">
            {ENQUIRY_VIEWS.map((option) => (
              <Link
                key={option}
                href={href({ view: option, page: 1 })}
                aria-current={view === option ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 capitalize ${
                  view === option
                    ? "bg-zinc-100 font-medium"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {option}{" "}
                <span className="tabular-nums text-zinc-400">
                  {counts[option]}
                </span>
              </Link>
            ))}
          </nav>

          <form className="flex min-w-0 flex-1 basis-60 justify-end gap-2">
            {view !== "inbox" && (
              <input type="hidden" name="view" value={view} />
            )}
            <input
              name="q"
              defaultValue={q}
              placeholder="Search name, email or message"
              className="min-w-0 max-w-sm flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover"
            >
              Search
            </button>
          </form>
        </div>

        {rows.length > 0 && (
          <div className="mt-6">
            <BulkForm
              id="bulk"
              action={updateEnquiries}
              options={[
                { value: "read", label: "Mark as read" },
                { value: "unread", label: "Mark as unread" },
                view === "archived"
                  ? { value: "unarchive", label: "Move to inbox" }
                  : { value: "archive", label: "Archive" },
                { value: "delete", label: "Delete" },
              ]}
            />
          </div>
        )}

        <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="w-10 py-3 pl-4">
                  <SelectAll form="bulk" />
                </th>
                <th className="px-4 py-3 font-medium">From</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Received</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {rows.map((row) => {
                const unread = !row.read_at;

                return (
                  <tr key={row.id} className="hover:bg-zinc-50">
                    <td className="py-3 pl-4">
                      <input
                        type="checkbox"
                        name="ids"
                        value={row.id}
                        form="bulk"
                        aria-label={`Select enquiry from ${row.name}`}
                        className="h-4 w-4 accent-brand"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/enquiries/${row.id}`}
                        className={`flex items-center gap-2 hover:text-brand ${
                          unread ? "font-semibold" : ""
                        }`}
                      >
                        {unread && (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full bg-brand"
                            aria-label="Unread"
                          />
                        )}
                        {row.name}
                      </Link>
                      <div className="text-xs text-zinc-500">{row.email}</div>
                    </td>
                    <td className="max-w-md px-4 py-3">
                      <Link
                        href={`/admin/enquiries/${row.id}`}
                        className={`line-clamp-2 ${
                          unread ? "text-zinc-900" : "text-zinc-500"
                        }`}
                      >
                        {row.message}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-zinc-500 tabular-nums">
                      {dateFormat.format(new Date(row.created_at))}
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-16 text-center text-zinc-500"
                  >
                    {q ? "No enquiries match your search." : "No enquiries here."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
            <span>
              Page {page} of {pages} · {total} results
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={href({ page: page - 1 })}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 hover:border-brand"
                >
                  Previous
                </Link>
              )}
              {page < pages && (
                <Link
                  href={href({ page: page + 1 })}
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
