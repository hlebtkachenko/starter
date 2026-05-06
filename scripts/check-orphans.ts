/**
 * Diffs src/components/{ui,examples,blocks}/*.tsx filesystem against registry entries.
 * Exits non-zero on any mismatch (file without registry entry OR registry entry without file).
 *
 * Exclusions (not treated as registry entries):
 *   _TEMPLATE.tsx, _registry.ts, _registry-*.ts, _fixtures/**, __index__.tsx
 *
 * Run: pnpm registry:check-orphans
 */
import * as fs from "node:fs";
import * as path from "node:path";

import { items as uiItems } from "../src/components/ui/_registry";
import { items as exampleItems } from "../src/components/examples/_registry";
import { items as blockItems } from "../src/components/blocks/_registry";

const REPO_ROOT = path.resolve(__dirname, "..");

type Area = "ui" | "examples" | "blocks";

const AREA_ITEMS: Record<Area, string[]> = {
  ui: uiItems.map((i) => i.name),
  examples: exampleItems.map((i) => i.name),
  blocks: blockItems.map((i) => i.name),
};

const EXCLUDE_PATTERNS = [
  /^_TEMPLATE\.tsx$/,
  /^_registry\.ts$/,
  /^_registry-.*\.ts$/,
  /^__index__\.tsx$/,
  /^_fixtures$/,
];

function shouldExclude(filename: string): boolean {
  return EXCLUDE_PATTERNS.some((p) => p.test(filename));
}

function getFilesystemNames(area: Area): Set<string> {
  const dir = path.join(REPO_ROOT, "src/components", area);
  if (!fs.existsSync(dir)) return new Set();

  const names = new Set<string>();
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) continue; // skip _fixtures/
    if (shouldExclude(entry.name)) continue;
    if (!entry.name.endsWith(".tsx")) continue;
    // Strip .tsx extension to get the registry name
    names.add(entry.name.slice(0, -4));
  }
  return names;
}

function main(): void {
  let hasErrors = false;

  for (const area of ["ui", "examples", "blocks"] as Area[]) {
    const fsNames = getFilesystemNames(area);
    const registryNames = new Set(AREA_ITEMS[area]);

    const orphanFiles = [...fsNames].filter((n) => !registryNames.has(n));
    const orphanEntries = [...registryNames].filter((n) => !fsNames.has(n));

    if (orphanFiles.length > 0) {
      console.error(`[${area}] Files without registry entries (${orphanFiles.length}):`);
      for (const f of orphanFiles.sort()) {
        console.error(`  ORPHAN FILE: src/components/${area}/${f}.tsx`);
      }
      hasErrors = true;
    }

    if (orphanEntries.length > 0) {
      console.error(`[${area}] Registry entries without files (${orphanEntries.length}):`);
      for (const e of orphanEntries.sort()) {
        console.error(`  ORPHAN ENTRY: ${e} (expected src/components/${area}/${e}.tsx)`);
      }
      hasErrors = true;
    }

    if (orphanFiles.length === 0 && orphanEntries.length === 0) {
      console.log(`[${area}] OK — ${fsNames.size} files match registry`);
    }
  }

  if (hasErrors) {
    console.error("\nOrphan check failed. Resolve mismatches before committing.");
    process.exit(1);
  }
}

main();
