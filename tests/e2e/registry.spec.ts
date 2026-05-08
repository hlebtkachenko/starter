import { expect, test } from "@playwright/test";

/**
 * Functional tests for the component registry deep-links on /showcase.
 *
 * For each registry slug, verifies:
 * 1. Navigating to /showcase#<slug> makes <section id="<slug>"> visible.
 * 2. At least one [data-registry-name] preview is rendered inside that section.
 * 3. No console errors occurred before the section became visible.
 *
 * This is a fast smoke pass — it does not snapshot, just asserts structure.
 */

const SHOWCASE_SLUGS = [
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

test.describe("registry deep-links @functional", () => {
  for (const slug of SHOWCASE_SLUGS) {
    test(`/showcase#${slug} renders section and preview`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(`/showcase#${slug}`);

      // Arrange: locate the section by its id.
      const section = page.locator(`section#${slug}`);

      // Act: wait for the section to be in the viewport.
      await expect(section).toBeVisible({ timeout: 15_000 });

      // Wait for at least one Suspense-resolved preview inside the section.
      await section
        .locator('[class*="animate-pulse"]')
        .waitFor({ state: "detached", timeout: 10_000 })
        .catch(() => {
          // Suspense already resolved — no fallback was present.
        });

      // Assert: section is present.
      await expect(section).toBeVisible();

      // Assert: at least one ComponentPreview rendered with data-registry-name.
      const previews = section.locator("[data-registry-name]");
      await expect(previews.first()).toBeVisible({ timeout: 10_000 });
      expect(await previews.count()).toBeGreaterThan(0);

      // Assert: no console errors before paint settled.
      // Filter known benign React hydration noise in dev mode.
      const realErrors = consoleErrors.filter(
        (msg) =>
          !msg.includes("Download the React DevTools") &&
          !msg.includes("ReactDOM.hydrate is no longer supported"),
      );
      expect(realErrors).toEqual([]);
    });
  }
});
