const fs = require('fs');
const path = 'portfolio-frontend/src/app/layout.tsx';
let content = fs.readFileSync(path, 'utf8');

const target = '<MatrixBackground />' + String.fromCharCode(96) + 'n          <div';
content = content.replace(target, '<MatrixBackground />\n          <div');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed layout.tsx');
