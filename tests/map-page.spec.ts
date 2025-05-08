import { test, expect } from '@playwright/test';

test('Map Page', async ({ page }) => {
  await page.goto('http://localhost:3000/map');
  // Click vending machine marker
  await page.locator('div:nth-child(91)').click();

  // Assert popup shows up and click it
  await expect(page.getByText(/Vending MachineType:/)).toBeVisible();
  await page.getByText(/Vending MachineType:/).click();

  // Close popup
  await page.getByRole('button', { name: 'Close popup' }).click();

  // Click elsewhere on map to close popup or reset state
  await page.locator('div').filter({ hasText: /Leaflet.*CARTO/ }).first().click();

  // Click retail marker (market)
  await page.locator('div:nth-child(13)').click();

  // Assert popup shows and click
  await expect(page.getByText(/The MarketType:Retail/)).toBeVisible();
  await page.getByText(/The MarketType:Retail/).click();

  // Close popup
  await page.getByRole('button', { name: 'Close popup' }).click();
});
