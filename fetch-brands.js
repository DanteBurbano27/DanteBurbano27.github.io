const https = require('https');
const fs = require('fs');

const download = (url, dest) => {
  const options = {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  };
  https.get(url, options, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      return download(res.headers.location, dest);
    }
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => { file.close(); console.log('Downloaded ' + dest); });
  });
};

download('https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', 'portfolio-frontend/public/brands/openai.svg');
download('https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', 'portfolio-frontend/public/brands/microsoft.svg');
download('https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg', 'portfolio-frontend/public/brands/anthropic.svg');
