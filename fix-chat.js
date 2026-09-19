const fs = require('fs');
const path = 'portfolio-frontend/src/components/ai/AIAssistantChat.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix the quick prompts
content = content.replace("¿Cuáles son sus principales habilidades??", "¿Cuáles son sus principales habilidades?");
content = content.replace("¿Qué certificaciones tiene??", "¿Qué certificaciones tiene?");
content = content.replace("¿Cuál es su formación académica??", "¿Cuál es su formación académica?");

// Fix the fallback error message
content = content.replace(
  'fallbackResponse = "El asistente está temporalmente fuera de línea. Diagnóstico: " + (err.message || "Fetch failed");',
  'fallbackResponse = "El asistente está temporalmente fuera de línea.";'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed AIAssistantChat.tsx');
