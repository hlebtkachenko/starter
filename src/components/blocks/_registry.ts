/**
 * Block registry. One entry per page-level composed component in
 * `src/components/blocks/`. Blocks are reusable across `src/app/**` pages.
 *
 * Conventions:
 * - File names are kebab-case (e.g. `login-card.tsx`, `pricing-table.tsx`).
 * - Each block file has a SINGLE default export.
 * - `registryDependencies` lists the primitives AND examples it composes.
 * - `description` is what an AI greps when picking a block to drop into a page.
 */
import { defineItems } from "@/lib/registry-schema";

export const items = defineItems([
  // Populated incrementally as composed UI is needed by app routes.
  //
  // Example shape:
  //
  // {
  //   name: "login-card",
  //   type: "registry:block",
  //   title: "Login Card",
  //   description: "Centered login form with email + password, social providers, and signup link.",
  //   registryDependencies: ["card","input","button","label","field"],
  //   files: [{ path: "components/blocks/login-card.tsx", type: "registry:block" }],
  //   categories: ["auth","marketing"],
  //   related: ["signup-card","forgot-password-card"],
  // },
]);
