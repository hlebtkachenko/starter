# fixtures/

> Shared deterministic test data. **TypeScript, not JSON** — types track schema changes.

## Why TS

JSON drifts silently when the DB schema changes. TS fixtures import types from `@/db/schema` and break the build the moment a column rename or type change happens.

## Conventions

- One file per domain (`orgs.ts`, `users.ts`, `subscriptions.ts`).
- Export `const` records typed against the schema row type.
- Deterministic IDs (fixed UUIDs) so cross-test references stay stable.
- Keep small — fixtures are seeds, not a corpus.

## Importable from

- Vitest unit + integration tests.
- Playwright e2e specs (via `await import` if needed).
- `db/seed.ts` (local + CI).

## Index

| Fixture | Domain |
|---|---|
| `_TEMPLATE.ts` | Scaffold |
| `orgs.ts` | Organization fixtures |
| `users.ts` | User fixtures |
