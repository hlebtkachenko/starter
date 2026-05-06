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

Auto-generated from `src/components/examples/_registry.ts`. Phase 3a populates this section with one row per example file. Each row tracks `template applied`, `description audited`, `dependencies validated`.

```bash
# Regenerate this section after Phase 3a:
pnpm tsx scripts/generate-progress-rows.ts >> docs/plans/component-registry-progress.md
```

(Generator script written in Phase 3a alongside templates.)

## Phase 3c — Showcase rewrite + group-file deletion

| File | Status |
|---|---|
| `src/app/showcase/page.tsx` rewrite | PENDING |
| `src/app/showcase/_components/component-preview.tsx` | PENDING |
| `src/components/showcase/section.tsx` updated wrapper | PENDING |
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
| `no-input-otp-default-value` | PENDING |
| `no-inline-hex` | PENDING |
| `no-arbitrary-radius` | PENDING |
| `no-oklch` | PENDING |

## Phase 3e — Generated artifacts

| File / script | Status |
|---|---|
| `scripts/generate-showcase-export.ts` | PENDING |
| `scripts/generate-manifest.ts` | PENDING |
| `scripts/check-content-drift.ts` (productize from runbook) | PENDING |
| `docs/showcase-export.md` (generated) | PENDING |
| `docs/components-manifest.json` (generated) | PENDING |
| `package.json` registry:export, registry:drift-check | PENDING |
| `lefthook.yml` pre-commit drift hook | PENDING |

## Phase 3f — Blocks

| Block | Status |
|---|---|
| `login-card` | PENDING |
| `login-card-3` | PENDING |
| `signup-card` | PENDING |
| `forgot-password-card` | PENDING |
| `_registry-blocks.ts` populated | PENDING |
| `src/app/showcase/blocks/page.tsx` | PENDING |

## Phase 3g — CI

| Step | Status |
|---|---|
| Self-hosted runner registered for repo | PENDING |
| `.github/workflows/showcase-audit.yml` | PENDING |
| Workflow green on first PR push | PENDING |

## Phase 3h — Verify + ship

| Step | Status |
|---|---|
| `pnpm typecheck` clean | PENDING |
| `pnpm lint` clean (baseline only) | PENDING |
| `pnpm registry:check` clean | PENDING |
| `pnpm registry:export` no diff | PENDING |
| `pnpm registry:drift-check` clean | PENDING |
| `pnpm test` clean | PENDING |
| Visual sign-off `/showcase` | PENDING |
| Visual sign-off `/showcase/blocks` | PENDING |
| Branch created | PENDING |
| Commits authored per phase | PENDING |
| PR opened | PENDING |
| CI green | PENDING |
| Merged | PENDING |
