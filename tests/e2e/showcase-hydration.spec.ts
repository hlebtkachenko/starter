import { expect, test } from "@playwright/test";

/**
 * Hydration mismatch detector for /showcase.
 *
 * Loads the full showcase page and asserts zero hydration errors in the
 * console. Catches locale-dependent formatting (toLocaleDateString,
 * toLocaleString), theme-dependent inline styles, and any other
 * server/client HTML divergence.
 *
 * Runs in CI on every PR via the existing e2e workflow.
 */

test.describe("Showcase hydration @functional", () => {
  test("no hydration mismatch errors on /showcase", async ({ page }) => {
    const hydrationErrors: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (
        text.includes("hydrat") ||
        text.includes("did not match") ||
        text.includes("server rendered") ||
        text.includes("Hydration failed")
      ) {
        hydrationErrors.push(text.slice(0, 300));
      }
    });

    page.on("pageerror", (err) => {
      if (err.message.includes("hydrat") || err.message.includes("Hydration")) {
        hydrationErrors.push(err.message.slice(0, 300));
      }
    });

    await page.goto("/showcase", { waitUntil: "networkidle" });

    // Wait for lazy components to resolve out of Suspense
    await page
      .locator('[class*="animate-pulse"]')
      .first()
      .waitFor({ state: "detached", timeout: 30_000 })
      .catch(() => {});

    // Give React time to finish hydration and flush warnings
    await page.waitForTimeout(2_000);

    expect(hydrationErrors, `Hydration errors found:\n${hydrationErrors.join("\n")}`).toHaveLength(
      0,
    );
  });

  test("no hydration errors on /showcase/blocks", async ({ page }) => {
    const hydrationErrors: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (
        text.includes("hydrat") ||
        text.includes("did not match") ||
        text.includes("server rendered") ||
        text.includes("Hydration failed")
      ) {
        hydrationErrors.push(text.slice(0, 300));
      }
    });

    await page.goto("/showcase/blocks", { waitUntil: "networkidle" });

    await page.waitForTimeout(2_000);

    expect(hydrationErrors, `Hydration errors found:\n${hydrationErrors.join("\n")}`).toHaveLength(
      0,
    );
  });
});
