import { test, expect } from '@playwright/test';

test('לחיצה על כפתור ובדיקת URL', async ({ page }) => {
  // פתחי את האתר
  await page.goto('https://automationexercise.com/');

  // אתר את כפתור "Contact Us"
  const contactButton = page.locator('text=Contact Us');

  // בדיקה שהכפתור נראה
  await expect(contactButton).toBeVisible();

  // לחיצה על הכפתור
  await contactButton.click();

  // בדיקה שהגענו לעמוד יצירת קשר
  await expect(page).toHaveURL(/contact_us/);
});
