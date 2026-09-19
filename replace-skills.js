const fs = require('fs');
let content = fs.readFileSync('portfolio-frontend/src/components/sections/SkillsMatrix.tsx', 'utf8');

const replacement = "
    title: 'Inteligencia Artificial & Agentes',
    items: [
      { name: 'Machine Learning', icon: <BrainCircuit size={20} /> },
      { name: 'GitHub Copilot', logoUrl: '/brands/github-copilot.svg' },
      { name: 'Codex de OpenAI', logoUrl: '/brands/openai.png' },
      { name: 'Claude Code', logoUrl: '/brands/anthropic.png' },
      { name: 'Copilot Studio', logoUrl: '/brands/microsoft-copilot.png' },
      { name: 'Microsoft Foundry', logoUrl: '/brands/microsoft.png' },
      { name: 'Power BI', logoUrl: '/brands/powerbi.png' },
      { name: 'Microsoft Power Platform', logoUrl: '/brands/power-platform.png' },
      { name: 'Google Antigravity', icon: <Rocket size={20} /> },
      { name: 'RAG', icon: <Database size={20} /> },
      { name: 'MCP', icon: <Box size={20} /> },
      { name: 'Modelos Locales', icon: <Cpu size={20} /> },
    ]
";

content = content.replace(/title: 'Inteligencia Artificial & Agentes',[\s\S]*?items: \[[\s\S]*?\n\s*\]/, replacement.trim());
fs.writeFileSync('portfolio-frontend/src/components/sections/SkillsMatrix.tsx', content);
