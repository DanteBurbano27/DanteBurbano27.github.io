const https = require('https');
const fs = require('fs');

const sleep = ms => new Promise(r => setTimeout(r, ms));

const downloadThumb = async (filename, dest) => {
  return new Promise((resolve) => {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json`;
    https.get(searchUrl, { headers: { 'User-Agent': 'CoolBot/1.0 (test@example.com)' } }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          const pages = data.query.pages;
          const page = Object.values(pages)[0];
          if (page.imageinfo && page.imageinfo[0].thumburl) {
            console.log(`Found ${filename}`);
            https.get(page.imageinfo[0].thumburl, { headers: { 'User-Agent': 'CoolBot/1.0' } }, imgRes => {
              imgRes.pipe(fs.createWriteStream(dest)).on('finish', resolve);
            });
          } else {
            console.log(`No thumbnail for ${filename}`);
            resolve();
          }
        } catch(e) { 
          console.error(`Error for ${filename}:`, e.message, body); 
          resolve();
        }
      });
    });
  });
};

(async () => {
  await downloadThumb('Github-copilot-logo.svg', 'portfolio-frontend/public/brands/github-copilot.png');
  await sleep(2000);
  await downloadThumb('Microsoft-copilot-2026-seeklogo.svg', 'portfolio-frontend/public/brands/microsoft-copilot.png');
  await sleep(2000);
  await downloadThumb('Microsoft_logo_(2012).svg', 'portfolio-frontend/public/brands/microsoft.png');
})();
