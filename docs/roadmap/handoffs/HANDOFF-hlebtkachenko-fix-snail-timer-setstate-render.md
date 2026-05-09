---
branch: hlebtkachenko/fix-snail-timer-setstate-render
created: 2026-05-10T00:51:00Z
last_updated: 2026-05-10T00:51:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/fix-snail-timer-setstate-render

## Goal

Fix React 19 warning: "Cannot update a component (`SnailTimerDefault`) while rendering a different component (`SnailTimer`)" caused by calling `onTimeout?.()` (parent setState) inside the `setSeconds` updater function.

## Current state

- `src/components/ui/snail-timer.tsx`: split the interval effect from the timeout-side-effect. Interval now only decrements seconds. A second effect watches `seconds === 0` and dispatches `setFinished` plus `onTimeout` via `setTimeout(0)` so the parent setState is not synchronous to the child render. `onTimeout` is held in a ref so the interval effect does not re-create on prop identity churn.
- Verified: countdown reaches 0, button returns to "Start Countdown" (parent `setRunning(false)` fires once), no setState-in-render warning in console.

## Decisions made

- Use `setTimeout(0)` rather than `queueMicrotask` to satisfy `react-hooks/set-state-in-effect` lint rule (microtask still counts as "synchronous" by the rule).
- Keep `finished` state. Could derive from `seconds === 0` but the explicit flag also pauses the CSS animation and prevents the interval from re-arming.

## Blockers

- None.

## Next steps

- [ ] Open PR, wait for CI, squash-merge.

## Files touched

- `src/components/ui/snail-timer.tsx`: split effects, add ref for onTimeout, defer parent setState via setTimeout(0).

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Lifecycle

- Overwrite-on-update each session.
- Deleted on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
