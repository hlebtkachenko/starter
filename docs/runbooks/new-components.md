# New Components: Complete Operations Guide

> Read this file before any component work. It is the single entry point for
> agents adding, fixing, or verifying components on this showcase project.

## Quick orientation

This is a Next.js showcase app for shadcn/ui components + external registry
components. The `/showcase` page renders every component with all documented
variants. "New Components" (from external registries) render in a separate
section at the bottom, gated by the `proposedGroup` field.

**Branch convention:** create `<git-user>/new-components` or similar from master.

## Related context documents (read before starting)

| Document | What it covers |
|---|---|
| [component-import-rules.md](component-import-rules.md) | Style rules, conflict resolution, per-component pipeline checklist |

## Key project files

| What | Path |
|---|---|
| UI primitives | `src/components/ui/<slug>.tsx` |
| UI registry | `src/components/ui/_registry.ts` |
| Example files | `src/components/examples/<slug>-<variant>.tsx` |
| Example registry (new components) | `src/components/examples/_registry-effects.ts` |
| Example registry (shadcn standard) | `src/components/examples/_registry-<category>.ts` |
| Example aggregator | `src/components/examples/_registry.ts` |
| Example template | `src/components/examples/_TEMPLATE.tsx` |
| Registry schema (types) | `src/lib/registry-schema.ts` |
| Registry runtime | `src/lib/registry.ts` |
| Showcase page | `src/app/showcase/page.tsx` |
| Demo/Section components | `src/components/showcase/section.tsx` |
| Scroll nav | `src/components/showcase/scroll-to-top.tsx` |
| Build script | `scripts/build-registry.ts` |
| Orphan checker | `scripts/check-orphans.ts` |
| CSS tokens | `src/app/globals.css` |
| Design system doc | `docs/DESIGN-SYSTEM.md` |
| Showcase rebuild runbook | `docs/runbooks/showcase-rebuild.md` |
| Primitive intake runbook | `docs/runbooks/shadcn-primitive-intake.md` |

## How a component flows through the system

```
External registry (aceternity, diceui, cult-ui, basecn, cardcn, coss...)
    |
    v
1. CLI install -> src/components/ui/<slug>.tsx (primitive)
    |
    v
2. Adapt primitive (tokens, TS fixes, rename conflicts)
    |
    v
3. Register in src/components/ui/_registry.ts (type: "registry:ui")
    |     - MUST set proposedGroup for non-shadcn components
    |     - MUST set upstreamUrl
    |
    v
4. Create examples -> src/components/examples/<slug>-<variant>.tsx
    |     - One file per upstream variant
    |     - JSDoc header with @slug @variant @upstream @deviations
    |     - "use client" ONLY if hooks/browser APIs used
    |
    v
5. Register examples in _registry-effects.ts (type: "registry:example")
    |     - MUST set span/height based on component size
    |     - MUST set isFlagged: false for new components
    |     - MUST set upstreamUrl
    |
    v
6. Build + verify
    |
    v
7. Visual check on /showcase
```

## Adding a new component (step by step)

### Step 1: Install

```bash
pnpm dlx shadcn@latest add @<registry>/<component> --overwrite --yes
```

**IMMEDIATELY after install:**
```bash
git diff --name-only -- src/components/ui/ src/hooks/
```
If any EXISTING file was overwritten (button.tsx, calendar.tsx, input.tsx, etc.):
```bash
git checkout -- src/components/ui/<overwritten-file>.tsx
```

### Step 2: Adapt the primitive

Read `src/components/ui/<slug>.tsx` and fix:

- **Colors:** Replace ALL hardcoded colors with token classes
  - `bg-neutral-*` -> `bg-muted`, `bg-green-500` -> `bg-primary`
  - `text-gray-*` -> `text-muted-foreground`
  - If no token fits, add CSS variable to `globals.css` `:root` + `@theme inline`
- **oklch:** Replace with hex. Project rule: hex only.
- **exactOptionalPropertyTypes:** Use `...(prop !== undefined ? { prop } : {})` pattern
- **Name conflicts:** Rename exports (e.g., `Button` -> `StatefulButton`)
- **External assets:** Self-host in `public/`, use `<img>` with eslint-disable
- **Library lint issues:** Add targeted `/* eslint-disable rule-name */` (not blanket)
- **Locale:** Pin `toLocaleString` calls to `"en-US"` to prevent hydration mismatches
- **Raw HTML → shadcn:** Replace `<button>` with `<Button>`, `<input>` with `<Input>`,
  `<select>` with `<NativeSelect>`, `<textarea>` with `<Textarea>`. This connects
  the component to design tokens (radius, colors, focus rings all respond to theme).
