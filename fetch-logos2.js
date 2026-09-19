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

download('https://upload.wikimedia.org/wikipedia/en/b/b3/University_of_Tokyo_logo.svg', 'portfolio-frontend/public/brands/university-of-tokyo.svg');
download('https://upload.wikimedia.org/wikipedia/commons/1/1e/Escudo_de_la_Universidad_Distrital_Francisco_Jos%C3%A9_de_Caldas.svg', 'portfolio-frontend/public/brands/universidad-distrital.svg');
