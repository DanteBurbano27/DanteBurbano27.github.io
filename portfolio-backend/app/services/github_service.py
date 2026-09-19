import httpx
import asyncio
from typing import List, Dict, Any
from fastapi import HTTPException
from app.core.config import settings
from app.services.cache_service import cache_service

class GitHubService:
    """
    Servicio de Ingesta Dinámica (ETL) para interactuar con la API de GitHub.
    Diseñado por AGENT-02 (Data Pipeline Specialist) con resiliencia y caché.
    """
    def __init__(self):
        self.username = settings.GITHUB_USERNAME
        self.base_url = "https://api.github.com"
        self.headers = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Portfolio-Backend-ETL/1.0"
        }
        if settings.GITHUB_TOKEN:
            self.headers["Authorization"] = f"Bearer {settings.GITHUB_TOKEN}"

    async def _fetch_with_retry(self, client: httpx.AsyncClient, url: str) -> httpx.Response:
        """Realiza peticiones HTTPX con reintentos exponenciales básicos (AGENT-06)."""
        for attempt in range(3):
            response = await client.get(url, headers=self.headers)
            if response.status_code == 403 and "rate limit" in response.text.lower():
                await asyncio.sleep(2 ** attempt)
                continue
            response.raise_for_status()
            return response
        raise HTTPException(status_code=429, detail="GitHub API Rate Limit Exceeded")

    async def fetch_user_repositories(self) -> List[Dict[str, Any]]:
        """Extrae y normaliza los repositorios del usuario, incluyendo stacks tecnológicos."""
        cache_key = f"github_repos_{self.username}"
        cached = await cache_service.get(cache_key)
        if cached:
            return cached

        async with httpx.AsyncClient(timeout=10.0) as client:
            url = f"{self.base_url}/users/{self.username}/repos?sort=updated&per_page=100"
            try:
                response = await self._fetch_with_retry(client, url)
                repos = response.json()
                
                normalized_repos = []
                for repo in repos:
                    # Ignoramos forks para enfocarnos en proyectos propios
                    if repo.get("fork"):
                        continue
                        
                    # Extraer lenguajes utilizados
                    lang_url = repo["languages_url"]
                    lang_response = await self._fetch_with_retry(client, lang_url)
                    languages = lang_response.json()

                    normalized_repos.append({
                        "name": repo["name"],
                        "slug": repo["name"].lower().replace(" ", "-"),
                        "description": repo["description"],
                        "html_url": repo["html_url"],
                        "is_private": repo["private"],
                        "stars": repo["stargazers_count"],
                        "forks": repo["forks_count"],
                        "open_issues": repo["open_issues_count"],
                        "watchers": repo["watchers_count"],
                        "topics": repo.get("topics", []),
                        "languages": languages
                    })
                
                # Almacenar en caché por 1 hora (3600s) para evitar bloqueos
                await cache_service.set(cache_key, normalized_repos, ttl_seconds=3600)
                return normalized_repos

            except httpx.HTTPStatusError as e:
                raise HTTPException(status_code=e.response.status_code, detail=f"GitHub API Error: {str(e)}")

github_service = GitHubService()
