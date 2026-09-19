const fs = require('fs');
const path = 'cloudflare-worker/worker.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('|| ";', '|| "";');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed worker.js syntax');
