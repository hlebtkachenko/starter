---
branch: hlebtkachenko/add-components
created: 2026-05-09T18:00:00Z
last_updated: 2026-05-09T20:35:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/add-components

## Goal

Add 6 components from external shadcn registries (shark, jolyui, uicapsule, flowkit) plus permanent ESLint guards against button-in-button and unpinned locale hydration regressions.

## Current state

- 6 new UI primitives + examples shipped: floating-panel, signature-pad, download-trigger, liquid-metal-button, snail-timer, creatable-combobox
- Registry: 571 items (112 UI, 454 examples, 5 blocks)
- Two new local-rules at error severity: no-trigger-button-no-aschild, no-unpinned-locale
- 5 latent hydration bugs cleaned across calendar, chart, evilcharts tooltip, data-table-slider-filter, date-picker
- All gates green: typecheck, lint (0 errors), build clean

## Decisions made

- Filter-bar (uicapsule) skipped: 28-file mini-library with deep type incompatibilities against project's exactOptionalPropertyTypes config; doesn't fit single-file primitive showcase pattern
- Floating panel state-aware controls implemented via direct useFloatingPanel api calls (Ark zag-js StageTrigger hides triggers on isStaged, blocking maximized->minimized transitions)
- Maximize->minimize defers minimize via requestAnimationFrame after restore so size resets before stage change
- Webhook tester METHOD_COLORS palette dropped: hardcoded blue/green/amber bypassed design tokens

## Blockers

- None

## Next steps

- [ ] Merge PR #33
- [ ] Filter-bar (uicapsule) integration: needs separate phase if pursued. Either fix pnpm catalog tooling so official `shadcn add` CLI works, or build simpler in-house filter primitive that fits showcase pattern
