import "server-only";

import { batch, sql } from "@/lib/db";

export type Enquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  read_at: string | null;
  archived: boolean;
};

export const ENQUIRY_VIEWS = ["inbox", "unread", "archived"] as const;
export type EnquiryView = (typeof ENQUIRY_VIEWS)[number];

export const ENQUIRY_PAGE_SIZE = 25;

export function isEnquiryView(value: unknown): value is EnquiryView {
  return ENQUIRY_VIEWS.includes(value as EnquiryView);
}

// The inbox page: one page of enquiries plus the tab counts, in one
// round trip.
export async function enquiryInbox({
  view,
  q,
  page,
}: {
  view: EnquiryView;
  q?: string;
  page: number;
}) {
  const clauses = [
    view === "archived" ? "archived" : "not archived",
    ...(view === "unread" ? ["read_at is null"] : []),
  ];
  const params: unknown[] = [];

  if (q) {
    params.push(`%${q.replace(/[\\%_]/g, "\\$&")}%`);
    clauses.push(
      `(name ilike $1 or email ilike $1 or message ilike $1)`
    );
  }

  const offset = (page - 1) * ENQUIRY_PAGE_SIZE;

  const [rows, [counts]] = await batch<
    [(Enquiry & { total: string })[], Record<EnquiryView, number>[]]
  >([
    sql().query(
      `select *, count(*) over() as total
         from enquiries
        where ${clauses.join(" and ")}
        order by created_at desc
        limit ${ENQUIRY_PAGE_SIZE} offset ${offset}`,
      params
    ),
    sql()`
      select count(*) filter (where not archived)::int as inbox,
             count(*) filter (where not archived and read_at is null)::int as unread,
             count(*) filter (where archived)::int as archived
        from enquiries
    `,
  ]);

  return {
    rows,
    total: rows.length ? Number(rows[0].total) : 0,
    counts,
  };
}

export async function getEnquiry(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;

  const rows = (await sql()`
    select * from enquiries where id = ${id}
  `) as Enquiry[];

  return rows[0] ?? null;
}
