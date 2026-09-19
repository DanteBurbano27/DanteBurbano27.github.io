import time
from typing import Any, Optional, Dict

class CacheService:
    """
    Servicio de Caché en memoria con TTL configurable.
    Diseñado por AGENT-03 para evitar rate-limits de la API de GitHub
    y garantizar tiempos de respuesta < 80ms hacia el frontend.
    """
    def __init__(self):
        self._cache: Dict[str, Dict[str, Any]] = {}
    
    async def get(self, key: str) -> Optional[Any]:
        if key in self._cache:
            item = self._cache[key]
            if time.time() < item["expires_at"]:
                return item["value"]
            else:
                # Expirado
                del self._cache[key]
        return None

    async def set(self, key: str, value: Any, ttl_seconds: int = 300) -> None:
        self._cache[key] = {
            "value": value,
            "expires_at": time.time() + ttl_seconds
        }

    async def clear(self) -> None:
        self._cache.clear()

# Instancia Singleton
cache_service = CacheService()
