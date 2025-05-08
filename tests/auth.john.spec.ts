// auth.admin.spec.ts
// eslint-disable-next-line import/no-extraneous-dependencies
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // Navigate to your Vercel app's login page
  await page.goto('https://da-grindz.vercel.app/auth/signin');

  // Fill in the login form with your dummy user credentials
  await page.fill('input[name="email"]', 'john@foo.com');
  await page.fill('input[name="password"]', 'changeme'); // Use actual password

  // Submit the form
  await page.click('button[type="submit"]');

  await page.waitForURL('https://da-grindz.vercel.app/dashboard', { timeout: 10000 });
  await expect(page).toHaveURL('https://da-grindz.vercel.app/dashboard');

  // Save the storage state to a file
  await page.context().storageState({ path: 'vercel-john-auth.json' });
});
