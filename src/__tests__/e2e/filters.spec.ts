import { test, expect } from "@playwright/test";

test.describe("Rick and Morty Character Filters", () => {
  test("should open and close filter panel", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByTestId("filter-option-starred-All")
    ).not.toBeVisible();

    await page.getByTestId("filter-button").click();

    await expect(page.getByTestId("filter-option-starred-All")).toBeVisible();
    await expect(page.getByTestId("filter-option-species-All")).toBeVisible();
    await expect(page.getByText("Specie")).toBeVisible();

    await page.getByTestId("filter-button").click();

    await expect(
      page.getByTestId("filter-option-starred-All")
    ).not.toBeVisible();
  });

  test("should filter characters by species Human", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("filter-button").click();

    await page.getByTestId("filter-option-species-Human").click();

    await expect(page.getByTestId("filter-option-species-Human")).toHaveClass(
      /bg-primary-100/
    );

    await page.getByTestId("filter-apply-button").click();

    await expect(page.getByText(/\d+ Results/)).toBeVisible();

    await expect(page.getByText("1 Filter")).toBeVisible();

    await expect(page.getByText("Character").first()).not.toBeVisible();
  });

  test("should filter characters by species Alien", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("filter-button").click();

    await page.getByTestId("filter-option-species-Alien").click();

    // Verificar selección visual
    await expect(page.getByTestId("filter-option-species-Alien")).toHaveClass(
      /bg-primary-100/
    );

    // Aplicar filtros
    await page.getByTestId("filter-apply-button").click();

    // Verificar resultados
    await expect(page.getByText(/\d+ Results/)).toBeVisible();
    await expect(page.getByText("1 Filter")).toBeVisible();
  });

  test("should filter by character type Starred", async ({ page }) => {
    await page.goto("/");

    // Abrir filtros
    await page.getByTestId("filter-button").click();

    // Seleccionar filtro Starred
    await page.getByTestId("filter-option-starred-Starred").click();

    // Verificar selección visual
    await expect(page.getByTestId("filter-option-starred-Starred")).toHaveClass(
      /bg-primary-100/
    );

    // Aplicar filtros
    await page.getByTestId("filter-apply-button").click();

    // Verificar resultados
    await expect(page.getByText(/\d+ Results/)).toBeVisible();
    await expect(page.getByText("1 Filter")).toBeVisible();
  });

  test("should sort characters alphabetically A-Z to Z-A", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Sort by name").click();

    await expect(page.getByText("A-Z")).toBeVisible();

    await page.getByLabel("Sort by name").click();

    await expect(page.getByText("Z-A")).toBeVisible();

    await page.getByLabel("Sort by name").click();

    await expect(page.getByText("A-Z")).not.toBeVisible();
    await expect(page.getByText("Z-A")).not.toBeVisible();
  });

  test("should search characters by name", async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("Search or filter results").fill("Rick");

    await page.waitForTimeout(500);

    await expect(page.getByText("CHARACTERS")).toBeVisible();
  });

  test("should combine species and character type filters", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByTestId("filter-button").click();

    await page.getByTestId("filter-option-species-Human").click();

    await page.getByTestId("filter-option-starred-Starred").click();

    await expect(page.getByTestId("filter-option-species-Human")).toHaveClass(
      /bg-primary-100/
    );
    await expect(page.getByTestId("filter-option-starred-Starred")).toHaveClass(
      /bg-primary-100/
    );

    await page.getByTestId("filter-apply-button").click();

    await expect(page.getByText(/\d+ Results/)).toBeVisible();
    await expect(page.getByText("2 Filter")).toBeVisible();
  });

  test("should reset filters when selecting All options", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("filter-button").click();
    await page.getByTestId("filter-option-species-Human").click();
    await page.getByTestId("filter-apply-button").click();

    await expect(page.getByText("1 Filter")).toBeVisible();

    await page.getByTestId("filter-button").click();
    await page.getByTestId("filter-option-species-All").click();
    await page.getByTestId("filter-apply-button").click();

    await expect(page.getByText("1 Filter")).not.toBeVisible();
  });
});
