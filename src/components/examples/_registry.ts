/**
 * Example registry — aggregator. The actual entries live in per-group
 * fragment files: `_registry-<groupname>.ts`. Each fragment is owned by one
 * group of related components and can be edited in parallel without conflict.
 *
 * Adding a new example: pick the relevant fragment, append the entry, run
 * `pnpm registry:build`. If a new group is needed, create
 * `_registry-<group>.ts` and import + spread it here.
 *
 * The build script (`scripts/build-registry.ts`) reads `items` from this file,
 * validates everything, and emits `src/components/__index__.tsx` with literal
 * `React.lazy()` imports — that gives bundlers a static graph and AI agents a
 * single greppable index.
 */
import { items as buttons } from "./_registry-buttons";
import { items as display } from "./_registry-display";
import { items as feedback } from "./_registry-feedback";
import { items as forms } from "./_registry-forms";
import { items as layout } from "./_registry-layout";
import { items as menus } from "./_registry-menus";
import { items as navigation } from "./_registry-navigation";
import { items as overlays } from "./_registry-overlays";
import { items as effects } from "./_registry-effects";
import { items as utility } from "./_registry-utility";

export const items = [
  ...buttons,
  ...display,
  ...effects,
  ...feedback,
  ...forms,
  ...layout,
  ...menus,
  ...navigation,
  ...overlays,
  ...utility,
];
