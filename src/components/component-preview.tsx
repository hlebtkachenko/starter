"use client";

import { Suspense } from "react";

import { getRegistryComponent, getRegistryItem } from "@/lib/registry";
import { cn } from "@/lib/utils";

/**
 * Renders a registry item by name. The Component is `React.lazy`-imported in
 * `src/components/__index__.tsx`, so each variant ships in its own chunk.
 *
 * Usage:
 *   <ComponentPreview name="button-outline" />
 *   <ComponentPreview name="login-card" /> (block)
 *
 * Pages can also `import Outline from "@/components/examples/button-outline"`
 * directly when they need the component eagerly without the wrapper.
 */
export function ComponentPreview({ name, className }: { name: string; className?: string }) {
  const Component = getRegistryComponent(name);
  const meta = getRegistryItem(name);

  if (!Component) {
    return (
      <div
        className={cn(
          "rounded-[var(--radius)] border border-destructive/50 bg-destructive/10 p-4 text-sm",
          className,
        )}
      >
        Registry item <code className="font-mono">{name}</code> not found.
      </div>
    );
  }

  return (
    <div className={cn(className)} data-registry-name={name} data-registry-type={meta?.type}>
      <Suspense fallback={<div className="h-4 w-full animate-pulse rounded-md bg-muted" />}>
        {/* Component is a stable React.lazy reference resolved from the autogen registry index. */}
        {/* eslint-disable-next-line */}
        <Component />
      </Suspense>
    </div>
  );
}
