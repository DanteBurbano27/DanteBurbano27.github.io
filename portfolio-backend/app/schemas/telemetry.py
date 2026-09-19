from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List

class EventRequest(BaseModel):
    event_type: str = Field(..., description="Ej: PROJECT_VIEW, RESUME_DOWNLOAD, PLAYGROUND_RUN, REPO_CLICK")
    session_id: str
    event_metadata: Optional[Dict[str, Any]] = None

class EventResponse(BaseModel):
    id: str
    status: str = "recorded"
    
class GlobalMetricsResponse(BaseModel):
    total_views: int
    downloads: int
    top_projects: List[Dict[str, Any]]
