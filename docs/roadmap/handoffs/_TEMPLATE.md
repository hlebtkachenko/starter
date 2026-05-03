---
branch: <git-user>/<short>
created: YYYY-MM-DDTHH:MM:SSZ
last_updated: YYYY-MM-DDTHH:MM:SSZ
author: <git-user>
status: in-flight  # in-flight | blocked | review | merged
---

# HANDOFF: <branch>

## Goal

<one sentence: what this branch ships>

## Current state

- <where we are right now, in 1-3 bullets>

## Decisions made

- <decision> · rationale · ADR ref if any

## Blockers

- <blocker> · who/what unblocks

## Next steps

- [ ] <atomic action>
- [ ] <atomic action>

## Files touched

- `path/to/file`: <one-line why>

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Lifecycle

- Overwrite-on-update each session.
- **Deleted** on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml) (or manually if workflow LATER).
