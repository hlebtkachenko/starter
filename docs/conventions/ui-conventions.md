# UI conventions

## Component structure

- One component per file.
- File: `kebab-case.tsx`. Component: `PascalCase` named export.
- Co-locate types in same file unless exported across slices.
- Props interface named `<Component>Props`.

```tsx
type OrgSwitcherProps = {
  current: Organization;
  onSwitch: (next: Organization) => void;
};

export function OrgSwitcher({ current, onSwitch }: OrgSwitcherProps) {
  return ( ... );
}
```

## shadcn rules

- Primitives copy-pasted into `src/components/ui/`. Never publish a fork to npm.
- Variants via `class-variance-authority` (`cva`).
- Use Radix Slot pattern (`asChild`) for composition.
- When upstream shadcn updates: re-paste, diff, re-test. Do not chase upstream changes blindly.

## Tokens

- Hex tokens only. Never `oklch`.
- Defined in [`src/app/globals.css`](../../src/app/globals.css) under `:root` + dark `@media`.
- Exposed to Tailwind via `@theme inline`.
- Use Tailwind classes referencing tokens (`bg-background`, `text-foreground`); never inline hex in components.

## Tailwind class order

Biome / Prettier-equivalent: layout → spacing → sizing → typography → color → state → responsive. Tooling sorts.

## Mobile-first

- Default styles target mobile.
- Use `sm:`, `md:`, `lg:`, `xl:` only to **add** styles, never to override mobile defaults.

## Forms

- `react-hook-form` with `@hookform/resolvers/zod`.
- One zod schema per form, exported from `features/<x>/schema.ts`.
- Submit handler is a server action.
- Error display next to field, not in a banner (banners only for global errors).

## Accessibility baseline

- WCAG AA for color contrast.
- Semantic HTML; landmark roles via element choice (`<nav>`, `<main>`, `<aside>`).
- All interactive elements keyboard-reachable.
- All inputs paired with `<label>` (visible or `sr-only`).
- All images have `alt` (`""` for decorative).
- Focus ring visible (Tailwind default `:focus-visible` ring).

## Icons

`lucide-react`. 16/20/24 px sizes. Stroke `currentColor`.

## State

- Server state via RSC + server actions. No global client store day 1.
- Client state: `useState`, `useReducer`, `useTransition`.
- Optimistic UI via `useOptimistic`.
