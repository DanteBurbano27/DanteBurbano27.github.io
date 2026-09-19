const fs = require('fs');
const path = 'portfolio-frontend/src/components/sections/CertificationsSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// Note: I will keep credentialUrl as empty string and add a note in my response to the user.
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/9\/96\/Microsoft_logo_%282012%29.svg'/g, "'/brands/microsoft.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/5\/51\/IBM_logo.svg'/g, "'/brands/ibm.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/9\/93\/Amazon_Web_Services_Logo.svg'/g, "'/brands/aws.svg'");

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed CertificationsSection.tsx');
