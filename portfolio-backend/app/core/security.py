from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
import time
import json
import re

class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Middleware de Rate Limiting por IP para proteger endpoints públicos y el sandbox.
    Mantiene un registro ligero en memoria (AGENT-06).
    """
    def __init__(self, app, max_requests: int = 150, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.ip_data = {}

    async def dispatch(self, request: Request, call_next):
        # En producción detrás de Nginx/LB, usaríamos 'x-forwarded-for'
        client_ip = request.client.host if request.client else "127.0.0.1"
        current_time = time.time()
        
        # Limpieza de hits antiguos
        if client_ip in self.ip_data:
            self.ip_data[client_ip] = [ts for ts in self.ip_data[client_ip] if ts > current_time - self.window_seconds]
        else:
            self.ip_data[client_ip] = []

        # Validación
        if len(self.ip_data[client_ip]) >= self.max_requests:
            return Response(
                content=json.dumps({"detail": "Rate limit exceeded. Too many requests."}), 
                status_code=429, 
                media_type="application/json"
            )
        
        self.ip_data[client_ip].append(current_time)
        return await call_next(request)

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Inyecta cabeceras de seguridad estrictas en cada respuesta HTTP.
    """
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        return response

class PayloadSanitizationMiddleware(BaseHTTPMiddleware):
    """
    Valida el tamaño del payload para mitigar ataques DoS.
    """
    def __init__(self, app, max_payload_bytes: int = 2 * 1024 * 1024): # Limite 2MB
        super().__init__(app)
        self.max_payload_bytes = max_payload_bytes

    async def dispatch(self, request: Request, call_next):
        if request.method in ["POST", "PUT", "PATCH"]:
            content_length = request.headers.get("content-length")
            if content_length and int(content_length) > self.max_payload_bytes:
                return Response(
                    content=json.dumps({"detail": "Payload too large. Maximum allowed is 2MB."}), 
                    status_code=413, 
                    media_type="application/json"
                )
        return await call_next(request)
