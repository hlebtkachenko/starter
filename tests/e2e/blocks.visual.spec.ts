import { expect, test } from "@playwright/test";

/**
 * Visual regression snapshots for /showcase/blocks.
 *
 * One snapshot per block section (`<section id="<name>">`) found on the page.
 * Block sections are tall (min-h-[20rem]) and contain full page-level
 * composed layouts. Their inner content is masked to avoid flake from
 * font rendering differences between machines.
 *
 * Snapshots are captured on chromium only.
 *
 * To regenerate baselines after intentional UI changes:
 *   pnpm test:e2e --update-snapshots
 */

const BLOCK_NAMES = [
  "login-card",
  "login-card-2",
  "login-card-3",
  "signup-card",
  "forgot-password-card",
];

test.describe("blocks visual", () => {
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }`,
    });
  });

  for (const name of BLOCK_NAMES) {
    test(`${name} section snapshot`, async ({ page }) => {
      await page.goto(`/showcase/blocks#${name}`);

      const section = page.locator(`section#${name}`);
      await expect(section).toBeVisible({ timeout: 15_000 });

      // Wait for Suspense fallback to clear.
      await section
        .locator('[class*="animate-pulse"]')
        .waitFor({ state: "detached", timeout: 10_000 })
        .catch(() => {
          // No Suspense fallback visible.
        });

      await expect(section).toHaveScreenshot(`${name}.png`, {
        // Mask interactive form content that may differ due to autofill or
        // focus-visible state on different machines.
        mask: [section.locator("[data-registry-name]")],
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
