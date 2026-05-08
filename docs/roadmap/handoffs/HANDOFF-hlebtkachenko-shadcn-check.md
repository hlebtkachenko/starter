---
branch: hlebtkachenko/shadcn-check
created: 2026-05-04T00:00:00Z
last_updated: 2026-05-04T22:00:00Z
author: hlebtkachenko
status: in-flight
---

# HANDOFF: hlebtkachenko/shadcn-check

## Goal

Bootstrap shadcn/ui, build login screens (/login, /login-2, /login-3 with i18n EN/CS + maintenance mode), and a comprehensive showcase page at /showcase with one Section per shadcn primitive showing every documented variant.

## Current state

**Committed and pushed (3 commits ahead of origin/master since last push, latest = `9cc7cd8`):**
- shadcn 4.6 init (`radix-nova`, neutral hex tokens). PR #21 open against master.
- /login (login-02 block), /login-2 (passkey + 2FA + multi-provider), /login-3 (LAC by afframe.com, EN/CS i18n, maintenance dialog, AI block with conic gradient border).
- 47 primitives in `src/components/ui/`. Roobert woff2 in `public/fonts/`. `_junk/**` ignored by ESLint.
- Showcase page with prior 9-group structure (each group held many components).

**Uncommitted (this session — showcase restructure to 1-component-per-Section):**
- 6 NEW primitives installed: `button-group`, `empty`, `item`, `kbd`, `native-select`, `spinner` (`src/components/ui/`).
- 4 NEW group files: `buttons-group.tsx`, `forms-group.tsx`, `menus-group.tsx`, `utility-group.tsx`.
- 5 group files REWRITTEN: `display-group.tsx`, `feedback-group.tsx`, `layout-group.tsx`, `navigation-group.tsx`, `overlays-group.tsx`.
- 2 group files DELETED: `data-group.tsx`, `inputs-group.tsx` (split into new files).
- `src/app/showcase/page.tsx`: TOC has 57 alphabetical entries, renders 9 group functions.
- `src/components/ui/separator.tsx` modified by shadcn install (auto-update).

**Showcase pattern (current):** each group file returns a `<>` fragment containing N `<Section id="component-slug" title="Component Name" description="...">` blocks. Each Section renders all variant `<Demo>` cards in a 3-col responsive grid. Render order is by group; TOC alphabetical; users navigate via anchor chips.

## Decisions made

- Switched from `pnpm dlx shadcn@latest` style "groups by category" to **per-component Sections matching `https://ui.shadcn.com/docs/components.md`** (flat alphabetical list of 57). Skipped `toast` (deprecated → sonner) and `direction` (RTL only). Result: 55 implemented Sections.
- Section names + descriptions copied verbatim from docs.md.
- Variant inventory at `.context/shadcn-groups.md` (337 variants, scraped per-component doc page) — used as source of truth.
- For primitives missing from `radix-nova` registry (`date-picker`, `data-table`, `typography`): built manually (Calendar+Popover for date-picker, sortable React Table for data-table, plain CSS-classed elements for typography).
- Sidebar demo uses native `collapsible="icon"` scoped to demo card via `[&_[data-slot=sidebar-container]]:!absolute` override (default is fixed-positioned for full-page mounts).
- TabsList `variant="line"` confirmed supported by radix-nova `tabs.tsx` (CVA variant).

## Blockers

- **size-cap CI check fails** on PR #21 (~7568 lines added vs 2000 cap). User decided not to merge to main yet; keep working on branch. Showcase restructure adds ~1000 more lines — will still fail size-cap until either (a) excludes added for `src/components/ui/**` and `src/components/showcase/**`, or (b) PR is split.

## Next steps

- [ ] Restart dev server (`rm -rf .next && pnpm dev`) — recent showcase rewrites churned Turbopack cache.
- [ ] Verify each of 57 sections renders without runtime errors. Recent fixes in this session: InputOTP `defaultValue` → controlled `value`; orphan `RadioGroupItem` wrapped in `RadioGroup`.
- [ ] Visual QA on /showcase — verify all variants from `.context/shadcn-groups.md` are visible and interactive.
- [ ] Commit + push showcase restructure (single commit: `feat(ui): restructure showcase to per-component sections`).
- [ ] Decide on size-cap PR #21: split into multiple PRs OR add `src/components/ui/**` to size-cap excludes (small CI workflow PR).
- [ ] Optionally append shadcn rules block to `CLAUDE.md` (hex tokens, use shadcn add, never hand-write primitives).
- [ ] Optionally update `docs/DESIGN-SYSTEM.md` (related-files warn on globals.css edits).

## Files touched (uncommitted)

- New: `src/components/showcase/{buttons,forms,menus,utility}-group.tsx`, `src/components/ui/{button-group,empty,item,kbd,native-select,spinner}.tsx`.
- Modified: `src/app/showcase/page.tsx`, `src/components/showcase/{display,feedback,layout,navigation,overlays}-group.tsx`, `src/components/ui/separator.tsx`.
- Deleted: `src/components/showcase/{data,inputs}-group.tsx`.
- Reference: `.context/shadcn-groups.md` (variant inventory).

## Verify

```bash
pnpm typecheck   # currently pass
pnpm lint        # currently pass (1 pre-existing <img> warning on /login)
pnpm build       # currently pass — all routes static
curl -sf http://localhost:3000/showcase  # expect 200; reload Safari to verify
```

## Lifecycle

- Overwrite-on-update each session.
- Deleted on PR merge by `handoff-cleanup.yml`.
