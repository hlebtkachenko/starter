# Showcase

Live demo of every shadcn primitive used in the project. URLs:

- `/showcase` — primitives + variants from `src/components/examples/`.
- `/showcase/blocks` — page-level blocks from `src/components/blocks/`.

Both pages iterate the registry index (`src/components/__index__.tsx`)
and render each item via `<ComponentPreview>`. There is no per-page JSX
wiring; the catalog is the registry.

## Cold-start checklist (adding a new primitive)

A fresh agent or contributor adds a brand-new shadcn component by walking
this list end-to-end. Each step links to the authoritative procedure; do
not improvise.

1. **Confirm the slug.** kebab-case from
   `https://ui.shadcn.com/docs/components/<slug>`. Same id used as the
   `<Section id=…>` and the `/showcase` anchor.
2. **Intake the primitive** —
   [`docs/runbooks/shadcn-primitive-intake.md`](runbooks/shadcn-primitive-intake.md).
   Result: `src/components/ui/<slug>.tsx` exists and consumes design
   tokens. Run the cascade test from that runbook.
3. **Append the primitive entry** to
   [`src/components/ui/_registry.ts`](../src/components/ui/_registry.ts)
   (kebab name, title, description ≥ 80 chars, `upstreamUrl`,
   `categories`). Run `pnpm registry:build` to verify.
4. **Port each variant** — for each `### <name>` heading under
   `## Examples` in the upstream `.md` page, create one file under
   `src/components/examples/<slug>-<variant>.tsx` following
   [`src/components/examples/_TEMPLATE.tsx`](../src/components/examples/_TEMPLATE.tsx).
   Single default export. JSDoc header (`@slug @variant @upstream
   @deviations`).
5. **Append example registry entries** to the matching fragment file
   `src/components/examples/_registry-<group>.ts` (description ≥ 80 chars,
   `registryDependencies` from `@/components/ui/*` imports). Run
   `pnpm registry:build` again.
6. **Run gates.** `pnpm typecheck`, `pnpm lint`, `pnpm test`,
   `pnpm registry:check`, `pnpm registry:check-orphans`,
   `pnpm registry:export`, `pnpm registry:drift-check`. Each must pass at
   or below
   [`docs/plans/baseline-lint.txt`](plans/baseline-lint.txt) (currently 21
   warnings).
7. **Visual.** `pnpm dev`, open `/showcase#<slug>`, walk the variants vs
   the upstream docs page. Any divergence either matches an upstream
   variant exactly OR carries `isFlagged: true` in the registry entry plus
   a `deviations` note.
8. **Commit.** Conventional Commits, `ui` scope:
   `feat(ui): add <slug> primitive + showcase`.

The runbooks tell you HOW. This page tells you WHERE everything lives.

## Authoritative references

| Need | File |
|---|---|
| Variant template | [`src/components/examples/_TEMPLATE.tsx`](../src/components/examples/_TEMPLATE.tsx) |
| Block template | [`src/components/blocks/_TEMPLATE.tsx`](../src/components/blocks/_TEMPLATE.tsx) |
| Primitive template | [`src/components/ui/_TEMPLATE.tsx`](../src/components/ui/_TEMPLATE.tsx) |
| Conventions (all three) | [`docs/conventions/component-templates.md`](conventions/component-templates.md) |
| Per-area registries | [`src/components/{ui,examples,blocks}/_registry.ts`](../src/components/) |
| Examples per-group fragments | [`src/components/examples/_registry-*.ts`](../src/components/examples/) |
| Schema | [`src/lib/registry-schema.ts`](../src/lib/registry-schema.ts) |
| Runtime resolvers | [`src/lib/registry.ts`](../src/lib/registry.ts) |
| Autogen index | [`src/components/__index__.tsx`](../src/components/__index__.tsx) (do not edit) |
| Build script | [`scripts/build-registry.ts`](../scripts/build-registry.ts) |
| Export scripts | [`scripts/generate-{showcase-export,manifest}.ts`](../scripts/) |
| Audit scripts | [`scripts/check-{orphans,content-drift}.ts`](../scripts/) |
| Markdown export (split) | [`docs/showcase-export.md`](showcase-export.md), [`docs/showcase-export/`](showcase-export/) |
| Manifest (machine) | [`docs/components-manifest.json`](components-manifest.json) |
| Phase 3 plan | [`docs/plans/component-registry-phase3.md`](plans/component-registry-phase3.md) |
| Progress | [`docs/plans/component-registry-progress.md`](plans/component-registry-progress.md) |

