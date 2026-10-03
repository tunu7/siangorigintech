"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";

const UUID_PATTERN = /^[0-9a-f-]{36}$/i;

function ids(formData: FormData) {
  return formData
    .getAll("ids")
    .map(String)
    .filter((id) => UUID_PATTERN.test(id))
    .slice(0, 500);
}

async function apply(op: string, selected: string[]) {
  if (!selected.length) return;

  switch (op) {
    case "read":
      await sql()`
        update enquiries set read_at = coalesce(read_at, now())
         where id = any(${selected}::uuid[])
      `;
      break;
    case "unread":
      await sql()`
        update enquiries set read_at = null
         where id = any(${selected}::uuid[])
      `;
      break;
    case "archive":
      await sql()`
        update enquiries set archived = true, read_at = coalesce(read_at, now())
         where id = any(${selected}::uuid[])
      `;
      break;
    case "unarchive":
      await sql()`
        update enquiries set archived = false
         where id = any(${selected}::uuid[])
      `;
      break;
    case "delete":
      await sql()`
        delete from enquiries where id = any(${selected}::uuid[])
      `;
      break;
    default:
      return;
  }

  revalidatePath("/admin", "layout");
}

export async function updateEnquiries(formData: FormData) {
  await requireAdmin();
  await apply(String(formData.get("op") || ""), ids(formData));
}

// Single-enquiry actions from the detail page. Everything except
// unarchiving returns to the inbox (staying on the page after "mark as
// unread" would immediately mark it read again).
export async function updateEnquiry(formData: FormData) {
  await requireAdmin();

  const op = String(formData.get("op") || "");
  await apply(op, ids(formData));

  if (op !== "unarchive") {
    redirect("/admin/enquiries");
  }
}

// Called once when an enquiry is opened (not during render, so link
// prefetching never marks messages as read).
export async function markEnquiryRead(id: string) {
  await requireAdmin();

  if (!UUID_PATTERN.test(id)) return;

  await sql()`
    update enquiries set read_at = now()
     where id = ${id} and read_at is null
  `;

  revalidatePath("/admin", "layout");
}
