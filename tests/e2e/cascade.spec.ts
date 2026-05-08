import { expect, test } from "@playwright/test";

/**
 * Automated cascade contract test.
 *
 * Verifies that the --radius CSS custom property on :root propagates into
 * component computed styles. This is the programmatic proof that the token
 * cascade works end-to-end in the browser — no visual snapshot needed.
 *
 * Method:
 * 1. Navigate to /showcase#button (small section, fast to load).
 * 2. Read getComputedStyle of a Demo card wrapper div — the baseline
 *    border-top-left-radius value. Demo uses rounded-[var(--radius)], which
 *    Tailwind v4 emits as border-radius: var(--radius) — a live custom
 *    property reference rather than a precomputed static value.
 * 3. Override --radius on documentElement to 1.5rem.
 * 4. Re-read the computed style and assert it changed.
 * 5. Reset via removeProperty and confirm the original value is restored.
 *
 * Note: Tailwind v4 @theme inline compiles static utility classes like
 * rounded-lg to border-radius: var(--radius-lg), which itself resolves to
 * var(--radius). Both chains cascade at runtime. The Demo card uses the
 * arbitrary-value form rounded-[var(--radius)] so it is a direct reference.
 */

test.describe("CSS token cascade @functional", () => {
  test("--radius changes propagate to Demo card computed border-radius", async ({ page }) => {
    await page.goto("/showcase#button");

    const section = page.locator("section#button");
    await expect(section).toBeVisible({ timeout: 15_000 });

    // Wait for the button previews to resolve out of Suspense.
    await section
      .locator('[class*="animate-pulse"]')
      .waitFor({ state: "detached", timeout: 10_000 })
      .catch(() => {});

    // Arrange: read the baseline computed border-radius of the first Demo card.
    // Demo cards use rounded-[var(--radius)] so border-radius is var(--radius)
    // — a live custom property reference that updates when --radius changes.
    const baseline = await page.evaluate(() => {
      // The Demo component renders a div with rounded-[var(--radius)] and a
      // flex flex-col wrapper. We target the first child div of section#button
      // that has a border (the card container).
      const section = document.querySelector("section#button");
      if (!section) throw new Error("section#button not found");
      const card = section.querySelector('div[class*="rounded"]') as HTMLElement | null;
      if (!card) throw new Error("Demo card not found in section#button");
      return {
        radius: getComputedStyle(card).borderTopLeftRadius,
        cssVarRadius: getComputedStyle(document.documentElement)
          .getPropertyValue("--radius")
          .trim(),
      };
    });

    expect(baseline.radius).toBeTruthy();
    // Browser may omit the leading zero: ".625rem" or "0.625rem" are both valid.
    expect(baseline.cssVarRadius).toMatch(/\.625rem$/);
    // Browser resolves rem to px: 0.625rem * 16 = 10px.
    expect(baseline.radius).toMatch(/px$/);

    // Act: override --radius to 1.5rem (24px).
    await page.evaluate(() => {
      document.documentElement.style.setProperty("--radius", "1.5rem");
    });

    const afterOverride = await page.evaluate(() => {
      const section = document.querySelector("section#button");
      if (!section) throw new Error("section#button not found");
      const card = section.querySelector('div[class*="rounded"]') as HTMLElement | null;
      if (!card) throw new Error("Demo card not found");
      return getComputedStyle(card).borderTopLeftRadius;
    });

    // Assert: computed value differs from baseline.
    expect(afterOverride).not.toEqual(baseline.radius);
    expect(afterOverride).toMatch(/px$/);
    // 1.5rem at 16px base = 24px.
    expect(afterOverride).toBe("24px");

    // Cleanup: restore the original --radius.
    await page.evaluate(() => {
      document.documentElement.style.removeProperty("--radius");
    });

    const afterReset = await page.evaluate(() => {
      const section = document.querySelector("section#button");
      if (!section) throw new Error("section#button not found");
      const card = section.querySelector('div[class*="rounded"]') as HTMLElement | null;
      if (!card) throw new Error("Demo card not found");
      return getComputedStyle(card).borderTopLeftRadius;
    });

    // Assert: value is back to baseline after reset.
    expect(afterReset).toEqual(baseline.radius);
  });
});
