---
branch: hlebtkachenko/fix-cmdk-document-scroll
created: 2026-05-10T01:15:00Z
last_updated: 2026-05-10T01:15:00Z
author: hlebtkachenko
status: review
---

# HANDOFF: hlebtkachenko/fix-cmdk-document-scroll

## Goal

Fix /showcase auto-scrolling to the `command` section ~2 seconds after load.

## Current state

- Diagnosed: cmdk's `Command` primitive auto-selects the first `[cmdk-item]` on mount and calls `scrollIntoView({ block: "nearest" })` on it. With `block:"nearest"` the browser walks every scroll ancestor including `document`. Showcase renders many `<Command>` examples; the ones rendered offscreen scroll the document up to themselves. The page-level SCROLL_GUARD pins to top for 2s, then cmdk's deferred mount scroll wins.
- Fix: `src/components/ui/command.tsx` installs a one-time global override on `Element.prototype.scrollIntoView`. When called on an element with `cmdk-item` or `cmdk-group-heading` attributes, the patch scrolls only the closest `[cmdk-list]` container instead of bubbling up to the document. All other scrollIntoView callers are unaffected.
- Verified: `/showcase` stays at y=0 across 6s after load. Command examples still render correctly with first item highlighted.

## Decisions made

- Patched the prototype globally (under a `window.__cmdkScrollPatched` flag) rather than per-instance. cmdk calls scrollIntoView from a layout-effect during commit, so a per-instance ref-based patch can race; the global override is installed at module evaluation time before any cmdk mount.
- Kept cmdk's keyboard navigation behavior intact: scrolling within the cmdk-list still works for arrow keys.

## Blockers

- None.

## Next steps

- [ ] Open PR; do NOT merge per user instruction.

## Files touched

- `src/components/ui/command.tsx`: install scoped scrollIntoView override at module top.

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Lifecycle

- Overwrite-on-update each session.
- Deleted on PR merge by [`handoff-cleanup.yml`](../../../.github/workflows/handoff-cleanup.yml).
