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
- `db/schema/index.ts` no longer claims a non-existent "lint rule"; it now says "convention (not lint-enforced)" and notes that a knip/eslint rule is the future fix.

## Decisions made

- Did **not** fabricate `auth.ts`, `auth-policies.ts`, `orgs.ts`, `meta/`, or `0000_*.sql`: all are generator artifacts that depend on `better-auth` and `drizzle-kit` being installed. Scaffold-stub files would drift from real generator output and create false safety.
- Lint-rule comment softened rather than promoted to an actual rule: knip already ignores `db/`, and adding a custom eslint rule for "barrel completeness" is heavier than the current value justifies. Reviewer enforces during PR review until pain demands automation.
- Slot vocabulary kept identical to Area 8 (`# DOMAIN slot — ...`) so `grep -r "DOMAIN slot"` finds every occurrence.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] When `better-auth` lands: run `pnpm exec better-auth generate` to populate `db/schema/auth.ts` + `db/schema/orgs.ts`; add `auth-policies.ts` by hand.
- [ ] When `drizzle-kit` lands: run `pnpm db:generate` to seed `db/migrations/meta/` + first `0000_*.sql`.
- [ ] If barrel-completeness drift becomes a PR-review burden, codify as a knip rule; until then, comment is honest.
- [ ] Continue Area 10 (app source) review next.

## Files touched

- `db/drizzle.config.ts`: explicit `.env.local` load.
- `db/seed.ts`: tagged `<domain>` slot comment.
- `db/schema/index.ts`: softened lint-rule claim.

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
