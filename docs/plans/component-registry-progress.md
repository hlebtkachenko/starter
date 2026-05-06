# Component registry progress

> Single source of truth for "what's done / what's left" across Phase 3.
> Auto-generated rows (one per registry item) plus phase columns.
> Each agent updates rows as it works. Wave-4 ship audit blocks merge if anything is PENDING.

## Legend

- `–` not applicable to this row
- `PENDING` not started
- `IN_PROGRESS` agent owns this row
- `✓` done

## Phase 3a — Templates

| Artifact | Status | Owner |
|---|---|---|
| `src/components/ui/_TEMPLATE.tsx` (refined) | PENDING | Opus |
| `src/components/examples/_TEMPLATE.tsx` | PENDING | Opus |
| `src/components/blocks/_TEMPLATE.tsx` | PENDING | Opus |
| `docs/conventions/component-templates.md` | PENDING | Opus |
| `_registry-template.ts` recipes | PENDING | Opus |

## Phase 3b — Apply template to examples (363 files)

One row per agent (slug-prefix scope). Each agent toggles its own row.
Wave-4 ship audit fails if any row is not DONE.

| Agent | Slug scope | Files | Fragment | Status |
|---|---|---|---|---|
| A | button*, toggle* | 36 | `_registry-buttons.ts` | DONE |
| B | avatar, badge, calendar, chart, data-table, skeleton, table, typography | 69 | `_registry-display.ts` | DONE |
| C | alert, progress, sonner, spinner | 18 | `_registry-feedback.ts` | DONE |
| D | checkbox, combobox, date-picker, field, input*, label, native-select, radio-group, select, slider, switch, textarea | 105 | `_registry-forms.ts` | DONE |
| E | aspect-ratio, card, collapsible, resizable, scroll-area, separator, sidebar | 26 | `_registry-layout.ts` | DONE |
| F | command, context-menu, dropdown-menu | 26 | `_registry-menus.ts` | DONE |
| G | breadcrumb, menubar, navigation-menu, pagination, tabs | 21 | `_registry-navigation.ts` | DONE |
| H | alert-dialog, dialog, drawer, hover-card, popover, sheet, tooltip | 29 | `_registry-overlays.ts` | DONE |
| I | accordion, carousel, empty, item, kbd | 33 | `_registry-utility.ts` | DONE |

```bash
# Optional per-file rows (autogen):
pnpm tsx scripts/generate-progress-rows.ts >> docs/plans/component-registry-progress.md
```

## Phase 3c — Showcase rewrite + group-file deletion

| File | Status |
|---|---|
| `src/app/showcase/page.tsx` rewrite | DONE |
| `src/app/showcase/_components/component-preview.tsx` | DONE |
| `src/components/showcase/section.tsx` updated wrapper | DONE |
| Delete `buttons-group.tsx` | PENDING |
| Delete `display-group.tsx` | PENDING |
| Delete `feedback-group.tsx` | PENDING |
| Delete `forms-group.tsx` | PENDING |
| Delete `layout-group.tsx` | PENDING |
| Delete `menus-group.tsx` | PENDING |
| Delete `navigation-group.tsx` | PENDING |
| Delete `overlays-group.tsx` | PENDING |
| Delete `utility-group.tsx` | PENDING |

## Phase 3d — ESLint guards

| Rule | Status |
|---|---|
| `no-input-otp-default-value` | DONE |
| `no-inline-hex` | DONE |
| `no-arbitrary-radius` | IN_PROGRESS |
| `no-oklch` | DONE |

## Phase 3e — Generated artifacts

| File / script | Status |
|---|---|
| `scripts/generate-showcase-export.ts` | ✓ |
| `scripts/generate-manifest.ts` | ✓ |
| `scripts/check-orphans.ts` | ✓ |
| `scripts/check-content-drift.ts` (productize from runbook) | ✓ |
| `src/lib/registry.test.ts` (Vitest unit tests) | ✓ |
| `docs/showcase-export.md` (generated index) | ✓ |
| `docs/showcase-export/{ui,examples-*,blocks}.md` (generated) | ✓ |
| `docs/components-manifest.json` (generated) | ✓ |
| `package.json` registry:export, registry:check-orphans, registry:drift-check | ✓ |
| `lefthook.yml` pre-commit drift hook | ✓ |

## Phase 3f — Blocks

| Block | Status |
|---|---|
| `login-card` | ✓ |
| `login-card-2` | ✓ |
| `login-card-3` | ✓ |
| `signup-card` | ✓ |
| `forgot-password-card` | ✓ |
| `_registry-blocks.ts` populated | ✓ |
| `src/app/showcase/blocks/page.tsx` | ✓ |
| `/login` page migrated (≤20 LoC) | ✓ |
| `/login-2` page migrated (≤20 LoC) | ✓ |
| `/login-3` page migrated (≤20 LoC) | ✓ |

## Phase 3g — CI

| Step | Status |
|---|---|
| Self-hosted runner registered for repo | DONE |
| `.github/workflows/showcase-audit.yml` | DONE |
| Workflow green on first PR push | PENDING |

## Phase 3h — Verify + ship

| Step | Status |
|---|---|
| `pnpm typecheck` clean | PENDING |
| `pnpm lint` clean (baseline only) | PENDING |
| `pnpm registry:check` clean | PENDING |
| `pnpm registry:export` no diff | PENDING |
| `pnpm registry:drift-check` clean | DONE |
| `pnpm test` clean | PENDING |
| Visual sign-off `/showcase` | PENDING |
| Visual sign-off `/showcase/blocks` | PENDING |
| Branch created | PENDING |
| Commits authored per phase | PENDING |
| PR opened | PENDING |
| CI green | PENDING |
| Merged | PENDING |
