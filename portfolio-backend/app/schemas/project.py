from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class TechStackBase(BaseModel):
    language: str
    bytes_written: int

class RepositoryMetricBase(BaseModel):
    stars: int = 0
    forks: int = 0
    open_issues: int = 0
    watchers: int = 0

class ProjectBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    html_url: str
    is_private: bool = False

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime
    updated_at: datetime
    metrics: Optional[RepositoryMetricBase] = None
    tech_stack: List[TechStackBase] = []

    model_config = ConfigDict(from_attributes=True)
