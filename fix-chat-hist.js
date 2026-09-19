const fs = require('fs');
const path = 'portfolio-frontend/src/components/ai/AIAssistantChat.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'body: JSON.stringify({ message: q })',
  'body: JSON.stringify({ message: q, history: history.slice(-4) })'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed AIAssistantChat.tsx history');
