import { get } from "@vercel/blob";
import { isProjectImagePath } from "@/lib/media";

// Serves project images from the private Blob store. Pathnames carry a
// random suffix and are never overwritten, so responses are cached forever
// by browsers and the CDN.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const pathname = (await params).path.join("/");

  if (!isProjectImagePath(pathname)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const result = await get(pathname, { access: "private" });

    if (!result || result.statusCode !== 200) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType,
        "Content-Length": String(result.blob.size),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("MEDIA ERROR:", error);
    return new Response("Not found", { status: 404 });
  }
}
