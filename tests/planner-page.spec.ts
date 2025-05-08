import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-john-auth.json' });

test('Planner Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/planner');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/planner');
});
