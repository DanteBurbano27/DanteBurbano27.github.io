from fastapi import Request
from fastapi.responses import JSONResponse
import logging
from typing import Union

logger = logging.getLogger(__name__)

async def rfc7807_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler according to RFC 7807 (Problem Details).
    Enforced by AGENT-11 & AGENT-12 to prevent internal stack trace leakage.
    """
    logger.error(f"Internal Error at {request.url.path}: {str(exc)}")
    
    return JSONResponse(
        status_code=500,
        content={
            "type": "https://portfolio.api/errors/internal-server-error",
            "title": "Internal Server Error",
            "status": 500,
            "detail": "An unexpected error occurred. The incident has been securely logged.",
            "instance": request.url.path
        }
    )
