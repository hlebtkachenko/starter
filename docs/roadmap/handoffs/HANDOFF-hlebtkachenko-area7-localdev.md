---
branch: hlebtkachenko/area7-localdev
created: 2026-05-04T09:10:00Z
last_updated: 2026-05-04T09:10:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/area7-localdev

## Goal

Close Area 7 (local dev) audit gaps: stop docker-compose + doctor from creating / probing a literal `<project-name>_dev` database, gate bootstrap's DB steps behind installed tools, sync SPEC-000 with the `safe-pull.sh` script that landed in Area 1.

## Current state

- `docker-compose.yml`: `<project-name>` placeholder replaced with `starter` in compose name, `POSTGRES_DB`, and the pg_isready healthcheck. Each replacement carries a `# PROJECT NAME slot — change when forking this template` comment so the slots stay discoverable.
- `scripts/doctor.sh`: pgmq check now psql-connects to `starter_dev` instead of the literal placeholder string. Same explanatory comment above the line.
- `scripts/bootstrap.sh`: DB migrate + seed steps now skip with a hint if `drizzle-kit` / `tsx` are not installed. Mirrors the vitest-gating pattern in `ci.yml`.
- SPEC-000 enumerates `scripts/safe-pull.sh` (added in PR #11, missing from spec).

## Decisions made

- Used `starter` as the concrete project name everywhere it was a placeholder, plus inline `# PROJECT NAME slot` comments. Future fork can grep for `PROJECT NAME slot` to find every spot to rename.
- Did not pin docker images to digests yet (`postgres:18-alpine@sha256:...`): pre-PMF reproducibility cost > benefit. Tag-only is fine until first paying customer.
- Gate uses `node_modules/.bin/<tool>` presence, not `command -v`, so the check tracks the actual project install state rather than a stray global.

## Blockers

- None.

## Next steps

- [x] Open PR.
- [ ] When `drizzle-kit` + `tsx` land: drop the bootstrap gates (steps become unconditional).
- [ ] When ready for prod-grade reproducibility: add `@sha256:...` digests to `docker-compose.yml`.
- [ ] Continue Area 8 (deploy / IaC + observability) review next.

## Files touched

- `docker-compose.yml`: 3 placeholder fixes + comments.
- `scripts/doctor.sh`: 1 placeholder fix + comment.
- `scripts/bootstrap.sh`: gated DB steps.
- `docs/specs/000-REPO-TEMPLATE.md`: enumerates `safe-pull.sh`.

## Verify

```bash
pnpm typecheck
pnpm lint
bash -n scripts/bootstrap.sh scripts/doctor.sh
docker compose config --quiet
grep -n "PROJECT NAME slot" docker-compose.yml scripts/doctor.sh   # 4 hits
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
