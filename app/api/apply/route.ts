import { after, NextResponse } from "next/server";
import { del, head } from "@vercel/blob";
import { Resend } from "resend";
import { getJobBySlug } from "@/data/jobs";
import {
  MAX_RESUME_BYTES,
  resumePrefix,
} from "@/lib/applications";
import { sql } from "@/lib/db";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function optionalUrl(value: unknown) {
  const url = text(value, 500);

  if (!url) return null;

  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol)
      ? parsed.toString()
      : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    // Honeypot — real users never fill this in.
    if (text(body.company, 200)) {
      return NextResponse.json({ success: true });
    }

    const name = text(body.name, 200);
    const email = text(body.email, 320).toLowerCase();
    const phone = text(body.phone, 40);
    const message = text(body.message, 5000);
    const jobSlug = text(body.jobSlug, 100);
    const resumePathname = text(body.resumePathname, 300);
    const resumeName = text(body.resumeName, 300) || "resume.pdf";

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const job = getJobBySlug(jobSlug);

    if (!job) {
      return NextResponse.json(
        { error: "This role is no longer open." },
        { status: 404 }
      );
    }

    if (!resumePathname.startsWith(resumePrefix(jobSlug))) {
      return NextResponse.json(
        { error: "Please upload your resume." },
        { status: 400 }
      );
    }

    const resume = await head(resumePathname).catch(() => null);

    if (
      !resume ||
      resume.contentType !== "application/pdf" ||
      resume.size > MAX_RESUME_BYTES
    ) {
      return NextResponse.json(
        { error: "Resume upload not found. Please re-upload." },
        { status: 400 }
      );
    }

    // Insert unless the same person applied to this role in the last 24h.
    const inserted = (await sql()`
      insert into applications (
        job_slug, job_title, name, email, phone,
        linkedin, portfolio, message, resume_pathname, resume_name
      )
      select
        ${jobSlug}, ${job.title}, ${name}, ${email}, ${phone},
        ${optionalUrl(body.linkedin)}, ${optionalUrl(body.portfolio)},
        ${message}, ${resumePathname}, ${resumeName}
      where not exists (
        select 1 from applications
         where lower(email) = ${email}
           and job_slug = ${jobSlug}
           and created_at > now() - interval '24 hours'
      )
      on conflict (resume_pathname) do nothing
      returning id
    `) as { id: string }[];

    if (!inserted.length) {
      after(() => discardOrphanedResume(resumePathname));

      return NextResponse.json(
        { error: "You have already applied for this role." },
        { status: 409 }
      );
    }

    // Notify the team without blocking the applicant's response.
    after(() =>
      notifyTeam({
        id: inserted[0].id,
        name,
        email,
        jobTitle: job.title,
      })
    );

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("APPLICATION ERROR:", error);

    return NextResponse.json(
      { error: "Unable to submit application. Please try again." },
      { status: 500 }
    );
  }
}

// Deletes an uploaded resume that no application references, e.g. after a
// duplicate submission. Never touches a resume that is already on file.
async function discardOrphanedResume(pathname: string) {
  try {
    const rows = (await sql()`
      select 1 from applications where resume_pathname = ${pathname}
    `) as unknown[];

    if (!rows.length) await del(pathname);
  } catch (error) {
    console.error("RESUME CLEANUP ERROR:", error);
  }
}

async function notifyTeam(details: {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.APPLICATIONS_NOTIFY_EMAIL;

  if (!apiKey || !from || !to) return;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");

  const link = `${siteUrl}/admin/applications/${details.id}`;

  try {
    await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      replyTo: details.email,
      subject: `New application: ${details.jobTitle} — ${details.name}`,
      text: `${details.name} (${details.email}) applied for ${details.jobTitle}.\n\nReview: ${link}`,
    });
  } catch (error) {
    console.error("APPLICATION NOTIFY ERROR:", error);
  }
}
