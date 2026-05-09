---
branch: hlebtkachenko/filter-bar-or-quick
created: 2026-05-09T21:15:00Z
last_updated: 2026-05-09T21:15:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/filter-bar-or-quick

## Goal

Add OR-groups and saved-quick-filters patterns on top of bazza/ui data-table-filter without forking the upstream library.

## Current state

- New showcase variant data-table-filter-quick-filters.tsx: preset bar above the chip filter, save current state under a name, persist via localStorage, click chip to re-apply, x to delete.
- New showcase variant data-table-filter-or-groups.tsx: multiple bazza filter rows joined by OR. Each row is AND internally; predicate is rows.some(group => group.matches). Add/remove rows with project Button.
- Registry: 575 items.
- Local gates green: typecheck, lint (0 errors), build clean.
- Visual verified: quick-filters bar shows two starter presets (Overdue & large, Paid CZ), save button disables when no filter; OR groups shows 2 rows with OR badge between them, table shows union (Globex+Soylent SK+Tyrell).

## Decisions made

- Wrap, do not fork. Quick filters drives bazza's controlled state (filters + onFiltersChange). OR groups composes multiple useDataTableFilters instances.
- localStorage key: showcase.dtf.quick-filters. Two starter presets seed when storage empty.
- Hydration via useEffect with eslint-disable on the setState (documented external-store pattern; useState lazy init would risk SSR/client mismatch).

## Blockers

- None

## Next steps

- [ ] Wait CI green
- [ ] Merge PR
