import "server-only";

import { cache } from "react";
import { sql } from "@/lib/db";

export type Job = {
  slug: string;
  created_at: string;
  updated_at: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  salary: string | null;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  is_open: boolean;
  sort_order: number;
};

export type JobWithCounts = Job & {
  applications: number;
  new_applications: number;
};

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function listOpenJobs() {
  return (await sql()`
    select * from jobs
     where is_open
     order by sort_order, created_at desc
  `) as Job[];
}

// Deduplicated per request so generateMetadata and the page share a query.
export const getOpenJob = cache(async (slug: string) => {
  if (!SLUG_PATTERN.test(slug)) return null;

  const rows = (await sql()`
    select * from jobs where slug = ${slug} and is_open
  `) as Job[];

  return rows[0] ?? null;
});

// A job plus how many applications it has, for the admin edit page.
export async function getJobWithCount(slug: string) {
  if (!SLUG_PATTERN.test(slug)) return null;

  const rows = (await sql()`
    select j.*,
           (select count(*)::int from applications a
             where a.job_slug = j.slug) as applications
      from jobs j
     where j.slug = ${slug}
  `) as (Job & { applications: number })[];

  return rows[0] ?? null;
}

export async function listJobsWithCounts() {
  return (await sql()`
    select j.*,
           count(a.id)::int as applications,
           count(a.id) filter (where a.status = 'new')::int as new_applications
      from jobs j
      left join applications a on a.job_slug = j.slug
     group by j.slug
     order by j.is_open desc, j.sort_order, j.created_at desc
  `) as JobWithCounts[];
}
