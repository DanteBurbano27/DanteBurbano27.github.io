const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to production...');
  await page.goto('https://danteburbano27.github.io', { waitUntil: 'networkidle0' });
  
  await page.screenshot({ path: 'production_screenshot.png', fullPage: true });
  console.log('Screenshot saved to production_screenshot.png');
  
  await browser.close();
})();
