/**
 * Emits markdown rows for docs/plans/component-registry-progress.md
 * Phase 3b section, one per registry:example item.
 *
 * Usage:
 *   pnpm tsx scripts/generate-progress-rows.ts >> docs/plans/component-registry-progress.md
 *
 * Output shape (Markdown table):
 *
 *   | File | Status | Template applied | Description audited | Deps validated |
 *   |---|---|---|---|---|
 *   | components/examples/button-outline.tsx | PENDING | – | – | – |
 *
 * Read by Wave 4 ship audit: any PENDING blocks merge.
 */
import { items as exampleItems } from "../src/components/examples/_registry";
import { items as blockItems } from "../src/components/blocks/_registry";

function rowsForExamples(): string {
  const lines: string[] = [];
  lines.push("| File | Status | Template applied | Description audited | Deps validated |");
  lines.push("|---|---|---|---|---|");
  for (const item of [...exampleItems].sort((a, b) => a.name.localeCompare(b.name))) {
    const file = item.files[0]?.path ?? `(missing for ${item.name})`;
    lines.push(`| \`${file}\` | PENDING | – | – | – |`);
  }
  return lines.join("\n");
}

function rowsForBlocks(): string {
  const lines: string[] = [];
  lines.push("| File | Status |");
  lines.push("|---|---|");
  for (const item of [...blockItems].sort((a, b) => a.name.localeCompare(b.name))) {
    const file = item.files[0]?.path ?? `(missing for ${item.name})`;
    lines.push(`| \`${file}\` | PENDING |`);
  }
  return lines.join("\n");
}

const out = [
  "## Phase 3b — Examples (autogen rows)",
  "",
  rowsForExamples(),
  "",
  "## Phase 3f — Blocks (autogen rows)",
  "",
  rowsForBlocks(),
  "",
].join("\n");

process.stdout.write(out);
