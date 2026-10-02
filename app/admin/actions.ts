"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isApplicationStatus } from "@/lib/applications";
import {
  checkPassword,
  endSession,
  requireAdmin,
  startSession,
} from "@/lib/auth";
import { sql } from "@/lib/db";

export type FormState = { error?: string; saved?: boolean };

export async function signIn(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const password = String(formData.get("password") || "");

  if (!checkPassword(password)) {
    // Slow down brute-force attempts.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: "Incorrect password." };
  }

  await startSession();
  redirect("/admin");
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

  if (!/^[0-9a-f-]{36}$/i.test(id) || !isApplicationStatus(status)) {
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

  revalidatePath("/admin");
  revalidatePath(`/admin/applications/${id}`);

  return { saved: true };
}
