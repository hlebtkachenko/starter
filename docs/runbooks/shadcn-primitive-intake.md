---
title: shadcn primitive intake — add or update one component in src/components/ui/
severity: meta
last_drilled: 2026-05-06
related_adrs: []
---

# shadcn primitive intake

> Reusable procedure for putting a shadcn primitive into the project so a single token edit (radius, color, font) cascades to every page that consumes it. This is upstream of any showcase work: get the primitive right here and the rest follows.

## Scope

Use this runbook when:

- Adding a primitive that is not yet in `src/components/ui/`.
- Updating an existing primitive to a newer shadcn version.
- Re-pasting after the registry style changes.

Out of scope:

- Composed feature components (live in `src/features/<x>/ui/`, not `src/components/ui/`).
- Showcase variant authoring (downstream; see [`showcase-rebuild.md`](showcase-rebuild.md)).

## Mental model

The cascade is the whole point.

```
src/app/globals.css        :root { --radius, --primary, --border, ... }
       ↓ @theme inline
Tailwind utility classes   bg-primary, rounded-lg, border-border, ...
       ↓ used by
src/components/ui/<name>   <Button className="bg-primary rounded-lg ..." />
       ↓ imported by
every consumer             <Button>...</Button>
```

If a primitive uses inline hex (`bg-[#dc2626]`), or a hardcoded radius (`rounded-[10px]`), the cascade breaks at that node. Editing `globals.css` afterwards leaves that primitive stale, and consumers drift visually. **The rule is: a primitive only consumes tokens through Tailwind classes.**

## Source of truth

`https://ui.shadcn.com/docs/components/<slug>.md`. The MD file contains the canonical implementation under `## Installation → Manual`. Use that, not the rendered HTML or third-party copies.

The CLI is fine when the registry is reachable:

```bash
pnpm dlx shadcn@latest add <slug>
```

It honors [`components.json`](../../components.json) (`style: radix-nova`, alias `@/components/ui`) and writes to the right path with the right CSS-var classes. If the CLI fails or the registry diverges from what you want, fall back to manual paste from the `.md` (steps below).

## Procedure (manual paste)

### 1. Read the MD

```bash
SLUG=button-group
curl -sL "https://ui.shadcn.com/docs/components/$SLUG.md" \
  | awk '/^## Installation/,/^## Usage/'
```

The first `tsx` code block under `Manual` (or under `## Installation` for CLI-only components) is the primitive source. Read every line. Note new dependencies (`radix-ui`, `embla-carousel-react`, etc.).

### 2. Install missing dependencies

```bash
pnpm add <pkg>
```

Lockfile churn is fine. Do not pin to a different major than shadcn ships against.

### 3. Create or replace the file

Path: `src/components/ui/<slug>.tsx`. One file per primitive. Kebab-case file, PascalCase exports. Replace the existing file in place when updating. Do not version-suffix (`button-v2.tsx`).

Paste the source. Then make exactly these adjustments:

| Edit | Why |
|---|---|
| Imports rewritten to project aliases (`@/components/ui/<x>`, `@/lib/utils`) | Matches `components.json` aliases |
| `cn` from `@/lib/utils` (not `clsx` directly) | Project convention; `cn` already wraps clsx + tailwind-merge |
| Icons from `lucide-react` only | `iconLibrary: "lucide"` in `components.json` |
| Variants always via `cva` from `class-variance-authority` | Single source of variant truth, type-safe with `VariantProps` |
| Polymorphism via Radix `Slot` (`asChild`) | shadcn convention; consumers can wrap with `Link`, `button`, etc. |
| `forwardRef` where the source uses it | Preserves ref forwarding to consumers and Radix portals |

### 4. Token rules (the cascade contract)

Every styling decision in the primitive must route through a Tailwind class that maps to a CSS variable.

**Allowed:**

