import { test, expect } from '@playwright/test';

test('Map Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/map');

  // Confirm the map has loaded
  await expect(page.locator('.leaflet-container')).toBeVisible();

  // === VENDING MACHINE MARKER ===
  await page.locator('div:nth-child(91)').click({ force: true });

  const popup = page.locator('.leaflet-popup-content-wrapper');

  await expect(popup.getByText('Vending Machine')).toBeVisible();
  await expect(popup.getByText('Type:')).toBeVisible();
  await expect(popup.getByText('Beverage')).toBeVisible();
  await expect(popup.getByText('Location:')).toBeVisible();
  await expect(popup.getByText('Jefferson Hall')).toBeVisible();
  await expect(popup.getByText('Floor:')).toBeVisible();
  await expect(popup.getByText('0')).toBeVisible();
  await expect(popup.getByText('Hours:')).toBeVisible();
  await expect(popup.getByText('During building hours')).toBeVisible();

  await page.getByRole('button', { name: 'Close popup' }).click();

  // === EATERY MARKER (BA-LE) ===
  await page.locator('div:nth-child(23)').click({ force: true });

  const popup2 = page.locator('.leaflet-popup-content-wrapper').last();

  await expect(popup2.getByText('Ba-Le', { exact: true })).toBeVisible();
  await expect(popup2.getByText('Type:', { exact: true })).toBeVisible();
  await expect(popup2.getByText('Retail Dining')).toBeVisible();
  await expect(popup2.getByText('Subtype:')).toBeVisible();
  await expect(popup2.getByText('Meal Points Accepted')).toBeVisible();
  await expect(popup2.getByText('Location:')).toBeVisible();
  await expect(popup2.getByText('Hemenway Hall')).toBeVisible();
  await expect(popup2.getByText('Room:')).toBeVisible();
  await expect(popup2.getByText('119')).toBeVisible();
  await expect(popup2.getByText('Floor:')).toBeVisible();
  await expect(popup2.getByText('01')).toBeVisible();
  await expect(popup2.getByText('Hours:')).toBeVisible();
  await expect(popup2.getByText('Mon- Thu: 10 am- 8 pm, Fri:')).toBeVisible();
  await expect(popup2.getByText('Phone:')).toBeVisible();
  await expect(popup2.getByText('-956-6462')).toBeVisible();
  await expect(popup2.getByText('Email:')).toBeVisible();
  await expect(popup2.getByText('jim.halcombe@sodexo.com')).toBeVisible();
  await expect(popup2.getByText('Website:')).toBeVisible();

  await expect(
    popup2.locator('div').filter({
      hasText: /^https:\/\/uhm\.sodexomyway\.com\/en-us\/locations\/ba-le$/,
    }),
  ).toBeVisible();

  await expect(popup2.getByText('Notes:')).toBeVisible();
  await expect(popup2.getByText('Dining Dollars, Campus Cash,')).toBeVisible();
});
