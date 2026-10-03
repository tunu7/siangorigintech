"use client";

import { useEffect } from "react";
import { buttonClass, Container } from "@/app/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
        Something went wrong
      </p>
      <h1 className="font-display mt-6 max-w-2xl text-5xl text-balance">
        We couldn&apos;t load this page.
      </h1>
      <p className="mt-6 text-lg text-ink-soft">
        Please try again in a moment.
      </p>
      <button type="button" onClick={reset} className={`${buttonClass()} mt-10`}>
        Try again
      </button>
    </Container>
  );
}
