---
branch: hlebtkachenko/fix-commit-graph-hydration
created: 2026-05-10T01:30:00Z
last_updated: 2026-05-10T01:30:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/fix-commit-graph-hydration

## Goal

Fix React hydration mismatch in commit-graph: SSR rendered "2h ago" while client rendered "1h ago" because `formatDate` calls `new Date()` at every render.

## Current state

- `src/components/ui/commit-graph.tsx`: introduced a `RelativeTime` component that renders a stable absolute date (ISO YYYY-MM-DD) on SSR + first client paint, then swaps to the relative label inside `useEffect`. Refreshes every 60s. Wrapped span carries `suppressHydrationWarning` to silence sub-second drift between SSR and the first commit.
- Replaced the single `formatDate(row.commit.date)` call site in the row list with `<RelativeTime date={row.commit.date} className="..."/>`.
- Verified: `/showcase#commit-graph` no longer logs a hydration mismatch in the console.

## Decisions made

- Render absolute date on SSR rather than blanking out, so the cell does not pop on hydration. After mount, the relative form takes over.
- 60s refresh interval is shared per row; cheap.

## Blockers

- None.

## Next steps

- [ ] Open PR; do NOT merge per user instruction.

## Files touched

- `src/components/ui/commit-graph.tsx`: added `RelativeTime`, replaced inline `formatDate` call.

## Verify

```bash
pnpm typecheck
pnpm lint
```

## Lifecycle

- Overwrite-on-update each session.
- Deleted on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
