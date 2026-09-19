const fs = require('fs');
const path = 'cloudflare-worker/worker.js';
let str = fs.readFileSync(path, 'utf8');
if (str.charCodeAt(0) === 0xFEFF) {
  str = str.slice(1);
}
fs.writeFileSync(path, str, 'utf8');
console.log('Fixed worker.js BOM');
