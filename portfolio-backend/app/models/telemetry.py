from sqlalchemy import Column, String, JSON
from app.models.base import Base

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"
    
    event_type = Column(String(50), index=True, nullable=False)
    session_id = Column(String(100), index=True, nullable=False)
    metadata_json = Column(JSON, nullable=True)
