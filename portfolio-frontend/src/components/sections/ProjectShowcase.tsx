'use client';

import { motion } from 'framer-motion';
import { FolderGit2, Github, ChevronRight, ExternalLink } from 'lucide-react';

const staticProjects = [
  {
    name: 'asuna-ml-agent',
    description: 'Caso de estudio de arquitectura pública y capa de referencia para un asistente de ciclo de vida de Machine Learning. Demuestra perfilado de datos, mitigación heurística de fugas, comparación de modelos base/contendientes, probabilidades estimadas y puntuación por niveles de riesgo.',
    url: 'https://github.com/DanteBurbano27/asuna-ml-agent',
    tags: ['Architecture Study', 'Machine Learning', 'Systems Design']
  },
  {
    name: 'telecom-churn-prediction',
    description: 'Pipeline reproducible de modelado de churn con CV exclusivo en entrenamiento y evaluación en holdout intacto. Las métricas del notebook histórico se conservan con reservas de validación; el análisis de negocio es un modelado de escenarios hipotéticos.',
    url: 'https://github.com/DanteBurbano27/telecom-churn-prediction',
    tags: ['Machine Learning', 'Predictive Modeling', 'Scenario Modeling']
  },
  {
    name: 'devflow-engineering-analytics',
    description: 'Plataforma de ingeniería de datos para analítica de repositorios. Implementa contratos tipados basados en dataclasses de Python, ingesta de GitHub REST, 16 reglas deterministas de calidad de datos, artefactos JSON particionados, adaptador BigQuery mock-testeado y 155 pruebas automatizadas.',
    url: 'https://github.com/DanteBurbano27/devflow-engineering-analytics',
    tags: ['Data Engineering', 'Data Quality', 'GitHub API', 'CI/CD']
  },
  {
    name: 'brujula-vocacional-knowledge',
    description: 'Base de conocimiento estructurada y gobernada para sistemas RAG y agentes en Microsoft Copilot Studio. Integra taxonomías RIASEC del O*NET Interest Profiler, materiales vocacionales del SENA y especificación de evaluación para Colombia.',
    url: 'https://github.com/DanteBurbano27/brujula-vocacional-knowledge',
    tags: ['Knowledge Engineering', 'RAG Architecture', 'Data Governance']
  },
  {
    name: 'fieldops-ai-agent',
    description: 'Sistema de asistencia técnica para operaciones en campo integrado con Microsoft Copilot Studio y Telegram Relay. Implementa un servidor MCP para consulta de órdenes de trabajo, inventario, base técnica y registro idempotente de intervenciones.',
    url: 'https://github.com/DanteBurbano27/fieldops-ai-agent',
    tags: ['AI Agents', 'MCP Protocol', 'Copilot Studio', 'Telegram Relay']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ProjectShowcase() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <p className="text-cyber-textMuted text-sm max-w-xl">
          Una selección de mis proyectos más recientes integrando flujos de datos, modelos predictivos y agentes inteligentes.
        </p>
        <a 
          href="https://github.com/DanteBurbano27" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white hover:text-cyber-primary transition-colors flex items-center gap-1 group shrink-0"
        >
          Ver en GitHub <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-4"
      >
        {staticProjects.map((project, idx) => (
          <motion.a
            key={idx}
            variants={itemVariants}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col md:flex-row md:items-center gap-3 md:gap-6 p-4 md:p-5 rounded-2xl bg-black/20 hover:bg-cyber-bg2 border border-white/5 hover:border-cyber-primary/30 transition-all duration-300 overflow-hidden"
          >
            {/* Hover Spotlight Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/0 via-cyber-primary/0 to-cyber-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex flex-col md:w-1/3 shrink-0">
              <h3 className="text-base font-bold text-white group-hover:text-cyber-primary transition-colors flex items-center gap-2 mb-2">
                <Github size={16} className="text-cyber-textMuted group-hover:text-cyber-primary" />
                {project.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono text-cyber-primary/70 bg-cyber-primary/5 border border-cyber-primary/20 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-cyber-textMuted leading-relaxed md:w-2/3 group-hover:text-white/80 transition-colors">
              {project.description}
            </p>

            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <ExternalLink size={18} className="text-cyber-primary" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}


