const https = require('https');
const data = JSON.stringify({ message: '¿Qué tal es Daniel para la creación de agentes?' });
const options = {
  hostname: 'daniel-portfolio-ai.burbanod467.workers.dev',
  port: 443,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'https://danteburbano27.github.io',
    'Content-Length': data.length
  }
};
const req = https.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', body));
});
req.on('error', e => console.error(e));
req.write(data);
req.end();
