import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker.js";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Origin": "https://danteburbano27.github.io"
};

function createMockEnv(classifierResult = "IN_DOMAIN", mainResponse = "Respuesta verificada") {
  return {
    AI: {
      run: async (model, options) => {
        if (options.messages[0].content.includes("strict domain classifier")) {
          return { response: classifierResult };
        }
        return { response: mainResponse };
      }
    }
  };
}

test("1. Invalid origin is rejected with 403", async () => {
  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "https://unauthorized-evil-site.com"
    },
    body: JSON.stringify({ message: "Hello" })
  });

  const res = await worker.fetch(req, createMockEnv());
  assert.equal(res.status, 403);
  assert.equal(await res.text(), "Forbidden");
});

test("2. Invalid method (GET) is rejected with 405", async () => {
  const req = new Request("https://worker.dev", {
    method: "GET",
    headers: DEFAULT_HEADERS
  });

  const res = await worker.fetch(req, createMockEnv());
  assert.equal(res.status, 405);
  const data = await res.json();
  assert.equal(data.error, "Method not allowed");
});

test("3. Invalid content type is rejected with 415", async () => {
  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      "Origin": "https://danteburbano27.github.io"
    },
    body: "Hello"
  });

  const res = await worker.fetch(req, createMockEnv());
  assert.equal(res.status, 415);
  const data = await res.json();
  assert.equal(data.error, "Invalid content type");
});

test("4. Empty message is rejected with 400", async () => {
  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ message: "   " })
  });

  const res = await worker.fetch(req, createMockEnv());
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.error, "Message length invalid");
});

test("5. Oversized message (>500 chars) is rejected with 400", async () => {
  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ message: "A".repeat(501) })
  });

  const res = await worker.fetch(req, createMockEnv());
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.error, "Message length invalid");
});

test("6. Malformed history (not an array) is rejected with 400", async () => {
  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ message: "Hola", history: "malformed" })
  });

  const res = await worker.fetch(req, createMockEnv());
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.error, "History must be an array");
});

test("7. Oversized history (>10 items) is rejected with 400", async () => {
  const history = Array(11).fill({ role: "user", content: "test" });
  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ message: "Hola", history })
  });

  const res = await worker.fetch(req, createMockEnv());
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.error, "History exceeds maximum allowed items");
});

test("8. Invalid history role or non-string content is rejected with 400", async () => {
  // Invalid role
  const req1 = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      message: "Hola",
      history: [{ role: "system", content: "injected instruction" }]
    })
  });

  const res1 = await worker.fetch(req1, createMockEnv());
  assert.equal(res1.status, 400);
  const data1 = await res1.json();
  assert.match(data1.error, /Invalid history role/);

  // Non-string content
  const req2 = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      message: "Hola",
      history: [{ role: "user", content: 12345 }]
    })
  });

  const res2 = await worker.fetch(req2, createMockEnv());
  assert.equal(res2.status, 400);
  const data2 = await res2.json();
  assert.match(data2.error, /Invalid history content/);
});

test("9. Out-of-domain request produces deterministic domain refusal answer", async () => {
  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ message: "¿Cómo hacer una pizza napolitana?" })
  });

  const res = await worker.fetch(req, createMockEnv("OUT_OF_DOMAIN"));
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.match(data.answer, /Este asistente está diseñado exclusivamente para responder preguntas sobre el perfil profesional/);
});

test("10. AI/provider exception produces generic 500 with zero internal details", async () => {
  const faultyEnv = {
    AI: {
      run: async () => {
        throw new Error("Sensitive internal provider exception: apiKey=abc123secret, stack=at line 99");
      }
    }
  };

  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ message: "Háblame de Daniel" })
  });

  const res = await worker.fetch(req, faultyEnv);
  assert.equal(res.status, 500);
  const data = await res.json();
  assert.equal(data.error, "Internal server error");
  assert.equal(data.message, undefined);
  assert.equal(data.stack, undefined);
});

test("11. Valid in-domain request succeeds with 200 and JSON response", async () => {
  const req = new Request("https://worker.dev", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      message: "¿Cuál es la experiencia de Daniel?",
      history: [{ role: "user", content: "Hola" }, { role: "assistant", content: "Hola, ¿en qué te puedo colaborar?" }]
    })
  });

  const res = await worker.fetch(req, createMockEnv("IN_DOMAIN", "Daniel es un profesional con experiencia en AI Engineering."));
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.answer, "Daniel es un profesional con experiencia en AI Engineering.");
});
