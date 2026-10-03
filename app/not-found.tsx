import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ButtonLink, Container } from "@/app/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="relative flex flex-1 items-center overflow-hidden">
        <div aria-hidden className="bg-dots absolute inset-0" />
        <Container className="relative py-24 text-center">
          <p className="animate-fade-up text-8xl font-semibold tracking-tighter text-brand/15 sm:text-9xl">
            404
          </p>
          <h1 className="mt-2 animate-fade-up text-3xl font-semibold tracking-tight [animation-delay:100ms]">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md animate-fade-up text-zinc-600 [animation-delay:200ms]">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="mt-8 animate-fade-up [animation-delay:300ms]">
            <ButtonLink href="/" arrow>
              Back to home
            </ButtonLink>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
