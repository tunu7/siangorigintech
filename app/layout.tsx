import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Siang Origin Technologies",
    template: "%s — Siang Origin",
  },
  description:
    "Siang Origin Technologies is a technology studio building digital experiences, growth systems and intelligent products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
