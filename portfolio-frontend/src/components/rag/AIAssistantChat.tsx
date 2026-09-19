'use client'

import { useState } from 'react'

export default function AIAssistantChat() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!query) return
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/ai/ask-recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      setResponse(data.answer || data.detail || 'Error communicating with AI.')
    } catch (e) {
      setResponse('Network Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-md border border-slate-800 mb-4 text-sm font-mono text-blue-300 shadow-inner">
        {response ? response : 'Awaiting recruiter query... (Try asking about async pipelines)'}
      </div>
      <div className="flex gap-2">
        <input 
          type="text" 
          className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-slate-200"
          placeholder="Ask about my architecture..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button 
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 shadow-lg"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </div>
    </div>
  )
}
