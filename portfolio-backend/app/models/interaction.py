from sqlalchemy import Column, String, Text, Float, JSON
from app.models.base import Base

class RecruiterQuery(Base):
    __tablename__ = "recruiter_queries"
    
    session_id = Column(String(100), index=True)
    query_text = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=True)
    execution_time_ms = Column(Float, nullable=True)

class SandboxJob(Base):
    __tablename__ = "sandbox_jobs"
    
    job_id = Column(String(36), unique=True, index=True, nullable=False)
    code_payload = Column(Text, nullable=False)
    language = Column(String(50), nullable=False)
    status = Column(String(50), default="pending")  # pending, running, completed, failed
    result_output = Column(Text, nullable=True)
    execution_metrics = Column(JSON, nullable=True)
