---
branch: hlebtkachenko/cleanup-components-drift
created: 2026-05-10T12:30:00Z
last_updated: 2026-05-10T12:30:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/cleanup-components-drift

## Goal

Tidy stray top-level files inside `src/components/`. Originally 4 login form helpers and a hidden-input util sat at the components root, mixing primitives, helpers, and feature scaffolding. Move each to its proper layer.

## Current state

- New folder `src/components/login-cards/` holds the 3 login form components and `maintenance-acknowledge.tsx`. Pattern matches the existing `src/components/login-3/` (locale toggle, i18n, grid bg helpers for the same family).
- `visually-hidden-input.tsx` moved to `src/components/ui/` and gets a registry entry. It is a primitive consumed by `key-value.tsx` and `phone-input.tsx`, so `ui/` is the correct layer.
- Imports updated in: `blocks/login-card{,-2,-3}.tsx`, `ui/key-value.tsx`, `ui/phone-input.tsx`.
- Registry: 577 to 578 items (visually-hidden-input added). All gates green: typecheck, lint (0 errors), registry build, orphan check, registry export, full build.

## Decisions made

- Did not invent `src/features/auth/`. The login forms have no business logic, no Better Auth wiring, no server actions. Treating them as a "feature" would lie about their scope. They are showcase markup, so they live with the other showcase login helpers.
- Did not co-locate inside `src/components/blocks/`. Blocks/ is the registered-block surface (`login-card`, `signup-card`, etc.); the orphan checker enforces "every blocks/*.tsx must have a registry entry". Helpers belong outside that surface.

## Blockers

- None.

## Next steps

- [ ] Open PR; do not merge.

## Files touched

- `src/components/login-form*.tsx`, `maintenance-acknowledge.tsx` -> `src/components/login-cards/`
- `src/components/visually-hidden-input.tsx` -> `src/components/ui/`
- `src/components/ui/_registry.ts`: add visually-hidden-input entry
- `src/components/blocks/login-card{,-2,-3}.tsx`, `ui/key-value.tsx`, `ui/phone-input.tsx`: update import paths
- `src/components/__index__.tsx`, `docs/components-manifest.json`, `docs/showcase-export*`: regenerated

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm registry:build
pnpm registry:check-orphans
pnpm build
```

## Lifecycle

- Overwrite-on-update each session.
- Deleted on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
