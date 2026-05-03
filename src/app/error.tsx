"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry capture happens via the SDK's automatic instrumentation;
    // log here only what's safe to surface.
    console.error("[segment-error]", error.message, error.digest);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-xl font-semibold">Something went wrong.</h2>
      {error.digest ? (
        <p className="text-sm text-[var(--muted-foreground)]">Reference: {error.digest}</p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm text-[var(--background)]"
      >
        Try again
      </button>
    </main>
  );
}
