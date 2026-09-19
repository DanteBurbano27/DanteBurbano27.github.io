# Multi-stage Dockerfile optimizado por AGENT-08
# Etapa 1: Builder
FROM python:3.11-slim as builder

WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
# Cachear ruedas para acelerar la instalación en la imagen final
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Etapa 2: Runtime
FROM python:3.11-slim

# Crear usuario no-root por seguridad (Hardening)
RUN addgroup --system appgroup && adduser --system --group appuser

WORKDIR /app

COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt .

RUN pip install --no-cache /wheels/*

# Copiar el código fuente
COPY . .

# Cambiar permisos de los archivos al usuario no-root
RUN chown -R appuser:appgroup /app

# Reducir privilegios
USER appuser

EXPOSE 8000

# Punto de entrada por defecto
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
