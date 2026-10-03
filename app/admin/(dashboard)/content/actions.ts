"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  isSectionKey,
  normalizeSection,
  validateSection,
} from "@/lib/content-schema";
import { sql } from "@/lib/db";
import type { FormState } from "@/app/admin/actions";

export async function saveContent(
  key: string,
  data: unknown
): Promise<FormState> {
  await requireAdmin();

  if (!isSectionKey(key)) return { error: "Unknown section." };

  const value = normalizeSection(key, data);
  const error = validateSection(key, value);

  if (error) return { error };

  try {
    await sql()`
      insert into site_content (key, value)
      values (${key}, ${JSON.stringify(value)}::jsonb)
      on conflict (key) do update set value = excluded.value
    `;
  } catch (error) {
    console.error("SAVE CONTENT ERROR:", error);
    return { error: "Unable to save changes." };
  }

  // Content is shared across pages (navbar, footer, banner), so refresh
  // the whole site.
  revalidatePath("/", "layout");

  return { saved: true };
}

export async function resetContent(key: string): Promise<FormState> {
  await requireAdmin();

  if (!isSectionKey(key)) return { error: "Unknown section." };

  try {
    await sql()`delete from site_content where key = ${key}`;
  } catch (error) {
    console.error("RESET CONTENT ERROR:", error);
    return { error: "Unable to reset." };
  }

  revalidatePath("/", "layout");

  return { saved: true };
}
