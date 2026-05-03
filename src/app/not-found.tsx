import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-xl font-semibold">Page not found</h2>
      <p className="text-sm text-[var(--muted-foreground)]">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm text-[var(--background)]"
      >
        Go home
      </Link>
    </main>
  );
}
