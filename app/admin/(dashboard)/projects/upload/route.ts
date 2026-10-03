import { NextResponse } from "next/server";
import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";
import { isAdmin } from "@/lib/auth";
import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  PROJECT_IMAGE_PREFIX,
} from "@/lib/media";

// Issues short-lived client tokens so admins upload project images straight
// to Blob (bypassing the 4.5MB function body limit).
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as HandleUploadBody;

    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (
          !pathname.startsWith(PROJECT_IMAGE_PREFIX) ||
          !/\.(jpe?g|png|webp|avif)$/i.test(pathname)
        ) {
          throw new Error("Invalid upload.");
        }

        return {
          allowedContentTypes: IMAGE_TYPES,
          maximumSizeInBytes: MAX_IMAGE_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("IMAGE UPLOAD TOKEN ERROR:", error);

    return NextResponse.json(
      { error: "Unable to upload image. Please try again." },
      { status: 400 }
    );
  }
}
