---
branch: hlebtkachenko/area5-build
created: 2026-05-04T08:30:00Z
last_updated: 2026-05-04T08:30:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area5-build

## Goal

Close Area 5 (build tooling) audit gap: `pnpm typecheck` was silently skipping every TS file outside `src/`. Wire a typecheck-only config so root config files are validated today, and leave a documented expansion path for `infra/`, `db/`, `tests/` once their deps land.

## Current state

- `tsconfig.check.json` added: extends `tsconfig.json`, broader `include`. Used by `pnpm typecheck`.
- `package.json` `typecheck` script now points at the check config: `tsc --noEmit -p tsconfig.check.json`.
- `@types/node` bumped from `^20` to `^24` to match `engines.node ">=24"`.
- `pnpm-lock.yaml` updated by `pnpm install`.
- SPEC-000 lists `tsconfig.check.json` and clarifies that `tsconfig.json` is the narrow Next-build view.

## Decisions made

- **Did not** include `infra/`, `db/`, `tests/`, `sst.config.ts`, `vitest.config.ts`, `playwright.config.ts` in the check config today. Their deps (`sst`, `drizzle-kit`, `drizzle-orm`, `vitest`, `@playwright/test`) are not in `devDependencies` yet; including them would surface `Cannot find module` errors that block every commit.
- **Did** include `commitlint.config.ts` and `knip.config.ts`: their type deps (`@commitlint/types`, `knip`) are already installed.
- Kept `tsconfig.json` narrow so Next's IDE + build paths stay clean; the broader scope is opt-in via `-p tsconfig.check.json`.

## Blockers

- None today. Documented expansion path lives inside `tsconfig.check.json` as a comment.

## Next steps

- [x] Open PR.
- [ ] When `vitest` lands: add `vitest.config.ts` + `tests/**/*.ts(x)` to `tsconfig.check.json` `include`.
- [ ] When `sst` lands: add `sst.config.ts` + `infra/**/*.ts`.
- [ ] When `drizzle-orm`/`drizzle-kit` land: add `db/**/*.ts`.
- [ ] When `@playwright/test` lands: add `playwright.config.ts` + `tests/e2e/**/*.spec.ts`.
- [ ] Continue Area 6 (quality gates) review next.

## Files touched

- `tsconfig.check.json`: new typecheck-only config.
- `package.json`: `typecheck` script + `@types/node` bump.
- `pnpm-lock.yaml`: refreshed by `pnpm install`.
- `docs/specs/000-REPO-TEMPLATE.md`: enumerates `tsconfig.check.json`, clarifies `tsconfig.json` scope.

## Verify

```bash
pnpm typecheck
pnpm lint
node_modules/.bin/tsc --noEmit -p tsconfig.check.json   # explicit, what CI will run
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
