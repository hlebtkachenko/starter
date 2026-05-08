# Component registry — Phase 3 (revised)

> Phases 1+2 (scaffolding + extraction) done. 363 example files placed in `src/components/examples/` with per-group fragment registries. `/showcase` still rendered by legacy group files. This plan covers everything postponed to land the registry into production.
>
> **Revision date:** 2026-05-06. Closes 18 gaps found in the first draft (content-drift handling, runner registration timing, atomic group-file deletion, orphan/cycle detection, test surface, MCP server, per-area export splits, /login migration, template specs, knip gate, doc rewrites).

## Strategy

Template-first, then mechanical. Define the canonical shape ONCE per file type, then walk every file applying it. Track every file in `progress.md`; the wave-4 ship audit blocks merge if anything is PENDING.

`/advisor-mode` distribution:
- **Opus 4.7** on the gnarly choices: template authoring, ESLint custom rule code, showcase rewrite (RSC + lazy + Suspense), final ship.
- **Sonnet 4.6** on parallel mechanical passes: applying templates, generating manifests, scaffolding tests, extracting blocks.

`/setup-gh-runner` provides the self-hosted runner so CI does not bill GitHub minutes. Registered in Wave 0 (BEFORE first PR).

## Phases

### Wave 0 — Foundation (sequential, Opus, ~0.5d)

Author canonical templates ONCE; everything in Wave 1 applies them mechanically.

| Output | Spec |
|---|---|
| `src/components/ui/_TEMPLATE.tsx` (refine) | Primitive scaffold. cva variants. Slot for asChild. forwardRef where shadcn does. ALL subcomponents named-exported. Token classes only — no inline hex / oklch / arbitrary radius. |
| `src/components/examples/_TEMPLATE.tsx` (NEW) | Variant scaffold: `"use client"` only when JSX uses hooks; file-level JSDoc header listing slug, variant, upstream URL, deviations array; imports in order `react` → `next/*` → external pkgs → `@/components/ui/*` → `@/lib/*` → relative; **single `export default function <PascalName>()`**; helpers stay in same file (no separate exports). |
| `src/components/blocks/_TEMPLATE.tsx` (NEW) | Page-level block scaffold: file header (purpose + composes list); imports same order as examples plus `@/components/examples/*` allowed; single default export; props interface named `<BlockName>Props`; theme contract (uses tokens not raw colors). |
| `_registry-template.ts` recipes | Per-type recipe (`registry:ui`, `registry:example`, `registry:block`) with required + optional fields, rich-description heuristic ("what this shows / when an AI picks it / what it composes"), example deviations entries. |
| `docs/conventions/component-templates.md` | Single doc covering all three templates + the registry-entry recipe. Replaces the structural guidance scattered across `showcase-rebuild.md`. |
| `scripts/generate-progress-rows.ts` | Reads `_registry-*.ts` + globs `examples/*.tsx`, emits Phase 3b row block of `progress.md`. |
| `src/lib/registry-schema.ts` | Add optional `since?: string` field. Add cycle detection in build-registry validate(). |
| Self-hosted runner | Run `bash ~/.claude/skills/setup-gh-runner/scripts/03-register-runner.sh <repo>` once. Confirm `gh api repos/<owner>/<repo>/actions/runners` lists the runner online. |
| Baseline snapshot | `pnpm typecheck && pnpm lint > /tmp/baseline.txt` — Wave 4 ship gate compares against this baseline; new warnings/errors block. |

Done definition: every Wave 1 agent receives `docs/conventions/component-templates.md` as required reading; baseline snapshot committed; runner online; build script enforces no cycles.

### Wave 1 — Apply templates + content-drift fix (PARALLEL, 9 Sonnet, ~1d)

Each agent owns its slug prefix scope and the matching fragment registry. Mirrors Phase 2 ownership.

| Agent | Slug scope | Files | Fragment |
|---|---|---|---|
| A | `button*`, `toggle*` | 36 | `_registry-buttons.ts` |
| B | `avatar`, `badge`, `calendar`, `chart`, `data-table`, `skeleton`, `table`, `typography` | 69 | `_registry-display.ts` |
| C | `alert`, `progress`, `sonner`, `spinner` | 18 | `_registry-feedback.ts` |
| D | `checkbox`, `combobox`, `date-picker`, `field`, `input*`, `label`, `native-select`, `radio-group`, `select`, `slider`, `switch`, `textarea` | 105 | `_registry-forms.ts` |
| E | `aspect-ratio`, `card`, `collapsible`, `resizable`, `scroll-area`, `separator`, `sidebar` | 27 | `_registry-layout.ts` |
| F | `command`, `context-menu`, `dropdown-menu` | 26 | `_registry-menus.ts` |
| G | `breadcrumb`, `menubar`, `navigation-menu`, `pagination`, `tabs` | 21 | `_registry-navigation.ts` |
| H | `alert-dialog`, `dialog`, `drawer`, `hover-card`, `popover`, `sheet`, `tooltip` | 29 | `_registry-overlays.ts` |
| I | `accordion`, `carousel`, `empty`, `item`, `kbd` | 33 | `_registry-utility.ts` |

