import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getContent } from "@/lib/content";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getContent("settings");

  return {
    title: {
      default: site.name,
      template: `%s — ${site.shortName}`,
    },
    description: site.metaDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans">
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
