import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import MatrixBackground from '@/components/ui/MatrixBackground'
import SmoothScroll from '@/components/layout/SmoothScroll'

export const metadata: Metadata = {
  title: 'Daniel Burbano | Data & AI Professional',
  description: 'Portafolio profesional de Daniel Burbano — Ciencia de datos, IA y automatización.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased bg-cyber-bg min-h-screen text-cyber-textMain">
        <SmoothScroll>
          <MatrixBackground />
          <div className="fixed inset-0 pointer-events-none bg-radial-gradient z-0" />
          <Sidebar />
          <main className="md:ml-64 p-4 md:p-8 relative min-h-screen pb-24 md:pb-8 z-10">
            <div className="max-w-[1400px] mx-auto">
              {children}
            </div>
          </main>
        </SmoothScroll>
      </body>
    </html>
  )
}

