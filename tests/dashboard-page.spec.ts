import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-john-auth.json' });

test('Dashboard Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/dashboard');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/dashboard');
});
