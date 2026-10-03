"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { isApplicationStatus } from "@/lib/applications";
import {
  checkPassword,
  endSession,
  requireAdmin,
  safeNextPath,
  startSession,
} from "@/lib/auth";
import { sql } from "@/lib/db";

export type FormState = { error?: string; saved?: boolean };

const UUID_PATTERN = /^[0-9a-f-]{36}$/i;

function ids(formData: FormData) {
  return formData
    .getAll("ids")
    .map(String)
    .filter((id) => UUID_PATTERN.test(id))
    .slice(0, 500);
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

async function clientIp() {
  const headerList = await headers();
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown"
  );
}

export async function signIn(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const password = String(formData.get("password") || "");
  const ip = await clientIp();

  // Lock an IP out after repeated failures. If the database is down, fall
  // back to the delay below rather than blocking every sign-in.
  try {
    const [{ count }] = (await sql()`
      select count(*)::int as count from admin_login_attempts
       where ip = ${ip}
         and created_at > now() - make_interval(mins => ${LOCKOUT_MINUTES})
    `) as { count: number }[];

    if (count >= MAX_ATTEMPTS) {
      return {
        error: `Too many failed attempts. Try again in ${LOCKOUT_MINUTES} minutes.`,
      };
    }
  } catch (error) {
    console.error("LOGIN RATE LIMIT ERROR:", error);
  }

  if (!checkPassword(password)) {
    try {
      await sql()`insert into admin_login_attempts (ip) values (${ip})`;
      await sql()`
        delete from admin_login_attempts
         where created_at < now() - interval '1 day'
      `;
    } catch (error) {
      console.error("LOGIN RATE LIMIT ERROR:", error);
    }

    // Slow down brute-force attempts.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: "Incorrect password." };
  }

  try {
    await sql()`delete from admin_login_attempts where ip = ${ip}`;
  } catch (error) {
    console.error("LOGIN RATE LIMIT ERROR:", error);
  }

  await startSession();
  redirect(safeNextPath(formData.get("next")));
}

export async function signOut() {
  await endSession();
  redirect("/admin/login");
}

export async function updateApplication(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const status = formData.get("status");
  const notes = String(formData.get("notes") || "").slice(0, 10000);

  if (!UUID_PATTERN.test(id) || !isApplicationStatus(status)) {
    return { error: "Invalid update." };
  }

  try {
    await sql()`
      update applications
         set status = ${status}, notes = ${notes || null}
       where id = ${id}
    `;
  } catch (error) {
    console.error("UPDATE APPLICATION ERROR:", error);
    return { error: "Unable to save changes." };
  }

  revalidatePath("/admin", "layout");

  return { saved: true };
}

// Deletes the applications and their resumes from Blob.
async function removeApplications(idList: string[]) {
  const rows = (await sql()`
    delete from applications
     where id = any(${idList}::uuid[])
    returning resume_pathname
  `) as { resume_pathname: string }[];

  const pathnames = rows.map((row) => row.resume_pathname);

  if (pathnames.length) {
    try {
      await del(pathnames);
    } catch (error) {
      // The rows are gone; an orphaned private blob is harmless.
      console.error("RESUME DELETE ERROR:", error);
    }
  }
}

export async function deleteApplication(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  if (!UUID_PATTERN.test(id)) return;

  await removeApplications([id]);

  revalidatePath("/admin", "layout");
  redirect("/admin/applications");
}

export async function bulkUpdateApplications(formData: FormData) {
  await requireAdmin();

  const selected = ids(formData);
  const op = String(formData.get("op") || "");

  if (!selected.length) return;

  if (op === "delete") {
    await removeApplications(selected);
  } else if (isApplicationStatus(op)) {
    await sql()`
      update applications
         set status = ${op}
       where id = any(${selected}::uuid[])
    `;
  } else {
    return;
  }

  revalidatePath("/admin", "layout");
}
