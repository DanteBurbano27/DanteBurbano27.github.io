from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.core.database import get_db_session
from app.schemas.project import ProjectResponse
from app.services.github_service import github_service
from app.models.project import Project, RepositoryMetric, TechStack

router = APIRouter()

@router.get("/", response_model=List[ProjectResponse])
async def list_projects(db: AsyncSession = Depends(get_db_session)):
    """
    Lista todos los proyectos desde la base de datos local.
    Si la BD está vacía, realiza una ingesta dinámica inicial desde GitHub.
    """
    stmt = select(Project).options(
        selectinload(Project.metrics),
        selectinload(Project.tech_stack)
    )
    result = await db.execute(stmt)
    projects = result.scalars().all()
    
    if not projects:
        # Fallback dinámico: Ingesta al vuelo si no hay datos persistidos
        repos = await github_service.fetch_user_repositories()
        dynamic_projects = []
        for i, r in enumerate(repos):
            dynamic_projects.append({
                "id": f"temp-{i}",
                "name": r["name"],
                "slug": r["slug"],
                "description": r["description"],
                "html_url": r["html_url"],
                "is_private": r["is_private"],
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "metrics": {
                    "stars": r["stars"],
                    "forks": r["forks"],
                    "open_issues": r["open_issues"],
                    "watchers": r["watchers"]
                },
                "tech_stack": [{"language": k, "bytes_written": v} for k, v in r["languages"].items()]
            })
        return dynamic_projects
        
    return projects

@router.post("/sync", status_code=202)
async def sync_github_projects(db: AsyncSession = Depends(get_db_session)):
    """
    Endpoint (Webhook/Manual) para forzar la sincronización ETL 
    desde GitHub a la Base de Datos local.
    """
    repos = await github_service.fetch_user_repositories()
    
    for repo_data in repos:
        stmt = select(Project).where(Project.slug == repo_data["slug"])
        result = await db.execute(stmt)
        existing_project = result.scalars().first()
        
        if not existing_project:
            new_project = Project(
                name=repo_data["name"],
                slug=repo_data["slug"],
                description=repo_data["description"],
                html_url=repo_data["html_url"],
                is_private=repo_data["is_private"]
            )
            db.add(new_project)
            await db.flush() # Obtener ID insertado
            
            # Asociar métricas
            metric = RepositoryMetric(
                project_id=new_project.id,
                stars=repo_data["stars"],
                forks=repo_data["forks"],
                open_issues=repo_data["open_issues"],
                watchers=repo_data["watchers"]
            )
            db.add(metric)
            
            # Asociar Tech Stack
            for lang, bytes_w in repo_data["languages"].items():
                ts = TechStack(project_id=new_project.id, language=lang, bytes_written=bytes_w)
                db.add(ts)
                
    await db.commit()
    return {"status": "success", "message": f"{len(repos)} repositorios sincronizados en DB local."}

@router.get("/{slug}", response_model=ProjectResponse)
async def get_project(slug: str, db: AsyncSession = Depends(get_db_session)):
    stmt = select(Project).where(Project.slug == slug).options(
        selectinload(Project.metrics),
        selectinload(Project.tech_stack)
    )
    result = await db.execute(stmt)
    project = result.scalars().first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
