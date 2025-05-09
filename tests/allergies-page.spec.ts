import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-john-auth.json' });

test('Allergies Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/allergies');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/allergies', { timeout: 10000 });

  // If this link is meant to be blank text (?), better to target it with a role or visible label
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  await expect(page).toHaveURL('https://da-grindz.vercel.app/preferences', { timeout: 10000 });
});
