import pytest
from httpx import AsyncClient
from unittest.mock import patch

@pytest.mark.asyncio
@patch("app.services.github_service.GitHubService.fetch_user_repositories")
async def test_list_projects_empty_db_triggers_etl(mock_fetch, async_client: AsyncClient):
    """
    Testea que si la DB local está vacía, el endpoint dispara el pipeline ETL dinámico,
    y mockeamos la respuesta de GitHub para no consumir rate limits.
    """
    mock_fetch.return_value = [{
        "name": "Portfolio Backend Architecture",
        "slug": "portfolio-backend-architecture",
        "description": "Advanced multi-agent orchestrated backend.",
        "html_url": "https://github.com/DanteBurbano27/portfolio-backend",
        "is_private": False,
        "stars": 42,
        "forks": 5,
        "open_issues": 0,
        "watchers": 12,
        "topics": ["python", "fastapi", "ai"],
        "languages": {"Python": 15000, "Dockerfile": 800}
    }]
    
    response = await async_client.get("/api/v1/projects/")
    assert response.status_code == 200
    data = response.json()
    
    assert len(data) == 1
    assert data[0]["name"] == "Portfolio Backend Architecture"
    assert data[0]["metrics"]["stars"] == 42
    assert len(data[0]["tech_stack"]) == 2

@pytest.mark.asyncio
async def test_track_telemetry_event(async_client: AsyncClient):
    """Verifica que el endpoint de telemetría ingeste eventos rápidamente y retorne un HTTP 202."""
    payload = {
        "event_type": "PROJECT_VIEW",
        "session_id": "test-session-12345",
        "event_metadata": {"project_slug": "portfolio-backend"}
    }
    response = await async_client.post("/api/v1/analytics/event", json=payload)
    
    assert response.status_code == 202
    data = response.json()
    assert data["status"] == "recorded"
    assert "id" in data
