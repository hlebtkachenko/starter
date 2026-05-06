---
title: Showcase rebuild — port one shadcn component from MD to /showcase
severity: meta
last_drilled: 2026-05-06
related_adrs: []
---

# Showcase rebuild

> Reusable procedure for porting a single shadcn component into `/showcase` from its upstream `.md` source. Run this for every component still listed as placeholder in [`docs/showcase.md`](../showcase.md). The research is already done: follow the steps, do not re-derive.

## Inputs

- **Component slug**: kebab-case id from the shadcn URL. Example: `button-group`, `dropdown-menu`. Same id used as `<Section id="...">` and as the page anchor on `/showcase`.
- **Group file**: target `src/components/showcase/<area>-group.tsx`. Lookup table in [`docs/showcase.md`](../showcase.md#component-map). Do not invent a new group file.
- **Upstream MD**: `https://ui.shadcn.com/docs/components/<slug>.md`. This is the single source of truth. The HTML page is rendered from it; the `.md` is what you port.

## Procedure

### 1. Fetch and read the MD

```bash
SLUG=button-group
curl -sL "https://ui.shadcn.com/docs/components/$SLUG.md" | awk '/^## Examples/,/^## RTL/'
```

The block between `## Examples` and `## RTL` is the variant catalog. Each `### <Name>` heading is one `<Demo>`. Read every code block in full before writing anything.

If the file has no `## Examples` block (sidebar, data-table, chart), use the page's H2 sections excluding `Installation`, `Usage`, `Composition`, `API Reference`, `Changelog`, `RTL`, `About`, `Theming`, `Accessibility`, `Updating to Recharts v3`. Note the deviation in the PR description.

### 1b. Install any missing dependencies

If the MD imports a package not yet in [`package.json`](../../package.json) (for example `chrono-node` for Date Picker's "Natural Language Picker", or `embla-carousel-autoplay` for a Carousel variant), run `pnpm add <pkg>` before porting. Showcase-only demo deps do not require an ADR. Note the install under "Per-component deviations" in [`docs/showcase.md`](../showcase.md).

Do not pin to a different major than shadcn ships against.

### 2. Compare to the existing showcase

```bash
grep -nE "<Section|<Demo " src/components/showcase/<area>-group.tsx | grep -A20 "id=\"$SLUG\""
```

For each existing `<Demo>` decide:

| Existing | Upstream | Action |
|---|---|---|
| Same name, same intent | matches | keep, but rebuild content from MD code block |
| Wrong name (e.g. `Default` for `Basic`) | matches after rename | rename `name=` to upstream verbatim |
| No upstream match | absent | keep, add `flagged` prop, leave for review |
| Upstream variant | not in showcase | add new `<Demo>` |

Never silently drop a demo. Either map it to an upstream variant or `flag` it.

### 3. Port each variant

For each `### <Name>` block in the MD:

- `<Demo name="<Name verbatim>">` — match the heading exactly including casing and ampersands.
- Paste the JSX from the MD code block as-is, then apply the rewrites below.
- **Imports** (project conventions, not optional):
  - `@/components/ui/<x>` — already correct.
  - `next/image` — replace with native `<img>` and add `{/* eslint-disable-next-line @next/next/no-img-element */}` on the line above. Do not edit `next.config.ts` to add remote patterns.
  - `next/link` — keep. `Link` with `asChild` is the standard pattern in this project.
  - `@tabler/icons-react` — substitute with the closest lucide-react equivalent (`IconGitBranch` → `GitBranchIcon`, `IconPlus` → `PlusIcon`). Project rule per [`components.json`](../../components.json) `iconLibrary: "lucide"`. Note the substitution under "Per-component deviations" in [`docs/showcase.md`](../showcase.md).
  - Other icon libs (`react-icons`, custom SVG packs) — same: substitute lucide.
- **Helper components**: when an MD example uses `useState`, `useEffect`, or any hook, extract it into a module-level helper at the bottom of the group file (`function CalendarPresetsDemo() { ... }`). Inline `<Demo>` children cannot host hooks because the group function does not own that state shape. Reference the helper from `<Demo>`: `<Demo name="Presets"><CalendarPresetsDemo /></Demo>`.
- **Fixture placement**:
  - Used by one demo only → keep inside that helper component.
  - Used across two or more demos in the same Section → hoist to a module-level `SLUG_VARIANT` constant above the group function. Naming: `SCREAMING_SNAKE`, prefixed with the section id.
- Strip the docs' `export function ComponentName()` wrapper. The replacement either inlines into `<Demo>` or becomes a private helper component (no `export`).
- **Strict-mode TS adaptations**: this project uses `exactOptionalPropertyTypes: true`. When the MD passes `prop={something?.maybe}` with a type that does not include `undefined`, three remedies in order of preference:
  1. **Drop the conditional** if the surrounding type already accommodates the value. Example: Drawer "Sides" upstream uses `direction={side === "bottom" ? undefined : side}`; the typed union already includes `"bottom"`, so `direction={side}` is correct and minimal.
  2. **Default with `??`** when the conditional was a real fallback. Example: Calendar `defaultMonth={range?.from ?? new Date()}`.
  3. **Non-null assertion** only when runtime is provably non-null and #1/#2 do not apply.
- **Cross-block fixture dedup**: shadcn `.md` examples often redefine the same `frameworks`, `timezones`, `countries` fixture in every code block. Dedupe to a single module-level `SCREAMING_SNAKE` constant. The contract is the rendered demo, not the verbatim block boundary.
- **Page-hero canonical demo (counts as Default)**: nearly every shadcn `.md` file opens with a tsx code block immediately after the frontmatter and before the first `##` heading. That hero block is the canonical "Default" preview rendered at the top of the docs page (see resizable, button, separator, etc.). It IS in spec — it just lives outside `## Examples`. Port it as `<Demo name="Default">` (or the most accurate name based on what it shows). Do NOT mark it `flagged`. If the showcase already has a `Default` block, replace its content with the upstream hero code and drop the `flagged` prop.
- **Upstream MD with no `## Examples` Default but a hero block**: this is the common case (Card, Resizable, Scroll Area, Separator). Use the page-hero block as Default, then port each `### <name>` under `## Examples` as a separate variant.
- **Out-of-`## Examples` H2 blocks**: some components (Carousel: `## API`, `## Plugins`; Sidebar: many sub-component H2s) put real demonstrable code under H2 sections that sit between `## Examples` and `## RTL`. They are NOT part of the variant catalog. The catalog is exactly the `### <name>` headings nested under `## Examples`. If the showcase has a demo for one of these (e.g. Carousel "Plugins"), keep it as `<Demo flagged>`, not a clean port.
- **MD with no `## Examples` block at all**: the runbook fallback (use H2s minus `Installation`/`Usage`/`API Reference`/etc.) sometimes lands on a single H2 like `## Label in Field` (Label) or `## Link Component` (Navigation Menu) that contains multiple unnamed code blocks. Pick the smallest canonical block and port it as a single `<Demo>` named after that H2. Existing local "Default" / "Basic" demos can stay as `<Demo flagged>`.

### Strict-mode lint adaptations

Project uses React 19 with the new `react-hooks/refs` rule. Some upstream MD patterns trigger lint errors that strict TS does not catch:

- **`useRef(SideEffect()).current.method()` during render**: Carousel's "Plugins" pattern `useRef(Autoplay({...}))` then accessing `plugin.current.stop()`/`reset()` from event handlers triggers the rule because the ref is read during render. Replace with `useMemo(() => Autoplay({...}), [])` — same single-instance contract, lint-safe. Behavioral contract is identical because the autoplay plugin holds its own internal state.
- **TanStack Table `useReactTable` produces `react-hooks/incompatible-library` warnings**: Data Table demos trigger the React Compiler "Compilation Skipped" warning. Acceptable: advisory, not an error, no fix exists short of rewriting the table primitive. Leave the warnings; they are documented under "Per-component deviations" in `docs/showcase.md`.

### Strict project-type adaptations

Some primitives have project-local types that are stricter than the upstream MD's untyped JS pattern:

- **`ChartConfig`**: `src/components/ui/chart.tsx` types the per-series config as a discriminated union — a key uses **either** `color: "<hex>"` **or** `theme: { light, dark }`, never both. Upstream MD often shows both in the same example via comments. Per the strict-mode TS rule "drop the conditional", pick one (theme tokens preferred since they cascade through dark mode).
- **Demo sizing**: `<Demo span={2}>` for variants whose JSX needs more horizontal room (range calendars, large forms, button-group demos with many buttons). `<Demo height="tall">` for components that render with a min-height >10rem (calendars, sidebars, charts, popovers anchored inline). Pick the smaller value that still avoids visual clipping.
- **Variant renames**: when a demo is renamed (e.g. "Default" → "Basic" because that's the upstream `### Basic`), replace its content too. The contract is the upstream code block, not just the label. Renaming without porting content keeps a fake demo under a real name, which is worse than the original drift.

### 4. Token rules

- Use only shadcn primitives from `@/components/ui/*`. No new wrappers, no forks.
- Color: use the same Tailwind class the MD uses. If the MD uses `bg-amber-50` or `bg-green-600`, paste it verbatim. Do not "upgrade" to a new design token. The MD treats those as deliberate escape hatches.
- Radius: when the MD uses `rounded-lg`, paste it. When it uses `rounded-md`, paste it. Both map to `--radius-*` via `@theme inline` in `globals.css`. When wrapping fixture chrome (not from the MD) prefer `rounded-[var(--radius)]` for parity with the rest of the showcase.
- Never write inline hex, `oklch`, or new CSS variables.

### 5. Imports and state cleanup

After porting, remove what is no longer referenced in the file:

- Icons no longer used by any demo.
- Hooks (`useState`, `useEffect`) hoisted to the parent group function for the now-replaced demos. If the only consumer of `[date, setDate]` was the old Calendar block and every new Calendar demo is a self-contained helper, the parent state is dead — delete it.
- React-day-picker `DateRange` and similar types when no parent state still references them.

The lint pass (`@typescript-eslint/no-unused-vars`) catches stragglers; do not leave unused imports for later.

### 6. Update the docs

Edit [`docs/showcase.md`](../showcase.md):

- Move the row for `<slug>` from the placeholder list into the "Rebuilt verbatim" table.
- Fill the "Flagged extras" column with the comma-separated names of any `<Demo flagged>` blocks under that component, or `–` if none.
- If you swapped icon libraries, dropped a code path, or otherwise deviated from the upstream MD, add a one-line entry under "Per-component deviations".

If the section is brand new (not previously in the TOC), also add the id to the `TOC` array in [`src/app/showcase/page.tsx`](../../src/app/showcase/page.tsx).

Update the file header comment in the touched group file. The comment lists every Section id in that file with its docs URL; mark this slug `(rebuilt from MD)`:

```ts
//   button-group  https://ui.shadcn.com/docs/components/button-group  (rebuilt from MD)
```

### 7. Verify

```bash
pnpm typecheck
pnpm lint
```

Both must pass with no new errors. Pre-existing warnings in unrelated files are acceptable.

Open the page and visually compare each variant to the upstream docs side by side:

```bash
open -a Safari "http://localhost:3000/showcase#$SLUG"
open -a Safari "https://ui.shadcn.com/docs/components/$SLUG"
```

Walk every `<Demo>` left-to-right against the docs preview. Flagged demos must show the red border + "Not in spec" pill.

### 8. Commit

One component per commit. Conventional Commits, `ui` scope:

```bash
git add src/components/showcase/<area>-group.tsx docs/showcase.md
git commit -m "feat(ui): rebuild <slug> showcase from upstream MD"
```

Do not bundle multiple components in one commit. The diff stays reviewable and a bad port is reverted in isolation.

## Anti-patterns

- **Inventing content.** The MD has the content. Use it. "Save | Discard | Copy | Paste" is not a substitute for the upstream Nested example.
- **Renaming demos to make them sound nicer.** The `### name` heading is the contract.
- **Renaming a demo without porting its content.** That just hides the drift behind a real label.
- **Dropping demos that don't fit.** Flag, don't delete.
- **Adding new design tokens.** `--success`, `--warning`, `--info` were proposed and rejected. Project uses shadcn's token surface as-is.
- **Editing `next.config.ts` to add image remote patterns.** Use `<img>` with the eslint-disable comment for showcase fixtures.
- **Calling hooks inside `<Demo>` children.** Hooks belong in helper components extracted to module scope. The group function's hooks are shared state; helper components own their own state.
- **Touching components outside the slug being rebuilt.** Scope creep contaminates the diff.
- **Re-fetching MDs you already ported in the same session.** Cache once, work the queue.
- **Ignoring `exactOptionalPropertyTypes` errors with `// @ts-ignore`.** Use `?? <default>` or a real assertion. The errors are the type system catching real `undefined` paths.

## Batch mode

To work through the queue:

```bash
mkdir -p /tmp/shadcn-md
for slug in $(grep -oE 'docs/components/([a-z-]+)\.md' docs/showcase.md | cut -d/ -f3 | sed 's/\.md//' | sort -u); do
  curl -sL "https://ui.shadcn.com/docs/components/$slug.md" -o "/tmp/shadcn-md/$slug.md"
done
```

Then port one component, verify, commit, repeat. Do not pre-batch edits across components in a single working tree.

## Done definition

A component is rebuilt when:

1. Every `### <Name>` from the MD `## Examples` section has a matching `<Demo name="<Name>">` in the group file.
2. Demo content matches the MD code block (no fake placeholder text). Same name, same JSX shape — children, props, and ordering line up with the upstream block.
3. Existing showcase demos that have no upstream match carry `flagged`.
4. `pnpm typecheck` and `pnpm lint` both pass.
5. Visual side-by-side in Safari matches the docs preview.
6. `docs/showcase.md` and the group file header are updated.
7. One commit on its own.

## Audit (must run after a rebuild round)

Header markers can lie. A single-round rebuild may have only ported the page-hero Default and left the Examples block untouched while the marker reads `(rebuilt from MD)`. Run the audit to catch these.

### Variant-name diff (catches missing or extra Demos)

```bash
# Cache MDs and diff names
mkdir -p /tmp/shadcn-audit
python3 - <<'PY'
import re, urllib.request, os, glob

CACHE = "/tmp/shadcn-audit"
slugs = {}
for path in glob.glob("src/components/showcase/*-group.tsx"):
    src = open(path).read()
    for m in re.finditer(r'<Section\s+([^>]*?)id="([a-z-]+)"', src, re.S):
        slugs[m.group(2)] = path

def upstream(slug):
    fp = f"{CACHE}/{slug}.md"
    if not os.path.exists(fp):
        data = urllib.request.urlopen(f"https://ui.shadcn.com/docs/components/{slug}.md", timeout=20).read().decode()
        open(fp, "w").write(data)
    md = open(fp).read().split("\n")
    h2 = [(i, l[3:].strip()) for i, l in enumerate(md) if l.startswith("## ")]
    for j, (i, n) in enumerate(h2):
        if n == "Examples":
            end = h2[j+1][0] if j+1 < len(h2) else len(md)
            return [l[4:].strip() for l in md[i:end] if l.startswith("### ") and l[4:].strip().lower() != "rtl"]
    return []

for slug, path in sorted(slugs.items()):
    up = upstream(slug)
    src = open(path).read()
    m = re.search(rf'<Section\s+([^>]*?)id="{slug}"([\s\S]*?)</Section>', src)
    local = re.findall(r'<Demo\s+name="([^"]+)"', m.group(2)) if m else []
    up_lc = {v.lower(): v for v in up}
    lo_lc = {v.lower(): v for v in local}
    missing = [up_lc[k] for k in up_lc if k not in lo_lc]
    extra = [lo_lc[k] for k in lo_lc if k not in up_lc and k != "default"]
    if missing or extra:
        print(f"{slug}: missing={missing} extra={extra}")
PY
```

A clean run prints nothing. `extra` items are acceptable only if they are explicitly `<Demo flagged>` and listed under "Per-component deviations" in `docs/showcase.md`.

### Content drift (catches matching-label-but-fake-JSX)

The variant-name diff misses cases where `<Demo name="Vertical">` exists locally but the JSX is invented (e.g. Toggle Group "Vertical" rendering Top/Middle/Bottom while upstream shows B/I/U).

For each component, manually open `https://ui.shadcn.com/docs/components/<slug>` and `http://localhost:3000/showcase#<slug>` side by side. For every `<Demo>`, the visible elements (text, icons, layout) must match the upstream preview. If they do not, the JSX was kept from the original scaffold and needs replacement.

Future improvement: AST-extract the upstream `### <name>` code block and grep the rendered JSX for the same component-tag set; flag any local Demo whose tag set diverges from the upstream block by more than a small delta. Out of scope for the manual checklist version of this runbook.
