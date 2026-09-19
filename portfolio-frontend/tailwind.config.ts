import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05070A',
          bg2: '#0A0F14',
          panel: 'rgba(10, 15, 20, 0.85)',
          border: 'rgba(57, 255, 20, 0.25)',
          neon: '#39FF14',
          accent: '#39FF14',
          primary: '#39FF14',
          secondary: '#00C853',
          telemetry: '#14F195',
          textMain: '#E8F5E9',
          textMuted: '#9FB9A3'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, rgba(57, 255, 20, 0.1) 0%, transparent 70%)',
        'glass-gradient': 'linear-gradient(145deg, rgba(57, 255, 20, 0.05) 0%, rgba(57, 255, 20, 0.01) 100%)',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(57, 255, 20, 0.25)',
      }
    },
  },
  plugins: [],
}
export default config
