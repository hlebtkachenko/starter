# Component registry refactor plan

> Goal: make every shadcn variant and every composed block in this repo a first-class, indexed, AI-greppable, and reusable building block. Showcase becomes a thin renderer over the registry, not the home of demo JSX.

## Problem statement

Today's structure works but is not AI-optimal:

- Variant JSX lives inline inside group files (`src/components/showcase/buttons-group.tsx`, ~1000+ lines). To reuse a variant on a page, an AI agent must re-author it.
- 9 group files concentrate ~330 demos. Grepping for "Button Outline variant" hits the wrong file before the right one.
- No machine-readable manifest. The link from a `<Demo name="Outline">` to upstream `https://ui.shadcn.com/docs/components/button#outline` is implicit.
- Page-level composed UI (login forms, dashboards, pricing tables) has no home — it gets duplicated inside `app/<route>/page.tsx`.
- Per-component deviations (Input OTP must be controlled, ChartConfig discriminated union, useMediaQuery → useIsMobile) live in prose, not enforceable.
- The audit script is a one-time runbook snippet, not part of CI.

## Target architecture (shadcn-aligned)

```
src/components/
├── ui/                              ← primitives (unchanged)
│   ├── button.tsx
│   ├── accordion.tsx
│   └── ...
├── examples/                        ← NEW: ONE file per variant
│   ├── _fixtures/                   ← shared SCREAMING_SNAKE data per slug
│   │   ├── accordion.ts
│   │   ├── combobox.ts
│   │   └── ...
│   ├── accordion-default.tsx        ← export default function AccordionDefault() { ... }
│   ├── accordion-basic.tsx
│   ├── accordion-multiple.tsx
│   ├── button-default.tsx
│   ├── button-outline.tsx
│   ├── button-with-icon.tsx
│   └── ...
├── blocks/                          ← NEW: composed reusable page-level pieces
│   ├── login-card.tsx
│   ├── pricing-table.tsx
│   ├── dashboard-stats.tsx
│   └── ...
└── registry.ts                      ← NEW: machine-readable manifest

src/app/showcase/
├── page.tsx                         ← imports from registry, renders one Section per slug
└── _components/
    └── component-preview.tsx        ← <ComponentPreview name="button-outline" />
                                       resolves through registry, lazy-loads example
```

### `registry.ts` schema

```ts
export type ExampleEntry = {
  slug: string;                    // "button"
  variant: string;                 // "outline"
  name: string;                    // "Outline" — matches upstream ### heading
  file: string;                    // "examples/button-outline"
  isDefault?: boolean;             // page-hero
  isFlagged?: boolean;             // not in upstream Examples
  upstreamUrl: string;             // "https://ui.shadcn.com/docs/components/button#outline"
  deviations?: string[];           // ["substituted IconGitBranch with GitBranchIcon"]
  span?: 1 | 2 | 3;
  height?: "auto" | "tall";
};

export const REGISTRY: Record<string, {
  title: string;
  description: string;
  upstreamUrl: string;
  variants: ExampleEntry[];
}> = { ... };
```

### `<ComponentPreview>`

```tsx
"use client";
import { lazy, Suspense } from "react";
import { REGISTRY } from "@/components/registry";

export function ComponentPreview({ slug, variant }: { slug: string; variant: string }) {
  const entry = REGISTRY[slug]?.variants.find((v) => v.variant === variant);
  if (!entry) return null;
  const Demo = lazy(() => import(`@/components/examples/${entry.file}.tsx`));
  return <Suspense fallback={<Skeleton />}><Demo /></Suspense>;
}
```

Pages reuse a variant without extra plumbing:

```tsx
// src/app/marketing/page.tsx
import ButtonOutline from "@/components/examples/button-outline";
export default function Page() {
  return <section><ButtonOutline /></section>;
}
```

## File-by-file plan

### Phase 0 — Foundation (sequential, Opus)

| File | Action |
|---|---|
| `src/components/registry.ts` | NEW — empty manifest with TypeScript types |
| `src/components/examples/_fixtures/.gitkeep` | NEW |
| `src/components/blocks/.gitkeep` | NEW |
| `src/app/showcase/_components/component-preview.tsx` | NEW — lazy renderer |
| `eslint.config.mjs` | NEW rules: ban `defaultValue` on `InputOTP`, ban inline hex/oklch/arbitrary radius in `src/components/**`, ban demo imports outside `examples/`/`blocks/` |
| `CLAUDE.md` Doc-scope | Add row: "Reusable component examples" → `src/components/examples/` |
| `docs/runbooks/shadcn-primitive-intake.md` | Note: also update registry on intake |
| `docs/runbooks/showcase-rebuild.md` | Replace inline `<Demo>` rule with "one file per variant under `examples/`, register in `registry.ts`" |
| `docs/showcase.md` | Cold-start checklist updated for the new layout; component map auto-generated from registry |
| `docs/blocks.md` | NEW — block catalog and conventions |
| `scripts/check-registry.ts` | NEW — fails CI if `examples/*.tsx` count diverges from `registry.ts` entries |
| `scripts/generate-showcase-export.ts` | NEW — emits `docs/showcase-export.md` from registry |
| `scripts/generate-manifest.ts` | NEW — emits `docs/components-manifest.json` from registry |

