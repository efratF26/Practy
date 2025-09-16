import { test, expect } from '@playwright/test';

test('בדיקה פשוטה - פתיחת האתר ולחיצה על כפתור', async ({ page }) => {
  // פתחי את האתר
  await page.goto('https://automationexercise.com/');

  // בדיקה שהכפתור קיים
  const signupButton = page.locator('text=Signup / Login');
  await expect(signupButton).toBeVisible();

  // לחיצה על הכפתור
  await signupButton.click();

  // בדיקה שהגענו לעמוד ההרשמה/התחברות
  await expect(page).toHaveURL(/login/);
});
