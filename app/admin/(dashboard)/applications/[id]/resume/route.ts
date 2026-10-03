import { NextResponse } from "next/server";
import { issueSignedToken, presignUrl } from "@vercel/blob";
import { getApplication } from "@/lib/admin-queries";
import { isAdmin } from "@/lib/auth";

// Redirects to a 60-second presigned URL so resumes are never public
// and large PDFs don't stream through the function.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { id } = await params;
  const application = await getApplication(id);

  if (!application) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const validUntil = Date.now() + 60 * 1000;
    const pathname = application.resume_pathname;

    const token = await issueSignedToken({
      pathname,
      operations: ["get"],
      validUntil,
    });

    const { presignedUrl } = await presignUrl(token, {
      operation: "get",
      pathname,
      validUntil,
      access: "private",
    });

    return NextResponse.redirect(presignedUrl);
  } catch (error) {
    console.error("RESUME URL ERROR:", error);
    return new NextResponse("Resume unavailable", { status: 404 });
  }
}
