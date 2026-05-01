const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.fill('#email', '');
  await page.fill('#password', '');
  await page.click('//input[@value="Login"]');
  await page.waitForTimeout(2000);
  const text = await page.evaluate(() => document.body.innerText);
  console.log(text);
  await browser.close();
})();
