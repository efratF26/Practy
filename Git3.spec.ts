import { test, expect } from '@playwright/test';

test('בדיקה בסיסית של שדה קלט', async ({ page }) => {
  // פתחי את האתר
  await page.goto('https://automationexercise.com/');

  // אתר את שדה החיפוש
  const searchInput = page.locator('input[name="search"]');

  // כתוב טקסט בשדה
  await searchInput.fill('dress');

  // בדיקה שהטקסט הוזן בהצלחה
  await expect(searchInput).toHaveValue('dress');
});
