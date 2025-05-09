import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-admin-auth.json' });

test('Admin Edit User Page', async ({ page }) => {
  // Visit home page
  await page.goto('https://da-grindz.vercel.app/');

  // Ensure Admin button is visible and navigate to admin page
  await page.getByRole('link', { name: 'Admin' }).scrollIntoViewIfNeeded();
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page).toHaveURL(/.*\/admin/, { timeout: 10000 });

  // Locate the user's row by email
  const userRow = page.getByRole('row').filter({ hasText: 'admintester@foo.com' });
  await expect(userRow).toBeVisible();

  // Click the Edit button within that row
  await userRow.getByRole('button', { name: 'Edit' }).click();

  // Change role to ADMIN from dropdown
  await page.locator('div').filter({ hasText: /^RoleUserVendorAdmin$/ }).getByRole('combobox').selectOption('ADMIN');

  // Save changes and confirm the dialog
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // Assert that the user's row now includes the role ADMIN
  await expect(userRow).toContainText('ADMIN');
});
