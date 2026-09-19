const testE2E = async () => {
    try {
        const res = await fetch('https://daniel-portfolio-ai.burbanod467.workers.dev/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Origin': 'https://danteburbano27.github.io' },
            body: JSON.stringify({ message: '¿Qué tal es Daniel para la creación de agentes?' })
        });
        const text = await res.text();
        console.log('RAW RESPONSE 1:', text);
        
        const res2 = await fetch('https://daniel-portfolio-ai.burbanod467.workers.dev/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Origin': 'https://danteburbano27.github.io' },
            body: JSON.stringify({ message: '¿Quién es Messi?' })
        });
        const text2 = await res2.text();
        console.log('RAW RESPONSE 2:', text2);
        
    } catch (e) {
        console.error('Error during E2E test:', e);
    }
};

testE2E();
