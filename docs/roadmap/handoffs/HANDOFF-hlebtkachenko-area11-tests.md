---
branch: hlebtkachenko/area11-tests
created: 2026-05-04T11:00:00Z
last_updated: 2026-05-04T11:00:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area11-tests

## Goal

Close Area 11 (tests) audit gaps. Independent advisor (Opus 4.7 1M) verified the original audit and surfaced 5 additional findings worth fixing now; folded into one PR.

## Current state

**Original fixes:**
- `tests/helpers/setup-server.ts`: explicit `loadEnv({ path: ".env.local" })` (was bare `dotenv/config` reading non-existent `.env`). Mirrors the Area 9 drizzle.config fix.
- SPEC-000 `tests/helpers/` tree now enumerates `setup-server.ts` + `setup-ui.ts`.

**Advisor follow-ups:**
- `vitest.config.ts`: migrated `test.workspace` → top-level `projects`. The deprecated key was removed in vitest 4; the install would break on day 1. Kept `test.coverage` separately.
- `vitest.config.ts`: coverage default-tier glob `"**"` → `"**/*"` so the per-path threshold actually applies (the bare `**` glob matches nothing in vitest's threshold matcher).
- `tests/helpers/mailpit.ts`: every `fetch` now carries `AbortSignal.timeout(5_000)`. If mailpit is down, e2e fails fast instead of stalling Playwright's global timeout.
- `tests/helpers/setup-ui.ts`: polyfills expanded from `ResizeObserver` only to `ResizeObserver` + `IntersectionObserver` + `matchMedia` + `HTMLElement.{has,set,release}PointerCapture` + `scrollIntoView`. Radix Select/Popover/Toast all need these once shadcn lands.
- `tests/e2e/_TEMPLATE.spec.ts`: dropped decorative `@smoke` tag from the example test name; replaced with a comment explaining tags should land only when a corresponding `--grep` filter exists.

## Decisions made

- Did not fix `tests/helpers/server.ts` process-cleanup (advisor flagged): the helper is marked "rarely needed" in its docstring and stays scaffold-stage. Revisit if a real test imports it.
- Did not change `playwright.config.ts:19` `storageState: process.env.PLAYWRIGHT_STORAGE_STATE` typing: Playwright accepts `undefined` at runtime; the type concern only materialises once `@playwright/test` is installed and the typecheck reach widens.
- Did not pre-create `tests/e2e/{auth,orgs,billing}.spec.ts` or `tests/fixtures/{orgs,users}.ts`: gated on schema + better-auth + stripe. Same pattern as Areas 5/7/9/10.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] When `vitest` lands: `pnpm install` will validate the `projects` migration and the `**/*` coverage glob.
- [ ] When `@playwright/test` lands: include `playwright.config.ts` + `tests/e2e/**/*.spec.ts` in `tsconfig.check.json`.
- [ ] When tests start importing `tests/helpers/server.ts`: harden process cleanup (await exit + SIGKILL fallback + `process.on("exit")` guard).

## Files touched

- `vitest.config.ts`: workspace → projects + `"**"` → `"**/*"` glob fix.
- `tests/helpers/setup-server.ts`: dotenv path.
- `tests/helpers/setup-ui.ts`: expanded polyfills.
- `tests/helpers/mailpit.ts`: `AbortSignal.timeout` on every fetch.
- `tests/e2e/_TEMPLATE.spec.ts`: dropped `@smoke` tag, added comment.
- `docs/specs/000-REPO-TEMPLATE.md`: enumerates `setup-server.ts` + `setup-ui.ts` in helpers tree.

## Verify

```bash
pnpm typecheck
pnpm lint
grep -n "projects:" vitest.config.ts                            # 1 hit at top-level
grep -n ".env.local" tests/helpers/setup-server.ts              # 2 hits
grep -n "AbortSignal.timeout" tests/helpers/mailpit.ts          # 1 hit (helper) + uses
grep -n "IntersectionObserver\|matchMedia" tests/helpers/setup-ui.ts   # both present
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
