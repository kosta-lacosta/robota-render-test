const { chromium } = require('playwright');

async function testRobotaLogin() {
  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("OPEN robota");

    await page.goto('https://employer.robota.ua/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await page.goto('https://auth.robota.ua/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log("PAGE LOADED");

    // 👉 пока просто проверяем доступ
    const title = await page.title();

    return {
      ok: true,
      title
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
