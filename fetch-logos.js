const https = require('https');
const fs = require('fs');

const downloadWikiThumb = (title, dest) => {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300`;
  https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        const pages = data.query.pages;
        const page = Object.values(pages)[0];
        if (page.thumbnail && page.thumbnail.source) {
          console.log(`Found ${title}: ${page.thumbnail.source}`);
          https.get(page.thumbnail.source, { headers: { 'User-Agent': 'Mozilla/5.0' } }, imgRes => {
            imgRes.pipe(fs.createWriteStream(dest));
          });
        } else {
          console.log(`No thumbnail for ${title}`);
        }
      } catch(e) { console.error(e); }
    });
  });
};

downloadWikiThumb('OpenAI', 'portfolio-frontend/public/brands/openai.png');
downloadWikiThumb('GitHub Copilot', 'portfolio-frontend/public/brands/github-copilot.png');
downloadWikiThumb('Power BI', 'portfolio-frontend/public/brands/powerbi.png');
downloadWikiThumb('Claude (language model)', 'portfolio-frontend/public/brands/claude.png');
downloadWikiThumb('Microsoft Copilot', 'portfolio-frontend/public/brands/microsoft-copilot.png');
downloadWikiThumb('Microsoft Power Platform', 'portfolio-frontend/public/brands/power-platform.png');
