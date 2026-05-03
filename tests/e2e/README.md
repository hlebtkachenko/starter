# tests/e2e/

> Playwright specs. **Critical flows only.** Non-critical coverage goes into integration tests in `src/features/**`.

## Critical flows

| Spec | Flow |
|---|---|
| `auth.spec.ts` | signup → email verify (mailpit) → login |
| `orgs.spec.ts` | org create → invite → member accept |
| `billing.spec.ts` | plan select → Stripe checkout → webhook → entitlement applied |

Add a spec here only when the flow crosses ≥ 3 services or is revenue-critical.

## Pattern

- One spec file per flow.
- Page-object pattern for shared interactions.
- Tag tests for selective runs (`@smoke`, `@billing`).
- Always run an a11y scan after the page settles.

## Local

```bash
pnpm test:e2e                          # full matrix in CI; chromium-only locally
pnpm exec playwright test --ui         # interactive
pnpm exec playwright test -g "auth"    # filter
```
