const https = require('https');
const fs = require('fs');

const downloadThumb = (filename, dest) => {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json`;
  https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        const pages = data.query.pages;
        const page = Object.values(pages)[0];
        if (page.imageinfo && page.imageinfo[0].thumburl) {
          console.log(`Found ${filename}: ${page.imageinfo[0].thumburl}`);
          https.get(page.imageinfo[0].thumburl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, imgRes => {
            imgRes.pipe(fs.createWriteStream(dest));
          });
        } else {
          console.log(`No thumbnail for ${filename}`);
        }
      } catch(e) { console.error(e); }
    });
  });
};

downloadThumb('Github-copilot-logo.svg', 'portfolio-frontend/public/brands/github-copilot.png');
downloadThumb('ChatGPT_logo.svg', 'portfolio-frontend/public/brands/openai.png'); // ChatGPT is colorful
downloadThumb('Anthropic_logo.svg', 'portfolio-frontend/public/brands/anthropic.png');
downloadThumb('New_Power_BI_Logo.svg', 'portfolio-frontend/public/brands/powerbi.png');
downloadThumb('Microsoft-copilot-2026-seeklogo.svg', 'portfolio-frontend/public/brands/microsoft-copilot.png');
downloadThumb('Microsoft_Power_Platform_logo.svg', 'portfolio-frontend/public/brands/power-platform.png');
downloadThumb('Microsoft_logo_(2012).svg', 'portfolio-frontend/public/brands/microsoft.png');
