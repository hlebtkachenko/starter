# db/

> Drizzle ORM schema, migrations, and seed. PostgreSQL 18 + pgmq.

## Layout

| Path | Purpose |
|---|---|
| `drizzle.config.ts` | drizzle-kit config (dialect, schema glob, migration dir, casing) |
| `init.sql` | Base PG setup (extensions). Mounted by docker-compose locally; run post-create on AWS RDS |
| `schema/` | Drizzle schema files, one per domain |
| `schema/index.ts` | Barrel re-export |
| `migrations/` | Auto-generated SQL migrations |
| `migrations/meta/` | drizzle-kit metadata (auto-managed; never hand-edit) |
| `seed.ts` | Idempotent local + CI seed |

## Migration flow

```bash
# 1. Edit schema (or run `pnpm exec better-auth generate`)
# 2. Generate SQL
pnpm db:generate

# 3. Review db/migrations/0NNN_*.sql + db/migrations/meta diff

# 4. Apply locally
pnpm db:migrate

# 5. Commit BOTH schema/ + migrations/ together (paired-files policy)
```

## Hand-edit exceptions

The generator covers ~95% of changes. Hand-edit migrations only for:

- RLS policy refinement (`CREATE POLICY ... USING ...`).
- Backfill data steps (`UPDATE ... SET ...`).
- `CREATE INDEX CONCURRENTLY` (drizzle-kit emits blocking by default).
- Documented one-time fixes (note in commit body).

Never hand-edit `migrations/meta/`.

## Zero-downtime policy

Today: maintenance window OK. Brief locks (sub-second) acceptable.

Switch to pgroll for online migrations when **either** is true:
- A migration in staging takes a measured lock > 5s (timed via `\timing` in `psql`).
- A paid customer SLA forbids planned downtime.

Until then, drizzle-kit's plain SQL is enough.

## Multi-tenancy via Better Auth org plugin

- Tenant key: `org_id` (= `organization.id`).
- RLS day 1 on every tenant table.
- See [`docs/conventions/db-conventions.md`](../docs/conventions/db-conventions.md) for naming + scope tiers.

## Connection pooling

RDS Proxy day 1 (configured in `infra/db.ts`). App connects through proxy endpoint, not the cluster directly.

## Extensions

`init.sql` is the **strict minimum**: `pgmq` + `citext`. New extensions land via numbered migrations:

```sql
-- 0NNN_enable_<extension>.sql
CREATE EXTENSION IF NOT EXISTS <name>;
```

Why a separate migration: extensions touch system catalog; reviewable diff.

## Seed scope

`seed.ts` runs locally + in CI. **Never** on staging/prod deploys. The deploy workflows do not invoke `pnpm db:seed`. Demo data identified by deterministic keys (slug, fixed UUID) so re-runs are upserts, not duplicates.

## Production migration execution

- Migration is a **separate CI job** that runs **before** `pnpm deploy:*`.
- Job uses a tighter IAM role (RDS-only, no app deploy).
- Failure aborts the deploy; rollback per [`docs/runbooks/deploy-rollback.md`](../docs/runbooks/deploy-rollback.md).
