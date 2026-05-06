/**
 * Shadcn-native registry schema, extended with project-local fields used by
 * AI agents and the showcase renderer.
 *
 * Authoritative shape for every entry in `_registry.ts` files under
 * `src/components/{ui,examples,blocks,hooks,lib}/`.
 *
 * The build script `scripts/build-registry.ts` reads every `_registry.ts`,
 * validates each item against this shape, and emits `src/components/__index__.tsx`
 * with literal `React.lazy(() => import(...))` calls — that gives bundlers a
 * static graph and AI agents a single greppable index.
 */

export type RegistryItemType =
  | "registry:ui"
  | "registry:example"
  | "registry:block"
  | "registry:hook"
  | "registry:lib";

export type RegistryItemFile = {
  path: string;
  type: RegistryItemType;
  /** Optional override for where the file lands when consumed via shadcn CLI. */
  target?: string;
};

/**
 * One catalog entry. Emit one of these per primitive, variant, or block.
 */
export type RegistryItem = {
  /** Unique kebab-case id. Examples: "button", "button-outline", "login-card". */
  name: string;
  type: RegistryItemType;
  /** Human label rendered in the showcase. Examples: "Button", "Outline". */
  title?: string;
  /**
   * Rich one-paragraph description. THIS IS THE AI GREP TARGET. Be specific
   * about what the item does, when to use it, and what it composes.
   */
  description?: string;
  /**
   * Other registry item names this one composes. Examples for "button-outline":
   * ["button"]. For "login-card": ["card", "input", "button", "label"].
   * Build script validates every name resolves.
   */
  registryDependencies?: string[];
  /** Source files. First is the entrypoint; default export is the demo or block. */
  files: RegistryItemFile[];
  /** Free-form tags for search. e.g. ["form","input","validation"]. */
  categories?: string[];
  /** Cross-references to related items the AI might want next to this one. */
  related?: string[];

  // Project-local extensions (ignored by the shadcn CLI):

  /** Primitive slug this item belongs to. Always set for `registry:example`. */
  slug?: string;
  /** Variant kebab id within the slug. Set for `registry:example`. */
  variant?: string;
  /** True if this is the page-hero / canonical Default for the slug. */
  isDefault?: boolean;
  /** True if this variant is NOT in the upstream `## Examples` block. */
  isFlagged?: boolean;
  /** Cross-link to upstream shadcn docs page or anchor. */
  upstreamUrl?: string;
  /** Showcase grid span hint. */
  span?: 1 | 2 | 3;
  /** Showcase grid height hint. */
  height?: "auto" | "tall";
  /**
   * Documented deviations from the upstream `.md` source. Each entry is one
   * sentence: what we changed and why. Surfaces in `docs/showcase.md`.
   */
  deviations?: string[];
};

export type Registry = {
  items: RegistryItem[];
};

/**
 * Convenience factory — emits `RegistryItem[]` typed for autocomplete.
 * Used in `_registry.ts` files: `export const items = defineItems([...])`.
 */
export function defineItems(items: RegistryItem[]): RegistryItem[] {
  return items;
}
