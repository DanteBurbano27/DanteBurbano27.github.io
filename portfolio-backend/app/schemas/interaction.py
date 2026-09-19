from pydantic import BaseModel
from typing import List, Dict, Any

class RecruiterQueryRequest(BaseModel):
    query: str

class RecruiterQueryResponse(BaseModel):
    session_id: str
    answer: str
    confidence: float
    sources: List[str]

class SandboxExecutionRequest(BaseModel):
    language: str
    code: str

class SandboxExecutionResponse(BaseModel):
    job_id: str
    status: str
    output: str
    metrics: Dict[str, Any]
