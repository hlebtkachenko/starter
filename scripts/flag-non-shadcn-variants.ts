/**
 * One-shot fixer: flip `isFlagged: false` to `true` for examples whose
 * upstreamUrl is non-shadcn but whose slug matches a canonical shadcn
 * primitive. Surfaces them as deviations in the showcase ("Not in spec" pill,
 * red border) and in docs/new-components.md.
 *
 * Run: pnpm tsx scripts/flag-non-shadcn-variants.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";

const REPO_ROOT = path.resolve(__dirname, "..");

const TARGETS = new Set([
  "breadcrumb-bordered",
  "breadcrumb-bullet",
  "breadcrumb-icons",
  "breadcrumb-select",
  "breadcrumb-slash",
  "c-button-group-47",
  "c-button-group-53",
  "c-calendar-10",
  "c-calendar-17",
  "c-calendar-28",
  "c-calendar-29",
  "c-calendar-4",
  "c-card-13",
  "c-card-15",
  "c-card-18",
  "c-card-5",
  "c-collapsible-4",
  "c-collapsible-5",
  "c-combobox-19",
  "c-command-7",
  "c-command-8",
  "command-popover-default",
  "empty-state-marquee",
]);

const FILES = [
  "src/components/examples/_registry-buttons.ts",
  "src/components/examples/_registry-display.ts",
  "src/components/examples/_registry-effects.ts",
  "src/components/examples/_registry-feedback.ts",
  "src/components/examples/_registry-forms.ts",
  "src/components/examples/_registry-layout.ts",
  "src/components/examples/_registry-menus.ts",
  "src/components/examples/_registry-navigation.ts",
  "src/components/examples/_registry-overlays.ts",
  "src/components/examples/_registry-utility.ts",
];

let totalFlipped = 0;
for (const rel of FILES) {
  const full = path.join(REPO_ROOT, rel);
  const src = fs.readFileSync(full, "utf8");
  let next = src;
  let fileFlipped = 0;
  for (const name of TARGETS) {
    // Find block with `name: "<name>"` and flip its `isFlagged: false` -> true.
    const blockRe = new RegExp(
      `(\\{[^}]*name:\\s*"${name.replace(/[-/\\^$*+?.()|[\\]{}]/g, "\\$&")}"[^}]*?isFlagged:\\s*)false`,
      "ms",
    );
    if (blockRe.test(next)) {
      next = next.replace(blockRe, "$1true");
      fileFlipped++;
    }
  }
  if (fileFlipped > 0) {
    fs.writeFileSync(full, next, "utf8");
    console.log(`${rel}: flipped ${fileFlipped}`);
    totalFlipped += fileFlipped;
  }
}
console.log(`Total flipped: ${totalFlipped} / ${TARGETS.size}`);
