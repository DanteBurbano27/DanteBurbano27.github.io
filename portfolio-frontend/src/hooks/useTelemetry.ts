'use client'

export function useTelemetry() {
  const trackEvent = (eventType: string, metadata: Record<string, any> = {}) => {
    if (typeof window === 'undefined') return

    const sessionId = localStorage.getItem('session_id') || Math.random().toString(36).substring(7)
    localStorage.setItem('session_id', sessionId)
    
    const payload = JSON.stringify({
      event_type: eventType,
      session_id: sessionId,
      event_metadata: metadata
    })

    // Use sendBeacon for zero-overhead background tracking, especially on page unload
    if (navigator.sendBeacon) {
      // sendBeacon requires Blob or FormData for custom content types, but can accept string if server parses it
      // or we can just send it as text/plain. The backend must handle text/plain or we use a Blob.
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon('http://127.0.0.1:8000/api/v1/analytics/event', blob)
    } else {
      fetch('http://127.0.0.1:8000/api/v1/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {})
    }
  }
  
  return { trackEvent }
}