Per file, the agent runs four passes:

1. **Template apply.** Replace file structure with `examples/_TEMPLATE.tsx` skeleton (header, import order, single default export). Preserve JSX inside the export.
2. **Content drift fix.** Fetch upstream `https://ui.shadcn.com/docs/components/<slug>.md` once per slug, cache. For each variant:
   - If variant matches a `### name` block under `## Examples`: structurally diff (component-tag set, props, label text). If divergent, replace the JSX with the upstream code block.
   - If variant is the page-hero (Default): same diff against the top-of-file code block.
   - If `isFlagged: true` in registry: leave content alone (intentional deviation).
3. **Adapt to project rules.** lucide-only icons (substitute `@tabler/icons-react`); `<img>` + eslint-disable for raster (no `next/image`); `?? <default>` for strict-TS `exactOptionalPropertyTypes`; `useMemo` not `useRef` for the Carousel autoplay pattern; controlled wrapper for `<InputOTP>` (NEVER `defaultValue`).
4. **Strengthen registry entry.** Description ≥ 80 chars, specific. `registryDependencies` derived from `@/components/ui/*` imports of the file. `categories` and `related` per the recipe. Append to fragment file in slug order.

Each agent updates rows in `docs/plans/component-registry-progress.md`: PENDING → IN_PROGRESS → DONE per file. Run `pnpm registry:build && pnpm typecheck && pnpm lint` after their last file; report status.

### Wave 2 — Showcase consumes registry + lint guards (parallel, ~0.5d)

#### 2-Showcase (Opus)

| File | Action |
|---|---|
| `src/app/showcase/page.tsx` | Rewrite as registry consumer. Iterate `Object.entries(REGISTRY_BY_SLUG)`, render one `<Section>` per slug, one `<ComponentPreview slug=… variant=…/>` per variant. TOC derived from `Object.keys`. Stop importing `*-group.tsx`. |
| `src/app/showcase/_components/component-preview.tsx` | Move `src/components/component-preview.tsx` here for app-private scope. Apply `<Demo flagged>` decoration when `meta.isFlagged`. |
| `src/components/showcase/section.tsx` | Keep `Section`/`Demo` exports — `Demo` is now a thin wrapper around `<ComponentPreview>` for the flagged styling. |
| `src/components/showcase/{...}-group.tsx` | **DO NOT delete yet.** Stop importing them. Wave 4 deletes atomically with the final ship commit so a regression mid-wave is recoverable. |

#### 2-ESLint guards (Sonnet)

Project-local rules in `eslint.config.mjs`. Initially `warn`, promoted to `error` after first clean lint:

| Rule | Blocks |
|---|---|
| `no-input-otp-default-value` | `<InputOTP defaultValue=…>` JSX attr (regression class observed twice this round) |
| `no-inline-hex` | `bg-[#…]`, `text-[#…]`, `border-[#…]`, etc. inside `src/components/**` |
| `no-arbitrary-radius` | `rounded-[Xpx]`, `rounded-[Xrem]`. Allowed: `rounded-[var(--radius)]`, `rounded-[min(var(--radius-md),Xpx)]` |
| `no-oklch` | `oklch(` substring anywhere except `node_modules/` |

`pnpm lint` fails on any hit. Pre-commit (lefthook) wires these.

### Wave 3 — Generated artifacts + blocks + tests + CI (3 ‖ Sonnet, ~0.5d)

#### 3-Artifacts

| File | Generator | Purpose |
|---|---|---|
| `docs/showcase-export.md` (index) | `scripts/generate-showcase-export.ts` | Top-level TOC + links to per-area files. AI reads ONE small index. |
| `docs/showcase-export/{ui,examples,blocks}.md` (split) | same generator | Per-area MD with each variant code block read at gen time. Token budget per file ≤ ~20k. |
| `docs/components-manifest.json` | `scripts/generate-manifest.ts` | Stable JSON of registry. For tooling, MCP integration, downstream consumers. |
| `scripts/check-orphans.ts` | NEW | Diffs `examples/*.tsx` vs registry entries. Fails on either side mismatch. |
| `scripts/check-content-drift.ts` | productize from runbook snippet | Diffs each variant's local `<Demo name>` set against upstream `### name` per slug. Markdown table of mismatches. |
| `src/lib/registry.test.ts` (Vitest) | NEW | Unit tests for `getRegistryComponent`, `searchRegistry`, `getExamplesForSlug`, `listAllItems`. Cycle detection covered. |
| `package.json` | add `registry:export`, `registry:check-orphans`, `registry:drift-check` | – |
| `lefthook.yml` | pre-commit `pnpm registry:check && pnpm registry:export && git diff --exit-code -- docs/showcase-export.md docs/showcase-export/ docs/components-manifest.json` | Blocks commit on drift. |

