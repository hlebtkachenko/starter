# Component templates

> Single source of truth for primitives, variant examples, and blocks.
> Authoritative scaffolds live next to the directories they describe:
> - `src/components/ui/_TEMPLATE.tsx` (primitive)
> - `src/components/examples/_TEMPLATE.tsx` (variant)
> - `src/components/blocks/_TEMPLATE.tsx` (block)
>
> When adding or auditing any of those file types, copy the matching template
> and follow the rules below. ESLint guards back the rules at lint time.

## Primitive (`src/components/ui/<slug>.tsx`)

Imported source from `https://ui.shadcn.com/docs/components/<slug>.md` Manual section.

Adjustments after paste:

| Edit | Reason |
|---|---|
| Imports rewritten to `@/components/ui/*`, `@/lib/utils` | matches `components.json` aliases |
| `cn` from `@/lib/utils` | wraps clsx + tailwind-merge |
| Icons from `lucide-react` only | `iconLibrary: "lucide"` |
| Variants via `cva` from `class-variance-authority` | type-safe via `VariantProps` |
| `asChild` polymorphism via `Slot` | shadcn convention |
| `forwardRef` where upstream uses it | preserves portal + asChild patterns |
| Every named subcomponent exported | downstream registry consumers depend on them |

Token-only styling. Allowed class shapes:

- `bg-{background,card,muted,primary,secondary,accent,destructive,popover,sidebar,sidebar-accent}`
- `text-{foreground,muted-foreground,primary-foreground,...}`
- `border-{border,input}`, `ring-{ring}`
- `rounded-{sm,md,lg,xl,2xl,3xl,4xl,full}` (full is the only intentional non-token)
- `font-{sans,mono,heading}`
- Tailwind palette (`bg-amber-50`, `bg-green-600`) ONLY when shadcn's source uses
  it as a documented escape hatch (Alert "Custom Colors", etc.)

Forbidden:

- `bg-[#…]`, `text-[#…]`, `border-[#…]` (inline hex)
- `oklch(…)` anywhere
- `rounded-[Xpx]` (arbitrary radius). Use a `rounded-*` token class. Fractional
  case: `rounded-[min(var(--radius-md),Xpx)]` so the cascade still resolves.
- New CSS vars added inside the primitive file. New tokens go in
  `src/app/globals.css` and `@theme inline` first, then primitives consume them.

No app logic in primitives:

- No `useState` for app state, no fetched data, no auth.
- No imports from `@/features/*`, `@/server/*`.
- No translations, no i18n keys.
- Mechanical state for the primitive itself (Carousel embla, Sidebar open) stays.

## Variant example (`src/components/examples/<slug>-<variant>.tsx`)

One demo per file. Default-exported function, name `<SlugVariantPascal>()`.

File header (JSDoc; agents read this to know the contract):

```tsx
/**
 * @slug button
 * @variant outline
 * @upstream https://ui.shadcn.com/docs/components/button
 * @deviations []
 */
```

`@deviations` is a one-sentence-per-entry array. `[]` when the port is verbatim.

Import order:

1. `react`
2. `next/*`
3. External packages (alphabetical)
4. `@/components/ui/*`
5. `@/components/examples/_fixtures/*`
6. `@/lib/*`
7. Relative imports

`"use client"` directive ONLY when JSX calls a hook (`useState`, `useEffect`,
`useMemo`, `useCallback`, `useRef`, …). RSC by default.

Helpers stay in the same file. Do not export anything except the default
function.

Project rule adaptations (apply per-variant when porting):

- `@tabler/icons-react` → closest lucide-react equivalent
  (`IconGitBranch` → `GitBranchIcon`, `IconPlus` → `PlusIcon`, etc.)
- `next/image` raster → native `<img>` plus
  `{/* eslint-disable-next-line @next/next/no-img-element */}` on the line above.
  Never edit `next.config.ts` to add remote patterns for showcase fixtures.
- `next/link` → keep. `Link` with `asChild` is the standard pattern.
- `useMediaQuery` → `useIsMobile` from `@/hooks/use-mobile` (flip logic).
- `useRef(SideEffect())` accessed during render → `useMemo(() => SideEffect(), [])`.
  Carousel "Plugins" pattern.
