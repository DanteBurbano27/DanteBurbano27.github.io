'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const educationList = [
  {
    institution: 'Universidad Distrital Francisco José de Caldas',
    degree: 'Ingeniero en Telecomunicaciones',
    date: 'feb. 2025 – nov. 2027',
    logoUrl: '/brands/universidad-distrital.svg'
  },
  {
    institution: 'Universidad Distrital Francisco José de Caldas',
    degree: 'Tecnólogo en electrónica',
    date: 'ago. 2018 – jun. 2024',
    logoUrl: '/brands/universidad-distrital.svg'
  }
];

export default function EducationSection() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {educationList.map((edu, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group relative flex gap-5 items-start p-4 -mx-4 rounded-xl hover:bg-white/[0.02] transition-colors duration-300"
          >
            <div className="w-12 h-12 shrink-0 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-cyber-primary/30 group-hover:bg-white/10 transition-all duration-300">
              <Image 
                src={edu.logoUrl} 
                alt={edu.institution} 
                fill
                className="object-contain p-2 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
            
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-sm font-semibold text-white/90 leading-snug mb-1 group-hover:text-cyber-primary transition-colors duration-300">
                {edu.institution}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-cyber-textMuted/70 mb-3 font-medium">
                <span className="text-white/60">{edu.degree}</span>
                <span className="w-1 h-1 rounded-full bg-cyber-textMuted/30"></span>
                <span>{edu.date}</span>
              </div>
              
              
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 pt-6 border-t border-white/5 text-center"
      >
         <p className="text-[11px] italic font-serif text-cyber-textMuted/40 leading-relaxed max-w-[250px] mx-auto">
           &quot;La educación es la base para construir soluciones extraordinarias.&quot;
         </p>
      </motion.div>
    </div>
  );
}






