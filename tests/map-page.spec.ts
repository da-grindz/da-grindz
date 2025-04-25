import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/map');
  await page.locator('img:nth-child(85)').click();
  await expect(page.getByText('Vending (BEVERAGE)')).toBeVisible();
  await expect(page.getByText('Vending (BEVERAGE)Jefferson')).toBeVisible();
  await page.locator('.leaflet-pane > img:nth-child(11)').click();
  await expect(page.getByText('The Market')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Logo Da Grindz' })).toBeVisible();
});
