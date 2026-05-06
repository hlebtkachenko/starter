/**
 * Emits docs/components-manifest.json — stable JSON of the full registry.
 *
 * Output: Object.values(Index).map(e => e.meta), sorted by name, with keys
 * sorted alphabetically per item. 2-space indent, trailing newline.
 *
 * Designed for tooling and downstream MCP consumers that need the catalog
 * without importing the TypeScript source.
 *
 * Run: pnpm registry:export (part of registry:export)
 */
import * as fs from "node:fs";
import * as path from "node:path";

import { items as uiItems } from "../src/components/ui/_registry";
import { items as exampleItems } from "../src/components/examples/_registry";
import { items as blockItems } from "../src/components/blocks/_registry";
import type { RegistryItem } from "../src/lib/registry-schema";

const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(REPO_ROOT, "docs/components-manifest.json");

function sortKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const sorted: Record<string, unknown> = {};
  for (const key of Object.keys(obj).sort()) {
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      sorted[key] = sortKeys(val as Record<string, unknown>);
    } else {
      sorted[key] = val;
    }
  }
  return sorted;
}

function main(): void {
  const all: RegistryItem[] = [...uiItems, ...exampleItems, ...blockItems];

  // Sort by name, then sort keys within each item
  const sorted = all
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => sortKeys(item as unknown as Record<string, unknown>));

  const json = JSON.stringify(sorted, null, 2) + "\n";

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, json);

  console.log(`Wrote ${OUTPUT} (${sorted.length} items)`);
}

main();
