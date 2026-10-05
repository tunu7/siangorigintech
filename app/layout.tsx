import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

// Public pages override this with the editable settings in
// app/(site)/layout.tsx; admin pages keep it to avoid a content query.
export const metadata: Metadata = {
  // Resolves relative canonical, Open Graph and image URLs.
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Siang Origin Technologies",
    template: "%s — Siang Origin",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${instrument.variable}`}>
      <body className="font-sans">
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
