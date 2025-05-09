import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-john-auth.json' });

test('Grindz-Mood Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/grindz-mood');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/grindz-mood', { timeout: 10000 });

  await page.getByRole('button', { name: 'Choose Me!' }).first().click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/preferences', { timeout: 10000 });
});
