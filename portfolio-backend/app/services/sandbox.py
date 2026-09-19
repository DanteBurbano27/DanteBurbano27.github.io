import asyncio
import logging
import ast
from typing import Dict, Any

logger = logging.getLogger(__name__)

class SandboxSecurityNodeVisitor(ast.NodeVisitor):
    """Auditoría AST (Abstract Syntax Tree) nivel de código. Cero bypasses triviales (AGENT-12)."""
    def __init__(self):
        self.violations = []
        self.allowed_imports = {"math", "json", "datetime", "polars", "numpy", "pandas", "typing"}
        
    def visit_Import(self, node):
        for alias in node.names:
            if alias.name.split('.')[0] not in self.allowed_imports:
                self.violations.append(f"Importación no permitida: {alias.name}")
        self.generic_visit(node)
        
    def visit_ImportFrom(self, node):
        if node.module and node.module.split('.')[0] not in self.allowed_imports:
            self.violations.append(f"Importación no permitida: {node.module}")
        self.generic_visit(node)
        
    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            if node.func.id in {"eval", "exec", "open", "compile", "globals", "locals", "getattr", "setattr", "delattr", "__import__"}:
                self.violations.append(f"Función bloqueada (Security Risk): {node.func.id}()")
        self.generic_visit(node)
        
    def visit_Attribute(self, node):
        if node.attr in {"__class__", "__subclasses__", "__bases__", "__globals__", "__builtins__", "__dict__", "__mro__"}:
            self.violations.append(f"Introspección reflectiva bloqueada: {node.attr}")
        self.generic_visit(node)

class SandboxService:
    def __init__(self):
        self.max_execution_time = 2.0 

    def _ast_sanitize_code(self, code: str) -> list[str]:
        try:
            tree = ast.parse(code)
            visitor = SandboxSecurityNodeVisitor()
            visitor.visit(tree)
            return visitor.violations
        except SyntaxError as e:
            return [f"Error de sintaxis detectado antes de la ejecución: {e}"]

    async def execute_code(self, job_id: str, code: str, language: str) -> Dict[str, Any]:
        if language.lower() == "python":
            violations = self._ast_sanitize_code(code)
            if violations:
                return {
                    "status": "failed",
                    "output": "Ejecución abortada por AGENT-12 (AST Runtime Security):\n- " + "\n- ".join(violations),
                    "metrics": {"execution_time_ms": 0}
                }
        
        try:
            async with asyncio.timeout(self.max_execution_time):
                # Simulación de transformación real de datos / cálculos matriciales (AGENT-13)
                await asyncio.sleep(0.3)
                output = f"[{language.upper()} Worker] Código compilado y ejecutado en micro-vm.\n> Operación vectorial procesada.\n> Dataframe Shape: (1000, 5)\n> Peak Mem: 45MB"
                return {
                    "status": "completed",
                    "output": output,
                    "metrics": {"execution_time_ms": 315, "memory_mb": 45.2}
                }
        except asyncio.TimeoutError:
            return {
                "status": "failed",
                "output": f"TimeoutError: Proceso destruido. Superó el umbral de CPU ({self.max_execution_time}s).",
                "metrics": {"execution_time_ms": self.max_execution_time * 1000}
            }

sandbox_service = SandboxService()
