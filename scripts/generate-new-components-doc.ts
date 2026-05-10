/**
 * Emit docs/new-components.md — every primitive whose `proposedGroup` is set
 * (i.e. surfaces under "New Components" on /showcase). For each primitive we
 * walk its imports recursively and list every project file that needs to be
 * copied (not just the entry registered in `_registry.ts`). Also lists
 * registry deps (canonical shadcn primitives needed), npm dependencies pulled
 * from the file's imports, variant table, deviations, and external variants
 * that landed under shadcn slugs.
 *
 * Run: pnpm tsx scripts/generate-new-components-doc.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";

import { items as uiItems } from "../src/components/ui/_registry";
import { items as exampleItems } from "../src/components/examples/_registry";
import type { RegistryItem } from "../src/lib/registry-schema";

const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(REPO_ROOT, "docs/new-components.md");

const newPrimitives = uiItems.filter((i) => i.proposedGroup);

const examplesBySlug = new Map<string, RegistryItem[]>();
for (const ex of exampleItems) {
  if (!ex.slug) continue;
  if (!examplesBySlug.has(ex.slug)) examplesBySlug.set(ex.slug, []);
  examplesBySlug.get(ex.slug)!.push(ex);
}

const groups = new Map<string, RegistryItem[]>();
for (const item of newPrimitives) {
  const g = item.proposedGroup!;
  if (!groups.has(g)) groups.set(g, []);
  groups.get(g)!.push(item);
}

const RESOLVE_EXTS = ["", ".tsx", ".ts", "/index.tsx", "/index.ts"];
function resolveImport(fromFile: string, spec: string): string | null {
  let target: string | null = null;
  if (spec.startsWith("@/components/")) {
    target = path.join(REPO_ROOT, "src", spec.replace("@/", ""));
  } else if (spec.startsWith("@/")) {
    target = path.join(REPO_ROOT, "src", spec.replace("@/", ""));
  } else if (spec.startsWith("./") || spec.startsWith("../")) {
    target = path.resolve(path.dirname(fromFile), spec);
  } else {
    return null;
  }
  for (const ext of RESOLVE_EXTS) {
    const cand = target + ext;
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) return cand;
  }
  return null;
}

function walkProjectFiles(entryAbs: string): string[] {
  const visited = new Set<string>();
  const queue = [entryAbs];
  while (queue.length) {
    const p = queue.shift()!;
    if (visited.has(p)) continue;
    if (!fs.existsSync(p)) continue;
    visited.add(p);
    const src = fs.readFileSync(p, "utf8");
    const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]!);
    for (const imp of imports) {
      const resolved = resolveImport(p, imp);
      if (resolved) queue.push(resolved);
    }
  }
  return [...visited];
}

function collectNpmDeps(absFiles: string[]): string[] {
  const deps = new Set<string>();
  for (const f of absFiles) {
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, "utf8");
    const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]!);
    for (const imp of imports) {
      if (imp.startsWith(".") || imp.startsWith("@/") || imp.startsWith("node:")) continue;
      // Scoped or plain
      const m = imp.match(/^(@[^/]+\/[^/]+|[^/]+)/);
      if (m) deps.add(m[1]!);
    }
  }
  return [...deps].sort();
}

function relFromRepo(abs: string): string {
  return path.relative(REPO_ROOT, abs);
}

function renderItem(item: RegistryItem): string {
  const lines: string[] = [];
  const entryRel = item.files[0]?.path;
  const entryAbs = entryRel ? path.join(REPO_ROOT, "src", entryRel) : null;

  lines.push(`### ${item.title ?? item.name}`);
  lines.push("");
  lines.push(`**name** \`${item.name}\``);
  if (item.upstreamUrl) lines.push(`**upstream** ${item.upstreamUrl}`);
  if (item.description) {
    lines.push("");
    lines.push(item.description);
  }
  if (item.categories?.length) {
    lines.push("");
    lines.push(`**categories** ${item.categories.join(", ")}`);
  }
  if (item.related?.length) {
    lines.push(`**related** ${item.related.map((d) => `\`${d}\``).join(", ")}`);
  }
  if (item.deviations?.length) {
    lines.push("");
    lines.push("**deviations**");
    for (const d of item.deviations) lines.push(`- ${d}`);
  }

  // Files to copy = entry + every project file the entry transitively imports
  // (excluding canonical shadcn primitives in src/components/ui/, which the
  // consumer must already have via shadcn).
  if (entryAbs) {
    const allFiles = walkProjectFiles(entryAbs);
    const projectFiles = allFiles
      .filter((p) => p.startsWith(path.join(REPO_ROOT, "src/components/")))
      .filter((p) => {
        const rel = relFromRepo(p);
        // Treat canonical shadcn primitives as "must already exist", not copy
        if (/^src\/components\/ui\/[^/]+\.tsx?$/.test(rel)) {
          // Keep our own non-shadcn primitive entry (it lives in components/ui/ too)
          return rel === relFromRepo(entryAbs);
        }
        return true;
      })
      .map(relFromRepo)
      .sort();
    lines.push("");
    lines.push(`**files to copy** (${projectFiles.length})`);
    for (const f of projectFiles) lines.push(`- \`${f}\``);
  }

  if (item.registryDependencies?.length) {
    lines.push("");
    lines.push(
      `**shadcn primitives required** ${item.registryDependencies.map((d) => `\`${d}\``).join(", ")}`,
    );
  }

  // npm deps
  if (entryAbs) {
    const allFiles = walkProjectFiles(entryAbs);
    const projectFiles = allFiles.filter((p) =>
      p.startsWith(path.join(REPO_ROOT, "src/components/")),
    );
    const npm = collectNpmDeps(projectFiles).filter((d) => !["react", "react-dom"].includes(d));
    if (npm.length > 0) {
      lines.push("");
      lines.push(`**npm deps** ${npm.map((d) => `\`${d}\``).join(", ")}`);
    }
  }

  const variants = examplesBySlug.get(item.name) ?? [];
  if (variants.length > 0) {
    lines.push("");
    lines.push(`**variants** (${variants.length})`);
    lines.push("");
    lines.push("| variant | title | file |");
    lines.push("|---|---|---|");
    for (const v of variants) {
      const filePath = v.files[0]?.path ?? "";
      lines.push(`| \`${v.variant ?? v.name}\` | ${v.title ?? ""} | \`src/${filePath}\` |`);
    }
  }
  lines.push("");
  return lines.join("\n");
}

function renderGroup(group: string, items: RegistryItem[]): string {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  return [`## ${group}`, "", ...sorted.map(renderItem)].join("\n");
}

const sortedGroups = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));

const totalVariants = newPrimitives.reduce(
  (n, i) => n + (examplesBySlug.get(i.name)?.length ?? 0),
  0,
);

const HOW_TO_COPY = `
## How to copy a component into another project

Each entry below lists exactly what is needed:

1. **shadcn primitives required** — install in target project first via \`pnpm dlx shadcn@latest add <name>\` (e.g. \`button\`, \`popover\`).
2. **npm deps** — \`pnpm add\` the listed packages.
3. **files to copy** — copy each file listed (preserving directory structure under \`src/components/\`). The first file is the entry; the rest are companion files imported transitively. Canonical shadcn primitives (\`src/components/ui/<name>.tsx\`) are NOT listed here because step 1 already provides them.
4. **token bypass** — if the target project lacks the design token CSS vars in \`:root\` (\`--background\`, \`--foreground\`, \`--primary\`, etc.), copy them from \`src/app/globals.css\` first. All components reference tokens, not hex.

If a component appears under "External variants under shadcn slugs" (bottom of this doc), you only copy the example file and rely on the existing canonical shadcn primitive.

`;

const head = [
  "# New Components",
  "",
  "> Components beyond canonical shadcn/ui, sourced from external registries. Generated by `pnpm tsx scripts/generate-new-components-doc.ts`. Do not edit by hand.",
  "",
  `**Primitives (own slug, render in "New Components" band):** ${newPrimitives.length}  ·  **Their variants:** ${totalVariants}  ·  **Groups:** ${sortedGroups.length}`,
  "",
  "**Groups in this doc:** " + sortedGroups.map(([g]) => `[${g}](#${g})`).join(" · "),
  HOW_TO_COPY,
  "---",
  "",
];

const body = sortedGroups.map(([g, items]) => renderGroup(g, items)).join("\n");

// Section 2: external variants under canonical shadcn slugs
const SHADCN_DOMAIN = "ui.shadcn.com";
const shadcnPrimitiveNames = new Set(uiItems.filter((i) => !i.proposedGroup).map((i) => i.name));
const flaggedExternal = exampleItems.filter(
  (ex) =>
    ex.upstreamUrl &&
    !ex.upstreamUrl.includes(SHADCN_DOMAIN) &&
    ex.slug &&
    shadcnPrimitiveNames.has(ex.slug),
);

const flaggedBySlug = new Map<string, RegistryItem[]>();
for (const ex of flaggedExternal) {
  const slug = ex.slug!;
  if (!flaggedBySlug.has(slug)) flaggedBySlug.set(slug, []);
  flaggedBySlug.get(slug)!.push(ex);
}

function renderFlaggedSection(): string {
  if (flaggedBySlug.size === 0) return "";
  const lines: string[] = [
    "",
    "---",
    "",
    "## External variants under shadcn slugs",
    "",
    `> ${flaggedExternal.length} example variants from external registries that share a slug with a canonical shadcn primitive. They render under their shadcn section on \`/showcase\` with a red "Not in spec" pill (\`isFlagged: true\`). Copy: install the canonical shadcn primitive, then copy the example file.`,
    "",
  ];
  const sortedSlugs = [...flaggedBySlug.keys()].sort();
  for (const slug of sortedSlugs) {
    const variants = flaggedBySlug.get(slug)!;
    lines.push(`### ${slug} (${variants.length})`);
    lines.push("");
    lines.push("| name | upstream | file |");
    lines.push("|---|---|---|");
    for (const v of variants.sort((a, b) => a.name.localeCompare(b.name))) {
      const filePath = v.files[0]?.path ?? "";
      const url = v.upstreamUrl ?? "";
      lines.push(`| \`${v.name}\` | ${url} | \`src/${filePath}\` |`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

const flaggedBody = renderFlaggedSection();
const finalHead = head.slice();
finalHead.splice(
  6,
  0,
  `**Variants under shadcn slugs (flagged "Not in spec"):** ${flaggedExternal.length} across ${flaggedBySlug.size} slugs`,
  "",
);

fs.writeFileSync(OUTPUT, finalHead.join("\n") + body + flaggedBody + "\n", "utf8");
console.log(
  `Wrote ${OUTPUT} — ${newPrimitives.length} primitives, ${totalVariants} variants, ${sortedGroups.length} groups + ${flaggedExternal.length} flagged variants under shadcn slugs.`,
);
