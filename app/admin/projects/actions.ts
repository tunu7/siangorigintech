"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { del, head } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import { IMAGE_TYPES, isProjectImagePath } from "@/lib/media";
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

// Removes images no project references any more.
async function deleteImages(pathnames: (string | null | undefined)[]) {
  const unused: string[] = [];

  for (const pathname of pathnames) {
    if (!isProjectImagePath(pathname)) continue;

    const rows = (await sql()`
      select 1 from projects where image = ${pathname}
    `) as unknown[];

    if (!rows.length) unused.push(pathname);
  }

  if (unused.length) {
    try {
      await del(unused);
    } catch (error) {
      console.error("IMAGE DELETE ERROR:", error);
    }
  }
}

async function validImage(pathname: string) {
  if (!isProjectImagePath(pathname)) return false;

  const blob = await head(pathname).catch(() => null);
  return Boolean(blob && IMAGE_TYPES.includes(blob.contentType));
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
  const image = text(formData, "image", 300) || null;

  const project = {
    title: text(formData, "title"),
    mark: text(formData, "mark", 3).toUpperCase(),
    category: text(formData, "category"),
    description: text(formData, "description", 1000),
    url: optionalUrl(rawUrl),
    image,
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  };

  if (!project.title || !project.category || !project.description) {
    return { error: "Please fill in all required fields." };
  }

  if (!project.image && !project.mark) {
    return { error: "Add a cover image or cover letters." };
  }

  if (project.image && !(await validImage(project.image))) {
    return { error: "The image upload wasn't found. Please upload it again." };
  }

  let previousImage: string | null = null;

  if (rawUrl && !project.url) {
    return { error: "Please enter a valid website link." };
  }

  try {
    if (id) {
      if (!UUID_PATTERN.test(id)) return { error: "Invalid project." };

      const [existing] = (await sql()`
        select image from projects where id = ${id}
      `) as { image: string | null }[];
      previousImage = existing?.image ?? null;

      const rows = (await sql()`
        update projects set
          title = ${project.title},
          mark = ${project.mark},
          category = ${project.category},
          description = ${project.description},
          url = ${project.url},
          image = ${project.image},
          published = ${project.published},
          featured = ${project.featured}
        where id = ${id}
        returning id
      `) as unknown[];

      if (!rows.length) return { error: "This project no longer exists." };
    } else {
      await sql()`
        insert into projects (
          title, mark, category, description, url, image, published,
          featured, sort_order
        )
        select
          ${project.title}, ${project.mark}, ${project.category},
          ${project.description}, ${project.url}, ${project.image},
          ${project.published},
          ${project.featured},
          coalesce(max(sort_order), 0) + 10
        from projects
      `;
    }
  } catch (error) {
    console.error("SAVE PROJECT ERROR:", error);
    return { error: "Unable to save the project." };
  }

  if (previousImage !== project.image) await deleteImages([previousImage]);

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

  const rows = (await sql()`
    delete from projects where id = ${id} returning image
  `) as { image: string | null }[];

  await deleteImages(rows.map((row) => row.image));

  revalidateProjects();
  redirect("/admin/projects");
}
