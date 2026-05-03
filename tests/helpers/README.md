# helpers/

> Test utilities shared across Vitest + Playwright.

## Files

| File | Purpose |
|---|---|
| [db.ts](db.ts) | `withRollbackTx(db, async (tx) => {...})`: opens BEGIN, runs body, ROLLBACK |
| [auth.ts](auth.ts) | API-driven session fixture; direct DB session insert escape hatch (test-only) |
| [mailpit.ts](mailpit.ts) | Query mailpit HTTP API for email assertions in e2e |
| [server.ts](server.ts) | Spawn an isolated test server on a separate port |

## Setup files

- `setup-server.ts`: Vitest setup for Node project (loads env, primes db client).
- `setup-ui.ts`: Vitest setup for jsdom project (jest-dom, polyfills).

These are wired in [`vitest.config.ts`](../../vitest.config.ts).
