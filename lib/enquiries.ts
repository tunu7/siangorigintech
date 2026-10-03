import "server-only";

import { sql } from "@/lib/db";

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

export async function listEnquiries({
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

  const rows = (await sql().query(
    `select *, count(*) over() as total
       from enquiries
      where ${clauses.join(" and ")}
      order by created_at desc
      limit ${ENQUIRY_PAGE_SIZE} offset ${offset}`,
    params
  )) as (Enquiry & { total: string })[];

  return {
    rows,
    total: rows.length ? Number(rows[0].total) : 0,
  };
}

export async function getEnquiry(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;

  const rows = (await sql()`
    select * from enquiries where id = ${id}
  `) as Enquiry[];

  return rows[0] ?? null;
}

export async function enquiryCounts() {
  const [row] = (await sql()`
    select count(*) filter (where not archived)::int as inbox,
           count(*) filter (where not archived and read_at is null)::int as unread,
           count(*) filter (where archived)::int as archived
      from enquiries
  `) as Record<EnquiryView, number>[];

  return row;
}
