import asyncio
import sys
from playwright.async_api import async_playwright

async def verify():
    print("Iniciando validación E2E con Playwright...")
    has_errors = False
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Listen to console errors
        page.on("console", lambda msg: print(f"CONSOLE: {msg.type}: {msg.text}"))
        def handle_console(msg):
            nonlocal has_errors
            if msg.type == "error":
                # ignore some standard annoying but non-fatal network errors if any
                if "favicon" not in msg.text:
                    print(f"FATAL CONSOLE ERROR: {msg.text}")
                    has_errors = True
        page.on("console", handle_console)

        # Listen to page errors (uncaught exceptions)
        def handle_page_error(err):
            nonlocal has_errors
            print(f"UNCAUGHT EXCEPTION: {err}")
            has_errors = True
        page.on("pageerror", handle_page_error)

        # Listen to failed requests
        def handle_request_failed(request):
            nonlocal has_errors
            if request.url.endswith(".js"):
                print(f"FAILED JS CHUNK: {request.url}")
                has_errors = True
            elif request.url.endswith(".css"):
                print(f"FAILED CSS CHUNK: {request.url}")
                has_errors = True
        page.on("requestfailed", handle_request_failed)
        
        # Also catch 500 errors on any fetch or asset
        def handle_response(response):
            nonlocal has_errors
            if response.status >= 500:
                print(f"SERVER ERROR {response.status} en: {response.url}")
                has_errors = True
            elif response.status == 404 and (response.url.endswith('.js') or response.url.endswith('.css')):
                print(f"404 EN ASSET CRÍTICO: {response.url}")
                has_errors = True
        page.on("response", handle_response)

        # 1. Test Homepage
        print("Validando Homepage http://localhost:3000 ...")
        res = await page.goto("http://localhost:3000", wait_until="networkidle")
        if res.status != 200:
            print(f"Homepage falló con HTTP {res.status}")
            has_errors = True
        else:
            print("Homepage HTTP 200 OK.")
        
        # Check Next.js error overlay
        content = await page.content()
        if "next-error-overlay" in content or "Runtime Error" in content or "Cannot find module" in content:
            print("Next.js Error Overlay detectado en Homepage.")
            has_errors = True

        # 2. Test 404
        print("Validando ruta 404 http://localhost:3000/__runtime-test-404 ...")
        res404 = await page.goto("http://localhost:3000/__runtime-test-404", wait_until="networkidle")
        if res404.status != 404:
            print(f"Ruta 404 falló con HTTP {res404.status} en lugar de 404.")
            has_errors = True
        else:
            print("Ruta 404 renderizada correctamente sin crash del servidor.")
        
        # Check Next.js error overlay on 404
        content404 = await page.content()
        if "next-error-overlay" in content404 or "Runtime Error" in content404:
            print("Next.js Error Overlay detectado en página 404.")
            has_errors = True

        await browser.close()
    
    if has_errors:
        print("\n❌ VERIFICACIÓN E2E FALLIDA. Se encontraron errores en consola o network.")
        sys.exit(1)
    else:
        print("\n✅ VERIFICACIÓN E2E EXITOSA. Cero excepciones, Cero JS/CSS 404s, Cero 500s.")
        sys.exit(0)

if __name__ == "__main__":
    asyncio.run(verify())
