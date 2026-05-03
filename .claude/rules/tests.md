---
area: tests
severity: block
---

# Test rules

## Never mock the database in integration tests

- Integration tests run against real Postgres via `tests/helpers/db.ts` `withRollbackTx`.
- Wrapper opens a transaction, runs the test, rolls back. No leaked rows.

**Why:** mocked-DB tests have passed while migrations broke production. Mocks lie; the real DB doesn't.

## Co-located unit tests

- Unit tests live next to source: `<source>.test.ts(x)`.
- Vitest discovers via project config.

## E2E in `tests/e2e/`

- Critical flows only: auth, orgs, billing, webhooks.
- Tag specs with category for selective runs.

## AAA pattern

Arrange → Act → Assert. One logical assertion per test.

## No flaky retries

- CI retry budget: 2 in CI / 0 locally.
- Persistent flakes get an issue + quarantine, not higher retry counts.
- Fix at root cause: deterministic data, awaitable signals, no `setTimeout` polling.

## Reset DB between e2e specs

- Playwright `globalSetup` runs migrations + seed once per CI run.
- Specs use `withRollbackTx` for DB writes where possible.
- Specs that must commit (e.g., webhook flow) clean up explicitly in `afterEach`.

## A11y scan in e2e

Each e2e spec runs `@axe-core/playwright` after the page settles. Failures block CI.
