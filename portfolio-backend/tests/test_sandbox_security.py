import pytest
from app.services.sandbox import sandbox_service

@pytest.mark.asyncio
async def test_sandbox_blocks_dangerous_imports():
    """Verifica que el Application-Layer Sanitization bloquee módulos peligrosos."""
    malicious_code = "import os\nos.system('rm -rf /')"
    result = await sandbox_service.execute_code("job_123", malicious_code, "python")
    
    assert result["status"] == "failed"
    assert "bloqueada" in result["output"].lower()
    assert "riesgosas" in result["output"].lower()

@pytest.mark.asyncio
async def test_sandbox_blocks_sql_injection_keywords():
    """Asegura que consultas SQL destructivas sean abortadas antes de ejecutarse."""
    malicious_code = "db.execute('DROP TABLE users;')"
    result = await sandbox_service.execute_code("job_124", malicious_code, "sql")
    
    assert result["status"] == "failed"
    assert "bloqueada" in result["output"].lower()

@pytest.mark.asyncio
async def test_sandbox_timeout_kills_execution():
    """Verifica que el contenedor de timeout estricto asíncrono mate bucles infinitos."""
    # Reducimos el timeout del sandbox para testear la excepción rápidamente
    sandbox_service.max_execution_time = 0.1 
    
    # Internamente el mock del sandbox tiene un sleep(0.5). Al poner timeout en 0.1, debe fallar.
    result = await sandbox_service.execute_code("job_125", "print('hello')", "python")
    
    assert result["status"] == "failed"
    assert "TimeoutError" in result["output"]
    
    # Restaurar
    sandbox_service.max_execution_time = 3.0 