#### 3-Blocks

Initial blocks identified from `src/app/**` and likely future needs:

| Block | Composes | Source |
|---|---|---|
| `login-card` | card, input, button, label, field | extract from current `src/app/login/page.tsx` |
| `login-card-3` | extract from `src/app/login-3/` if present | – |
| `signup-card` | card, input, button, label, field | scaffold from login-card pattern |
| `forgot-password-card` | card, input, button | scaffold |

Then **migrate the existing pages** to consume the blocks: `src/app/login/page.tsx` becomes `<LoginCard />`, proving the reusability contract. The page should be ≤ 20 lines after migration.

New page `src/app/showcase/blocks/page.tsx` iterates the block registry the same way `/showcase` iterates examples.

#### 3-Tests

| File | Tests |
|---|---|
| `src/lib/registry.test.ts` | unit tests for resolver helpers + searchRegistry + cycle detection |
| `tests/e2e/showcase.visual.spec.ts` (Playwright) | snapshot each `<Section>` on `/showcase`. Failures upload diffs as artifacts. |
| `tests/e2e/blocks.visual.spec.ts` | same for `/showcase/blocks`. |
| `tests/e2e/registry.spec.ts` | navigate to deep links `/showcase#<slug>`, verify each variant renders without console error. |

#### 3-CI

| File | Action |
|---|---|
| `.github/workflows/showcase-audit.yml` | NEW. `runs-on: [self-hosted, linux, ovh, <repo-name>]`. Steps: install → typecheck → lint → registry:build → registry:check-orphans → registry:drift-check → registry:export then `git diff --exit-code` → vitest → playwright. |
| `.github/workflows/test.yml` (if exists) | confirm runner pinned |

### Wave 4 — Verify, ship, document (sequential, Opus, ~0.5d)

#### 4-Verify gates

1. `pnpm typecheck` — clean
2. `pnpm lint` — at or below baseline snapshot from Wave 0
3. `pnpm knip` — no new dead exports (after group-file deletion)
4. `pnpm registry:build` — clean
5. `pnpm registry:check-orphans` — clean
6. `pnpm registry:export` — diff empty
7. `pnpm registry:drift-check` — clean (only documented flagged extras)
8. `pnpm test` — passes
9. `pnpm test:e2e` — passes (or visual diffs reviewed and intentional)
10. `pnpm dev` + manual visual on `/showcase` and `/showcase/blocks` (light + dark)
11. **Cascade test:** edit `--radius` in `globals.css` to a stress value (e.g. 1.5rem), reload, every variant responds. Revert.

#### 4-Atomic deletion + doc rewrite (in same commit chain)

| File | Action |
|---|---|
| `src/components/showcase/{...}-group.tsx` × 9 | DELETE (atomic with showcase rewrite commit) |
| `docs/showcase.md` | Rewrite cold-start checklist for the registry-based flow. Reference `docs/conventions/component-templates.md` and `docs/plans/component-registry-progress.md`. |
| `docs/runbooks/showcase-rebuild.md` | Either rewrite for registry flow OR replace with a 100-line "How to add a variant" doc that points at the example template and registry recipe. The audit-script section stays but updated to use new helpers. |
| `docs/runbooks/shadcn-primitive-intake.md` | Add a step: "Update `_registry.ts` for ui/ with the entry; run `pnpm registry:build`." |
| `CLAUDE.md` Doc-scope | confirm rows are accurate post-rewrite |

#### 4-Commit chain

Branch `hlebtkachenko/component-registry-phase3`. One commit per phase, Conventional Commits, `ui` scope:

1. `feat(ui): canonical example/block/primitive templates + conventions doc`
2. `chore(ui): register self-hosted runner, baseline snapshot, schema cycle detection`
3. `refactor(ui): apply example template + content-drift fix across 363 variants`
4. `feat(ui): showcase renders from registry`
5. `feat(ui): eslint guards block known regression classes`
6. `feat(ui): autogen showcase-export and components-manifest with per-area split`
7. `feat(ui): blocks scaffold + migrate /login pages to consume blocks`
8. `test(ui): registry unit tests + showcase/blocks visual e2e`
9. `ci(ui): showcase-audit workflow on self-hosted runner`
10. `refactor(ui): delete legacy group files; update docs for registry flow`

