// import { test, expect, request } from '@playwright/test';

// test('Get weather from API', async () => {
//   const context = await request.newContext();

//   // מזג אוויר בתל אביב
//   const response = await context.get(
//     'https://api.open-meteo.com/v1/forecast?latitude=32.08&longitude=34.78&current_weather=true'
//   );
//   expect(response.ok()).toBeTruthy();

//   const data = await response.json();
//   console.log('טמפרטורה בתל אביב עכשיו:', data.current_weather.temperature, '°C');

//   // לוודא שהטמפרטורה היא מספר
//   expect(typeof data.current_weather.temperature).toBe('number');

//   await context.dispose();
// });

// npx playwright test Weather.spec.ts


import { test, expect } from '@playwright/test';

test('Scraping weather Jerusalem and searching in Google', async ({ page }) => {
  // 1️⃣ נכנסים לדף מזג האוויר בירושלים
  await page.goto('https://www.accuweather.com/en/il/jerusalem/213225/current-weather/213225', { waitUntil: 'networkidle' });

  // 2️⃣ שולפים את הטמפרטורה
  const tempLocator = page.locator('.display-temp');
  await tempLocator.waitFor({ state: 'visible', timeout: 120000 });
  const temperatureRaw = await tempLocator.textContent();
  const temperature = parseFloat(temperatureRaw?.replace(/[^\d.-]/g, '') || '0');

  // 3️⃣ שולפים את התחזית
  const phraseLocator = page.locator('.current-weather-info .phrase');
  await phraseLocator.waitFor({ state: 'visible', timeout: 120000 });
  const forecast = (await phraseLocator.textContent())?.trim() || '';

  // 4️⃣ שולפים את RealFeel®
  const realFeelLocator = page.locator('.current-weather-extra .label-tooltip-content__reference');
  await realFeelLocator.waitFor({ state: 'visible', timeout: 120000 });
  const realFeel = (await realFeelLocator.textContent())?.trim() || '';

  console.log('טמפרטורה:', temperature, '°C');
  console.log('תחזית:', forecast);
  console.log('RealFeel®:', realFeel);

  // 5️⃣ בדיקה בסיסית שהטמפרטורה היא מספר סביר
  expect(temperature).toBeGreaterThan(-50);

  // 6️⃣ נכנסים לגוגל ומדביקים את המידע בשדה החיפוש
  await page.goto('https://www.google.com');
  const searchInput = page.locator('input[name="q"]');
  await searchInput.waitFor({ state: 'visible', timeout: 60000 });
  await searchInput.fill(`Current weather Jerusalem: ${temperature}°C, ${forecast}, RealFeel® ${realFeel}`);
  await searchInput.press('Enter');

  // 7️⃣ מחכים שהתוצאות יופיעו
  await page.waitForSelector('#search', { timeout: 60000 });
});




// npx playwright test tests/Weather.spec.ts --headed


