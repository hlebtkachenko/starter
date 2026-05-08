/**
 * Variant example scaffold. Copy + rename to <slug>-<variant>.tsx.
 *
 * - slug: kebab-case primitive id matching ui/_registry.ts entry.
 * - variant: kebab-case variant name within the slug.
 * - upstream: shadcn docs URL the variant ports.
 * - deviations: each entry one sentence; what we changed and why. [] if none.
 *
 * Contract enforced by docs/conventions/component-templates.md:
 * - Add "use client" ONLY if JSX uses hooks (useState, useEffect, useMemo, etc.).
 * - Imports ordered: react -> next/* -> external pkgs -> @/components/ui/* ->
 *   @/lib/* -> relative.
 * - SINGLE default export. Helpers stay in this file (no separate exports).
 * - Function name PascalCase: <SlugVariantPascal>.
 * - No inline hex, no oklch, no arbitrary radius. Token classes only.
 * - InputOTP: NEVER pass defaultValue. Use a useState controlled wrapper.
 *
 * @slug example
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/example
 * @deviations []
 */
import { Button } from "@/components/ui/button";

export default function ExampleDefault() {
  return <Button>Example</Button>;
}
