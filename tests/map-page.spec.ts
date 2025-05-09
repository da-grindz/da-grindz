import { test, expect } from '@playwright/test';

test('Map Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/map');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/map', { timeout: 10000 });
});
