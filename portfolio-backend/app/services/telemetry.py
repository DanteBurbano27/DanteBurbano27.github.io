from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.models.telemetry import AnalyticsEvent
from typing import Dict, Any

class TelemetryService:
    """
    Servicio de Telemetría (AGENT-07).
    Diseñado para insertar eventos rápidamente sin penalizar latencia.
    """
    async def record_event(self, db: AsyncSession, event_type: str, session_id: str, metadata: Dict[str, Any] = None) -> str:
        new_event = AnalyticsEvent(
            event_type=event_type,
            session_id=session_id,
            metadata_json=metadata or {}
        )
        db.add(new_event)
        await db.commit()
        await db.refresh(new_event)
        return new_event.id
        
    async def get_metrics(self, db: AsyncSession) -> Dict[str, Any]:
        """
        Calcula resumen de tracción de manera asíncrona.
        """
        # Count project views
        stmt_views = select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "PROJECT_VIEW")
        result_views = await db.execute(stmt_views)
        total_views = result_views.scalar() or 0
        
        # Count resume downloads
        stmt_downloads = select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "RESUME_DOWNLOAD")
        result_down = await db.execute(stmt_downloads)
        downloads = result_down.scalar() or 0
        
        return {
            "total_views": total_views,
            "downloads": downloads,
            "top_projects": [] # Placeholder para queries más complejas
        }

telemetry_service = TelemetryService()
