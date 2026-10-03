"use server";

import { Resend } from "resend";
import { sql } from "@/lib/db";
import { site, siteUrl } from "@/lib/site";

export type ContactState = { error?: string; sent?: boolean };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function sendEnquiry(
  _state: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot — real users never fill this in.
  if (text(formData.get("company_website"), 200)) {
    return { sent: true };
  }

  const name = text(formData.get("name"), 200);
  const email = text(formData.get("email"), 320);
  const message = text(formData.get("message"), 5000);

  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  // Save first so the enquiry reaches the admin inbox even if email fails.
  let id: string | undefined;

  try {
    const rows = (await sql()`
      insert into enquiries (name, email, message)
      values (${name}, ${email}, ${message})
      returning id
    `) as { id: string }[];
    id = rows[0]?.id;
  } catch (error) {
    console.error("CONTACT SAVE ERROR:", error);
  }

  const emailed = await notifyTeam({ id, name, email, message });

  if (!id && !emailed) {
    return {
      error: `Unable to send your message right now. Please email us at ${site.contactEmail}.`,
    };
  }

  return { sent: true };
}

async function notifyTeam(details: {
  id?: string;
  name: string;
  email: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to =
    process.env.CONTACT_NOTIFY_EMAIL ??
    process.env.APPLICATIONS_NOTIFY_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("CONTACT ERROR: email delivery is not configured");
    return false;
  }

  const link = details.id
    ? `\n\nView in admin: ${siteUrl()}/admin/enquiries/${details.id}`
    : "";

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      replyTo: details.email,
      subject: `New enquiry from ${details.name}`,
      text: `${details.name} (${details.email}) wrote:\n\n${details.message}${link}`,
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return false;
  }
}
