'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TerminalSquare, Github, Linkedin, ChevronRight } from 'lucide-react';
import MatrixText from '@/components/ui/MatrixText';

export default function HeroProfile() {
  return (
    <div className="glass-panel rounded-2xl h-full overflow-hidden flex flex-col md:flex-row relative bg-cyber-bg2/90 border border-cyber-border/20 min-h-[380px]">
      
      {/* Background radial spotlight (Aceternity style) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyber-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="p-6 md:p-10 md:w-[60%] flex flex-col justify-center relative z-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-cyber-primary text-2xl md:text-3xl font-mono tracking-[0.1em] font-bold uppercase mb-3 flex items-center"
        >
          <MatrixText text="Daniel Burbano" duration={600} />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tight leading-[1.1]"
        >
          Data & AI <br />
          <span className="text-cyber-textMuted font-light">Professional.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-cyber-textMuted/90 text-base md:text-lg leading-relaxed mb-5 max-w-lg"
        >
          Apasionado por convertir datos en soluciones reales. Me especializo en ciencia de datos, ingeniería de IA, automatización y agentes inteligentes.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <Link href="#projects" className="group flex items-center gap-2 px-5 py-2.5 text-sm bg-cyber-primary hover:bg-cyber-primary/90 text-black rounded-full font-bold transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]">
            Ver proyectos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://github.com/DanteBurbano27" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border border-cyber-border/30 text-white hover:text-cyber-primary hover:border-cyber-primary/50 hover:bg-cyber-primary/5 transition-all">
            <Github size={20} /> <span className="text-sm font-medium">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/daniel-burbano-b93a1a313" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border border-cyber-border/30 text-white hover:text-cyber-primary hover:border-cyber-primary/50 hover:bg-cyber-primary/5 transition-all">
            <Linkedin size={20} /> <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </motion.div>

        
      </div>

      <div className="md:w-[40%] relative min-h-[300px] md:min-h-full overflow-hidden">
        {/* Soft gradients to blend image smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-bg2 via-cyber-bg2/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg2 via-transparent to-transparent z-10 md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyber-bg2/80 z-10" />
        <div className="absolute inset-0 bg-cyber-primary/5 mix-blend-overlay z-10" />
        
        <Image 
          src="/fondo.jpg" 
          alt="Daniel Burbano Background" 
          fill 
          className="object-cover object-right opacity-60 scale-105"
          priority
        />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute bottom-6 right-6 z-20 text-right hidden lg:block"
        >
          <p className="text-white/60 text-sm italic font-serif max-w-[200px] leading-relaxed">
            "La tecnología tiene sentido cuando mejora la vida de las personas"
          </p>
        </motion.div>
      </div>
    </div>
  );
}



