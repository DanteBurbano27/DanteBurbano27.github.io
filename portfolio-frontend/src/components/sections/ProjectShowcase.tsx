'use client';

import { motion } from 'framer-motion';
import { FolderGit2, Github, ChevronRight, ExternalLink } from 'lucide-react';

const staticProjects = [
  {
    name: 'asuna-ml-agent',
    description: 'Agente de ML avanzado para flujos de trabajo inteligentes. Automatiza procesos analíticos complejos mediante modelos de machine learning y toma de decisiones.',
    url: 'https://github.com/DanteBurbano27/asuna-ml-agent',
    tags: ['Machine Learning', 'AI Agents', 'Python']
  },
  {
    name: 'telecom-churn-prediction',
    description: 'Modelo predictivo de churn en el sector telecomunicaciones. Identifica patrones de abandono de clientes utilizando pipelines de datos y algoritmos de clasificación.',
    url: 'https://github.com/DanteBurbano27/telecom-churn-prediction',
    tags: ['Data Science', 'Predictive Modeling', 'ETL']
  },
  {
    name: 'devflow-engineering-analytics',
    description: 'Sistema de analítica de productividad y flujo de desarrollo. Procesa métricas de ingeniería para visualizar el rendimiento de equipos y cuellos de botella.',
    url: 'https://github.com/DanteBurbano27/devflow-engineering-analytics',
    tags: ['Data Analytics', 'Engineering', 'Dashboard']
  },
  {
    name: 'brujula-vocacional-knowledge',
    description: 'Asistente de conocimiento vocacional basado en IA. Utiliza modelos NLP y arquitecturas RAG para guiar en decisiones académicas.',
    url: 'https://github.com/DanteBurbano27/brujula-vocacional-knowledge',
    tags: ['RAG', 'NLP', 'Knowledge Base']
  },
  {
    name: 'fieldops-ai-agent',
    description: 'Agente de IA diseñado para optimizar operaciones en campo. Procesa datos logísticos y de inventario en tiempo real para sugerir rutas y acciones.',
    url: 'https://github.com/DanteBurbano27/fieldops-ai-agent',
    tags: ['AI Agent', 'Optimization', 'Operations']
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


