import "server-only";

import {
  APPLICATION_STATUSES,
  isApplicationStatus,
  type Application,
  type ApplicationStatus,
} from "@/lib/applications";
import { batch, sql } from "@/lib/db";

export const PAGE_SIZE = 25;

export const SORTS = {
  newest: "created_at desc",
  oldest: "created_at asc",
  name: "lower(name) asc, created_at desc",
  updated: "updated_at desc",
} as const;

export type ApplicationSort = keyof typeof SORTS;

export type ApplicationFilters = {
  q?: string;
  job?: string;
  status?: ApplicationStatus;
  sort?: ApplicationSort;
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
  const sort = first(params.sort);

  return {
    q: first(params.q)?.slice(0, 100),
    job: first(params.job),
    status: isApplicationStatus(status) ? status : undefined,
    sort: sort && Object.hasOwn(SORTS, sort) ? (sort as ApplicationSort) : undefined,
    page: Math.max(1, Math.floor(Number(first(params.page))) || 1),
  };
}

// Parameterised WHERE clause shared by the list and the CSV export.
function where(filters: Omit<ApplicationFilters, "page" | "sort">) {
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

type ListRow = ApplicationRow & { total: string };
type StatusRow = { status: ApplicationStatus; count: number };

function listQuery(filters: ApplicationFilters) {
  const { clause, params } = where(filters);
  const offset = (filters.page - 1) * PAGE_SIZE;

  return sql().query(
    `select id, created_at, job_slug, job_title, name, email, phone, status,
            count(*) over() as total
       from applications
       ${clause}
      order by ${SORTS[filters.sort ?? "newest"]}
      limit ${PAGE_SIZE} offset ${offset}`,
    params
  );
}

function toStatusCounts(rows: StatusRow[]) {
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

// Everything the applications dashboard needs, in one round trip.
export async function dashboardData(filters: ApplicationFilters) {
  const [rows, statusRows, jobs] = await batch<
    [ListRow[], StatusRow[], { slug: string; title: string }[]]
  >([
    listQuery(filters),
    sql()`
      select status, count(*)::int as count
        from applications
       group by status
    `,
    sql()`
      select slug, title from jobs
      union
      select distinct job_slug, job_title from applications
       where job_slug not in (select slug from jobs)
       order by title
    `,
  ]);

  return {
    rows,
    total: rows.length ? Number(rows[0].total) : 0,
    counts: toStatusCounts(statusRows),
    jobs,
  };
}

export async function exportApplications(
  filters: Omit<ApplicationFilters, "page">
) {
  const { clause, params } = where(filters);

  return (await sql().query(
    `select * from applications ${clause}
      order by ${SORTS[filters.sort ?? "newest"]} limit 5000`,
    params
  )) as Application[];
}

export async function getApplication(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;

  const rows = (await sql()`
    select * from applications where id = ${id}
  `) as Application[];

  return rows[0] ?? null;
}

// An application plus other applications from the same person, in one
// round trip.
export async function getApplicationWithRelated(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;

  const [rows, related] = await batch<[Application[], ApplicationRow[]]>([
    sql()`select * from applications where id = ${id}`,
    sql()`
      select id, created_at, job_slug, job_title, name, email, phone, status
        from applications
       where lower(email) = (
               select lower(email) from applications where id = ${id}
             )
         and id <> ${id}
       order by created_at desc
       limit 20
    `,
  ]);

  return rows[0] ? { application: rows[0], related } : null;
}
