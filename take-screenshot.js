const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024, deviceScaleFactor: 2 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Take full page screenshot
  await page.screenshot({ path: 'portfolio-frontend/out/screenshot_full.png', fullPage: true });

  // Try to find sections to screenshot specifically
  // Education section
  const edSection = await page.$('h2:has-text("Educación")');
  if (edSection) {
    const edHandle = await page.evaluateHandle((el) => el.closest('.grid > div'), edSection);
    // Actually just take a full screenshot, we can just attach it.
  }

  await browser.close();
})();
