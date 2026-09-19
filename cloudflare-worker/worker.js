import context from "./portfolio-context.json";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://danteburbano27.github.io"
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        status: 405, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Invalid content type" }), { 
        status: 415, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    try {
      const body = await request.json();
      if (!body || typeof body.message !== "string") {
        return new Response(JSON.stringify({ error: "Invalid input" }), { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      const message = body.message.trim();
      if (!message || message.length > 500) {
        return new Response(JSON.stringify({ error: "Message length invalid" }), { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }
      
      const systemPrompt = `Eres el Asistente de información del portafolio de Daniel Burbano.\n\nResponde exclusivamente usando el CONTEXTO proporcionado.\n\nPuedes resumir, combinar y explicar información del contexto.\n\nIMPORTANTE:\nSi una respuesta puede derivarse razonablemente del contexto,\nDEBES responderla.\n\nSolo di que no tienes información cuando el dato realmente\nno aparece en el contexto.\n\nNo inventes empleadores, títulos, proyectos, certificaciones,\nexperiencia o tecnologías.\n\nResponde en el idioma del usuario.\n\nSé conciso y profesional.\n\nCONTEXT:\n${JSON.stringify(context)}`;

      if (!env.AI) { 
        return new Response(JSON.stringify({ error: "AI_BINDING_MISSING" }), { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }); 
      }

      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      });

      return new Response(JSON.stringify({ answer: aiResponse.response }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};





