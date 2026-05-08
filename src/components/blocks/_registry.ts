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
  {
    name: "login-card",
    type: "registry:block",
    title: "Login Card",
    description:
      "Split-screen login page: brand logo + email/password form left, decorative image right. Composes Field, Input, Button, and a GitHub OAuth button. Drop into any auth route as a zero-config starting point.",
    registryDependencies: ["card", "input", "button", "label", "field"],
    files: [{ path: "components/blocks/login-card.tsx", type: "registry:block" }],
    categories: ["auth", "marketing"],
    related: ["login-card-2", "login-card-3", "signup-card", "forgot-password-card"],
  },
  {
    name: "login-card-2",
    type: "registry:block",
    title: "Login Card (Multi-provider + MFA)",
    description:
      "Split-screen login with two-stage flow: credentials then TOTP OTP verification. Includes Google, GitHub, Apple, Microsoft OAuth buttons, passkey option, remember-me checkbox, and a decorative gradient right panel. Composes Alert, Checkbox, InputOTP, Field, Input, Button.",
    registryDependencies: ["alert", "checkbox", "input-otp", "input", "button", "label", "field"],
    files: [{ path: "components/blocks/login-card-2.tsx", type: "registry:block" }],
    categories: ["auth"],
    related: ["login-card", "login-card-3", "signup-card"],
  },
  {
    name: "login-card-3",
    type: "registry:block",
    title: "Login Card (Maintenance + i18n)",
    description:
      "Full-page login with maintenance-mode banner, locale toggle (en/cs auto-detect), maintenance dialog, and a marketing right panel with stats cards and AI feature card. Composes Badge, Card, Dialog, Alert, Field, Input, Button, and internal i18n provider.",
    registryDependencies: ["badge", "card", "dialog", "alert", "input", "button", "label", "field"],
    files: [{ path: "components/blocks/login-card-3.tsx", type: "registry:block" }],
    categories: ["auth", "marketing"],
    related: ["login-card", "login-card-2"],
  },
  {
    name: "signup-card",
    type: "registry:block",
    title: "Signup Card",
    description:
      "Centered signup form with full name, email, and password fields, plus a link back to sign-in. Scaffold following the login-card pattern; wire submit handler to Better Auth sign-up when implementing. Composes Field, Input, Button.",
    registryDependencies: ["input", "button", "label", "field"],
    files: [{ path: "components/blocks/signup-card.tsx", type: "registry:block" }],
    categories: ["auth"],
    related: ["login-card", "forgot-password-card"],
  },
  {
    name: "forgot-password-card",
    type: "registry:block",
    title: "Forgot Password Card",
    description:
      "Centered forgot-password form with a single email field that triggers a reset-link email. Scaffold following the login-card pattern; wire submit handler to Better Auth forgot-password endpoint when implementing. Composes Field, Input, Button.",
    registryDependencies: ["input", "button", "field"],
    files: [
      {
        path: "components/blocks/forgot-password-card.tsx",
        type: "registry:block",
      },
    ],
    categories: ["auth"],
    related: ["login-card", "signup-card"],
  },
]);
