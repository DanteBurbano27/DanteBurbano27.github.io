'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send } from 'lucide-react'
import MatrixText from '@/components/ui/MatrixText'

const QUICK_PROMPTS = [
  "¿Cuáles son sus principales habilidades?",
  "Cuéntame sobre sus proyectos",
  "¿Qué certificaciones tiene?",
  "¿Cuál es su formación académica?"
]

const LOADING_MESSAGES = [
  "ANALYZING PROFILE...",
  "RETRIEVING CONTEXT...",
  "GENERATING RESPONSE..."
]

export default function AIAssistantChat() {
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<{role: 'user'|'ai', content: string}[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, loading])

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [loading]);

      const ask = async (q: string) => {
    if (!q.trim()) return;
    setHistory(prev => [...prev, { role: 'user', content: q }]);
    setQuery('');
    setLoading(true);
    setLoadingMsgIdx(0);
    
    try {
      const endpoint = process.env.NEXT_PUBLIC_AI_ENDPOINT || 'https://daniel-portfolio-ai.burbanod467.workers.dev';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, history: history.slice(-4) })
      });

      if (!res.ok) {
        throw new Error("HTTP error! status: " + res.status);
      }

      const data = await res.json();
      
      if (data.answer) {
        setHistory(prev => [...prev, { role: 'ai', content: data.answer }]);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      console.error("AI Error:", err);
      
      const lowerQ = q.toLowerCase();
      let fallbackResponse = "";
      
      if (lowerQ.includes("habilidade") || lowerQ.includes("skill") || lowerQ.includes("tecnología") || lowerQ.includes("stack") || lowerQ.includes("tecnologia")) {
        fallbackResponse = "Daniel trabaja con Python, JavaScript, Java, C++, Machine Learning, Modelos Locales, RAG, MCP, y herramientas cloud como Azure y AWS.";
      } else if (lowerQ.includes("proyecto") || lowerQ.includes("project")) {
        fallbackResponse = "Daniel ha desarrollado proyectos como asuna-ml-agent, telecom-churn-prediction, devflow-engineering-analytics, brujula-vocacional-knowledge, y fieldops-ai-agent.";
      } else if (lowerQ.includes("certificaci") || lowerQ.includes("certificat")) {
        fallbackResponse = "Daniel tiene certificaciones oficiales de la Universidad de Tokio, Microsoft, IBM y AWS, enfocadas fuertemente en Data Science y Generative AI.";
      } else if (lowerQ.includes("educaci") || lowerQ.includes("estudi") || lowerQ.includes("formaci") || lowerQ.includes("universidad")) {
        fallbackResponse = "Actualmente cursa Ingeniería en Telecomunicaciones y posee título de Tecnólogo en Electrónica, ambos por la Universidad Distrital Francisco José de Caldas.";
      } else if (lowerQ.includes("github") || lowerQ.includes("contacto") || lowerQ.includes("linkedin")) {
        fallbackResponse = "Puedes contactarlo en LinkedIn o ver su código en GitHub. Los enlaces están disponibles en la sección de contacto de la página.";
      } else {
        fallbackResponse = "El asistente está temporalmente fuera de línea.";
      }

      setHistory(prev => [...prev, { role: 'ai', content: fallbackResponse }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-panel rounded-2xl flex flex-col relative bg-cyber-bg2/40 border border-cyber-border/20 h-full min-h-[350px] overflow-hidden group">
      
      {/* Subtle border beam effect on hover */}
      <div className="absolute inset-0 border border-cyber-primary/0 group-hover:border-cyber-primary/20 rounded-2xl transition-colors duration-700 pointer-events-none" />

      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cyber-primary/10 flex items-center justify-center border border-cyber-primary/20 relative">
            <Sparkles size={14} className="text-cyber-primary" />
            <div className="absolute inset-0 rounded-full animate-ping bg-cyber-primary/20 opacity-20" />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-white tracking-wide">Asistente de información</h3>
            <p className="text-[10px] text-cyber-textMuted font-mono">PROFILE INTELLIGENCE</p>
          </div>
        </div>
        
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {history.length === 0 && (
          <div className="my-auto flex flex-col items-center text-center opacity-70">
            <Sparkles className="text-cyber-primary/40 mb-3" size={24} />
            <p className="text-sm text-cyber-textMuted max-w-[220px]">
              Pregúntame sobre la experiencia, habilidades o proyectos de Daniel.
            </p>
            <div className="mt-4 flex flex-col gap-1.5 w-full">
              {QUICK_PROMPTS.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => ask(qp)}
                  className="text-xs text-left px-4 py-1.5 rounded-md text-[11px] border border-white/5 bg-white/[0.02] hover:bg-cyber-primary/10 hover:border-cyber-primary/30 hover:text-white text-cyber-textMuted transition-all duration-300"
                >
                  {qp}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {history.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`px-3 py-2 rounded-xl max-w-[85%] text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-cyber-primary/10 text-white border border-cyber-primary/20 rounded-tr-sm'
                : 'bg-white/[0.03] text-cyber-textMuted border border-white/5 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-xs text-cyber-primary font-mono bg-cyber-primary/5 border border-cyber-primary/10 px-4 py-3 rounded-xl rounded-tl-sm w-fit"
            >
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <MatrixText text={LOADING_MESSAGES[loadingMsgIdx]} duration={500} key={loadingMsgIdx} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/5 bg-black/10">
        <form onSubmit={e => { e.preventDefault(); ask(query) }} className="relative flex items-center">
          <input 
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white placeholder-cyber-textMuted/50 focus:outline-none focus:border-cyber-primary/50 focus:bg-white/10 transition-all"
            disabled={loading}
          />
          <button 
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-2 w-8 h-8 rounded-full bg-cyber-primary hover:bg-cyber-primary/90 text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={14} className={query.trim() && !loading ? 'translate-x-[-1px]' : ''} />
          </button>
        </form>
      </div>
    </div>
  )
}












