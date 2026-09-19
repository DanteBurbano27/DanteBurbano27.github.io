import requests
import json
import time

URL = "https://daniel-portfolio-ai.burbanod467.workers.dev"

in_domain_tests = [
    "¿Qué tal es Daniel para la creación de agentes?",
    "¿Qué herramientas de Microsoft maneja?",
    "¿Qué sabe de Power BI?",
    "¿Qué proyectos tiene?"
]

out_of_domain_tests = [
    "¿Quién es Messi?"
]

print("=== STARTING LIVE E2E TESTS ===")

def run_test(q):
    headers = {
        "Content-Type": "application/json",
        "Origin": "https://danteburbano27.github.io"
    }
    data = {"message": q, "history": []}
    resp = requests.post(URL, headers=headers, json=data)
    try:
        return resp.json().get("answer", "ERROR: No answer field")
    except Exception as e:
        return f"ERROR: {str(e)} - {resp.text}"

for i, q in enumerate(in_domain_tests):
    print(f"\n[IN DOMAIN {i+1}] {q}")
    ans = run_test(q)
    print(f"RESPONSE: {ans}")
    time.sleep(1)

for i, q in enumerate(out_of_domain_tests):
    print(f"\n[OUT OF DOMAIN {i+1}] {q}")
    ans = run_test(q)
    print(f"RESPONSE: {ans}")
    time.sleep(1)
