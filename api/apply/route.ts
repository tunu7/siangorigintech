import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const jobSlug = formData.get("jobSlug")?.toString();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const linkedin = formData.get("linkedin")?.toString();
    const portfolio = formData.get("portfolio")?.toString();
    const message = formData.get("message")?.toString();

    const resume = formData.get("resume");

    /* =========================
       VALIDATE REQUIRED FIELDS
    ========================== */

    if (
      !jobSlug ||
      !name ||
      !email ||
      !phone ||
      !message ||
      !(resume instanceof File)
    ) {
      return NextResponse.json(
        {
          error: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    /* =========================
       VALIDATE RESUME
    ========================== */

    if (resume.type !== "application/pdf") {
      return NextResponse.json(
        {
          error: "Resume must be a PDF file.",
        },
        { status: 400 }
      );
    }

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Resume must be smaller than 10MB.",
        },
        { status: 400 }
      );
    }

    /* =========================
       CHECK API KEY
    ========================== */

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");

      return NextResponse.json(
        {
          error: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    /* =========================
       PREPARE PDF
    ========================== */

    const resumeBuffer = Buffer.from(
      await resume.arrayBuffer()
    );

    /* =========================
       SEND EMAIL
    ========================== */

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Siang Origin Careers <onboarding@resend.dev>",

      to: ["siangorigintech@gmail.com"],

      replyTo: email,

      subject: `New Application — ${jobSlug} — ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #111;">

          <h1 style="font-size: 24px; margin-bottom: 30px;">
            New Job Application
          </h1>

          <div style="border-top: 1px solid #ddd; padding-top: 20px;">

            <p>
              <strong>Position</strong><br />
              ${escapeHtml(jobSlug)}
            </p>

            <p>
              <strong>Name</strong><br />
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email</strong><br />
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Phone</strong><br />
              ${escapeHtml(phone)}
            </p>

            <p>
              <strong>LinkedIn</strong><br />
              ${
                linkedin
                  ? `<a href="${escapeAttribute(linkedin)}">${escapeHtml(linkedin)}</a>`
                  : "Not provided"
              }
            </p>

            <p>
              <strong>Portfolio / Website</strong><br />
              ${
                portfolio
                  ? `<a href="${escapeAttribute(portfolio)}">${escapeHtml(portfolio)}</a>`
                  : "Not provided"
              }
            </p>

          </div>

          <div style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">

            <h2 style="font-size: 18px;">
              Cover Note
            </h2>

            <p style="white-space: pre-line; line-height: 1.7;">
              ${escapeHtml(message)}
            </p>

          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 13px;">
            Resume attached: ${escapeHtml(resume.name)}
          </div>

        </div>
      `,

      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    });

    /* =========================
       HANDLE RESEND ERROR
    ========================== */

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          error: "Could not send your application. Please try again.",
        },
        { status: 500 }
      );
    }

    /* =========================
       SUCCESS
    ========================== */

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      id: data?.id,
    });

  } catch (error) {
    console.error("Application submission error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while submitting your application.",
      },
      { status: 500 }
    );
  }
}

/* =========================
   HTML ESCAPING
========================== */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}