import AIAssistantChat from '@/components/ai/AIAssistantChat'
import HeroProfile from '@/components/sections/HeroProfile'
import ProjectShowcase from '@/components/sections/ProjectShowcase'
import SkillsMatrix from '@/components/sections/SkillsMatrix'
import CertificationsSection from '@/components/sections/CertificationsSection'
import EducationSection from '@/components/sections/EducationSection'
import { Github, Linkedin } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 w-full max-w-[1200px] mx-auto pb-32 relative z-10">
      
      {/* SECTION: HERO & COPILOT */}
      <div className="flex flex-col xl:flex-row gap-6 mt-8" id="profile">
        <div className="w-full xl:w-2/3 flex flex-col">
          <HeroProfile />
        </div>
        <div className="w-full xl:w-1/3 flex flex-col">
          <AIAssistantChat />
        </div>
      </div>

      {/* SECTION: SKILLS */}
      <div id="stack" className="scroll-mt-24">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Tech Stack</h2>
          <div className="h-[1px] bg-cyber-border/40 flex-1"></div>
        </div>
        <SkillsMatrix />
      </div>

      {/* SECTION: PROJECTS */}
      <div id="projects" className="scroll-mt-24">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Proyectos Destacados</h2>
          <div className="h-[1px] bg-cyber-border/40 flex-1"></div>
        </div>
        <ProjectShowcase />
      </div>

      {/* SECTION: CERTS & EDUCATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div id="certs" className="scroll-mt-24">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Certificaciones</h2>
            <div className="h-[1px] bg-cyber-border/40 flex-1"></div>
          </div>
          <CertificationsSection />
        </div>
        
        <div id="education" className="scroll-mt-24">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Educación</h2>
            <div className="h-[1px] bg-cyber-border/40 flex-1"></div>
          </div>
          <EducationSection />
        </div>
      </div>

      {/* SECTION: CONTACT */}
      <div id="contact" className="glass-panel rounded-2xl p-8 md:p-12 bg-cyber-bg2/40 border border-cyber-border/20 flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
        <div>
          <p className="text-xs text-cyber-primary font-mono tracking-widest uppercase mb-3">Contáctame</p>
          <h2 className="text-3xl font-extrabold text-white mb-4">¿Hablamos?</h2>
          <p className="text-cyber-textMuted text-base max-w-md leading-relaxed">
            Estoy disponible para oportunidades de trabajo, colaboraciones en proyectos de datos e IA, o simplemente para conversar sobre tecnología.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <a
            href="https://github.com/DanteBurbano27"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-cyber-border/40 bg-white/5 hover:bg-cyber-primary/10 hover:border-cyber-primary/40 hover:text-cyber-primary text-white font-medium transition-all"
          >
            <Github size={20} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-burbano-b93a1a313"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-cyber-primary hover:bg-cyber-primary/90 text-black font-bold transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
        </div>
      </div>
      
    </div>
  )
}




