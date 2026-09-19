const fs = require('fs');
const path = 'cloudflare-worker/portfolio-context.json';
let str = fs.readFileSync(path, 'utf8');
if (str.charCodeAt(0) === 0xFEFF) {
  str = str.slice(1);
}
let data = JSON.parse(str);

if (!data.skills.includes('Power BI')) data.skills.push('Power BI');
if (!data.skills.includes('Microsoft Foundry')) data.skills.push('Microsoft Foundry');
if (!data.skills.includes('Microsoft Power Platform')) data.skills.push('Microsoft Power Platform');

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Fixed portfolio-context.json');
