'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface UIState {
  reducedMotion: boolean
}

const UIStateContext = createContext<UIState | undefined>(undefined)

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <UIStateContext.Provider value={{ reducedMotion }}>
      {children}
    </UIStateContext.Provider>
  )
}

export function useUIState() {
  const ctx = useContext(UIStateContext)
  if (!ctx) throw new Error('useUIState must be used within UIStateProvider')
  return ctx
}
