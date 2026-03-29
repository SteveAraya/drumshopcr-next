import type { Metadata } from 'next'
import { Bebas_Neue, Space_Grotesk, Great_Vibes } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-display',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-body',
  subsets: ['latin'],
})

const greatVibes = Great_Vibes({
  variable: '--font-script',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Drum Shop CR — Instrumentos Musicales en Costa Rica',
  description: 'Especialistas en baterías, percusión y platillos en Costa Rica. Tienda física y atención por WhatsApp.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${greatVibes.variable}`}>
      <body className="bg-[#0a0a0b] text-[#f0f0f0] font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
