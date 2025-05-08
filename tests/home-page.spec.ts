import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-john-auth.json' });

test('Home Page', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/');
  await expect(page).toHaveURL('https://da-grindz.vercel.app/');

  await page.getByRole('button', { name: 'Lets Get Started!' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/#getstarted');
  await expect(page.locator('#getstarted')).toBeVisible();

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/');

  await page.getByRole('button', { name: 'Allergies' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/allergies');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/');

  await page.getByRole('button', { name: 'Grindz Mood' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/grindz-mood', { timeout: 10000 });

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/');

  await page.getByRole('button', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/dashboard');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/');

  await page.getByRole('button', { name: 'Planner' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/planner');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/');

  await page.getByRole('button', { name: 'Vendors List' }).click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/vendors');
});
