export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">&lt;project-name&gt;</h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        Scaffold ready. First feature lands in MILESTONE-002.
      </p>
      <div className="flex gap-3 text-sm">
        <a className="underline underline-offset-4" href="/api/health">
          health
        </a>
        <a className="underline underline-offset-4" href="/api/ready">
          ready
        </a>
      </div>
    </main>
  );
}
