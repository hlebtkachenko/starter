---
branch: hlebtkachenko/repo-restructure
created: 2026-05-03T00:00:00Z
last_updated: 2026-05-03T00:00:00Z
author: hlebtkachenko
status: review
---

# HANDOFF — hlebtkachenko/repo-restructure

## Goal

Restructure the repo to match `repo-template.md` across all 11 areas; lay the groundwork for SaaS features (Better Auth, Drizzle, SST, Stripe) without committing to packages that aren't installed yet.

## Current state

- All 11 areas built; `pnpm build` + `pnpm lint` green.
- `zod` installed (foundational for env, action, schema).
- Sentry, Drizzle, Better Auth, vitest, sst, lefthook, etc. ship as commented stubs awaiting their respective installs.
- `middleware.ts` migrated to `proxy.ts` per Next 16 deprecation notice.
- `repo-template.md` copied to repo root for traceability.

## Decisions made

- Advisor verdict (F1–F30) applied per `MIGRATION.md` table.
- Branch name pattern locked: `<git-user>/<short>` ≤ 30 chars (placeholder docs use `<git-user>`).
- Lefthook commands invoke binaries directly (F12 reject) — documented in `lefthook.yml`.
- Sensitive deploy bits use placeholders: `<domain>`, `<aws-region>`, `<smtp-provider>`, `<sentry-org>`, etc.

## Blockers

None. Build is green; ready for review.

## Next steps

- [ ] Install dependency batch (Sentry, Drizzle, Better Auth, vitest, sst, lefthook, biome, gitleaks).
- [ ] Replace placeholders with real values per `MIGRATION.md` "Outstanding".
- [ ] Generate Better Auth schema → `db/schema/auth.ts`, `db/schema/orgs.ts`.
- [ ] Bootstrap AWS account per `docs/runbooks/aws-bootstrap.md`.
- [ ] Apply branch protection: `gh ruleset import .github/rulesets/main.json`.

## Files touched

~169 new files across 11 areas + tsconfig/eslint/.gitignore/AGENTS.md updates. See `MIGRATION.md` "Coverage by area" table.

## Verify

```bash
pnpm install
pnpm build
pnpm lint
```

All three return success.
