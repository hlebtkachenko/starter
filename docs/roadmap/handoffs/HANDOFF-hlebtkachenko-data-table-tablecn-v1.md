---
branch: hlebtkachenko/data-table-tablecn-v1
created: 2026-05-10T00:30:00Z
last_updated: 2026-05-10T00:30:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/data-table-tablecn-v1

## Goal

Add a second filter design under the data-table slug (tablecn-style popover chips, alongside the existing bazza chip filters) and replace the inline sticky bulk-action toolbar in the existing tablecn-style variant with the project's ActionBar primitive.

## Current state

- New `tablecn-filters` variant rendered: per-column popover chips (`[icon] Title [Value badge]`) for text, multiSelect, select, dateRange, range. Reset, multi-sort, view options, ActionBar bulk actions.
- Existing `tablecn-style` variant updated to use ActionBar instead of inline sticky toolbar.
- Registry: 573 to 577 items. All gates pass (typecheck, lint 0 errors, registry build, build).

## Decisions made

- Built on local `DataTableToolbar` + `DataTableFacetedFilter` already in `src/components/data-table/` rather than re-vendoring upstream filter list/menu components. Pattern matches the screenshot 1:1.
- Both variants share invoice dataset for direct visual comparison of the two filter designs.

## Blockers

- None.

## Next steps

- [x] Open PR #39
- [ ] Wait for CI green and merge with squash

## Files touched

- `src/components/examples/data-table-tablecn-filters.tsx`: new tablecn-filters variant
- `src/components/examples/data-table-tablecn-style.tsx`: ActionBar wired in place of sticky toolbar
- `src/components/examples/_registry-display.ts`: register tablecn-filters, update tablecn-style description and deps
- `src/components/__index__.tsx`: regenerated
- `docs/components-manifest.json`, `docs/showcase-export*`: regenerated

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm registry:build
pnpm registry:check-orphans
pnpm build
```

## Lifecycle

- Overwrite-on-update each session.
- Deleted on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
