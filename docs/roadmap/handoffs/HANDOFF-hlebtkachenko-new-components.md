---
branch: hlebtkachenko/new-components
created: 2026-05-09T01:00:00Z
last_updated: 2026-05-09T23:20:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/new-components

## Goal

Add external registry components to the showcase from 11+ registries with full design token compliance.

## Current state

- 559 registry items (106 UI, 448 examples, 5 blocks) from 11 registries
- All 6 ESLint gates pass, build clean
- PR #28 open for merge to master

## Decisions made

- Raw HTML replaced with shadcn primitives across all external components
- 6 ESLint rules at error severity block future design system bypass
- ReUI badge kept as separate primitive (reui-badge.tsx) to avoid conflict with shadcn badge
- ReUI compositions registered under existing slugs (calendar, card, etc.) not separate sections

## Blockers

- None

## Next steps

- [x] Push to remote
- [x] Create PR
- [ ] CI green
- [ ] Merge to master

## Files touched

- `src/components/ui/reui-badge.tsx`: ReUI enhanced badge primitive
- `src/components/examples/c-*.tsx`: 18 ReUI example compositions
- `src/components/ui/_registry.ts`: Added reui-badge entry
- `src/components/examples/_registry-effects.ts`: Added 18 example entries
- `eslint.config.mjs`: Added .context/ to ignores
- `src/app/globals.css`: Semantic color tokens (success, warning, info, invert)
- `components.json`: Added @reui registry

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm registry:check-orphans
pnpm registry:export
pnpm build
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml) (or manually if workflow LATER).
