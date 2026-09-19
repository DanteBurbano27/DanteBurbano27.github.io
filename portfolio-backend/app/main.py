from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.router import api_router
from app.core.database import engine
from app.models.base import Base
from app.core.security import RateLimitMiddleware, SecurityHeadersMiddleware, PayloadSanitizationMiddleware
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Crear tablas en el arranque (idealmente usaríamos Alembic en prod, aquí inicializa SQLite local)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

from app.core.exceptions import rfc7807_exception_handler

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

from fastapi.responses import RedirectResponse

@app.get("/", tags=["System"], include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

# RFC 7807 Exception Handlers (AGENT-11)
app.add_exception_handler(Exception, rfc7807_exception_handler)

# Configuración de Seguridad (AGENT-06)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(PayloadSanitizationMiddleware, max_payload_bytes=2 * 1024 * 1024)
app.add_middleware(RateLimitMiddleware, max_requests=100, window_seconds=60)

# Configuración de CORS
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
