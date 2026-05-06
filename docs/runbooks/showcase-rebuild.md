---
title: How to add or update a variant in /showcase
severity: meta
last_drilled: 2026-05-07
related_adrs: []
---

# How to add or update a variant

> Reusable procedure for adding a single variant to `/showcase` after the
> primitive is in place. Pre-Phase-3 this lived alongside per-group source
> files; the registry-driven flow is shorter.

Pre-requisite: the primitive exists in `src/components/ui/<slug>.tsx`. If
not, run [`shadcn-primitive-intake.md`](shadcn-primitive-intake.md) first.

## Procedure

### 1. Read the upstream MD

```bash
SLUG=button-group
mkdir -p /tmp/shadcn-md
curl -sL "https://ui.shadcn.com/docs/components/$SLUG.md" -o "/tmp/shadcn-md/$SLUG.md"
awk '/^## Examples/,/^## RTL/' "/tmp/shadcn-md/$SLUG.md"
```

Each `### <Name>` heading inside `## Examples` is one variant. The
top-of-file code block (before the first `##`) is the page-hero "Default".

If the file has no `## Examples` block (sidebar, data-table, chart,
typography, label, navigation-menu), the variants are H2 sections that
sit outside the catalog. Mark each registry entry with `isFlagged: true`
and document the deviation.

### 2. Author one file per variant

Path: `src/components/examples/<slug>-<variant>.tsx`. Copy
[`src/components/examples/_TEMPLATE.tsx`](../../src/components/examples/_TEMPLATE.tsx)
and apply the contract from
[`docs/conventions/component-templates.md`](../conventions/component-templates.md):

- JSDoc header: `@slug @variant @upstream @deviations`.
- `"use client"` only when JSX uses a hook.
- Imports ordered: `react` → `next/*` → external pkgs → `@/components/ui/*`
  → `@/components/examples/_fixtures/*` → `@/lib/*` → relative.
- SINGLE default export. PascalCase function name.
- Helpers stay in the same file (no separate exports).

Project-rule adaptations (apply per file when needed):

- `@tabler/icons-react` → lucide-react equivalent.
- `next/image` raster → native `<img>` + eslint-disable comment.
- `useMediaQuery` → `useIsMobile` from `@/hooks/use-mobile`.
- `useRef(SideEffect()).current.method()` → `useMemo(() => SideEffect(), [])`.
- `<InputOTP defaultValue=…>` → `useState` controlled wrapper.
- Strict-mode TS: drop the conditional → `?? <default>` → assertion.
- `ChartConfig`: drop the `color` form, keep `theme`.

ESLint rules block hex (`bg-[#…]`), `oklch(`, and arbitrary radius
(`rounded-[Xpx]`) inside `src/components/**`. Use token classes.

### 3. Append the registry entry

Edit the matching fragment in
`src/components/examples/_registry-<group>.ts`. Recipe in
[`docs/conventions/component-templates.md`](../conventions/component-templates.md#registry-entry-recipes).
Required fields:

- `name`, `type: "registry:example"`, `title`, `slug`, `variant`.
- `description` ≥ 80 chars, specific (what / when / composes).
- `registryDependencies`: derive from `@/components/ui/*` imports.
- `categories`, `related`, `upstreamUrl`.
- `isDefault: true` for the canonical Default. `isFlagged: true` when not
  in upstream `## Examples`. `span` / `height` for grid sizing.
- `deviations` array for any non-trivial port.

### 4. Build + verify

```bash
pnpm registry:build              # validates the graph + emits __index__.tsx
pnpm registry:check-orphans      # examples/ filesystem matches registry
pnpm registry:drift-check        # variant names vs upstream MD
pnpm typecheck
pnpm lint
pnpm test
pnpm registry:export             # regenerate exports + manifest
```

All gates must pass at or below
[`docs/plans/baseline-lint.txt`](../plans/baseline-lint.txt) (currently
21 warnings).

### 5. Visual

```bash
pnpm dev
open "http://localhost:3000/showcase#<slug>"
open "https://ui.shadcn.com/docs/components/<slug>"
```

Walk every variant left-to-right against the docs preview. The text,
icons, and layout must match. Flagged demos must show the red border +
"Not in spec" pill.

### 6. Commit

One slug per commit. Conventional Commits, `ui` scope:

```bash
git commit -m "feat(ui): add <slug>-<variant> example"
```

Pre-commit runs lefthook: `biome-format`, `eslint-fix`, `gitleaks`, and
`registry-export-drift`. CI on the self-hosted runner re-runs the lot
plus `registry:check-orphans` and `registry:drift-check`.

## Audit (after a rebuild round)

`scripts/check-content-drift.ts` is the productized form of the older
Python audit. Output is a markdown table of `missing-from-local` (a
variant in upstream that we never ported) and `extra-in-local-not-flagged`
(a local variant with no upstream match that lacks `isFlagged: true`).

```bash
pnpm registry:drift-check
```

A clean run prints "Drift report" with empty rows. Documented
out-of-Examples slugs (chart, data-table, label, navigation-menu,
typography) are expected to surface there until each entry is marked
`isFlagged: true` (Wave 4 follow-up).

## Anti-patterns

- Inventing JSX. The MD has the content. Use it.
- Renaming variants to "sound nicer." `### name` is the contract.
- Renaming a variant without porting its content (hides drift behind a
  real label).
- Dropping variants that don't fit. Flag with `isFlagged`, don't delete.
- Adding new design tokens. `--success`, `--warning`, `--info` were
  proposed and rejected.
- Editing `next.config.ts` to add image remote patterns. Use `<img>`
  with the eslint-disable comment.
- Calling hooks inside `<Demo>` children. Hooks belong in the variant's
  default-exported function. The `<Demo>` wrapper is a presentation shell.
- Touching components outside the slug being edited. Scope creep.
- Re-fetching MDs you already cached. Use `/tmp/shadcn-md/<slug>.md`.
- Ignoring `exactOptionalPropertyTypes` errors with `// @ts-ignore`. Use
  `??` or a real assertion.

## Done definition

A variant ships when:

1. `src/components/examples/<slug>-<variant>.tsx` matches the upstream
   `### <name>` block (or `isFlagged: true` is set with a documented
   deviation).
2. The fragment registry entry has description ≥ 80 chars,
   `registryDependencies`, `categories`, `related`, `upstreamUrl`,
   `deviations` array, and the appropriate `isDefault` / `isFlagged` /
   `span` / `height` flags.
3. `pnpm registry:build`, `pnpm typecheck`, `pnpm lint`, `pnpm test`,
   `pnpm registry:check-orphans`, `pnpm registry:export` all pass.
4. Visual side-by-side at `/showcase#<slug>` matches the docs preview.
5. One commit on its own.
