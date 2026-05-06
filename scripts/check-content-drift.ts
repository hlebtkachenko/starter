/**
 * Productized TypeScript version of the Python audit snippet in
 * docs/runbooks/showcase-rebuild.md.
 *
 * For each slug in the example registry:
 *   1. Fetch https://ui.shadcn.com/docs/components/<slug>.md (cached in /tmp/shadcn-md/<slug>.md)
 *   2. Extract ### name headings under ## Examples
 *   3. Compare against local example registry entries for the slug
 *   4. Report: missing-from-local + extra-in-local (not isFlagged)
 *
 * Output: markdown table of mismatches to stdout.
 * Exit non-zero if any non-flagged extras or any missing-from-local variants exist.
 *
 * Run: pnpm registry:drift-check
 */
import * as fs from "node:fs";
import * as https from "node:https";
import * as path from "node:path";

import { items as exampleItems } from "../src/components/examples/_registry";
import type { RegistryItem } from "../src/lib/registry-schema";

const CACHE_DIR = "/tmp/shadcn-md";

// Group example items by slug
function groupBySlug(items: RegistryItem[]): Map<string, RegistryItem[]> {
  const map = new Map<string, RegistryItem[]>();
  for (const item of items) {
    if (!item.slug) continue;
    const list = map.get(item.slug) ?? [];
    list.push(item);
    map.set(item.slug, list);
  }
  return map;
}

function fetchMd(slug: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fp = path.join(CACHE_DIR, `${slug}.md`);
    if (fs.existsSync(fp)) {
      resolve(fs.readFileSync(fp, "utf8"));
      return;
    }
    const url = `https://ui.shadcn.com/docs/components/${slug}.md`;
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          // Follow redirect
          https
            .get(res.headers.location!, (res2) => {
              const chunks: Buffer[] = [];
              res2.on("data", (c: Buffer) => chunks.push(c));
              res2.on("end", () => {
                const data = Buffer.concat(chunks).toString("utf8");
                fs.writeFileSync(fp, data);
                resolve(data);
              });
              res2.on("error", reject);
            })
            .on("error", reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => {
          const data = Buffer.concat(chunks).toString("utf8");
          fs.writeFileSync(fp, data);
          resolve(data);
        });
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Extract ### heading names from the ## Examples section of a shadcn MD file.
 * Returns empty array if no ## Examples section found.
 */
function extractUpstreamVariants(md: string): string[] {
  const lines = md.split("\n");
  const h2s: { idx: number; name: string }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("## ")) {
      h2s.push({ idx: i, name: l.slice(3).trim() });
    }
  }

  const examplesBlock = h2s.find((h) => h.name === "Examples");
  if (!examplesBlock) return [];

  const nextH2 = h2s.find((h) => h.idx > examplesBlock.idx);
  const end = nextH2 ? nextH2.idx : lines.length;

  const variants: string[] = [];
  for (let i = examplesBlock.idx; i < end; i++) {
    const l = lines[i];
    if (l.startsWith("### ")) {
      const name = l.slice(4).trim();
      if (name.toLowerCase() !== "rtl") {
        variants.push(name);
      }
    }
  }
  return variants;
}

type RowResult = {
  slug: string;
  missingFromLocal: string[];
  extraNotFlagged: string[];
  extraFlagged: string[];
  fetchError?: string;
};

async function checkSlug(slug: string, localItems: RegistryItem[]): Promise<RowResult> {
  let upstream: string[] = [];
  let fetchError: string | undefined;

  try {
    const md = await fetchMd(slug);
    upstream = extractUpstreamVariants(md);
  } catch (err) {
    fetchError = String(err);
  }

  // Normalize to lowercase for comparison
  const upstreamLc = new Map(upstream.map((v) => [v.toLowerCase(), v]));

  // Local variant names (from title or name).
  // isDefault / variant="default" items are page-hero blocks; only include them
  // in comparison when upstream actually has ### Default under ## Examples.
  const upstreamHasDefault = upstreamLc.has("default");
  const localVariants = localItems
    .filter((i) => {
      const isDefaultVariant = i.isDefault || i.variant === "default";
      // Skip isDefault items when upstream has no ### Default in ## Examples
      return !isDefaultVariant || upstreamHasDefault;
    })
    .map((i) => ({
      label: (i.title ?? i.variant ?? i.name).toLowerCase(),
      item: i,
    }));

  const localLc = new Map(localVariants.map((v) => [v.label, v.item]));

  const missingFromLocal = [...upstreamLc.entries()]
    .filter(([lc]) => !localLc.has(lc))
    .map(([, orig]) => orig);

  const extras = [...localLc.entries()].filter(([lc]) => !upstreamLc.has(lc));

  const extraNotFlagged = extras
    .filter(([, item]) => !item.isFlagged)
    .map(([, item]) => item.title ?? item.variant ?? item.name);

  const extraFlagged = extras
    .filter(([, item]) => item.isFlagged)
    .map(([, item]) => item.title ?? item.variant ?? item.name);

  return { slug, missingFromLocal, extraNotFlagged, extraFlagged, fetchError };
}

async function main(): Promise<void> {
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const bySlug = groupBySlug(exampleItems);
  const slugs = [...bySlug.keys()].sort();

  console.log(`Checking ${slugs.length} slugs against upstream shadcn docs...\n`);

  const results: RowResult[] = [];
  // Sequential to avoid hammering the server
  for (const slug of slugs) {
    const items = bySlug.get(slug)!;
    const result = await checkSlug(slug, items);
    results.push(result);
    if (result.fetchError) {
      process.stderr.write(`  WARN: ${slug}: ${result.fetchError}\n`);
    }
  }

  const drifted = results.filter(
    (r) => r.missingFromLocal.length > 0 || r.extraNotFlagged.length > 0 || r.fetchError,
  );

  const flaggedOnly = results.filter(
    (r) =>
      r.missingFromLocal.length === 0 &&
      r.extraNotFlagged.length === 0 &&
      !r.fetchError &&
      r.extraFlagged.length > 0,
  );

  if (drifted.length === 0 && flaggedOnly.length === 0) {
    console.log("No drift detected. All local variants match upstream.");
  } else {
    if (drifted.length > 0) {
      console.log("## Drift report\n");
      console.log("| Slug | Missing from local | Extra (not flagged) | Fetch error |");
      console.log("|---|---|---|---|");
      for (const r of drifted) {
        const missing = r.missingFromLocal.length ? r.missingFromLocal.join(", ") : "-";
        const extra = r.extraNotFlagged.length ? r.extraNotFlagged.join(", ") : "-";
        const err = r.fetchError ? r.fetchError.slice(0, 60) : "-";
        console.log(`| ${r.slug} | ${missing} | ${extra} | ${err} |`);
      }
      console.log("");
    }

    if (flaggedOnly.length > 0) {
      console.log("## Flagged extras (intentional deviations)\n");
      console.log("| Slug | Flagged extras |");
      console.log("|---|---|");
      for (const r of flaggedOnly) {
        console.log(`| ${r.slug} | ${r.extraFlagged.join(", ")} |`);
      }
      console.log("");
    }
  }

  const hasErrors = drifted.some(
    (r) => r.missingFromLocal.length > 0 || r.extraNotFlagged.length > 0 || r.fetchError,
  );

  if (hasErrors) {
    console.error("\nDrift check failed. Fix missing variants or flag intentional extras.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
