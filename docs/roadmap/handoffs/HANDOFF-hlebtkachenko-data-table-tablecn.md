---
branch: hlebtkachenko/data-table-tablecn
created: 2026-05-09T22:00:00Z
last_updated: 2026-05-09T22:02:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/data-table-tablecn

## Goal

Recreate sadmann7/tablecn UX in the showcase: composite data-table with search, chip filters, multi-sort popover, view options, CSV export, row selection, sticky bulk-action toolbar, column resize, and URL-state via nuqs.

## Current state

- New primitive src/components/data-table/data-table-multi-sort.tsx: Sort popover with reorderable rules. Each rule has column select, asc/desc select, delete button, and drag handle (dnd-kit vertical-axis sortable). Trigger shows count badge. Add sort, Reset sorting buttons.
- New showcase variant src/components/examples/data-table-tablecn-style.tsx: composite invoice ledger demonstrating every piece. URL state via nuqs persists q (search), p (page), sort and dir arrays. Wrapped in NuqsAdapter from nuqs/adapters/next/app.
- Registry: 576 items.
- Local gates green: typecheck, lint (0 errors).
- Visual verified: Sort opens popover with empty state, Add sort creates Number/Asc rule with delete + drag handle, sort count badge updates to 1, URL updates to ?sort=number&dir=asc, Number column header shows ascending chevron.

## Decisions made

- Multi-sort popover styled like sadmann7/tablecn screenshot: rule rows with column select + direction select + trash + drag handle, footer with Add sort + Reset sorting.
- nuqs URL state scoped to this example (NuqsAdapter wrapper) so other showcase variants do not get url-state side effects.
- Sticky bulk-action toolbar appears at bottom-center when row selection greater than zero, with Export selected, Delete selected, and Clear buttons.
- CSV export rolls its own line builder (no extra dep).

## Blockers

- None

## Next steps

- [ ] Wait CI green
- [ ] Merge PR
