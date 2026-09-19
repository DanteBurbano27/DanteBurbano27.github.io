const https = require('https');
const fs = require('fs');
const fetchImg = (url, dest) => {
  https.get(url, { headers: { 'User-Agent': 'CoolBot/1.0' } }, res => {
    res.pipe(fs.createWriteStream(dest));
  });
};

fetchImg('https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Github-copilot-logo.svg/300px-Github-copilot-logo.svg.png', 'portfolio-frontend/public/brands/github-copilot.png');
fetchImg('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Microsoft-copilot-2026-seeklogo.svg/300px-Microsoft-copilot-2026-seeklogo.svg.png', 'portfolio-frontend/public/brands/microsoft-copilot.png');
fetchImg('https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/300px-Microsoft_logo_%282012%29.svg.png', 'portfolio-frontend/public/brands/microsoft-foundry.png');
