---
branch: hlebtkachenko/filter-bar-improvements
created: 2026-05-09T20:55:00Z
last_updated: 2026-05-09T20:58:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/filter-bar-improvements

## Goal

Surface all five bazza/ui filter column types in the showcase example and fix the value-edit popover positioning bug.

## Current state

- Removed orphan PopoverAnchor in src/components/data-table-filter/components/filter-value.tsx that anchored the value-edit popover to (0,0). Now PopoverTrigger is the default anchor and popups render directly below the chip.
- Replaced employee example with finance/accounting invoice ledger covering all five column types in one screen: text (vendor), multiOption (status with includes/excludes), date (issued on, calendar picker), number (amount), option (tax jurisdiction with is any of/is none of).
- Local gates green: typecheck, lint (0 errors), build clean.
- Visual verified: Filter button shows all five types with correct icons; status filter chip renders Status / includes / Draft and edit popover opens directly under the chip; live filter on Status=Draft reduces table to 1 row.

## Decisions made

- Edit the vendored library file (filter-value.tsx) rather than wrap in a project component: the bug is a one-line removal that benefits every consumer; @ts-nocheck header preserved.
- Keep the example client-side only: showcase scope; server strategy needs a backend wired up.

## Blockers

- None

## Next steps

- [ ] Wait CI green
- [ ] Merge PR
