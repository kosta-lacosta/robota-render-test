const { chromium } = require('playwright');

async function testRobotaLogin() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    locale: 'uk-UA',
    timezoneId: 'Europe/Kyiv',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  try {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
      });
    });

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.8',
      'Upgrade-Insecure-Requests': '1'
    });

    const response = await page.goto('https://robota.ua/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    const title = await page.title();
    const content = await page.content();

    return {
      ok: true,
      finalUrl: page.url(),
      title,
      status: response ? response.status() : null,
      cloudflare: title.includes('Cloudflare') || content.includes('cf-browser-verification')
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
