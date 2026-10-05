import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export const revalidate = 3600;

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getContent("settings");

  return {
    name: site.name,
    short_name: site.shortName,
    description: site.metaDescription,
    start_url: "/",
    display: "browser",
    background_color: "#f7f6f2",
    theme_color: "#f7f6f2",
    icons: [
      { src: "/icon.png", sizes: "100x100", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
