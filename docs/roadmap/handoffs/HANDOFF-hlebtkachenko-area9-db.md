---
branch: hlebtkachenko/area9-db
created: 2026-05-04T09:50:00Z
last_updated: 2026-05-04T09:50:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area9-db

## Goal

Close Area 9 (database) audit gaps without introducing scaffold deps that aren't ready: fix dotenv path so `pnpm db:generate` actually sees `DATABASE_URL`, tag the remaining `<domain>` placeholder, drop a misleading lint-rule claim.

## Current state

- `db/drizzle.config.ts` now loads `.env.local` explicitly. Bare `dotenv/config` reads `.env`, which the repo doesn't ship; with the previous setup, `pnpm db:generate` would see an empty `DATABASE_URL` and fail with no obvious cause.
- `db/seed.ts` `<domain>` in the demo SMTP comment now carries the same `# DOMAIN slot` marker used in Area 8 (`infra/secrets.ts`, `infra/dns.ts`, `infra/storage.ts`, `infra/monitoring.ts`).
- `db/schema/index.ts` left untouched: the planned comment softening would have triggered the `schema-migrations` paired-files rule (any `db/schema/**` change requires a matching `db/migrations/**`). Deferred until the rule learns exclusion syntax for barrel/README/_TEMPLATE.

## Decisions made

- Did **not** fabricate `auth.ts`, `auth-policies.ts`, `orgs.ts`, `meta/`, or `0000_*.sql`: all are generator artifacts that depend on `better-auth` and `drizzle-kit` being installed. Scaffold-stub files would drift from real generator output and create false safety.
- Schema barrel "lint-rule" comment left as-is for this PR: editing it triggered `paired-files [schema-migrations]` (any `db/schema/**` requires matching `db/migrations/**`). The right fix is to add exclusion syntax to `.github/related-files.yml` + `check-paired-files.sh` so README/_TEMPLATE/index.ts don't trigger schema-migration pairing. Deferred to its own PR.
- Slot vocabulary kept identical to Area 8 (`# DOMAIN slot — ...`) so `grep -r "DOMAIN slot"` finds every occurrence.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] When `better-auth` lands: run `pnpm exec better-auth generate` to populate `db/schema/auth.ts` + `db/schema/orgs.ts`; add `auth-policies.ts` by hand.
- [ ] When `drizzle-kit` lands: run `pnpm db:generate` to seed `db/migrations/meta/` + first `0000_*.sql`.
- [ ] Add exclusion syntax to `.github/related-files.yml` (e.g., `when_changed_exclude: [db/schema/index.ts, db/schema/_TEMPLATE.ts, db/schema/README.md]`) + matching parser change in `check-paired-files.sh`. Then resume the index.ts comment softening.
- [ ] If barrel-completeness drift becomes a PR-review burden, codify as a knip rule.
- [ ] Continue Area 10 (app source) review next.

## Files touched

- `db/drizzle.config.ts`: explicit `.env.local` load.
- `db/seed.ts`: tagged `<domain>` slot comment.
- `db/schema/index.ts`: untouched; comment-softening deferred (paired-files rule scope blocks barrel-only edits).

## Verify

```bash
pnpm typecheck
pnpm lint
grep -rE "(PROJECT NAME|AWS REGION|DOMAIN|REPO|SMTP PROVIDER) slot" db/   # 1 hit
grep -n ".env.local" db/drizzle.config.ts                                  # 2 hits
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
