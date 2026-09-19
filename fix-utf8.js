const fs = require('fs');
const file = 'portfolio-frontend/src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/EducaciÃ³n/g, 'Educación');
content = content.replace(/ContÃ¡ctame/g, 'Contáctame');
content = content.replace(/Â¿Hablamos\?/g, '¿Hablamos?');
content = content.replace(/tecnologÃa/g, 'tecnología');

fs.writeFileSync(file, content, 'utf8');