- `<InputOTP defaultValue=…>` → controlled wrapper with `useState`. `defaultValue`
  on `<InputOTP>` triggers React's "controlled or uncontrolled" warning because
  `input-otp` renders both `value` and `defaultValue` on its hidden `<input>`.
- `prop={maybe?.value}` against an `exactOptionalPropertyTypes: true` type:
  prefer dropping the conditional when the surrounding type already accommodates
  the value, otherwise `?? <default>`, otherwise non-null assertion (rare).
- `ChartConfig`: each key is a discriminated union — `color` xor `theme`. Drop
  the `color` form, keep `theme` (cascades through dark mode).

## Block (`src/components/blocks/<block>.tsx`)

Page-level composition. Reused across `src/app/**`.

- Single default export.
- Props interface `<BlockName>Props`.
- Import order = examples + the additional bucket
  `@/components/examples/*` (between `@/components/ui/*` and `@/lib/*`).
- Tokens only.
- Server Component by default. Add `"use client"` only when interactivity
  demands it.
- `_registry.ts` `registryDependencies` lists every primitive AND example
  the block composes.

`/login` and `/login-3` consume blocks (≤ 20 LoC each). Pages do nothing
except render a block + thin wrappers.

## Registry entry recipes

Drop into the matching `_registry.ts` (or fragment file under `examples/`).

### `registry:ui`

```ts
{
  name: "button",
  type: "registry:ui",
  title: "Button",
  description:
    "Click target with text or icon, four sizes and six variants, supports asChild for polymorphic links.",
  files: [{ path: "components/ui/button.tsx", type: "registry:ui" }],
  upstreamUrl: "https://ui.shadcn.com/docs/components/button",
  categories: ["actions", "forms"],
}
```

Required: `name`, `type`, `files`. Recommended: `title`, `description`,
`upstreamUrl`, `categories`. Description ≥ 80 chars, specific.

### `registry:example`

```ts
{
  name: "button-outline",
  type: "registry:example",
  title: "Outline",
  description:
    "Secondary Button with a visible border instead of solid fill, suited to neutral actions.",
  slug: "button",
  variant: "outline",
  upstreamUrl: "https://ui.shadcn.com/docs/components/button",
  registryDependencies: ["button"],
  files: [{ path: "components/examples/button-outline.tsx", type: "registry:example" }],
  categories: ["actions", "forms"],
}
```

`isDefault: true` when this variant is the page-hero / canonical "Default".
`isFlagged: true` when the variant is NOT in the upstream `## Examples` block.
`deviations: ["…"]` when the JSX diverges from upstream for a project rule
(see "Variant example" above).

`registryDependencies` derived from `@/components/ui/*` imports of the file.

### `registry:block`

```ts
{
  name: "login-card",
  type: "registry:block",
  title: "Login Card",
  description:
    "Centered login form with email plus password, social providers, and a signup link.",
  registryDependencies: ["card", "input", "button", "label", "field"],
  related: ["signup-card", "forgot-password-card"],
  files: [{ path: "components/blocks/login-card.tsx", type: "registry:block" }],
  categories: ["auth", "marketing"],
}
```

`registryDependencies` lists every primitive AND example name the block
composes. Build script validates each one resolves.

## Description heuristic ("what / when / what it composes")

A registry description is the AI-grep target. Three sentences, bake into one:

1. **What it shows.** Visual contract (e.g. "side-by-side comparison of every
   Button size token paired with its icon-only counterpart").
2. **When an AI picks it.** Use case that distinguishes from sibling variants
   (e.g. "useful when picking the correct hit area for toolbars and dense
   forms").
3. **What it composes.** When the block or variant depends on more than its
   slug primitive (e.g. "composes Card + Input + Button + Label").

Minimum 80 characters. Drop generic fillers ("a flexible component for any
use case"); they do not help search.

## Common file-shape mistakes

- Multiple default exports per file. Only ONE allowed.
- Helper components factored to their own files. Keep helpers in the example
  file unless they are reused across two or more variants — then they belong
  in `_fixtures/`.
- Adding `"use client"` to RSC-eligible variants. Costs a chunk for nothing.
- Skipping the JSDoc header. Agents need slug + variant + upstream + deviations
  to keep the registry honest.
- Forgetting to list `_fixtures/<slug>.ts` imports under `registryDependencies`
  (these are runtime deps even if not registry items).
