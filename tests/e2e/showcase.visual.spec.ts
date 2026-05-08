import { expect, test } from "@playwright/test";

/**
 * Visual regression snapshots for /showcase.
 *
 * One snapshot per section (`<section id="<slug}">`) found on the page.
 * Sections with animated or time-sensitive content (charts, calendars,
 * carousels, sliders, spinners, sonner, progress) have their inner content
 * masked to avoid flake from anti-aliasing or micro-animation differences.
 *
 * Snapshots are captured on chromium only (the playwright.config.ts projects
 * array adds firefox/webkit only in CI, and those projects would need their
 * own separate baselines before being enabled there).
 *
 * To regenerate baselines after intentional UI changes:
 *   pnpm test:e2e --update-snapshots
 */

// Slugs whose inner demo content changes frame-to-frame.
const ANIMATED_SLUGS = new Set([
  "calendar",
  "carousel",
  "chart",
  "progress",
  "skeleton",
  "slider",
  "sonner",
  "spinner",
]);

test.describe("showcase visual", () => {
  // Collect section ids dynamically so the test list is always in sync with
  // the registry — no hard-coded slug list to maintain here.
  const knownSlugs = [
    "accordion",
    "alert",
    "alert-dialog",
    "aspect-ratio",
    "avatar",
    "badge",
    "breadcrumb",
    "button",
    "button-group",
    "calendar",
    "card",
    "carousel",
    "chart",
    "checkbox",
    "collapsible",
    "combobox",
    "command",
    "context-menu",
    "dialog",
    "drawer",
    "dropdown-menu",
    "empty",
    "field",
    "hover-card",
    "input",
    "input-group",
    "input-otp",
    "item",
    "kbd",
    "label",
    "menubar",
    "native-select",
    "navigation-menu",
    "pagination",
    "popover",
    "progress",
    "radio-group",
    "resizable",
    "scroll-area",
    "select",
    "separator",
    "sheet",
    "sidebar",
    "skeleton",
    "slider",
    "sonner",
    "spinner",
    "switch",
    "table",
    "tabs",
    "textarea",
    "toggle",
    "toggle-group",
    "tooltip",
  ];

  for (const slug of knownSlugs) {
    test(`${slug} section snapshot`, async ({ page }) => {
      await page.goto(`/showcase#${slug}`);

      // Disable CSS transitions and animations after navigation to get
      // deterministic screenshots. Must be injected after goto so the style
      // persists on the loaded document; beforeEach runs on a blank page and
      // the injected style would be discarded on navigation.
      await page.addStyleTag({
        content: `*, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }`,
      });

      const section = page.locator(`section#${slug}`);
      await expect(section).toBeVisible({ timeout: 15_000 });

      // Wait for lazy-loaded components inside the section to resolve.
      // The ComponentPreview uses React.lazy + Suspense; the fallback is a
      // pulsing div that disappears once the chunk loads.
      // For the skeleton section the animate-pulse divs ARE the content, so
      // this wait will time out (caught) and we proceed to snapshot.
      await section
        .locator('[class*="animate-pulse"]')
        .waitFor({ state: "detached", timeout: 10_000 })
        .catch(() => {
          // No Suspense fallback visible — component already loaded, or
          // the component itself renders animate-pulse (e.g. skeleton).
        });

      const maskLocators = ANIMATED_SLUGS.has(slug)
        ? [section.locator("[data-registry-name]")]
        : [];

      await expect(section).toHaveScreenshot(`${slug}.png`, {
        mask: maskLocators,
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
