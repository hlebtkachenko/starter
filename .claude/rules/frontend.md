---
area: frontend
severity: block
---

# Frontend rules

## Hex tokens, not oklch

- Color tokens defined in `src/app/globals.css` use **hex**.
- Never write `oklch(...)` in components or tokens.

**Why:** stable across browsers, simpler diff review, designer-friendly.
**How to apply:** add new color → hex CSS var in `:root` + `@theme inline` exposure.

## shadcn primitives copy-pasted, not forked

- Components in `src/components/ui/` are owned source — re-paste from upstream when needed; do not publish to npm.
- Variants via `cva`. Composition via Radix `Slot` (`asChild`).

## No inline styles

- Use Tailwind classes referencing tokens.
- `style={{ ... }}` only when computed at runtime (e.g., progress bar width).

## Mobile-first

- Default styles target mobile.
- `sm:`, `md:`, `lg:`, `xl:` only **add** styles. Never use to override mobile defaults.

## Function components only

- No class components.
- Hooks for state and lifecycle.

## Accessibility baseline

- Semantic HTML.
- All inputs paired with `<label>`.
- All images have `alt` (`""` for decorative).
- Keyboard-reachable.
- WCAG AA color contrast.

## No new font families without ADR

Geist Sans + Geist Mono are the system. Adding a third font needs an ADR.
