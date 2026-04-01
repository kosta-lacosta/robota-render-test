const { chromium } = require('playwright');

async function testRobotaLogin() {
  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const results = [];

    const urlsToTest = [
      'https://robota.ua/',
      'https://www.robota.ua/',
      'https://auth.robota.ua/'
    ];

    for (const url of urlsToTest) {
      try {
        console.log('OPEN', url);

        const response = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 60000
        });

        results.push({
          url,
          ok: true,
          finalUrl: page.url(),
          title: await page.title(),
          status: response ? response.status() : null
        });
      } catch (e) {
        results.push({
          url,
          ok: false,
          error: e.message
        });
      }
    }

    return {
      ok: true,
      results
    };
  } catch (e) {
    return {
      ok: false,
      error: e.message
    };
  } finally {
    await browser.close();
  }
}

module.exports = { testRobotaLogin };
