/**
 * Block scaffold. Copy + rename to <block-slug>.tsx.
 *
 * Block = page-level composed UI. Reused across src/app/** pages.
 *
 * - purpose: one sentence stating what users see.
 * - composes: list every primitive and example imported. Mirrors
 *   registryDependencies in blocks/_registry.ts.
 *
 * Contract enforced by docs/conventions/component-templates.md:
 * - SINGLE default export.
 * - Props interface named <BlockName>Props.
 * - Imports ordered: react -> next/* -> external pkgs ->
 *   @/components/ui/* -> @/components/examples/* -> @/lib/* -> relative.
 * - Tokens only. No inline hex, no oklch, no arbitrary radius.
 * - Server Component by default. Add "use client" only when interactivity
 *   demands it (form submit handlers, useState, etc.).
 *
 * @purpose Centered card with placeholder content.
 * @composes [card]
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type ExampleBlockProps = {
  title?: string;
  description?: string;
};

export default function ExampleBlock({
  title = "Example block",
  description = "Replace with the block's purpose.",
}: ExampleBlockProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{/* Block contents go here. */}</CardContent>
    </Card>
  );
}
