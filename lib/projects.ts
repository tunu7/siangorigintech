import "server-only";

import { sql } from "@/lib/db";

export type Project = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  /** Up to three letters shown on the project cover. */
  mark: string;
  category: string;
  description: string;
  url: string | null;
  /** Blob pathname under projects/, served via /media. */
  image: string | null;
  published: boolean;
  /** Shown in "Selected work" on the home page. */
  featured: boolean;
  sort_order: number;
};

export async function listPublishedProjects({
  featuredOnly = false,
}: { featuredOnly?: boolean } = {}) {
  try {
    return (await sql()`
      select * from projects
       where published and (${!featuredOnly} or featured)
       order by sort_order, created_at
    `) as Project[];
  } catch (error) {
    console.error("PROJECTS LOAD ERROR:", error);
    return [];
  }
}

export async function listAllProjects() {
  return (await sql()`
    select * from projects
     order by published desc, sort_order, created_at
  `) as Project[];
}

export async function getProject(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;

  const rows = (await sql()`
    select * from projects where id = ${id}
  `) as Project[];

  return rows[0] ?? null;
}
