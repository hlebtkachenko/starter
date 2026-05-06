# Showcase

Live demo of every shadcn primitive used in the project. URL: `/showcase`.

The page is a visual contract: each variant on screen mirrors a `### <name>` heading under `## Examples` in the corresponding `https://ui.shadcn.com/docs/components/<id>.md` file. Walk this map when adding components, fixing drift, or asking an AI agent to compose UI from existing primitives.

## Procedures

Showcase work depends on primitives existing in `src/components/ui/`. Two runbooks cover the two halves:

1. [`docs/runbooks/shadcn-primitive-intake.md`](runbooks/shadcn-primitive-intake.md) — **upstream**. How to add or update a shadcn primitive in `src/components/ui/<slug>.tsx` so design tokens (radius, colors, fonts) cascade to every page. Run this first whenever a new component is needed, even outside the showcase rebuild.
2. [`docs/runbooks/showcase-rebuild.md`](runbooks/showcase-rebuild.md) — **downstream**. How to port the variant catalog from the upstream `.md` into the right `<*-group>.tsx` showcase file once the primitive is in place.

### Adding a new component (cold-start checklist)

A fresh agent or contributor adding a brand-new shadcn component should walk this list end-to-end. Each step links to the authoritative procedure; do not improvise.

1. **Confirm the slug**. kebab-case from `https://ui.shadcn.com/docs/components/<slug>`. Same id used as `<Section id="...">` and the `/showcase` anchor.
2. **Pick the group file**. Match by domain from the [Component map](#component-map) below. Do not invent a new group file.
3. **Intake the primitive** — follow [`shadcn-primitive-intake.md`](runbooks/shadcn-primitive-intake.md). Result: `src/components/ui/<slug>.tsx` exists and consumes design tokens (no inline hex, no arbitrary radius, no `oklch`). Run the cascade test from that runbook.
4. **Port the variant catalog** — follow [`showcase-rebuild.md`](runbooks/showcase-rebuild.md). Result: a `<Section id="<slug>">` block in the right group file with one `<Demo>` per upstream `### <name>` and the page-hero block as `<Demo name="Default">`. Showcase-only deps installed via `pnpm add` are noted under "Per-component deviations" below.
5. **Audit name coverage**. Run the Python diff snippet in [`showcase-rebuild.md` § "Audit (must run after a rebuild round)"](runbooks/showcase-rebuild.md#audit-must-run-after-a-rebuild-round). A clean run prints nothing. Any `extra` must be `<Demo flagged>` AND listed under "Per-component deviations".
6. **Audit content drift**. Open the upstream docs page and `/showcase#<slug>` side-by-side. Every `<Demo>`'s rendered output must match the upstream preview (text, icons, layout). The name-diff alone does not catch invented JSX hidden behind a correct label.
7. **Verify**. `pnpm typecheck` and `pnpm lint` must pass with only the documented baseline warnings (login `<img>` + TanStack `useReactTable` advisory in display-group).
8. **Update docs**. Add a row to the [Component map](#component-map) below, fill the "Flagged extras" column, and add a one-line entry under "Per-component deviations" if you swapped an icon library, replaced a hook (e.g. `useMediaQuery` → `useIsMobile`), or worked around a strict-TS / lint constraint.
9. **Update group-file header**. Each group file has a `// Sections in this file (Section id -> shadcn docs):` comment block. Add or mark the new slug `(rebuilt from MD)`.
10. **TOC**. Add the slug to the `TOC` array in [`src/app/showcase/page.tsx`](../src/app/showcase/page.tsx) so the in-page nav lists it.
11. **Commit**. One component per commit, Conventional Commits, `ui` scope: `feat(ui): add <slug> primitive + showcase`.

The runbooks tell you HOW. This page tells you WHERE everything goes and WHAT must be true at the end.

## How it is built

- Page entry: [`src/app/showcase/page.tsx`](../src/app/showcase/page.tsx). Renders the table of contents and one `<*Group>` per group file.
- Wrapper primitives: [`src/components/showcase/section.tsx`](../src/components/showcase/section.tsx). `<Section>` wraps one component, `<Demo>` wraps one variant. `<Demo flagged>` marks a deviation from the docs (red border, "Not in spec" pill).
- One file per group of related components. Header comment in each group file lists the Section ids it owns.

## Status

**Complete.** Every component in the TOC was rebuilt from its upstream `https://ui.shadcn.com/docs/components/<id>.md` source. Each `### <name>` under `## Examples` maps to a `<Demo name="<name>">` block. Demos with no upstream match are kept under `<Demo flagged>` (red border + "Not in spec" pill).



Rebuilt verbatim from the upstream shadcn `.md` examples:

| Component | File | Flagged extras |
|---|---|---|
| Accordion | [`src/components/showcase/utility-group.tsx`](../src/components/showcase/utility-group.tsx) | – |
| Alert | [`src/components/showcase/feedback-group.tsx`](../src/components/showcase/feedback-group.tsx) | – |
| Alert Dialog | [`src/components/showcase/overlays-group.tsx`](../src/components/showcase/overlays-group.tsx) | – |
| Aspect Ratio | [`src/components/showcase/layout-group.tsx`](../src/components/showcase/layout-group.tsx) | `Default (16:9)` |
| Avatar | [`src/components/showcase/display-group.tsx`](../src/components/showcase/display-group.tsx) | – |
| Badge | [`src/components/showcase/display-group.tsx`](../src/components/showcase/display-group.tsx) | – |
| Breadcrumb | [`src/components/showcase/navigation-group.tsx`](../src/components/showcase/navigation-group.tsx) | – |
| Button | [`src/components/showcase/buttons-group.tsx`](../src/components/showcase/buttons-group.tsx) | – |
| Button Group | [`src/components/showcase/buttons-group.tsx`](../src/components/showcase/buttons-group.tsx) | – |
| Calendar | [`src/components/showcase/display-group.tsx`](../src/components/showcase/display-group.tsx) | `Default (dropdown caption)`, `With Timezone`, `Hijri` |
| Card | [`src/components/showcase/layout-group.tsx`](../src/components/showcase/layout-group.tsx) | `Default`, `With Form` |
| Checkbox | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Indeterminate (select all)` |
| Collapsible | [`src/components/showcase/layout-group.tsx`](../src/components/showcase/layout-group.tsx) | – |
| Combobox | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | – |
| Date Picker | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | – |
| Dialog | [`src/components/showcase/overlays-group.tsx`](../src/components/showcase/overlays-group.tsx) | `Default` |
| Drawer | [`src/components/showcase/overlays-group.tsx`](../src/components/showcase/overlays-group.tsx) | `Default` |
| Field | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | – |
| Hover Card | [`src/components/showcase/overlays-group.tsx`](../src/components/showcase/overlays-group.tsx) | – |
| Input | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | – |
| Popover | [`src/components/showcase/overlays-group.tsx`](../src/components/showcase/overlays-group.tsx) | – |
| Resizable | [`src/components/showcase/layout-group.tsx`](../src/components/showcase/layout-group.tsx) | `Default` |
| Scroll Area | [`src/components/showcase/layout-group.tsx`](../src/components/showcase/layout-group.tsx) | `Default (vertical)` |
| Separator | [`src/components/showcase/layout-group.tsx`](../src/components/showcase/layout-group.tsx) | `Default (horizontal)` |
| Sheet | [`src/components/showcase/overlays-group.tsx`](../src/components/showcase/overlays-group.tsx) | `Default` |
| Carousel | [`src/components/showcase/utility-group.tsx`](../src/components/showcase/utility-group.tsx) | `Default`, `API (slide N of M)`, `Plugins` |
| Empty | [`src/components/showcase/utility-group.tsx`](../src/components/showcase/utility-group.tsx) | `Default` |
| Input Group | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Credit card`, `Locked password (show toggle)` |
| Input OTP | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Default 6 digits` |
| Item | [`src/components/showcase/utility-group.tsx`](../src/components/showcase/utility-group.tsx) | `Default (outline)`, `Variants`, `Sizes (default / sm / xs)` |
| Kbd | [`src/components/showcase/utility-group.tsx`](../src/components/showcase/utility-group.tsx) | `Default` |
| Label | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Default`, `In Field component` |
| Menubar | [`src/components/showcase/navigation-group.tsx`](../src/components/showcase/navigation-group.tsx) | `Default` |
| Native Select | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Default` |
| Navigation Menu | [`src/components/showcase/navigation-group.tsx`](../src/components/showcase/navigation-group.tsx) | `Default` |
| Pagination | [`src/components/showcase/navigation-group.tsx`](../src/components/showcase/navigation-group.tsx) | `Default` |
| Radio Group | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Default` |
| Tabs | [`src/components/showcase/navigation-group.tsx`](../src/components/showcase/navigation-group.tsx) | `Default` |
| Chart | [`src/components/showcase/display-group.tsx`](../src/components/showcase/display-group.tsx) | `Bar chart`, `With grid`, `With axis`, `With tooltip`, `With legend`, `Tooltip Demo` |
| Command | [`src/components/showcase/menus-group.tsx`](../src/components/showcase/menus-group.tsx) | – |
| Context Menu | [`src/components/showcase/menus-group.tsx`](../src/components/showcase/menus-group.tsx) | – |
| Data Table | [`src/components/showcase/display-group.tsx`](../src/components/showcase/display-group.tsx) | `Default (sort + filter + select)` |
| Dropdown Menu | [`src/components/showcase/menus-group.tsx`](../src/components/showcase/menus-group.tsx) | – |
| Select | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Default` |
| Skeleton | [`src/components/showcase/display-group.tsx`](../src/components/showcase/display-group.tsx) | – |
| Slider | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Default` |
| Switch | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Default` |
| Table | [`src/components/showcase/display-group.tsx`](../src/components/showcase/display-group.tsx) | – |
| Textarea | [`src/components/showcase/forms-group.tsx`](../src/components/showcase/forms-group.tsx) | `Default` |
| Typography | [`src/components/showcase/display-group.tsx`](../src/components/showcase/display-group.tsx) | `Demo` |
| Progress | [`src/components/showcase/feedback-group.tsx`](../src/components/showcase/feedback-group.tsx) | `Default (animated)` |
| Sidebar | [`src/components/showcase/layout-group.tsx`](../src/components/showcase/layout-group.tsx) | – |
| Sonner | [`src/components/showcase/feedback-group.tsx`](../src/components/showcase/feedback-group.tsx) | – |
| Spinner | [`src/components/showcase/feedback-group.tsx`](../src/components/showcase/feedback-group.tsx) | `Default` |
| Tooltip | [`src/components/showcase/overlays-group.tsx`](../src/components/showcase/overlays-group.tsx) | `Default` |

All 55 components in the TOC rebuilt verbatim from upstream MD.

### Per-component deviations

- **Button** — upstream MD's `With Icon` and `Button Group` variants import `@tabler/icons-react`. Project rule (see [`shadcn-primitive-intake.md`](runbooks/shadcn-primitive-intake.md#step-3) and [`components.json`](../components.json) `iconLibrary: "lucide"`) is lucide-only, so we substitute `GitBranchIcon` for `IconGitBranch` and `Trash2Icon` for the `IconPlus`/equivalent lucide icons. Visual intent is preserved.
- **Date Picker** — added `chrono-node` to dependencies for the upstream "Natural Language Picker" variant.
- **Drawer** — upstream "Responsive Dialog" uses a `useMediaQuery` hook; substituted with the project's existing `useIsMobile` from `@/hooks/use-mobile` (logic flipped to `isDesktop = !isMobile`).
- **Drawer** — upstream "Sides" passes `direction={side === "bottom" ? undefined : side}`; with `exactOptionalPropertyTypes: true` the conditional is dropped because the typed union already accommodates `"bottom"` and the four sides are an `as const` tuple. Visual intent identical (vaul defaults to `bottom`).
- **Collapsible** — upstream MD imports lucide via `@/registry/icons/__lucide__`; substituted with direct `lucide-react` import.
- **Input Group** — added `react-textarea-autosize` for the "Custom Input" variant. Substituted `@tabler/icons-react` icons with lucide. Inlined a `setTimeout` clipboard pattern for the "Button" variant since no `useCopyToClipboard` hook exists in the project.
- **Input OTP** — uses `REGEXP_ONLY_DIGITS` and `REGEXP_ONLY_DIGITS_AND_CHARS` from `input-otp` (already a transitive dep).
- **Empty** — substituted `IconCloud` and `IconBell` with lucide `CloudIcon` and `BellIcon`.
- **Carousel** — "Plugins" upstream uses `useRef(Autoplay(...))` and reads `plugin.current.stop/reset` during render. React 19 `react-hooks/refs` rule blocks this; substituted with `useMemo(() => Autoplay(...), [])` for identical visual + behavioral contract.
- **Input OTP "Default"** — upstream uses `defaultValue="123456"` on `<InputOTP>`. The `input-otp` library renders both `value` and `defaultValue` on its internal hidden `<input>` when `defaultValue` is set, triggering React's "controlled or uncontrolled, not both" error. Demo MUST use a `useState` controlled helper (`InputOtpDefaultDemo`). DO NOT revert to upstream's uncontrolled form.
- **Chart** — `ChartConfig` is a discriminated union forbidding both `color` and `theme` on the same key; upstream MD shows both with one as a comment, this project drops the comment and keeps `theme` for dark-mode support.
- **Data Table** — added `@tanstack/react-table` dependency. Each variant lives in its own helper component; `useReactTable` triggers `react-hooks/incompatible-library` advisory warnings (Compilation Skipped) which are accepted and not actionable.

## Component map

`Section id` is the anchor on `/showcase` and the slug on the docs URL: `https://ui.shadcn.com/docs/components/<id>`.

| Section id | Group file |
|---|---|
| accordion | utility-group.tsx |
| alert | feedback-group.tsx |
| alert-dialog | overlays-group.tsx |
| aspect-ratio | layout-group.tsx |
| avatar | display-group.tsx |
| badge | display-group.tsx |
| breadcrumb | navigation-group.tsx |
| button | buttons-group.tsx |
| button-group | buttons-group.tsx |
| calendar | display-group.tsx |
| card | layout-group.tsx |
| carousel | utility-group.tsx |
| chart | display-group.tsx |
| checkbox | forms-group.tsx |
| collapsible | layout-group.tsx |
| combobox | forms-group.tsx |
| command | menus-group.tsx |
| context-menu | menus-group.tsx |
| data-table | display-group.tsx |
| date-picker | forms-group.tsx |
| dialog | overlays-group.tsx |
| drawer | overlays-group.tsx |
| dropdown-menu | menus-group.tsx |
| empty | utility-group.tsx |
| field | forms-group.tsx |
| hover-card | overlays-group.tsx |
| input | forms-group.tsx |
| input-group | forms-group.tsx |
| input-otp | forms-group.tsx |
| item | utility-group.tsx |
| kbd | utility-group.tsx |
| label | forms-group.tsx |
| menubar | navigation-group.tsx |
| native-select | forms-group.tsx |
| navigation-menu | navigation-group.tsx |
| pagination | navigation-group.tsx |
| popover | overlays-group.tsx |
| progress | feedback-group.tsx |
| radio-group | forms-group.tsx |
| resizable | layout-group.tsx |
| scroll-area | layout-group.tsx |
| select | forms-group.tsx |
| separator | layout-group.tsx |
| sheet | overlays-group.tsx |
| sidebar | layout-group.tsx |
| skeleton | display-group.tsx |
| slider | forms-group.tsx |
| sonner | feedback-group.tsx |
| spinner | feedback-group.tsx |
| switch | forms-group.tsx |
| table | display-group.tsx |
| tabs | navigation-group.tsx |
| textarea | forms-group.tsx |
| toggle | buttons-group.tsx |
| toggle-group | buttons-group.tsx |
| tooltip | overlays-group.tsx |
| typography | display-group.tsx |

## Tokens

Every variant pulls its color, radius, and surface from CSS variables defined in [`src/app/globals.css`](../src/app/globals.css) and exposed to Tailwind via `@theme inline`. Editing a token there propagates through all primitives.

The shadcn docs occasionally use raw Tailwind palette classes (`bg-amber-50`, `bg-green-600`) inside "custom colors" or status-dot variants to demonstrate escape hatches. Those classes are kept verbatim where the docs use them; they are intentionally outside the design token system.

## Rules

- Demo `name` must match the upstream `### <name>` heading exactly. Rename only when the docs rename.
- A demo not present in the upstream `.md` examples is allowed but must use `<Demo flagged>`. Never silently keep a deviation.
- Use shadcn primitives from `@/components/ui/<name>`. No new wrappers, no forks.
- No `oklch`. No inline hex. Variants that need bespoke color (e.g. Alert "Custom Colors") use Tailwind palette classes verbatim from the docs.

## Adding a component

1. Open `https://ui.shadcn.com/docs/components/<id>.md`. Read `## Examples`.
2. Add a `<Section id="<id>" title=... description=...>` to the right group file (see the table above).
3. For each `### <name>` example, add a `<Demo name="<name>">` with the example's JSX, swapping imports to `@/components/ui/*`.
4. Skip the `## RTL` section.
5. Add the Section id to the TOC array in [`src/app/showcase/page.tsx`](../src/app/showcase/page.tsx).
6. Update the table above.
