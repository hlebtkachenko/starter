---
branch: hlebtkachenko/add-filter-bar
created: 2026-05-09T20:30:00Z
last_updated: 2026-05-09T20:50:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/add-filter-bar

## Goal

Add Linear-style data table filter bar component (subject + operator + value pill chips) to the showcase, matching the design pattern from the inline-chip filter screenshot.

## Current state

- Installed bazza/ui data-table-filter via official shadcn CLI from https://ui.bazza.dev/r/filters
- 22 vendored library files at src/components/data-table-filter/ with @ts-nocheck + eslint-disable headers (matches evilcharts/ convention)
- Stub re-export at src/components/ui/data-table-filter.tsx for registry validator
- Original example with 6-row employee dataset (text, option, number columns, live client filtering) at src/components/examples/data-table-filter-default.tsx
- Registry: 573 items (113 UI, 455 examples, 5 blocks)
- Local gates green: typecheck, lint (0 errors), build clean
- Visual verified: chip pill renders inline with subject icon, operator, value, and X; Clear all on the right; table filters live

## Decisions made

- Picked bazza/ui over uicapsule filter-bar: matches Linear-style design 1:1, single shadcn registry install via official CLI, actively maintained, 22 files vs. 28 with no upstream pnpm-catalog tooling blocker
- Vendored files use @ts-nocheck rather than per-file type fixes: matches existing project convention for evilcharts/ upstream code; alternative was rewriting upstream type definitions to satisfy exactOptionalPropertyTypes
- Stub re-export at components/ui/ rather than moving the whole library: matches gotcha #5 in new-components.md runbook (multi-file components need a stub)
- Apply size-cap-override label: vendored library is bulk-extracted via official CLI install, not hand-written code

## Blockers

- None

## Next steps

- [ ] Apply size-cap-override label
- [ ] Wait CI green
- [ ] Merge PR #34
