import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { getContent } from "@/lib/content";
import { ButtonLink, Container } from "@/app/components/ui";

export default async function NotFound() {
  const { shortName, logoMark, navCta, navCtaHref, nav } =
    await getContent("settings");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar brand={{ shortName, logoMark, navCta, navCtaHref, nav }} />

      <main className="flex flex-1 items-center">
        <Container className="py-24 sm:py-32">
          <p className="animate-fade-up text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            Error 404
          </p>
          <h1 className="font-display mt-6 max-w-3xl animate-fade-up text-5xl text-balance [animation-delay:80ms] sm:text-7xl">
            This page has moved, or never existed.
          </h1>
          <div className="mt-12 animate-fade-up [animation-delay:160ms]">
            <ButtonLink href="/" arrow>
              Return home
            </ButtonLink>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
