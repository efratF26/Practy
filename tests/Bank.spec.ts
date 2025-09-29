import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Scraping USD rate and saving to JSON', async ({ page }) => {
  // 1️⃣ גולשים לדף שערי מטבע
  await page.goto('https://www.boi.org.il/roles/markets/exchangerates/', { waitUntil: 'networkidle' });

  // 2️⃣ לוקייטור לשורה של הדולר לפי הקישור למטבע
  const usdRow = page.locator('tr.odd:has(td a[href="/roles/markets/exchangerates/usdollar/"])');

  // 3️⃣ מחכים שהשורה תיטען
  await usdRow.waitFor({ state: 'visible', timeout: 60000 });

  // 4️⃣ שולפים את הערך של הדולר (עמודה 3)
  const usdValueRaw = await usdRow.locator('td').nth(2).textContent();
  const usdValue = parseFloat(usdValueRaw?.trim() || '0');

  console.log('שער דולר אמריקני:', usdValue);

  // 5️⃣ יוצרים אובייקט JSON
  const data = {
    currency: 'USD',
    rate: usdValue,
    date: new Date().toISOString()
  };

  // 6️⃣ שומרים לקובץ JSON
  fs.writeFileSync('usd_rate.json', JSON.stringify(data, null, 2), 'utf-8');

  // 7️⃣ בדיקה בסיסית שהערך חיובי
  expect(usdValue).toBeGreaterThan(0);
});

// npx playwright test tests/Bank.spec.ts --headed
