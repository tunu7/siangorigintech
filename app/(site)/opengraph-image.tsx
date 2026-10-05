import { getContent } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Siang Origin Technologies — independent technology studio";

export default async function Image() {
  const home = await getContent("home");
  return ogImage({
    eyebrow: home.heroBadge,
    title: `${home.heroTitle} ${home.heroHighlight}`.trim(),
  });
}
