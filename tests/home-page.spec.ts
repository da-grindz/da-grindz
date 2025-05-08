import { test, expect } from '@playwright/test';

test('Home Page', async ({ page }) => {
  // Step 1: Log in
  await page.goto('http://localhost:3000/auth/signin');
  await page.fill('input[name="email"]', 'john@foo.com');
  await page.fill('input[name="password"]', 'changeme');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:3000/dashboard');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  // Step 2: Get Started section
  await page.getByRole('button', { name: 'Get Started' }).click();
  await expect(page).toHaveURL('http://localhost:3000/#getstarted');
  await expect(page.locator('#getstarted')).toBeVisible();

  // Step 3: Explore visible links from Get Started
  await page.locator('#welcome').getByRole('button', { name: 'Vendor Menu' }).click();
  await expect(page).toHaveURL('http://localhost:3000/vendors');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('button', { name: 'Allergies' }).click();
  await expect(page).toHaveURL('http://localhost:3000/allergies');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('button', { name: 'Grindz Mood' }).click();
  await expect(page).toHaveURL('http://localhost:3000/grindz-mood');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('button', { name: 'Dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('button', { name: 'Planner' }).click();
  await expect(page).toHaveURL('http://localhost:3000/planner');
});
