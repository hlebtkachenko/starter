# Component work rules

## Read before touching components

**Always** read these before adding, fixing, or modifying components:
- `docs/runbooks/new-components.md` (complete ops guide, 23 gotchas)
- `docs/runbooks/component-import.md` (style rules, pipeline checklist)

**Why:** External components bypass the entire design token system. Skipping the guide leads to raw HTML, hardcoded colors, broken themes, and failed ESLint gates.

**Where it binds:** Any work touching `src/components/ui/`, `src/components/examples/`, `_registry*.ts`, or `components.json`.

**How to fix when violated:** Read the guides, then re-check your work against the 13-step pipeline in `component-import.md`.

## No raw interactive HTML in ui/

**Never** use `<button>`, `<input>`, `<select>`, `<textarea>` in `src/components/ui/`. Use shadcn primitives (`Button`, `Input`, `NativeSelect`, `Textarea`). ESLint rule `no-raw-interactive-html` blocks commits.

## No design system bypass

**Never** use bare `rounded`, inline hex colors, oklch(), or arbitrary radius values. ESLint rules block all of these at error severity.

## Default exports for examples

**Always** use `export default function PascalName()` in example files. `React.lazy()` requires default exports. Named exports like `export function Pattern()` will not render in showcase.
