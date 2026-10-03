import { NextResponse } from "next/server";
import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";
import {
  MAX_RESUME_BYTES,
  resumePrefix,
} from "@/lib/applications";
import { getOpenJob } from "@/lib/jobs";

// Issues short-lived client tokens so the browser uploads the resume
// straight to Vercel Blob. This keeps large files out of the
// Vercel Function (4.5MB request body limit).
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const jobSlug = pathname.split("/")[1] ?? "";

        if (
          !(await getOpenJob(jobSlug)) ||
          !pathname.startsWith(resumePrefix(jobSlug)) ||
          !pathname.toLowerCase().endsWith(".pdf")
        ) {
          throw new Error("Invalid upload.");
        }

        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: MAX_RESUME_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("UPLOAD TOKEN ERROR:", error);

    return NextResponse.json(
      { error: "Unable to upload resume. Please try again." },
      { status: 400 }
    );
  }
}