## How it is built

- Page entry: [`src/app/showcase/page.tsx`](../src/app/showcase/page.tsx)
  iterates `listUiSlugs()`, renders one `<Section>` per slug with one
  `<ComponentPreview>` per example variant.
- Block entry: [`src/app/showcase/blocks/page.tsx`](../src/app/showcase/blocks/page.tsx)
  iterates `listBlockNames()`, renders one Section per block.
- Wrapper primitives:
  [`src/components/showcase/section.tsx`](../src/components/showcase/section.tsx).
  `<Section>` wraps one slug, `<Demo>` wraps one variant. `<Demo flagged>`
  marks a deviation from the upstream docs (red border + "Not in spec"
  pill).
- ComponentPreview:
  [`src/app/showcase/_components/component-preview.tsx`](../src/app/showcase/_components/component-preview.tsx).
  Resolves an item by name through `getRegistryComponent` and renders it
  inside Suspense. Each example chunk is its own React.lazy import.
- Token controls:
  [`src/components/showcase/token-controls.tsx`](../src/components/showcase/token-controls.tsx)
  for live-editing `--radius` etc. on `/showcase`.
- Scroll-to-top + scroll-restore guard:
  [`src/components/showcase/scroll-to-top.tsx`](../src/components/showcase/scroll-to-top.tsx)
  and the inline guard in `src/app/showcase/page.tsx`.

## Cascade test

The cascade is the whole point. Editing `--radius` in
`src/app/globals.css` should change every primitive on `/showcase` without
any code change. Run the test before promoting a primitive PR:

```bash
# In src/app/globals.css, set :root { --radius: 1.5rem; }, save.
pnpm dev
open http://localhost:3000/showcase
# Every rounded-* element should grow corners.
# Revert globals.css.
```

If a primitive does not respond, it has bypassed the token system. Find
the offending class (`rounded-[10px]`, `bg-[#xxx]`) and replace with a
token form. The `no-arbitrary-radius`, `no-inline-hex`, and `no-oklch`
ESLint rules guard against new violations of this contract.

## Project deviations from upstream

These are documented under each registry entry's `deviations` array AND
in the `@deviations` JSDoc header in the example file. Rebuild
[`docs/showcase-export/examples-*.md`](showcase-export/) to surface them
in one place: `pnpm registry:export`.

Recurring patterns:

- **lucide-only icons.** `@tabler/icons-react` substituted with
  lucide-react throughout (project rule;
  [`components.json`](../components.json) `iconLibrary: "lucide"`).
- **`<img>` for raster fixtures.** `next/image` not configured for
  showcase fixtures; native `<img>` plus an
  `eslint-disable-next-line @next/next/no-img-element` comment is the
  documented form.
- **`useIsMobile` for media queries.** Substituted for `useMediaQuery`
  per the project's `@/hooks/use-mobile`.
- **`useMemo` not `useRef` for Carousel "Plugins".** React 19's
  `react-hooks/refs` rule blocks `useRef(SideEffect()).current.method()`
  during render.
- **Controlled `<InputOTP>`.** `defaultValue` causes input-otp to render
  both `value` and `defaultValue` on the hidden input, triggering React's
  controlled-or-uncontrolled warning. The "Default" demo uses `useState`.
- **`exactOptionalPropertyTypes`.** Conditionals dropped or guarded with
  `?? <default>`. Documented per file.
- **`ChartConfig` discriminated union.** `theme` form preferred so dark
  mode cascades.

## Audit gates

| Gate | Command | Wave 4 status |
|---|---|---|
| Typecheck | `pnpm typecheck` | clean |
| Lint | `pnpm lint` (≤ 21 warnings) | tracked in [baseline-lint.txt](plans/baseline-lint.txt) |
| Registry build (cycle detection) | `pnpm registry:build` | clean |
| Registry idempotent | `pnpm registry:check` | clean |
| Orphan check | `pnpm registry:check-orphans` | clean |
| Drift check | `pnpm registry:drift-check` | informational; flags 5 known out-of-Examples slugs |
| Export idempotent | `pnpm registry:export` then `git diff --exit-code` | clean |
| Tests | `pnpm test` | 19 passed |
| E2E | `pnpm test:e2e` | scaffolded (Wave 4.5 captures snapshots) |

Pre-commit (lefthook) runs `biome-format`, `eslint-fix`, `gitleaks`, and
`registry-export-drift`. CI on the self-hosted runner re-runs the lot.
