# tests/

> E2E (Playwright), shared fixtures, and helpers. Unit + integration tests live next to source under `src/`.

## Pyramid policy

| Layer | Where | Tool |
|---|---|---|
| Unit | `src/**/<source>.test.ts(x)` | Vitest |
| Integration | `src/features/**/*.test.ts` (real Postgres via `withRollbackTx`) | Vitest |
| E2E (critical flows) | `tests/e2e/*.spec.ts` | Playwright |

There is **no `tests/integration/`** directory: integration tests live with the feature they cover. This keeps "what to mock vs hit the DB" close to the code that decides.

## DB rule

Integration tests must hit the **real** Postgres (mocking the DB has bitten us before). Use `tests/helpers/db.ts` `withRollbackTx`:

```ts
await withRollbackTx(db, async (tx) => {
  // ...
});
```

The wrapper opens a transaction, runs the test body, rolls back. No leaked rows.

## Fixtures

`tests/fixtures/*.ts`: typed against `@/db/schema` so they never drift. Importable from Vitest **and** Playwright. Prefer TS over JSON for type safety.

## Helpers

| File | Purpose |
|---|---|
| [helpers/db.ts](helpers/db.ts) | `withRollbackTx` |
| [helpers/auth.ts](helpers/auth.ts) | API-driven session fixture; direct DB session insert escape hatch (test-only) |
| [helpers/mailpit.ts](helpers/mailpit.ts) | Query mailpit HTTP API for email assertions |
| [helpers/server.ts](helpers/server.ts) | Spawn an isolated test server on a separate port |

## A11y scan

Each e2e spec runs `@axe-core/playwright` after the page settles. Failures block CI.

## Coverage

Per-path thresholds in [`vitest.config.ts`](../vitest.config.ts). See [`docs/conventions/test-conventions.md`](../docs/conventions/test-conventions.md).
