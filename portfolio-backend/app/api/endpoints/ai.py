import uuid
import time
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db_session
from app.schemas.interaction import RecruiterQueryRequest, RecruiterQueryResponse
from app.services.ai_engine import ai_engine
from app.models.interaction import RecruiterQuery

router = APIRouter()

@router.post("/ask-recruiter", response_model=RecruiterQueryResponse)
async def ask_recruiter(request: RecruiterQueryRequest, db: AsyncSession = Depends(get_db_session)):
    """
    Endpoint interactivo para que reclutadores hagan preguntas técnicas sobre 
    el perfil, stack y metodologías de trabajo usando RAG.
    """
    start_time = time.time()
    
    # Procesamiento semántico
    result = await ai_engine.answer_recruiter_query(request.query)
    
    execution_time = (time.time() - start_time) * 1000
    session_id = str(uuid.uuid4())
    
    # Persistencia de telemetría (AGENT-07)
    query_record = RecruiterQuery(
        session_id=session_id,
        query_text=request.query,
        ai_response=result["answer"],
        execution_time_ms=execution_time
    )
    db.add(query_record)
    await db.commit()
    
    return RecruiterQueryResponse(
        session_id=session_id,
        answer=result["answer"],
        confidence=result["confidence"],
        sources=result["sources"]
    )
