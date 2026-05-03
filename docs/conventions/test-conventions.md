# Test conventions

## Pyramid

| Layer | Where | Tool |
|---|---|---|
| Unit | Co-located `<source>.test.ts(x)` | Vitest |
| Integration | `src/features/<x>/**/*.test.ts` | Vitest + real Postgres via `withRollbackTx` |
| E2E (critical flows only) | `tests/e2e/*.spec.ts` | Playwright |

No `tests/integration/` folder — integration tests live with the feature they cover.

## Pattern

Arrange / Act / Assert — one logical assertion per test (multiple `expect`s for one assertion are fine).

## Naming

- Unit: `describe("<unit>")` → `it("<does something specific>")`.
- E2E: `test("<persona> can <outcome>", async ({ page }) => ...)`.

## Database

- **Never** mock the DB in integration. Use `tests/helpers/db.ts` `withRollbackTx`:

```ts
import { withRollbackTx } from "@/tests/helpers/db";

it("creates an org", async () => {
  await withRollbackTx(db, async (tx) => {
    const org = await createOrg(tx, { ... });
    expect(org.id).toBeDefined();
  });
});
```

- Wrapper opens a transaction, runs the test body, rolls back. No leaked rows.

## Coverage targets

| Path | Threshold |
|---|---|
| `src/lib/**`, `src/server/**` | 80% |
| `src/features/**/server/**` | 70% |
| `src/components/**` | 30% |
| Default | 50% |

Configured in [`vitest.config.ts`](../../vitest.config.ts).

## E2E scope

Critical flows only:

- Auth (signup → email verify via mailpit → login).
- Org (create → invite → member accept).
- Billing (plan select → Stripe checkout → webhook → entitlement applied).

Add an e2e only when the flow crosses ≥ 3 services or is revenue-critical.

## Accessibility scan

Each e2e spec runs `@axe-core/playwright` after the page settles. Failures block CI.

## Flakes

Fix at root cause. CI retry budget: 2 in CI / 0 locally. Persistent flakes get an issue + quarantine, not a higher retry count.

## Fixtures

`tests/fixtures/*.ts` — typed against `@/db` schema. Importable in Vitest + Playwright.
