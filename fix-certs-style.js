const fs = require('fs');
const path = 'portfolio-frontend/src/components/sections/CertificationsSection.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100', 'opacity-90 group-hover:opacity-100');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed styling in CertificationsSection');
