import { expect, test } from "@playwright/test";
// import AxeBuilder from "@axe-core/playwright";

test.describe("<flow name>", () => {
  // Tag conventions are intentionally absent until a corresponding `--grep` filter
  // exists (see playwright.config.ts). Add `@smoke` (or similar) to a test name only
  // when the matching CI job / pnpm script is wired.
  test("<persona> can <outcome>", async ({ page }) => {
    // Arrange: fixtures (typed) imported from "../fixtures"

    // Act: drive the page via a page-object pattern when interactions repeat
    await page.goto("/");

    // Assert: observable outcome
    await expect(page).toHaveTitle(/.+/);

    // A11y scan after the page settles (uncomment once @axe-core/playwright installed)
    // const results = await new AxeBuilder({ page }).analyze();
    // expect(results.violations).toEqual([]);
  });
});
