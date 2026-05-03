# components/

> UI building blocks. Two layers: primitives (`ui/`) and composed feature components (in feature folders).

## Layers

| Layer | Where | What |
|---|---|---|
| Primitives | `src/components/ui/` | shadcn-pasted; cva variants; no business logic |
| Composed | `src/features/<x>/ui/` | Bound to a feature; calls feature server actions |
| App-shell | `src/app/(app)/_components/` (when needed) | Layout-only |

## Primitive rules

- One component per file. `kebab-case.tsx` → `PascalCase` named export.
- Variants via `class-variance-authority` (`cva`).
- Composition via Radix `Slot` (`asChild`) where applicable.
- Hex tokens via Tailwind classes referencing `:root` vars. Never inline hex.
- No business logic. Primitives never call server actions or fetch data.

## Adding a primitive

1. `pnpm dlx shadcn@latest add <component>` (or copy from upstream).
2. Re-paste: do not import from a fork.
3. Adapt to project tokens (replace `oklch` references with our hex CSS vars).
4. Add to design system map in [`docs/DESIGN-SYSTEM.md`](../../docs/DESIGN-SYSTEM.md).

## Layout

```
src/components/
├── README.md
└── ui/
    ├── _TEMPLATE.tsx
    ├── button.tsx
    ├── input.tsx
    └── ...
```
