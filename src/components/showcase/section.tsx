import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Section wraps one shadcn component on the showcase page.
 *
 * `id` matches the slug from the shadcn docs URL
 * (https://ui.shadcn.com/docs/components/<id>) and the TOC anchor.
 * `title` and `description` mirror the component's docs heading.
 *
 * Children are rendered into a 1/2/3-column responsive grid of <Demo>.
 *
 * See docs/showcase.md for the full Section id <-> docs URL map.
 */
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
    <section id={id} className="scroll-mt-24 border-t border-border pt-12 pb-16 first:border-t-0">
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

/**
 * Demo wraps one variant inside a Section.
 *
 * Children are the resolved registry component: typically a single
 * `<ComponentPreview name="…" />`, which lazy-loads the variant module
 * from `src/components/examples/<name>.tsx`. The page no longer hand-writes
 * variant JSX inline; everything routes through the registry.
 *
 * `name` matches the `### <name>` heading under `## Examples` in the
 * component's shadcn .md file (e.g. "Basic", "Avatar Group with Icon").
 * AI agents grep the .md file by this exact name. It also lines up with
 * the registry item's `title` field.
 *
 * `span` widens the grid cell (2 or 3 cols) for variants that need room.
 * `height="tall"` raises min-height for components that render large
 * (sidebar, calendar, charts).
 *
 * `flagged` marks a demo that exists on the showcase but is NOT listed
 * in the component's shadcn .md examples. Renders red border + "Not in
 * spec" pill so reviewers can see the deviation. Never silently drop a
 * demo: flag it, keep it, decide later.
 */
export function Demo({
  name,
  span,
  height,
  flagged,
  isNew,
  children,
}: {
  name: string;
  span?: 1 | 2 | 3;
  height?: "auto" | "tall";
  flagged?: boolean;
  isNew?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[var(--radius)] border p-6",
        flagged ? "border-destructive/50 bg-destructive/10" : "border-border bg-card",
        span === 2 && "md:col-span-2",
        span === 3 && "md:col-span-2 lg:col-span-3",
        height === "tall" ? "min-h-[20rem]" : "min-h-[10rem]",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{name}</h3>
        {flagged && (
          <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-destructive-foreground">
            Not in spec
          </span>
        )}
        {isNew && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            New
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-wrap items-start gap-3">{children}</div>
    </div>
  );
}
