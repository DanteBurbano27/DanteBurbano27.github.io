'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const certifications = [
  {
    title: 'Data Science, Analytics and Applied Machine Learning',
    issuer: 'Universidad de Tokio',
    date: 'ago. 2026',
    logoUrl: '/brands/university-of-tokyo.png',
    credentialUrl: ''
  },
  {
    title: 'Microsoft Applied Skills: Integrar herramientas del protocolo de contexto de modelo con agentes en Microsoft Foundry',
    issuer: 'Microsoft',
    date: 'ago. 2026',
    logoUrl: '/brands/microsoft-symbol.svg',
    credentialUrl: ''
  },
  {
    title: 'Microsoft Applied Skills: Compilación de un agente en Microsoft Copilot Studio',
    issuer: 'Microsoft',
    date: 'ago. 2026',
    logoUrl: '/brands/microsoft-symbol.svg',
    credentialUrl: ''
  },
  {
    title: 'Microsoft Applied Skills: Aceleración del desarrollo asistido por IA mediante GitHub Copilot',
    issuer: 'Microsoft',
    date: 'ago. 2026',
    logoUrl: '/brands/microsoft-symbol.svg',
    credentialUrl: ''
  },
  {
    title: 'Big Data Foundations',
    issuer: 'IBM',
    date: 'jul. 2026',
    logoUrl: '/brands/ibm.svg',
    credentialUrl: ''
  },
  {
    title: 'AWS Academy Graduate — Generative AI Foundations',
    issuer: 'Amazon Web Services (AWS)',
    date: 'may. 2026',
    logoUrl: '/brands/aws.svg',
    credentialUrl: ''
  }
];

export default function CertificationsSection() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {certifications.map((cert, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group relative flex gap-5 items-start p-3 -mx-3 rounded-lg hover:bg-white/[0.02] transition-colors duration-300"
          >
            <div className="w-12 h-12 shrink-0 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center p-2 relative overflow-hidden group-hover:border-cyber-primary/30 group-hover:bg-white/10 transition-all duration-300">
              <Image 
                src={cert.logoUrl} 
                alt={cert.issuer} 
                fill
                className="object-contain p-2 opacity-90 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
            
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-sm font-semibold text-white/90 leading-snug mb-1 group-hover:text-cyber-primary transition-colors duration-300">
                {cert.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-cyber-textMuted/70 mb-2 font-medium">
                <span className="text-white/60">{cert.issuer}</span>
                <span className="w-1 h-1 rounded-full bg-cyber-textMuted/30"></span>
                <span>{cert.date}</span>
              </div>
              
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold text-cyber-primary hover:text-cyber-secondary uppercase tracking-wider transition-colors"
                >
                  Ver credencial <ExternalLink size={12} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}




