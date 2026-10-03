"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to =
    process.env.CONTACT_NOTIFY_EMAIL ??
    process.env.APPLICATIONS_NOTIFY_EMAIL;

  const fallback = `Unable to send your message right now. Please email us at ${site.contactEmail}.`;

  if (!apiKey || !from || !to) {
    console.error("CONTACT ERROR: email delivery is not configured");
    return { error: fallback };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `${name} (${email}) wrote:\n\n${message}`,
    });

    if (error) throw error;
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return { error: fallback };
  }

  return { sent: true };
}