| Class shape | Resolves to | Edit point |
|---|---|---|
| `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `bg-secondary`, `bg-accent`, `bg-destructive`, `bg-popover`, `bg-sidebar`, `bg-sidebar-accent` | `--<name>` via `@theme inline` | `globals.css` `:root` / `.dark` |
| `text-foreground`, `text-muted-foreground`, `text-primary-foreground`, ... | same | same |
| `border-border`, `border-input`, `ring-ring` | same | same |
| `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-4xl` | `--radius-*` (calc'd from `--radius`) | `globals.css` `--radius` |
| `rounded-full` | `9999px` (intentionally not a token) | n/a |
| `font-sans`, `font-mono`, `font-heading` | `--font-*` from `@theme inline` | `globals.css` `@theme inline` |
| Tailwind palette utilities only when shadcn's source uses them as a documented escape hatch (e.g. `bg-amber-50` in Alert "Custom Colors") | Tailwind palette | n/a; intentional opt-out |

**Forbidden:**

- Inline hex: `bg-[#dc2626]`, `text-[#171717]`. Use the token class.
- `oklch(...)` anywhere. Project rule.
- Arbitrary radius values: `rounded-[10px]`. Use a `rounded-*` class. If a fractional radius is unavoidable (input addons, button-group corners), use `rounded-[min(var(--radius-md),10px)]` form so the cascade still applies.
- New CSS variables added in the primitive file. New tokens go in `globals.css` and `@theme inline` first, then the primitive consumes them.
- Swapping a token class for a hardcoded equivalent because "it looks the same now". The point is future config changes.

### 5. Composition primitives

Most shadcn components ship a family of subcomponents (`Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`). Export every subcomponent named in the upstream MD. Do not collapse them into one component "for ergonomics" — consumers and downstream registries rely on the named exports.

```ts
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
```

### 6. No app logic in primitives

Primitives are presentation. Forbidden inside `src/components/ui/`:

- `useState` for app state (timer, fetched data, auth).
- Imports from `@/features/*`.
- Imports from `@/server/*`.
- Hardcoded fixture data (FAQ items, table rows).
- Translations or i18n keys.

If shadcn's source has internal state (e.g. `Carousel` keeping embla state, `Sidebar` keeping open state), keep it: it is mechanical state for the primitive itself.

### 7. Verify the cascade

```bash
pnpm typecheck
pnpm lint
```

Both must pass with no new errors. Then stress-test the cascade:

```bash
# Temporarily edit src/app/globals.css :root { --radius: 1.5rem; }
pnpm dev
# Open /showcase. Every component using rounded-* should grow corners.
# Revert globals.css.
```

If a primitive does not respond to the change, it has bypassed the token system. Find the offending class (`rounded-[10px]`, `bg-[#xxx]`) and replace it.

### 8. Update the design system map

Add or update the row in [`docs/DESIGN-SYSTEM.md`](../DESIGN-SYSTEM.md) under "Component map":

```md
| <slug> | src/components/ui/<slug>.tsx | shipped |
```

Status values: `shipped`, `pending`, `deprecated`.

### 9. Wire into the showcase (optional, downstream)

After the primitive is committed, add a `<Section>` to the relevant group file in `src/components/showcase/` per [`showcase-rebuild.md`](showcase-rebuild.md). Showcase is a preview of what already exists in `src/components/ui/`; the primitive is what consumers import.

### 10. Commit

One primitive per commit. Conventional Commits, `ui` scope:

```bash
git add src/components/ui/<slug>.tsx components.json package.json pnpm-lock.yaml docs/DESIGN-SYSTEM.md
git commit -m "feat(ui): add <slug> primitive"
```

When updating:

```bash
git commit -m "chore(ui): repaste <slug> from shadcn registry <date>"
```

## Anti-patterns

- **Forking the primitive on npm.** Re-paste, do not publish.
- **Wrapping the primitive in a feature wrapper inside `src/components/ui/`.** Wrappers go in `src/features/<x>/ui/`.
- **"Theming" by editing the primitive's classes per use case.** Theme via tokens. If the primitive needs a new variant, add it to `cva` and document it.
- **Swapping `cva` for hand-rolled className concatenation.** Variants escape consumer awareness.
- **Skipping `forwardRef` "to make types simpler".** Radix portals and asChild patterns rely on ref forwarding.
- **Bypassing `components.json` aliases.** Future CLI re-paste will fight you.

## Done definition

A primitive is correctly intaken when:

1. File exists at `src/components/ui/<slug>.tsx` matching upstream shadcn structure.
2. Every styling decision uses a token-bound Tailwind class. No inline hex, no `oklch`, no arbitrary radius.
3. Every subcomponent named in the upstream MD is exported.
4. `pnpm typecheck` and `pnpm lint` pass.
5. Cascade test passes: editing `--radius` or a color token in `globals.css` visibly changes the primitive everywhere it is rendered, including showcase.
6. `docs/DESIGN-SYSTEM.md` component map updated.
7. One commit on its own.
