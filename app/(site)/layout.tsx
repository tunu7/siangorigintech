import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getContent } from "@/lib/content";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { shortName, logoMark, navCta } = await getContent("settings");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar brand={{ shortName, logoMark, navCta }} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