- **Bare `rounded`:** Replace with `rounded-md` (bare `rounded` = fixed 0.25rem, not token-bound)

### Step 3: UI registry entry

Add to `src/components/ui/_registry.ts`:

```ts
{
  name: "my-component",
  type: "registry:ui",
  title: "My Component",
  description: "Rich description (80+ chars). THIS IS THE AI GREP TARGET.",
  files: [{ path: "components/ui/my-component.tsx", type: "registry:ui" }],
  categories: ["forms"],
  proposedGroup: "forms",  // REQUIRED for non-shadcn
  upstreamUrl: "https://...",
}
```

### Step 4: Create example files

File: `src/components/examples/<slug>-<variant>.tsx`

```tsx
/**
 * @slug my-component
 * @variant default
 * @upstream https://upstream-docs-url
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import { MyComponent } from "@/components/ui/my-component";

export default function MyComponentDefault() {
  return <MyComponent />;
}
```

**Rules:**
- Match upstream visual fidelity (don't simplify)
- Each upstream variant heading = one file
- Default export, PascalCase function name
- `"use client"` only when hooks/browser APIs present

### Step 5: Example registry entry

Add to `src/components/examples/_registry-effects.ts`:

```ts
{
  name: "my-component-default",
  type: "registry:example",
  title: "Default",
  description: "What this variant demonstrates (80+ chars).",
  slug: "my-component",
  variant: "default",
  isDefault: true,
  isFlagged: false,
  span: 2,           // Set based on natural size (see sizing guide)
  height: "tall",    // Only if component is tall
  upstreamUrl: "https://...",
  registryDependencies: ["my-component"],
  files: [{ path: "components/examples/my-component-default.tsx", type: "registry:example" }],
  categories: ["forms"],
}
```

**Span/height sizing guide:**

| Component type | span | height |
|---|---|---|
| Data tables, grids, banners, toolbars | 3 | "tall" |
| Forms, pickers, file upload, key-value, croppers | 2 | "tall" if interactive |
| Small (badge, switch, gauge, color swatch) | 1 | (omit) |

### Step 6: Gates (must ALL pass)

```bash
pnpm registry:build          # Rebuilds __index__.tsx
pnpm typecheck                # Zero errors required
pnpm registry:check-orphans   # All files match registry
pnpm registry:export          # Updates manifest + showcase export
pnpm build                    # Full Next.js build
```

### Step 7: Visual verify

Start dev server (`pnpm dev`), open `/showcase#<slug>` in browser.
Component should appear under "New Components" section.
Compare side-by-side with upstream docs page.

Check:
- Correct grid size (not crammed into small block)
- Interactive features work (click, type, drag)
- No console errors
- No hydration warnings

## Fixing existing components

1. Read the example file and the primitive
2. Make the fix
3. Run all 5 gates from Step 6
4. Visually verify on /showcase

## Common gotchas (learned from experience)

1. **CLI overwrites primitives.** ALWAYS check `git diff` after install.
2. **`exactOptionalPropertyTypes`** breaks optional context values. Use conditional spread.
3. **Slider `onValueChange`** returns `number[]` where elements can be `undefined`. Use `values[0] ?? fallback`.
4. **`react-hooks/refs` lint errors** in library code. Add targeted `/* eslint-disable react-hooks/... */`.
5. **Registry build rejects files outside `components/ui/`**. Multi-file components need a stub re-export in `components/ui/`.
6. **Duplicate registry names.** data-table-default exists in `_registry-display.ts`. Check ALL fragments before adding.
7. **Biome formatter runs on commit.** Export drift check may fail first attempt. Re-stage formatted files and retry.
8. **`isFlagged: true` = red "Not in spec" badge.** New components MUST use `isFlagged: false`.
9. **Locale hydration.** Any `toLocaleString()` without explicit `"en-US"` causes hydration mismatch on non-US machines.
10. **External images.** Pattern is unsplash URLs with `?w=800&q=80`. Existing examples use this.
11. **`motion/react` import.** Package is `motion` in package.json, import from `motion/react`.
12. **Raw HTML bypasses ENTIRE design system.** External components use `<button>`, `<input>`, `<select>` directly. These disconnect from ALL tokens: radius, colors, spacing, padding, font sizes, focus rings, hover/disabled states, border widths, shadows. MUST replace with shadcn `<Button>`, `<Input>`, `<NativeSelect>`, `<Textarea>`. ESLint rule `no-raw-interactive-html` blocks commits with raw interactive HTML in `ui/`. Add `registryDependencies` after.
13. **Bare `rounded` is NOT token-bound.** In Tailwind v4, `rounded` = fixed `0.25rem`. Use `rounded-md` (= `var(--radius-md)`) or other scale classes.
14. **Blanket `/* eslint-disable */` hides real bugs.** Use targeted disables: `/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any */`.
15. **SSR crash from browser-only libs.** `react-pdf`, `pdfjs-dist` access `DOMMatrix` at import time. Primitives need `typeof window` guard. Examples need `next/dynamic` with `ssr: false`.
16. **`"use client"` on browser-only libs.** Files importing `react-pdf`, `pdf-lib`, or any lib that touches DOM/Worker MUST have `"use client"` even if they're utility files (`.ts` not `.tsx`).
17. **Parallel agent conflicts.** Multiple Conductor agents can commit to same registry files. Failed commit hooks restore working tree to committed state, losing edits. Always re-verify after failed commit.
18. **`env-editor` quote escaping.** `.env` export must escape `"`, `\`, `\n` inside values. `parseEnvString` strips outer quotes on import.
19. **Autocomplete needs `mode="list"` + `items` prop.** Without these, dropdown shows static list with no filtering. Base UI's `useFilter` hook provides `contains()`/`startsWith()` matchers.
20. **`biome@10.0.0` blocks `pnpm add`.** Package not yet on npm. CLI `shadcn add` commands that trigger `pnpm add` for new deps will fail. Workaround: fetch component source via registry JSON URL (`https://registry.io/r/name.json`) and create files manually.
21. **ReUI `IconPlaceholder`.** ReUI components use internal `IconPlaceholder` component. Replace with actual Lucide icons using the `lucide` prop value as guide.
22. **ReUI components export `Pattern` not default.** Showcase needs default exports. Convert `export function Pattern()` to `export default function DescriptiveName()`.
23. **Repo is PUBLIC.** No self-hosted runner references, no OVH/infra labels. All workflows use `ubuntu-latest`. Gitleaks rule `self-hosted-runner-infra` blocks runner label disclosure.

## How the showcase page works

- `buildSlugLists()` separates components by `proposedGroup` presence
- Standard shadcn components render inline with `<Section>` + `<Demo>`
- New components render under `<section id="new-components">` with group badges
- `<Demo>` reads `span`, `height`, `isNew`, `flagged` props from registry
- `<ComponentPreview>` lazy-loads from `__index__.tsx` by example name
- `<ScrollToTop>` has two buttons: scroll-to-top + jump-to-new-components

## Parallel work safety

Multiple agents can safely add components simultaneously IF:

- Each agent works on DIFFERENT slugs (no two agents touch the same component)
- Each agent adds entries to `_registry-effects.ts` at DIFFERENT positions (append at end before `]`)
- Only ONE agent runs `pnpm registry:build` at a time (file lock on `__index__.tsx`)
- Commits are atomic per batch (one commit per agent's batch)
- After merging parallel work: re-run all 5 gates to verify no conflicts

**Safe parallel split:** Assign each agent a list of slugs. Agent A does slug-1..slug-5, Agent B does slug-6..slug-10. They touch different example files and append different registry entries.

**Unsafe:** Two agents editing the same registry file simultaneously, or two agents running `registry:build` at the same time.

## SSR safety for browser-only libraries

Components using `react-pdf`, `pdfjs-dist`, or other DOM-dependent libs crash during SSR prerender (`DOMMatrix is not defined`).

**Fix pattern for primitives:**
```tsx
if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}
```

**Fix pattern for examples:**
```tsx
import dynamic from "next/dynamic";
const PdfViewer = dynamic(() => import("@/components/ui/pdf-viewer").then(m => m.PdfViewer), {
  ssr: false,
  loading: () => <div className="text-muted-foreground">Loading...</div>,
});
```

Libraries that access `document`, `window`, `DOMMatrix`, `Worker` at import time MUST have `"use client"` directive AND examples must use `next/dynamic` with `ssr: false`.

## Current state

- Repo: PUBLIC (v0.0.3), CI on `ubuntu-latest` (GitHub-hosted)
- Registry: 559 items (106 UI, 448 examples, 5 blocks)
- External components: 55+ from 12 registries (aceternity, basecn, cardcn, coss, cult-ui, diceui, eldora-ui, evilcharts, loading-ui, magicui, reui, tryelements + jalco, shark, shadcnblocks)
- All gates pass, build clean
- 6 ESLint rules at error severity (no-raw-interactive-html, no-bare-rounded, no-inline-hex, no-oklch, no-arbitrary-radius, no-input-otp-default-value)
- All components refactored to use shadcn primitives (Button, Input, Tabs, etc.)
- Gitleaks: full-history clean, custom rule for runner infra disclosure
- CLAUDE.md is symlink to agents.md
