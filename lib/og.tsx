import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

// Shared Open Graph card: paper background, the mountain mark and the
// page headline in Instrument Serif.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const font = readFile(
  join(process.cwd(), "assets/fonts/InstrumentSerif-Regular.ttf")
);

export async function ogImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const [site, serif] = await Promise.all([getContent("settings"), font]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f6f2",
          color: "#161614",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#75736c",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                background: "#0b4d2c",
              }}
            />
            {eyebrow}
          </div>
          {site.location && <div>{site.location}</div>}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: title.length > 60 ? 76 : 96,
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #cfcbc1",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="78" height="48" viewBox="0 0 100 62">
              <path d="M64 14 L100 62 L66 62 Z" fill="#2f7d46" />
              <path
                d="M40 0 L0 62 L18 62 L40 28 L62 62 L80 62 Z M40 41 L26.5 62 L53.5 62 Z"
                fill="#161614"
              />
            </svg>
            <div style={{ fontFamily: "Instrument Serif", fontSize: 40 }}>
              {site.name}
            </div>
          </div>
          <div style={{ fontSize: 22, color: "#75736c" }}>
            siangorigintechnologies.com
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Instrument Serif", data: await serif, style: "normal" }],
    }
  );
}
