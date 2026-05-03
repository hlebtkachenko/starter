# db/migrations/

> Drizzle-kit auto-generated SQL migrations. Append-only.

## Generation

```bash
pnpm db:generate            # writes 0NNN_<auto-name>.sql + meta/ snapshot
pnpm db:migrate             # applies pending migrations
```

## Naming

`0NNN_<auto-or-renamed>.sql`. drizzle-kit picks an auto-name; renaming the file is fine before merge.

## Append-only rule

Once a migration is **on `master`**, never edit it. Mistakes get a new migration.

Pre-merge edits are fine: drop the file and re-generate, or hand-tweak the SQL.

## Hand-edit exceptions

Allowed when the generator can't express the intent:

| Case | Why |
|---|---|
| `CREATE POLICY` / `ALTER POLICY` (RLS) | Drizzle policy DSL covers basics; refinements need raw SQL |
| Data backfill (`UPDATE ... SET ...`) | Generator only handles structure |
| `CREATE INDEX CONCURRENTLY` | Generator emits blocking; concurrent needed for production |
| Manual one-time fixes | Document in commit body |

Order of operations for non-trivial column changes (avoid table locks):

```
ALTER TABLE ... ADD COLUMN ... NULL;
UPDATE ... SET ... WHERE ...;          -- backfill
ALTER TABLE ... ALTER COLUMN ... SET NOT NULL;
ALTER TABLE ... ENABLE ROW LEVEL SECURITY;
CREATE POLICY ... ON ...;
```

## Conflict resolution

Two branches generate migrations with overlapping snapshots → second branch resets:

```bash
git checkout master -- db/migrations/meta
pnpm db:generate           # regenerate against current snapshot
```

## meta/: auto-managed

`meta/` holds drizzle-kit's snapshot + journal. **Never hand-edit.** Always commit alongside the SQL change.

## Production execution

Separate CI job runs migrations against the prod DB **before** the app deploys. See [`deploy-production.yml`](../../.github/workflows/deploy-production.yml).

## Rollback

Schema rollback is hard. Prefer:

1. Roll forward with a corrective migration.
2. If data damaged, point-in-time restore per [`db-restore.md`](../../docs/runbooks/db-restore.md).
