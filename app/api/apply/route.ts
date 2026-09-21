import { NextResponse } from "next/server";

export const runtime = "nodejs";

const APPS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL;

export async function POST(request: Request) {
  try {
    if (!APPS_SCRIPT_URL) {
      console.error(
        "GOOGLE_APPS_SCRIPT_URL is missing"
      );

      return NextResponse.json(
        {
          error:
            "Application service is not configured.",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const name = String(
      formData.get("name") || ""
    );

    const email = String(
      formData.get("email") || ""
    );

    const phone = String(
      formData.get("phone") || ""
    );

    const linkedin = String(
      formData.get("linkedin") || ""
    );

    const portfolio = String(
      formData.get("portfolio") || ""
    );

    const message = String(
      formData.get("message") || ""
    );

    const jobSlug = String(
      formData.get("jobSlug") || ""
    );

    const resume = formData.get("resume");

    // Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          error:
            "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    if (!(resume instanceof File)) {
      return NextResponse.json(
        {
          error:
            "Please upload your resume.",
        },
        { status: 400 }
      );
    }

    if (resume.type !== "application/pdf") {
      return NextResponse.json(
        {
          error:
            "Only PDF resumes are allowed.",
        },
        { status: 400 }
      );
    }

    if (resume.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          error:
            "Resume must be smaller than 10MB.",
        },
        { status: 400 }
      );
    }

    // Convert PDF to Base64
    const buffer = Buffer.from(
      await resume.arrayBuffer()
    );

    const resumeBase64 =
      buffer.toString("base64");

    // Send to Apps Script
    const appsScriptData =
      new URLSearchParams();

    appsScriptData.append(
      "name",
      name
    );

    appsScriptData.append(
      "email",
      email
    );

    appsScriptData.append(
      "phone",
      phone
    );

    appsScriptData.append(
      "linkedin",
      linkedin
    );

    appsScriptData.append(
      "portfolio",
      portfolio
    );

    appsScriptData.append(
      "message",
      message
    );

    appsScriptData.append(
      "jobSlug",
      jobSlug
    );

    appsScriptData.append(
      "resumeName",
      resume.name
    );

    appsScriptData.append(
      "resumeBase64",
      resumeBase64
    );

    const response = await fetch(
      APPS_SCRIPT_URL,
      {
        method: "POST",
        body: appsScriptData,
        redirect: "follow",
      }
    );

    const result =
      await response.json();

    if (!result.success) {
      return NextResponse.json(
        {
          error:
            result.error ||
            "Unable to submit application.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Application submitted successfully.",
    });

  } catch (error) {
    console.error(
      "APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to submit application. Please try again.",
      },
      { status: 500 }
    );
  }
}