`git push -u origin <branch>` → self-hosted CI runs → `gh pr create` → green → merge.

#### 4-Optional: Wave 4.5 — MCP registry server (Opus, separate PR)

Scaffold an MCP server in `src/lib/registry-mcp/` exposing `searchRegistry`, `getRegistryComponent`, `listExamples`, `listBlocks` over JSON-RPC. Register in `~/.claude.json`. Lets every fresh Claude Code chat call `mcp__component-registry__search` directly with zero file reads. Defer if scope-creep risk; ship Wave 4 first.

## Progress tracking

| Doc | Owner | Notes |
|---|---|---|
| `docs/plans/component-registry-progress.md` | Each agent edits its rows | PENDING / IN_PROGRESS / DONE per file. Wave 4 ship audit fails on any PENDING. |
| `docs/plans/component-registry-phase3.md` | Hleb (review) + Opus (execution) | This file. |
| `docs/plans/component-registry-refactor.md` | Phase 1+2 history | Already in repo. |

## Parallel waves (visual)

```
Wave 0 (Opus, sequential):                      [3a templates + runner + baseline + scripts]
                                                       │
Wave 1 (9 Sonnet ‖):                            [3b A][3b B][3b C][3b D][3b E][3b F][3b G][3b H][3b I]
                                                       │
Wave 2 (Opus + Sonnet ‖):                       [3c showcase][3d eslint]
                                                       │
Wave 3 (3 Sonnet ‖):                            [3e artifacts+orphans+tests][3f blocks+migrate /login][3g CI]
                                                       │
Wave 4 (Opus, sequential):                      [3h verify + delete groups + doc rewrites + commit + push + PR]
                                                       │
Wave 4.5 (Opus, OPTIONAL):                      [MCP registry server, separate PR]
```

## Risks and mitigations (revised)

| Risk | Mitigation |
|---|---|
| Agent skips a file silently | Progress doc is single source of truth. Wave-4 audit fails ship if any row PENDING. |
| Content drift behind matching label | Wave 1 step 2 explicit content-drift fix per variant. |
| `/showcase` regression after group-file deletion | Wave 2 stops importing groups but keeps files. Wave 4 deletes atomic with showcase rewrite — same PR, easy revert via `git revert`. |
| ESLint custom rule false positives | Initially `warn`, promoted to `error` after first clean lint. |
| Self-hosted runner offline at PR time | Registered in Wave 0. `setup-gh-runner` runbook covers re-registration if it drops. |
| Generated docs drift in PRs | CI runs `registry:export` → `git diff --exit-code`. Hard fail. |
| `defaultValue`-on-InputOTP regression returns | `no-input-otp-default-value` lint rule blocks at lint time across the entire repo. |
| Registry validation fails for new variant | `pnpm registry:check` in pre-commit + CI. |
| Orphan example files | `scripts/check-orphans.ts` in CI fails on either side mismatch. |
| Cycle in `registryDependencies` | `validate()` in `build-registry.ts` detects cycles. |
| Showcase-export.md too large to read | Per-area split: `docs/showcase-export/{ui,examples,blocks}.md` with index file. Each ≤ ~20k tokens. |

## Done definition

- 0 demos remain in `src/components/showcase/*-group.tsx` — those files deleted in the final commit.
- 363+ example files conform to template; every registry entry has description ≥ 80 chars.
- `src/components/blocks/` has at least 3 working blocks; `_registry-blocks.ts` populated; `/login` and `/login-3` consume blocks (≤ 20 LoC each).
- `pnpm registry:build`, `registry:check-orphans`, `registry:export`, `registry:drift-check` all pass.
- `pnpm typecheck`, `pnpm lint`, `pnpm knip`, `pnpm test`, `pnpm test:e2e` all clean.
- ESLint custom rules block all 4 documented regression classes; `error` severity.
- `.github/workflows/showcase-audit.yml` runs on self-hosted runner; greens on `main`.
- `/showcase` and `/showcase/blocks` render identically in light + dark; visual sign-off recorded; Playwright snapshots committed.
- Cascade test: editing `--radius` in `globals.css` propagates to every primitive on `/showcase` without code changes.
- A fresh AI agent reads `CLAUDE.md` → opens `docs/conventions/component-templates.md` → can add a new component without re-deriving any rule.
- Pages can `import Outline from "@/components/examples/button-outline"` and use it directly. Demonstrated by `/login` migration.
- All 7 verifications run clean: typecheck, lint, knip, registry:check, drift-check, unit tests, e2e tests.
- All progress.md rows marked DONE. PR merged. Group files deleted from repo.
