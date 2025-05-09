import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-john-auth.json' });

test('Preferences Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/preferences');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/preferences', { timeout: 10000 });

  await page.locator('.form-check-input').first().check();
  await page.locator('div:nth-child(2) > .form-check-input').check();

  await page.getByRole('combobox').selectOption('Sugar Rush');
  await expect(page.getByRole('combobox')).toHaveValue('Sugar Rush', { timeout: 10000 });

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL('https://da-grindz.vercel.app/dashboard', { timeout: 10000 });
  await expect(page.getByRole('heading', { name: 'Grindz Mood - Sugar Rush' })).toBeVisible();
});
