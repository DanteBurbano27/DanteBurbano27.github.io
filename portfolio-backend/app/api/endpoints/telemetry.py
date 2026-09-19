from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db_session
from app.schemas.telemetry import EventRequest, EventResponse, GlobalMetricsResponse
from app.services.telemetry import telemetry_service

router = APIRouter()

@router.post("/event", response_model=EventResponse, status_code=202)
async def track_event(event: EventRequest, request: Request, db: AsyncSession = Depends(get_db_session)):
    """
    Ingesta asíncrona de eventos desde el cliente.
    """
    metadata = event.event_metadata or {}
    # Sanitización del user-agent y omisión de IP por privacidad
    metadata["user_agent"] = request.headers.get("user-agent", "Unknown")[:255]
    
    event_id = await telemetry_service.record_event(
        db=db,
        event_type=event.event_type,
        session_id=event.session_id,
        metadata=metadata
    )
    return EventResponse(id=event_id)

@router.get("/metrics", response_model=GlobalMetricsResponse)
async def get_analytics_metrics(db: AsyncSession = Depends(get_db_session)):
    """
    Obtiene las métricas agregadas del tráfico del portafolio.
    """
    metrics = await telemetry_service.get_metrics(db)
    return GlobalMetricsResponse(**metrics)
