import { test, expect } from '@playwright/test';

test.use({ storageState: 'vercel-admin-auth.json' });

test('Admin can promote a user to ADMIN role', async ({ page }) => {
  await page.goto('https://da-grindz.vercel.app/');

  const adminLink = page.getByRole('link', { name: 'Admin' });
  await expect(adminLink).toBeVisible();
  await adminLink.click();
  await expect(page).toHaveURL('https://da-grindz.vercel.app/admin', { timeout: 10000 });

  const userRow = page.getByRole('row').filter({ hasText: 'hello@gmail.com' });
  await expect(userRow).toBeVisible();

  await userRow.getByRole('button', { name: 'Edit' }).click();

  await page.locator('div').filter({ hasText: /^RoleUserVendorAdmin$/ }).getByRole('combobox').selectOption('ADMIN');

  await page.getByRole('button', { name: 'Save Changes' }).click();

  const updatedRoleCell = userRow.getByRole('cell', { name: 'ADMIN' });
  await expect(updatedRoleCell).toBeVisible();
});
