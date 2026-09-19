const fs = require('fs');
const path = 'portfolio-frontend/src/components/sections/SkillsMatrix.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('filter grayscale group-hover:grayscale-0 ', '');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed styling in SkillsMatrix');
