import type { ReactNode } from "react";

export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="grid gap-8">{children}</div>
    </section>
  );
}

export function Demo({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-border bg-card p-6">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {name}
      </h3>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  );
}
