import "server-only";

import {
  APPLICATION_STATUSES,
  isApplicationStatus,
  type Application,
  type ApplicationStatus,
} from "@/lib/applications";
import { sql } from "@/lib/db";

export const PAGE_SIZE = 25;

export type ApplicationFilters = {
  q?: string;
  job?: string;
  status?: ApplicationStatus;
  page: number;
};

export type ApplicationRow = Pick<
  Application,
  | "id"
  | "created_at"
  | "job_slug"
  | "job_title"
  | "name"
  | "email"
  | "phone"
  | "status"
>;

export function parseFilters(
  params: Record<string, string | string[] | undefined>
): ApplicationFilters {
  const first = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

  const status = first(params.status);

  return {
    q: first(params.q)?.slice(0, 100),
    job: first(params.job),
    status: isApplicationStatus(status) ? status : undefined,
    page: Math.max(1, Math.floor(Number(first(params.page))) || 1),
  };
}

// Parameterised WHERE clause shared by the list and the CSV export.
function where(filters: Omit<ApplicationFilters, "page">) {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (filters.job) {
    params.push(filters.job);
    clauses.push(`job_slug = $${params.length}`);
  }

  if (filters.status) {
    params.push(filters.status);
    clauses.push(`status = $${params.length}`);
  }

  if (filters.q) {
    params.push(`%${filters.q.replace(/[\\%_]/g, "\\$&")}%`);
    const n = params.length;
    clauses.push(
      `(name ilike $${n} or email ilike $${n} or phone ilike $${n})`
    );
  }

  return {
    clause: clauses.length ? `where ${clauses.join(" and ")}` : "",
    params,
  };
}

export async function listApplications(filters: ApplicationFilters) {
  const { clause, params } = where(filters);
  const offset = (filters.page - 1) * PAGE_SIZE;

  const rows = (await sql().query(
    `select id, created_at, job_slug, job_title, name, email, phone, status,
            count(*) over() as total
       from applications
       ${clause}
      order by created_at desc
      limit ${PAGE_SIZE} offset ${offset}`,
    params
  )) as (ApplicationRow & { total: string })[];

  return {
    rows,
    total: rows.length ? Number(rows[0].total) : 0,
  };
}

export async function exportApplications(
  filters: Omit<ApplicationFilters, "page">
) {
  const { clause, params } = where(filters);

  return (await sql().query(
    `select * from applications ${clause}
      order by created_at desc limit 5000`,
    params
  )) as Application[];
}

export async function statusCounts() {
  const rows = (await sql()`
    select status, count(*)::int as count
      from applications
     group by status
  `) as { status: ApplicationStatus; count: number }[];

  const byStatus = Object.fromEntries(
    APPLICATION_STATUSES.map((status) => [
      status,
      rows.find((row) => row.status === status)?.count ?? 0,
    ])
  ) as Record<ApplicationStatus, number>;

  return {
    total: rows.reduce((sum, row) => sum + row.count, 0),
    byStatus,
  };
}

export async function getApplication(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;

  const rows = (await sql()`
    select * from applications where id = ${id}
  `) as Application[];

  return rows[0] ?? null;
}
