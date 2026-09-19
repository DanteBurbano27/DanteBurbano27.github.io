const fs = require('fs');
const path = 'portfolio-frontend/public/brands/microsoft-symbol.svg';
let str = fs.readFileSync(path, 'utf8');
if (str.charCodeAt(0) === 0xFEFF) {
  str = str.slice(1);
}
fs.writeFileSync(path, str, 'utf8');
console.log('Fixed SVG BOM');
