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
      <p className="text-sm font-medium text-brand">Something went wrong</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        We couldn&apos;t load this page.
      </h1>
      <p className="mt-4 text-zinc-600">
        Please try again. If the problem continues, contact us.
      </p>
      <button type="button" onClick={reset} className={`${buttonClass()} mt-8`}>
        Try again
      </button>
    </Container>
  );
}
