"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import type { FormState } from "../actions";

const UUID_PATTERN = /^[0-9a-f-]{36}$/i;

function text(formData: FormData, key: string, max = 300) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

function optionalUrl(value: string) {
  if (!value) return null;

  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function revalidateProjects() {
  revalidatePath("/", "layout");
}

export async function saveProject(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const rawUrl = text(formData, "url", 500);

  const project = {
    title: text(formData, "title"),
    mark: text(formData, "mark", 3).toUpperCase(),
    category: text(formData, "category"),
    description: text(formData, "description", 1000),
    url: optionalUrl(rawUrl),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  };

  if (
    !project.title ||
    !project.mark ||
    !project.category ||
    !project.description
  ) {
    return { error: "Please fill in all required fields." };
  }

  if (rawUrl && !project.url) {
    return { error: "Please enter a valid website link." };
  }

  try {
    if (id) {
      if (!UUID_PATTERN.test(id)) return { error: "Invalid project." };

      const rows = (await sql()`
        update projects set
          title = ${project.title},
          mark = ${project.mark},
          category = ${project.category},
          description = ${project.description},
          url = ${project.url},
          published = ${project.published},
          featured = ${project.featured}
        where id = ${id}
        returning id
      `) as unknown[];

      if (!rows.length) return { error: "This project no longer exists." };
    } else {
      await sql()`
        insert into projects (
          title, mark, category, description, url, published, featured,
          sort_order
        )
        select
          ${project.title}, ${project.mark}, ${project.category},
          ${project.description}, ${project.url}, ${project.published},
          ${project.featured},
          coalesce(max(sort_order), 0) + 10
        from projects
      `;
    }
  } catch (error) {
    console.error("SAVE PROJECT ERROR:", error);
    return { error: "Unable to save the project." };
  }

  revalidateProjects();
  redirect("/admin/projects");
}

// Moves a project one place up or down and renumbers the list.
export async function moveProject(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const direction = formData.get("direction") === "up" ? -1 : 1;

  if (!UUID_PATTERN.test(id)) return;

  const rows = (await sql()`
    select id from projects order by sort_order, created_at
  `) as { id: string }[];

  const ids = rows.map((row) => row.id);
  const from = ids.indexOf(id);
  const to = from + direction;

  if (from < 0 || to < 0 || to >= ids.length) return;

  [ids[from], ids[to]] = [ids[to], ids[from]];

  await sql()`
    update projects p
       set sort_order = o.position * 10
      from unnest(${ids}::uuid[]) with ordinality as o(id, position)
     where p.id = o.id
  `;

  revalidateProjects();
}

export async function setProjectPublished(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const published = formData.get("published") === "true";

  if (!UUID_PATTERN.test(id)) return;

  await sql()`update projects set published = ${published} where id = ${id}`;

  revalidateProjects();
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");

  if (!UUID_PATTERN.test(id)) return;

  await sql()`delete from projects where id = ${id}`;

  revalidateProjects();
  redirect("/admin/projects");
}
