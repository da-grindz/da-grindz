import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-john-auth.json' });

test('Home Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/', { timeout: 10000 });
});
