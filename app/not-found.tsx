import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { getContent } from "@/lib/content";
import { ButtonLink, PageHeader } from "@/app/components/ui";

export default async function NotFound() {
  const { shortName, navCta, navCtaHref, nav } =
    await getContent("settings");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar brand={{ shortName, navCta, navCtaHref, nav }} />

      <main className="flex-1 pb-3 sm:pb-4">
        <PageHeader
          eyebrow="Error 404"
          title="This page has moved, or never existed."
        >
          <div className="mt-12 animate-fade-up [animation-delay:160ms]">
            <ButtonLink href="/" variant="lime" arrow>
              Return home
            </ButtonLink>
          </div>
        </PageHeader>
      </main>

      <Footer />
    </div>
  );
}
