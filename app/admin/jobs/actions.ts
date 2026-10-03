"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";
import { SLUG_PATTERN } from "@/lib/jobs";
import type { FormState } from "../actions";

function text(formData: FormData, key: string, max = 300) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

// One list item per line; blank lines and bullet characters are dropped.
function lines(formData: FormData, key: string) {
  return text(formData, key, 10000)
    .split("\n")
    .map((line) => line.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 50);
}

function revalidateJobs() {
  revalidatePath("/careers", "layout");
  revalidatePath("/admin", "layout");
}

export async function saveJob(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const original = text(formData, "original");
  const slug = original || text(formData, "slug", 80).toLowerCase();

  const job = {
    title: text(formData, "title"),
    department: text(formData, "department"),
    type: text(formData, "type"),
    location: text(formData, "location"),
    experience: text(formData, "experience"),
    salary: text(formData, "salary") || null,
    description: text(formData, "description", 2000),
    responsibilities: lines(formData, "responsibilities"),
    requirements: lines(formData, "requirements"),
    benefits: lines(formData, "benefits"),
    is_open: formData.get("is_open") === "on",
    sort_order: Math.trunc(Number(formData.get("sort_order"))) || 0,
  };

  if (!SLUG_PATTERN.test(slug)) {
    return {
      error: "URL slug may only contain lowercase letters, numbers and dashes.",
    };
  }

  if (
    !job.title ||
    !job.department ||
    !job.type ||
    !job.location ||
    !job.experience ||
    !job.description
  ) {
    return { error: "Please fill in all required fields." };
  }

  try {
    if (original) {
      const rows = (await sql()`
        update jobs set
          title = ${job.title},
          department = ${job.department},
          type = ${job.type},
          location = ${job.location},
          experience = ${job.experience},
          salary = ${job.salary},
          description = ${job.description},
          responsibilities = ${job.responsibilities},
          requirements = ${job.requirements},
          benefits = ${job.benefits},
          is_open = ${job.is_open},
          sort_order = ${job.sort_order}
        where slug = ${original}
        returning slug
      `) as unknown[];

      if (!rows.length) return { error: "This job no longer exists." };
    } else {
      const rows = (await sql()`
        insert into jobs (
          slug, title, department, type, location, experience, salary,
          description, responsibilities, requirements, benefits,
          is_open, sort_order
        ) values (
          ${slug}, ${job.title}, ${job.department}, ${job.type},
          ${job.location}, ${job.experience}, ${job.salary},
          ${job.description}, ${job.responsibilities}, ${job.requirements},
          ${job.benefits}, ${job.is_open}, ${job.sort_order}
        )
        on conflict (slug) do nothing
        returning slug
      `) as unknown[];

      if (!rows.length) {
        return { error: "A job with this URL slug already exists." };
      }
    }
  } catch (error) {
    console.error("SAVE JOB ERROR:", error);
    return { error: "Unable to save the job." };
  }

  revalidateJobs();
  redirect("/admin/jobs");
}

export async function setJobOpen(formData: FormData) {
  await requireAdmin();

  const slug = String(formData.get("slug") || "");
  const open = formData.get("open") === "true";

  if (!SLUG_PATTERN.test(slug)) return;

  await sql()`update jobs set is_open = ${open} where slug = ${slug}`;

  revalidateJobs();
}

// Only roles without applications can be deleted; otherwise close them so
// the application history keeps its context.
export async function deleteJob(formData: FormData) {
  await requireAdmin();

  const slug = String(formData.get("slug") || "");

  if (!SLUG_PATTERN.test(slug)) return;

  await sql()`
    delete from jobs
     where slug = ${slug}
       and not exists (
         select 1 from applications where job_slug = ${slug}
       )
  `;

  revalidateJobs();
  redirect("/admin/jobs");
}
