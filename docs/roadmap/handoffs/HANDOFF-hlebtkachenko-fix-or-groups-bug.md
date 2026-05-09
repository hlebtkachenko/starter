---
branch: hlebtkachenko/fix-or-groups-bug
created: 2026-05-09T21:25:00Z
last_updated: 2026-05-09T21:27:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/fix-or-groups-bug

## Goal

Fix runtime crash in OR-groups variant when editing a chip value: filters.every is not a function.

## Current state

- Root cause: FilterGroupRow's onChange was typed as (next: FiltersState) => void. Bazza calls onFiltersChange with a setState updater function, not a value. The function got stored as g.filters; matchInvoice then tried filters.every and crashed.
- Fix: change FilterGroupRow.onChange to React.Dispatch<React.SetStateAction<FiltersState>>, and updateGroup to resolve the updater against the previous group filters with an Array.isArray guard before storing.
- Local gates green: typecheck, lint (0 errors).
- Visual verified: chip edit (toggle Sent into existing Overdue chip) updates to "2 status" pill, table shows 4-row union, no crash.

## Decisions made

- Match React.Dispatch<SetStateAction<...>> exactly to mirror useState contract. Bazza expects the same shape since it calls setFilters as if it were a useState setter.
- Defensive Array.isArray fallback inside updateGroup. Should never trigger now, but cheap insurance against any future updater returning undefined.

## Blockers

- None

## Next steps

- [ ] Wait CI green
- [ ] Merge PR
