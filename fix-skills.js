const fs = require('fs');
const path = 'portfolio-frontend/src/components/sections/SkillsMatrix.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/c\/c3\/Python-logo-notext.svg'/g, "'/brands/python.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/9\/99\/Unofficial_JavaScript_logo_2.svg'/g, "'/brands/javascript.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/6\/61\/HTML5_logo_and_wordmark.svg'/g, "'/brands/html.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/d\/d5\/CSS3_logo_and_wordmark.svg'/g, "'/brands/css.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/en\/3\/30\/Java_programming_language_logo.svg'/g, "'/brands/java.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/1\/18\/ISO_C%2B%2B_Logo.svg'/g, "'/brands/cpp.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/f\/fa\/Microsoft_Azure.svg'/g, "'/brands/azure.svg'");
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/9\/93\/Amazon_Web_Services_Logo.svg'/g, "'/brands/aws.svg'");

// For GitHub, we already have /brands/github.svg
content = content.replace(/'https:\/\/upload.wikimedia.org\/wikipedia\/commons\/9\/91\/Octicons-mark-github.svg'/g, "'/brands/github.svg'");

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed SkillsMatrix.tsx');
