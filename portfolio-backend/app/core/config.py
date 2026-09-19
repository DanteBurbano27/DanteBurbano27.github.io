from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio Backend API"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "DEV_SECRET_KEY_CHANGE_IN_PRODUCTION"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./portfolio.db"
    
    # GitHub Integration
    GITHUB_TOKEN: Optional[str] = None
    GITHUB_USERNAME: str = "DanteBurbano27"
    
    # AI/RAG Settings
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
