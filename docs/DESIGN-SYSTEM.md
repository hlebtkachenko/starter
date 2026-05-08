# Design system

> Hex tokens, type scale, spacing, components, motion. Single source of truth for visual language.

## Principles

- Clarity over decoration.
- Hex tokens only. **Never `oklch`** (rule: [`.claude/rules/frontend.md`](../.claude/rules/frontend.md)).
- shadcn-first; primitives copy-pasted into `src/components/ui/`, never re-published as a fork.
- Mobile-first breakpoints.
- WCAG AA baseline.

## Color tokens

Defined in [`src/app/globals.css`](../src/app/globals.css) as CSS custom properties under `:root` and `@media (prefers-color-scheme: dark)`. Re-exposed via `@theme inline` for Tailwind v4.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#ffffff` | `#0a0a0a` | Page bg |
| `--foreground` | `#171717` | `#ededed` | Body text |
| `--muted` | `#f4f4f5` | `#1a1a1a` | Secondary surface |
| `--muted-foreground` | `#71717a` | `#a1a1aa` | Secondary text |
| `--border` | `#e4e4e7` | `#27272a` | Hairlines |
| `--accent` | `#0ea5e9` | `#38bdf8` | Brand action |
| `--destructive` | `#dc2626` | `#ef4444` | Destructive action |
| `--success` | `#16a34a` | `#22c55e` | Success state |

Extend by adding new `--*` vars + matching `@theme inline` exposure. Never inline hex in components.

## Typography

| Role | Family | Size | Weight | Line height |
|---|---|---|---|---|
| Display | Geist Sans | 36px | 600 | 40px |
| Heading 1 | Geist Sans | 28px | 600 | 32px |
| Heading 2 | Geist Sans | 22px | 600 | 28px |
| Body | Geist Sans | 14px | 400 | 20px |
| Small | Geist Sans | 12px | 400 | 16px |
| Mono | Geist Mono | 13px | 400 | 18px |

Loaded via `next/font/google` in `src/app/layout.tsx`. Variables: `--font-geist-sans`, `--font-geist-mono`.

## Spacing

Tailwind default 4px scale. Use `gap-*`, `p-*`, `m-*`. Do not introduce custom values; if missing, propose via ADR.

## Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `0.25rem` | Inputs, badges |
| `--radius-md` | `0.5rem` | Cards, buttons |
| `--radius-lg` | `0.75rem` | Modals, panels |
| `--radius-full` | `9999px` | Pills, avatars |

## Shadow

Tailwind defaults (`shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`). Avoid `shadow-2xl`.

## Component map

Primitives live in `src/components/ui/`. Composed components (org switcher, billing portal link, etc.) live in feature `ui/` folders.

| shadcn primitive | File | Status |
|---|---|---|
| (none yet) | – | Add per `_TEMPLATE.tsx` when first feature needs one |

## New components (external registries)

Components imported from third-party shadcn-compatible registries. Each is adapted to project tokens and style, rendered under "New Components" on `/showcase`.

| Component | Proposed group | Source |
|---|---|---|
| Noise Background | effects | [noise-background](https://ui.aceternity.com/components/noise-background) |
| Stateful Button | buttons | [stateful-button](https://ui.aceternity.com/components/stateful-button) |
| Multi Step Loader | feedback | [multi-step-loader](https://ui.aceternity.com/components/multi-step-loader) |
| Separator Extended | layout | [separator-extended](https://basecn.dev/docs/components/separator-extended) |
| Card Styles | display | [card-styles](https://cardcn.dev/cards/basic-cards/) |
| Autocomplete | forms | [autocomplete](https://coss.com/ui/docs/components/autocomplete) |

## Motion

| Use | Duration | Easing |
|---|---|---|
| Hover | 120ms | `ease-out` |
| Enter | 180ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Exit | 120ms | `ease-in` |
| Page transition | 200ms | `ease-out` |

Reduce motion: respect `prefers-reduced-motion`: gate non-essential motion.

## Iconography

`lucide-react`. 16/20/24 px sizes. `currentColor` stroke. No raster icons in UI.

## Voice

| Tone | Example |
|---|---|
| Direct | "Save changes" not "Click here to save your changes" |
| Specific | "5 invites sent" not "Invitations have been sent" |
| Active | "We sent the email" not "The email was sent" |

No em-dash. Use comma, colon, or parentheses.
