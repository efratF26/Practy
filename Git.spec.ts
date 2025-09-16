import { test, expect } from '@test/test';

test('basic test', async ({ page }) => {
  // נפתח אתר
  await page.goto('https://playwright.dev/');

  // נבדוק שהכותרת מכילה את המילה Playwright
  await expect(page).toHaveTitle(/Playwright/);

  // נלחץ על כפתור "Get started"
  await page.click('text=Get started');

  // נבדוק שה-URL השתנה
  await expect(page).toHaveURL(/.*docs/);
});
