'use client';

import Link from 'next/link';
import { Home, User, Lightbulb, FolderOpen, Award, GraduationCap, Mail, Github, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Inicio', href: '#', icon: Home, id: 'home' },
  { name: 'Perfil', href: '#profile', icon: User, id: 'profile' },
  { name: 'Habilidades', href: '#stack', icon: Lightbulb, id: 'stack' },
  { name: 'Proyectos', href: '#projects', icon: FolderOpen, id: 'projects' },
  { name: 'Certificaciones', href: '#certs', icon: Award, id: 'certs' },
  { name: 'Educación', href: '#education', icon: GraduationCap, id: 'education' },
  { name: 'Contacto', href: '#contact', icon: Mail, id: 'contact' },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id).filter(id => id !== 'home');
      
      // Default to home if near top
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 300) {
          setActiveSection(sections[i]);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className="fixed bottom-0 left-0 right-0 h-16 md:h-auto md:top-0 md:bottom-0 md:w-64 flex flex-row md:flex-col p-2 md:p-8 border-t md:border-t-0 md:border-r border-white/5 bg-cyber-bg/95 backdrop-blur-xl z-50 overflow-x-auto overflow-y-hidden md:overflow-visible transition-colors">
      
      {/* Logo block - desktop only */}
      <div className="hidden md:flex flex-col mb-12 relative group cursor-default">
        <div className="absolute -inset-4 bg-cyber-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="w-6 h-1 bg-cyber-primary mb-5 rounded-full" />
        <h2 className="text-xl font-extrabold text-white tracking-tight mb-1">D<span className="text-cyber-primary">B</span></h2>
        <h1 className="text-[11px] text-cyber-textMuted/70 font-mono tracking-widest uppercase">Portfolio</h1>
      </div>

      <nav className="flex flex-row md:flex-col gap-1 md:gap-2 flex-1 items-center md:items-stretch justify-center md:justify-start min-w-max md:min-w-0 px-2 md:px-0 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group',
                isActive ? 'text-white' : 'text-cyber-textMuted/70 hover:text-white'
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl md:bg-transparent md:border-none md:bg-gradient-to-r md:from-cyber-primary/10 md:to-transparent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="hidden md:block absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-cyber-primary rounded-r-full"
                />
              )}
              
              <Icon size={18} className={clsx(
                "relative z-10 transition-colors duration-300 shrink-0", 
                isActive ? "text-cyber-primary" : "text-cyber-textMuted/70 group-hover:text-cyber-primary/70"
              )} />
              <span className="font-medium text-[13px] tracking-wide relative z-10 hidden md:inline">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Social links - desktop only */}
      <div className="mt-auto hidden md:flex flex-col gap-3 pt-8 border-t border-white/5">
        <a
          href="https://github.com/DanteBurbano27"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 text-cyber-textMuted/70 hover:text-white transition-colors group text-sm font-medium"
        >
          <Github size={18} className="group-hover:text-cyber-primary transition-colors" /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-burbano-b93a1a313"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 text-cyber-textMuted/70 hover:text-white transition-colors group text-sm font-medium"
        >
          <Linkedin size={18} className="group-hover:text-cyber-primary transition-colors" /> LinkedIn
        </a>
      </div>
    </aside>
  );
}