### Phase 2 — Migrate variants (PARALLEL, 9 Sonnet agents)

Each agent owns one group file, migrates every `<Demo>` inside it.

| Agent | Group file | Components | Approx. variant files emitted |
|---|---|---|---|
| A | `buttons-group.tsx` | button, button-group, toggle, toggle-group | ~30 |
| B | `display-group.tsx` | avatar, badge, calendar, chart, data-table, skeleton, table, typography | ~60 |
| C | `feedback-group.tsx` | alert, progress, sonner, spinner | ~15 |
| D | `forms-group.tsx` | 14 form components | ~80 |
| E | `layout-group.tsx` | aspect-ratio, card, collapsible, resizable, scroll-area, separator, sidebar | ~25 |
| F | `menus-group.tsx` | command, context-menu, dropdown-menu | ~25 |
| G | `navigation-group.tsx` | breadcrumb, menubar, navigation-menu, pagination, tabs | ~20 |
| H | `overlays-group.tsx` | alert-dialog, dialog, drawer, hover-card, popover, sheet, tooltip | ~30 |
| I | `utility-group.tsx` | accordion, carousel, empty, item, kbd | ~25 |

Per `<Demo name="X">` block:
1. Create `src/components/examples/<slug>-<kebab-of-X>.tsx` with `export default function <SlugVariant>() { ... }`.
2. Move helper functions / hooks into the same file (helpers no longer separate).
3. Multi-variant fixtures move to `src/components/examples/_fixtures/<slug>.ts`.
4. Single-use fixtures stay inline.
5. Append registry entry under that slug.
6. `<Demo>` in the group file is replaced with `<ComponentPreview slug="<slug>" variant="<variant>" />` — temporary; group file deleted in Phase 4.
7. Verify per-agent: `pnpm typecheck` clean, `pnpm lint` clean.

Agents read [`docs/runbooks/showcase-rebuild.md`](../runbooks/showcase-rebuild.md) for variant content rules — this phase is mechanical extraction, not re-port.

### Phase 4 — Showcase consumes registry (sequential, after Phase 2)

| File | Action |
|---|---|
| `src/app/showcase/page.tsx` | Rewrite: iterate `REGISTRY`, render one `<Section>` per slug + one `<ComponentPreview>` per variant. TOC derived from `Object.keys(REGISTRY)`. |
| `src/components/showcase/section.tsx` | Keep `Section` and `Demo` exports. `Demo` still wraps `<ComponentPreview>` for the flagged border / "Not in spec" pill. |
| `src/components/showcase/{buttons,display,feedback,forms,layout,menus,navigation,overlays,utility}-group.tsx` | DELETE. Empty after Phase 2 migration. |

### Phase 3 — Blocks scaffolding (parallel with Phase 4, 1 Sonnet agent)

Identify candidate blocks already inferable from current state (login form, signup form). Pattern: each block is a single default export, lives in `src/components/blocks/<slug>.tsx`, registered in `BLOCKS_REGISTRY` (parallel to component registry).

| File | Action |
|---|---|
| `src/components/blocks/login-card.tsx` | Extract from current `src/app/login/page.tsx` if any |
| `src/components/blocks/_registry.ts` | NEW — same shape as components but page-level |
| `docs/blocks.md` | Catalog table |
| `src/app/showcase/blocks/page.tsx` | NEW — `/showcase/blocks` route renders every block |

### Phase 5 — Auto-generated artifacts (sequential, after Phase 4)

| File | Action |
|---|---|
| `docs/showcase-export.md` | Generated by `scripts/generate-showcase-export.ts`. One MD section per slug, one tsx code block per variant. Round-trip-equivalent to upstream `.md`. AI reads ONE file instead of 9 group files. |
| `docs/components-manifest.json` | Generated by `scripts/generate-manifest.ts`. JSON form of registry, suitable for tooling. |
| `package.json` | Add `"scripts": { "registry:check": "tsx scripts/check-registry.ts", "registry:export": "tsx scripts/generate-showcase-export.ts && tsx scripts/generate-manifest.ts" }` |
| `lefthook.yml` | Pre-commit: run `pnpm registry:check`. Fail if drift. |

### Phase 6 — Lint guards (parallel with Phase 5)

