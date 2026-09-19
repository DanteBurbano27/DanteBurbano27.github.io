import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db_session
from app.schemas.interaction import SandboxExecutionRequest, SandboxExecutionResponse
from app.services.sandbox import sandbox_service
from app.models.interaction import SandboxJob

router = APIRouter()

@router.post("/execute", response_model=SandboxExecutionResponse)
async def execute_sandbox(request: SandboxExecutionRequest, db: AsyncSession = Depends(get_db_session)):
    """
    Endpoint del Playground Interactivo para demostraciones en vivo.
    Ejecuta fragmentos de código bajo estricto control de seguridad (Timeouts, Sanitización).
    """
    job_id = str(uuid.uuid4())
    
    # Ejecución aislada
    result = await sandbox_service.execute_code(job_id, request.code, request.language)
    
    # Ofuscación preventiva (AGENT-06) antes de persistir la telemetría
    # Aquí podríamos hacer un hash o truncamiento adicional si el usuario
    # escribiese accidentalmente datos, aunque la sanitización ya bloqueó ataques graves.
    safe_code_payload = request.code[:2000] # Límite de tamaño para evitar desbordamiento DB
    
    # Persistencia de telemetría
    job_record = SandboxJob(
        job_id=job_id,
        code_payload=safe_code_payload,
        language=request.language,
        status=result["status"],
        result_output=result["output"],
        execution_metrics=result["metrics"]
    )
    db.add(job_record)
    await db.commit()
    
    return SandboxExecutionResponse(
        job_id=job_id,
        status=result["status"],
        output=result["output"],
        metrics=result["metrics"]
    )
