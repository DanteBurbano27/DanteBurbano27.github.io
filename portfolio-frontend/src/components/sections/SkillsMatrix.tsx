'use client';

import { motion } from 'framer-motion';
import { Box, Code2, Database, BrainCircuit, Terminal, Server, Layout, Cloud, GitBranch, Cpu, Bot } from 'lucide-react';
import Image from 'next/image';

const skillCategories = [
  {
    title: 'Inteligencia Artificial & Agentes',
    items: [
      { name: 'Machine Learning', icon: <BrainCircuit size={20} /> },
      { name: 'GitHub Copilot', logoUrl: '/brands/github.svg' },
      { name: 'Claude Code', logoUrl: '/brands/anthropic.png' },
      { name: 'Copilot Studio', logoUrl: '/brands/microsoft-copilot.png' },
      { name: 'Microsoft Foundry', logoUrl: '/brands/microsoft.png' },
      { name: 'Power BI', logoUrl: '/brands/powerbi.png' },
      { name: 'Microsoft Power Platform', logoUrl: '/brands/power-platform.png' },
      { name: 'RAG', icon: <Database size={20} /> },
      { name: 'MCP', icon: <Box size={20} /> },
      { name: 'Modelos Locales', icon: <Cpu size={20} /> },
    ]
  },
  {
    title: 'DATA ENGINEERING',
    items: [
      { name: 'Python', logoUrl: '/brands/python.svg' },
      { name: 'ETL/ELT Pipelines', icon: <Database size={20} /> },
      { name: 'Data Management', icon: <Server size={20} /> },
      { name: 'Bases de Datos', icon: <Database size={20} /> },
    ]
  },
  {
    title: 'LANGUAGES',
    items: [
      { name: 'JavaScript', logoUrl: '/brands/javascript.svg' },
      { name: 'HTML', logoUrl: '/brands/html.svg' },
      { name: 'CSS', logoUrl: '/brands/css.svg' },
      { name: 'Java', logoUrl: '/brands/java.svg' },
      { name: 'C++', logoUrl: '/brands/cpp.svg' },
    ]
  },
  {
    title: 'CLOUD & DEVOPS',
    items: [
      { name: 'Azure', logoUrl: '/brands/azure.svg' },
      { name: 'AWS', logoUrl: '/brands/aws.svg' },
      { name: 'GitHub', logoUrl: '/brands/github.svg' },
    ]
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function SkillsMatrix() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        {skillCategories.map((category, catIdx) => (
          <motion.div 
            key={catIdx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <h3 className="text-xs font-mono tracking-widest text-cyber-textMuted uppercase mb-3 pl-2 border-l border-cyber-primary/30">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.items.map((skill, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="group relative flex items-center gap-3 px-3 py-2 bg-black/20 border border-white/5 rounded-xl hover:border-cyber-primary/40 hover:bg-cyber-primary/5 transition-all duration-300 overflow-hidden cursor-default"
                >
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-cyber-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-xl" />
                  
                  <div className="text-cyber-textMuted group-hover:text-cyber-primary transition-colors duration-300 flex items-center justify-center w-5 h-5 relative shrink-0 z-10">
                    {skill.logoUrl ? (
                       <Image 
                         src={skill.logoUrl} 
                         alt={skill.name} 
                         fill 
                         className="object-contain transition-all duration-300"
                       />
                    ) : (
                       skill.icon
                    )}
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300 z-10">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}



