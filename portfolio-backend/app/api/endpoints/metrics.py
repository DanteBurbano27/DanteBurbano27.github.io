from fastapi import APIRouter
from app.services.github_service import github_service

router = APIRouter()

@router.get("/github")
async def get_github_global_metrics():
    """
    Agrega las métricas de todos los repositorios para mostrar estadísticas globales
    del perfil de GitHub en tiempo real, asistido por caché.
    """
    repos = await github_service.fetch_user_repositories()
    
    total_stars = sum(repo["stars"] for repo in repos)
    total_forks = sum(repo["forks"] for repo in repos)
    language_stats = {}
    
    for repo in repos:
        for lang, bytes_w in repo["languages"].items():
            language_stats[lang] = language_stats.get(lang, 0) + bytes_w
            
    # Ordenar lenguajes por volumen de código escrito (bytes)
    top_languages = sorted(language_stats.items(), key=lambda x: x[1], reverse=True)[:5]
    
    return {
        "global_stars": total_stars,
        "global_forks": total_forks,
        "total_repositories": len(repos),
        "top_languages": [{"language": k, "bytes": v} for k, v in top_languages]
    }
