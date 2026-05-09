# Component Import Rules (always-on checklist)

## Before starting: load context

Every session involving component work, load these before writing code:
- `docs/runbooks/shadcn-primitive-intake.md`
- `docs/runbooks/showcase-rebuild.md`
- `docs/showcase.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/conventions/component-templates.md`
- `src/components/ui/_registry.ts`
- `src/components/examples/_TEMPLATE.tsx`
- `src/lib/registry-schema.ts`
- Example registry fragments (`_registry-*.ts`)

## Style rules (absolute, no exceptions)

1. Import component FUNCTIONALITY, never their style. Style is our shadcn global.
2. NO HARDCODED colors/values in components/blocks/examples. Everything through CSS token classes.
3. Map library colors to project tokens: `bg-neutral-*` → `bg-muted`, `bg-green-500` → `bg-primary`, etc.
4. If no existing token fits, add new CSS variable to `globals.css` + `@theme inline`, then consume it.
5. Shadows: use `shadow-sm`/`shadow`/`shadow-md` tokens, not inline values.
6. External assets: self-host in `public/`, never reference external CDNs.

## Shadcn primitive composition (MANDATORY — enforced by ESLint error)

External components often use raw `<button>`, `<input>`, `<select>`, `<textarea>`.
These bypass the ENTIRE design token system: radius, colors, spacing, padding, font sizes, focus rings, hover states, disabled states, border widths, and shadows all stop responding to theme changes. One raw `<button>` = every visual property hardcoded outside the cascade.

**Replace raw HTML with shadcn primitives:**
- `<button>` → `<Button>` from `@/components/ui/button`
- `<input>` → `<Input>` from `@/components/ui/input`
- `<select>` → `<NativeSelect>` from `@/components/ui/native-select`
- `<textarea>` → `<Textarea>` from `@/components/ui/textarea`
- Custom tab implementations → `<Tabs>` from `@/components/ui/tabs`

**Exceptions** (keep raw HTML):
- Inline editing inputs inside grids/tables (transparent background, no padding needed)
- Hidden file inputs (programmatic triggers)
- Inputs inside the component's own `<style>` block

**Also forbidden:** bare `rounded` class (fixed 0.25rem, NOT token-bound).
Use `rounded-md` or other scale classes (`rounded-sm`, `rounded-lg`, etc.).

**After refactoring:** add `registryDependencies` to the component's registry entry listing all consumed shadcn primitives.

## Conflict resolution (just fix, don't ask)

- Name conflicts: rename (e.g., `Button` → `StatefulButton`)
- Missing deps: install
- Missing CSS vars: add to globals
- TypeScript issues (`exactOptionalPropertyTypes`): fix
- Don't over-analyze. Fix and move on.

## Accepting components from user

Best → worst: link → CLI command → raw code. One link is enough.

## New components go to "New Components" section

All non-shadcn components render in a separate "New Components" section at bottom of /showcase.
- Set `proposedGroup` field on UI registry entry (e.g., `"buttons"`, `"effects"`, `"feedback"`)
- Showcase page shows: smaller h3 title + muted group badge (not h2 Section)
- Demo cards get `isNew` prop → shows "New" tag (primary/muted, NOT red)
- Do NOT set `isFlagged: true` on new component examples (that's for shadcn spec deviations only)
- `isFlagged` = "Not in spec" red badge = only for shadcn upstream deviations
- Example registry entries go in `_registry-effects.ts` (or appropriate new fragment)

## Check for multiple variants

Before finishing a component, check the upstream page for additional demo variants.
- Aceternity pages may have demo-2, demo-3 etc. (installable via CLI suffix)
- Install each, read code, adapt as separate example files
- IMPORTANT: CLI install of demos can OVERWRITE the primitive file. Re-adapt primitive after.

## Match upstream visual fidelity

Examples must visually match upstream docs, not be simplified versions.
- If upstream shows a rich composition (skeleton blocks, labels, both orientations), replicate it.
- Do NOT simplify to bare-bones usage that loses the visual impact.
- Each upstream variant heading (Default, Dashed, Dotted, etc.) = one example file.
- Set `span` and `height` based on component's NATURAL size, not uniform:
  * Full-width (data tables, grids, banners, toolbars): `span: 3`
  * Medium (forms, pickers, file upload, key-value): `span: 2`
  * Small (color swatch, badge, switch, gauge): `span: 1`
  * Tall (calendars, grids, croppers, terminals): `height: "tall"`
- NEVER cram a table/grid/banner into a 1-column small block.

## CLI overwrites primitives

When running `pnpm dlx shadcn@latest add @registry/component-demo-N`, the CLI may overwrite
`src/components/ui/<slug>.tsx` with the original unadapted version. Always re-check and re-adapt
the primitive after installing additional demos.

## Track source URLs

Every new component MUST have its source URL tracked in two places:
1. `upstreamUrl` field on BOTH the UI registry entry AND each example registry entry
2. Row in `docs/DESIGN-SYSTEM.md` under "New components (external registries)" table

Format: `| Component Title | proposed group | [slug](source-url) |`

Add the row to DESIGN-SYSTEM.md as part of the pipeline. This is how we find where components came from.

## Pipeline per component

1. Install via CLI or fetch source
2. Revert any CLI overwrites of existing primitives (`git checkout -- src/components/ui/<file>`)
3. Adapt primitive → `src/components/ui/<slug>.tsx`:
   a. Token-only styling (no hardcoded colors, no oklch, no bare `rounded`)
   b. Replace raw `<button>/<input>/<select>/<textarea>` with shadcn primitives
   c. Add `typeof window` guard if lib touches DOM at import time
   d. Add `"use client"` if component uses hooks or browser APIs
   e. Add targeted eslint-disable (not blanket)
   f. Fix `exactOptionalPropertyTypes` violations
4. Add to `src/components/ui/_registry.ts` WITH `proposedGroup`, `upstreamUrl`, AND `registryDependencies`
5. Check upstream page for additional variants (demo-2, demo-3, etc.)
6. Create example(s) → `src/components/examples/<slug>-<variant>.tsx`
   - Use `next/dynamic` with `ssr: false` for browser-only components
7. Add to example registry fragment with `isFlagged: false` and `upstreamUrl`
8. Wire fragment into `src/components/examples/_registry.ts` if new fragment
9. Move any misplaced CLI-generated files to `_junk/`
10. `pnpm registry:build`
11. Gates: `typecheck`, `lint`, `registry:check-orphans`, `registry:export`, `build`
12. Visual verify at `/showcase#<slug>` under "New Components" section
13. **Token cascade test:** change `--radius` in globals.css, verify component responds. Revert.
