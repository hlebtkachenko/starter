import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

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
    <section
      id={id}
      className="scroll-mt-24 border-t border-border pt-12 pb-16 first:border-t-0 first:pt-0"
    >
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export function Demo({
  name,
  span,
  height,
  children,
}: {
  name: string;
  span?: 1 | 2 | 3;
  height?: "auto" | "tall";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[var(--radius)] border border-border bg-card p-6",
        span === 2 && "md:col-span-2",
        span === 3 && "md:col-span-2 lg:col-span-3",
        height === "tall" ? "min-h-[20rem]" : "min-h-[10rem]",
      )}
    >
      <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {name}
      </h3>
      <div className="flex flex-1 flex-wrap items-start gap-3">{children}</div>
    </div>
  );
}
