import { expect, test } from "@playwright/test";
// import AxeBuilder from "@axe-core/playwright";

test.describe("<flow name>", () => {
  test("<persona> can <outcome> @smoke", async ({ page }) => {
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
