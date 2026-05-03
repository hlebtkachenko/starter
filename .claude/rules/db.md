---
area: db
severity: block
---

# Database rules

## snake_case

PG 18 tables and columns use `snake_case`. Plural tables. See [db-conventions.md](../../docs/conventions/db-conventions.md).

## No raw SQL outside `db/` and `src/server/rls.ts`

- All queries through Drizzle in `src/features/*/server/` and `src/server/`.
- Raw SQL allowed in: `db/init.sql`, `db/migrations/*.sql`, `src/server/rls.ts` (`SET LOCAL app.org_id`).

**Why:** keeps migration tooling authoritative; centralizes SQL review.

## RLS on every tenant table

- Tenant table = has `org_id` column.
- `ENABLE ROW LEVEL SECURITY` + policy at table create.
- Policy reads `current_setting('app.org_id')`.

**Why:** RLS is the last line of defense if a query forgets `WHERE org_id = ?`.

## Never DROP without runbook

- `DROP TABLE`, `DROP COLUMN`, `DROP INDEX` require a referenced runbook explaining: why now, how rolled back, who notified.
- Add an entry to [`docs/runbooks/`](../../docs/runbooks/) before opening the PR.

## Migrations append-only

- `db/migrations/0NNN_*.sql` files: never edit a merged migration.
- Mistakes fixed by **next** migration.
- Hand-edits allowed for: RLS policy refinement, backfill data, `CREATE INDEX CONCURRENTLY`.
- `meta/` is auto-generated; never hand-edit.

## FK pattern

`<referenced_singular>_id` (`org_id`, `user_id`). Index every FK.

## Index naming

`idx_<table>_<col(s)>` for non-unique. `uq_<table>_<col(s)>` for unique constraints.
