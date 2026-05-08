/**
 * Emits per-area showcase export markdown for AI agent consumption.
 *
 * Output files:
 *   docs/showcase-export.md                      — index with TOC linking to per-area files
 *   docs/showcase-export/ui.md                   — one section per primitive
 *   docs/showcase-export/examples-<group>.md     — one file per slug group, each ≤ ~80k chars
 *   docs/showcase-export/blocks.md               — one section per block with JSX
 *
 * Each per-area file targets ≤ ~80k chars (~20k tokens) per file.
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
const OUT_DIR = path.join(REPO_ROOT, "docs/showcase-export");
const INDEX_FILE = path.join(REPO_ROOT, "docs/showcase-export.md");

// Maximum chars per file before triggering a split
const MAX_CHARS_PER_FILE = 80_000;

// Maps slug prefixes to named groups, matching the existing fragment registry structure.
// Each group becomes one examples-<group>.md file.
const SLUG_GROUPS: { name: string; prefixes: string[] }[] = [
  { name: "buttons", prefixes: ["button", "toggle"] },
  {
    name: "display",
    prefixes: [
      "avatar",
      "badge",
      "calendar",
      "chart",
      "data-table",
      "skeleton",
      "table",
      "typography",
    ],
  },
  { name: "feedback", prefixes: ["alert", "progress", "sonner", "spinner"] },
  {
    name: "forms",
    prefixes: [
      "checkbox",
      "combobox",
      "date-picker",
      "field",
      "input",
      "label",
      "native-select",
      "radio-group",
      "select",
      "slider",
      "switch",
      "textarea",
    ],
  },
  {
    name: "layout",
    prefixes: [
      "aspect-ratio",
      "card",
      "collapsible",
      "resizable",
      "scroll-area",
      "separator",
      "sidebar",
    ],
  },
  { name: "menus", prefixes: ["command", "context-menu", "dropdown-menu"] },
  {
    name: "navigation",
    prefixes: ["breadcrumb", "menubar", "navigation-menu", "pagination", "tabs"],
  },
  {
    name: "overlays",
    prefixes: ["alert-dialog", "dialog", "drawer", "hover-card", "popover", "sheet", "tooltip"],
  },
  {
    name: "utility",
    prefixes: ["accordion", "carousel", "empty", "item", "kbd"],
  },
];

function slugGroup(slug: string): string {
  for (const g of SLUG_GROUPS) {
    for (const prefix of g.prefixes) {
      if (slug === prefix || slug.startsWith(prefix + "-")) {
        return g.name;
      }
    }
  }
  return "other";
}

function readSourceFile(relativePath: string): string {
  const full = path.join(REPO_ROOT, "src", relativePath);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function renderUiSection(item: RegistryItem): string {
  const lines: string[] = [];
  lines.push(`## ${item.title ?? item.name}`);
  lines.push("");
  lines.push(`**Name:** \`${item.name}\``);
  if (item.description) lines.push(`**Description:** ${item.description}`);
  if (item.upstreamUrl) lines.push(`**Upstream:** ${item.upstreamUrl}`);
  if (item.registryDependencies?.length) {
    lines.push(`**Depends on:** ${item.registryDependencies.join(", ")}`);
  }
  if (item.categories?.length) {
    lines.push(`**Categories:** ${item.categories.join(", ")}`);
  }
  if (item.related?.length) lines.push(`**Related:** ${item.related.join(", ")}`);
  lines.push("");
  return lines.join("\n");
}

function renderExampleSection(item: RegistryItem): string {
  const lines: string[] = [];
  lines.push(`## ${item.title ?? item.name}`);
  lines.push("");
  lines.push(`**Slug:** \`${item.slug ?? ""}\``);
  lines.push(`**Variant:** \`${item.variant ?? item.name}\``);
  if (item.upstreamUrl) lines.push(`**Upstream:** ${item.upstreamUrl}`);
  if (item.description) lines.push(`**Description:** ${item.description}`);
  if (item.isFlagged) lines.push(`**Flagged:** not in upstream Examples block`);
  if (item.deviations?.length) {
    lines.push(`**Deviations:**`);
    for (const d of item.deviations) lines.push(`- ${d}`);
  }
  if (item.registryDependencies?.length) {
    lines.push(`**Depends on:** ${item.registryDependencies.join(", ")}`);
  }
  lines.push("");
  const file = item.files[0];
  if (file) {
    const src = readSourceFile(file.path);
    if (src) {
      lines.push("```tsx");
      lines.push(src.trimEnd());
      lines.push("```");
    }
  }
  lines.push("");
  return lines.join("\n");
}

type ExampleFile = { filename: string; content: string; itemCount: number };

function buildExampleFiles(items: RegistryItem[]): ExampleFile[] {
  // Group items by slug group
  const byGroup = new Map<string, RegistryItem[]>();
  for (const item of items) {
    const g = slugGroup(item.slug ?? item.name);
    const list = byGroup.get(g) ?? [];
    list.push(item);
    byGroup.set(g, list);
  }

  const files: ExampleFile[] = [];

  for (const group of SLUG_GROUPS) {
    const groupItems = byGroup.get(group.name) ?? [];
    if (groupItems.length === 0) continue;

    const header = `# Example Registry: ${group.name}\n\n> Machine-readable summary. Generated by \`scripts/generate-showcase-export.ts\`. Do not edit.\n\nEach entry includes slug, variant, upstream URL, deviations, and JSX source.\n\n`;

    // Build content; if it exceeds MAX_CHARS_PER_FILE, split at slug boundaries
    let currentContent = header;
    let currentItems = 0;
    let partIndex = 1;
    let currentSlug = "";
    let slugChunk = "";

    function flushFile(content: string, count: number, part?: number): void {
      const suffix = part ? `-part${part}` : "";
      files.push({
        filename: `examples-${group.name}${suffix}.md`,
        content,
        itemCount: count,
      });
    }

    for (const item of groupItems) {
      // When slug changes, check if adding this slug's section would overflow
      if (item.slug !== currentSlug) {
        if (
          currentContent.length + slugChunk.length > MAX_CHARS_PER_FILE &&
          currentContent !== header
        ) {
          // Flush current part
          flushFile(currentContent, currentItems, partIndex);
          partIndex++;
          currentContent = header;
          currentItems = 0;
        }
        currentContent += slugChunk;
        currentItems += slugChunk.split("\n## ").length - 1;
        slugChunk = "";
        currentSlug = item.slug ?? item.name;
      }
      slugChunk += renderExampleSection(item);
    }

    // Flush remaining
    currentContent += slugChunk;
    currentItems += slugChunk.split("\n## ").length - 1;

    if (partIndex === 1) {
      flushFile(currentContent, groupItems.length);
    } else {
      flushFile(currentContent, currentItems, partIndex);
    }
  }

  // Handle "other" group if any
  const otherItems = byGroup.get("other") ?? [];
  if (otherItems.length > 0) {
    const header = `# Example Registry: other\n\n> Machine-readable summary. Generated by \`scripts/generate-showcase-export.ts\`. Do not edit.\n\n`;
    let content = header;
    for (const item of otherItems) content += renderExampleSection(item);
    files.push({
      filename: "examples-other.md",
      content,
      itemCount: otherItems.length,
    });
  }

  return files;
}

function main(): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Remove stale example files from previous runs (including legacy examples.md)
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.startsWith("examples")) {
      fs.unlinkSync(path.join(OUT_DIR, f));
    }
  }

  // UI
  const uiHeader = `# UI Primitives Registry\n\n> Machine-readable summary. Generated by \`scripts/generate-showcase-export.ts\`. Do not edit.\n\n`;
  let uiContent = uiHeader;
  for (const item of uiItems) uiContent += renderUiSection(item);
  fs.writeFileSync(path.join(OUT_DIR, "ui.md"), uiContent);

  // Examples split by group
  const exampleFiles = buildExampleFiles(exampleItems);
  for (const f of exampleFiles) {
    fs.writeFileSync(path.join(OUT_DIR, f.filename), f.content);
  }

  // Blocks
  const blHeader = `# Block Registry\n\n> Machine-readable summary. Generated by \`scripts/generate-showcase-export.ts\`. Do not edit.\n\nEach entry includes purpose, composition list, and JSX source.\n\n`;
  let blContent = blHeader;
  for (const item of blockItems) blContent += renderExampleSection(item);
  fs.writeFileSync(path.join(OUT_DIR, "blocks.md"), blContent);

  const totalExampleItems = exampleItems.length;
  const uiChars = uiContent.length;
  const blChars = blContent.length;

  // Build index
  const exFileRows = exampleFiles
    .map(
      (f) =>
        `| Examples: ${f.filename.replace("examples-", "").replace(".md", "")} | [docs/showcase-export/${f.filename}](showcase-export/${f.filename}) | ${f.itemCount} | ${f.content.length.toLocaleString()} |`,
    )
    .join("\n");

  const index = `# Showcase Export Index

> Generated by \`scripts/generate-showcase-export.ts\`. Do not edit.
>
> Per-area files contain the full component catalog for AI agent consumption.
> Each file targets ≤ ~80k chars (~20k tokens).

## Files

| Area | File | Items | Chars |
|---|---|---|---|
| UI Primitives | [docs/showcase-export/ui.md](showcase-export/ui.md) | ${uiItems.length} | ${uiChars.toLocaleString()} |
${exFileRows}
| Blocks | [docs/showcase-export/blocks.md](showcase-export/blocks.md) | ${blockItems.length} | ${blChars.toLocaleString()} |

## UI Primitives TOC

${uiItems
  .map((i) =>
    `- [\`${i.name}\`](showcase-export/ui.md#${
      i.title
        ? i.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : i.name
    }) — ${i.description ?? ""}`.trimEnd(),
  )
  .join("\n")}

## Quick counts

- UI primitives: **${uiItems.length}**
- Example variants: **${totalExampleItems}**
- Example files: **${exampleFiles.length}**
- Blocks: **${blockItems.length}**
- Total registry items: **${uiItems.length + totalExampleItems + blockItems.length}**
`;

  fs.writeFileSync(INDEX_FILE, index);

  const maxExChar = Math.max(...exampleFiles.map((f) => f.content.length));
  console.log(
    `Wrote docs/showcase-export.md (index) + ui (${uiChars} chars) + ${exampleFiles.length} example files (max ${maxExChar} chars) + blocks (${blChars} chars)`,
  );
}

main();
