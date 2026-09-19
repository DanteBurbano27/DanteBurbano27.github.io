from fastapi import APIRouter
from app.api.endpoints import projects, metrics, ai, sandbox, telemetry

api_router = APIRouter()

@api_router.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "message": "Portfolio Backend API is running"}

api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Integration"])
api_router.include_router(sandbox.router, prefix="/sandbox", tags=["Sandbox"])
api_router.include_router(telemetry.router, prefix="/analytics", tags=["Telemetry & Analytics"])
