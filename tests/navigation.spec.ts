import { test, expect } from '@playwright/test';

const ROOT_PATH = '/admin';

test.describe('Admin Page Tests', () => {
  test('Home page has title', async ({ page }) => {
    await page.goto(ROOT_PATH);
    await expect(page).toHaveTitle(/Portfolio - Admin/);
  });

  test('navigation to login page', async ({ page }) => {
    await page.goto(ROOT_PATH);
    const loginLink = page.locator('[data-testid="login-link"]');
    await loginLink.click();
    await expect(page).toHaveURL(`${ROOT_PATH}/login`);
  });

  test('login and navigate to projects page', async ({ page }) => {
    await page.goto(`${ROOT_PATH}/projects`);

    await page.fill('input[name="email"]', 'guest@ath-portfolio.ca');
    await page.fill('input[name="password"]', 'guestPublic');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(`${ROOT_PATH}/projects`);
  });
});
