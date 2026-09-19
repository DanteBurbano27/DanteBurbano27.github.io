const fs = require('fs');
const path = 'portfolio-frontend/src/components/sections/CertificationsSection.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/'\/brands\/microsoft.svg'/g, "'/brands/microsoft-symbol.svg'");

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed CertificationsSection Microsoft logos');
