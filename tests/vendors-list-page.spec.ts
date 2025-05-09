import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-john-auth.json' });

test('Vendors List Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/vendors');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/vendors', { timeout: 10000 });
});
