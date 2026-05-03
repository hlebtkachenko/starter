# State

**Last updated:** 2026-05-03
**Branch:** master (between PRs)
**Last shipped:** PR #1 scaffold + PR #6 scaffold polish

## Current milestone

[`MILESTONE-001-scaffold`](docs/roadmap/milestones/MILESTONE-001-scaffold.md): scaffold landed, now polished. Closes when ADR-001 (license), ADR-002 (Drizzle), and Better Auth bootstrap PRs ship.

## Top priorities

1. ADR-001: lock license decision.
2. ADR-002: record Drizzle vs Prisma choice (Drizzle).
3. Install dependency batch (Sentry, Drizzle, Better Auth, vitest, sst, lefthook, biome) and remove stubs in `src/lib/*`.
4. Replace template placeholders (`<git-user>`, `<domain>`, `<aws-region>`, `<smtp-provider>`, `<project-name>`, `<legal-entity>`).
5. Implement Better Auth + organization plugin (first real feature).

## In flight

- (idle between sessions)

## KPIs snapshot

| Metric | Target | Now |
|---|---|---|
| Active orgs | 1 (demo) | 0 |
| MRR | (post-pricing) | – |
| Uptime | 99.9% | (pre-deploy) |
| p99 latency | <500ms | (pre-deploy) |

## Top blockers

- None. Pre-PMF; block list activates after first deploy.

## Active handoffs

| Branch | Owner | Status |
|---|---|---|
| (none) | – | – |

## Last 5 ADRs

See [`docs/adr/README.md`](docs/adr/README.md). None accepted yet.

## Next concrete step

Open ADR-001 (license).
