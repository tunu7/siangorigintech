import { getContent } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Careers at Siang Origin Technologies";

export default async function Image() {
  const page = await getContent("careers");
  return ogImage({ eyebrow: page.eyebrow, title: page.title });
}