| File | Action |
|---|---|
| `eslint.config.mjs` | Add custom rules:<br>- `no-input-otp-default-value` (RegExp on JSX attr)<br>- `no-inline-hex` (block `bg-[#...]`, `text-[#...]` etc inside `src/components/**`)<br>- `no-arbitrary-radius` (block `rounded-[Xpx]`)<br>- `no-oklch` (block any `oklch(`)<br>- `no-tabler-icons` (block `from "@tabler/icons-react"`) |
| Existing `gitleaks` / `commitlint` | Unchanged |

### Phase 7 — CI on self-hosted runner (parallel with Phase 5/6)

| File | Action |
|---|---|
| `.github/workflows/showcase-audit.yml` | NEW. `runs-on: [self-hosted, linux, ovh, <repo-name>]` (per `/setup-gh-runner`). Steps: install, typecheck, lint, `pnpm registry:check`, `pnpm registry:export` then `git diff --exit-code` to assert generated docs are committed, finally a Python audit step that diffs `examples/` against upstream `### name` lists per slug. |
| `.github/workflows/test.yml` (if exists) | Verify also pinned to self-hosted runner |
| Runner registration | One-time: run `bash ~/.claude/skills/setup-gh-runner/scripts/03-register-runner.sh <repo>` (per CLAUDE.md global rule) |

### Phase 8 — Verify, test, ship (sequential)

1. `pnpm typecheck` — clean
2. `pnpm lint` — clean (TanStack `useReactTable` advisory expected; documented)
3. `pnpm registry:check` — clean
4. `pnpm registry:export` — diff is empty
5. `pnpm dev` + manual visual on `/showcase` — every variant renders identically to before
6. `pnpm dev` + visual on `/showcase/blocks` — blocks render
7. Branch: `hlebtkachenko/component-registry`
8. Commit per phase (one commit per phase, conventional commits, `ui` scope)
9. Push to remote; self-hosted CI runs
10. Merge after green
11. Delete legacy group files in the same PR (their content lives in `examples/` now)

## Parallel waves

```
Wave 1 (sequential, ~1d, Opus):
  Phase 0 — Foundation

Wave 2 (parallel, ~2-3d, 9 × Sonnet):
  Phase 2A button-group
  Phase 2B display
  Phase 2C feedback
  Phase 2D forms (largest, may need 2 Sonnet agents inside)
  Phase 2E layout
  Phase 2F menus
  Phase 2G navigation
  Phase 2H overlays
  Phase 2I utility

Wave 3 (parallel after Wave 2, ~1d):
  Phase 3 blocks (1 Sonnet)
  Phase 4 showcase consumes registry (1 Opus — gnarly: ESM dynamic import + Next 16 RSC)
  Phase 6 lint guards (1 Sonnet)
  Phase 7 CI workflow (1 Sonnet)

Wave 4 (sequential, ~0.5d, Opus):
  Phase 5 auto-gen artifacts (registry → MD + JSON)

Wave 5 (sequential, ~0.5d):
  Phase 8 verify + ship
```

`/advisor-mode` distribution: Opus 4.7 owns Phases 0, 4, 5, 8 (one-shot decisions, schema, ESM dynamic import, ship). Sonnet 4.6 owns Phase 2 parallel migration (mechanical extraction) and Phases 3/6/7 (well-scoped writes).

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| `/showcase` breaks mid-refactor | All Phase 2 PRs land green individually. Phase 4 cuts over atomically. Old group files deleted in same commit as registry rewrite. |
| File explosion (~330 example files) | Per shadcn precedent (~600 in `apps/v4/registry/new-york-v4/examples`). Manageable; flat dir, kebab-case is greppable. |
| Registry drift (variant added without registry update) | `pnpm registry:check` in pre-commit + CI. Build fails. |
| Generated docs drift | CI runs `pnpm registry:export` then `git diff --exit-code`. Drift fails the PR. |
| `defaultValue` on InputOTP regression | Custom ESLint rule blocks at lint time. Fails CI. |
| Self-hosted runner offline | Runbook `setup-gh-runner` covers re-registration. CI fail-fast. |

## Done definition

- 0 demos remain inside `src/components/showcase/*-group.tsx`. Those files are deleted.
- Every variant has its own file under `src/components/examples/<slug>-<variant>.tsx`.
- `src/components/registry.ts` is the single source of truth; every example file appears exactly once.
- `docs/showcase-export.md` and `docs/components-manifest.json` are generated, committed, and CI-checked.
- Custom ESLint rules block the four known regression classes (InputOTP defaultValue, inline hex, arbitrary radius, oklch).
- `.github/workflows/showcase-audit.yml` runs on self-hosted runner, blocks merges on drift.
- `/showcase` renders identically to today (visual contract).
- `/showcase/blocks` exists and renders the block catalog.
- Pages can `import Demo from "@/components/examples/button-outline"` and use it directly.
- A fresh AI agent reading `CLAUDE.md` follows: doc-scope row → `docs/showcase.md` cold-start → registry.ts → finds any variant by name in seconds.
