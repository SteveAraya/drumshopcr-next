'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BrandLogo from '@/components/site/BrandLogo'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0b]/92 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)]' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-16 gap-6">

        {/* Logo */}
        <Link href="/">
          <BrandLogo className="h-10 w-auto" />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: '/catalogo', label: 'Productos' },
            { href: '/#servicios', label: 'Servicios' },
            { href: '/#marcas', label: 'Marcas' },
            { href: '/#nosotros', label: 'Nosotros' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#888] hover:text-[#f0f0f0] hover:bg-white/6 transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="/#contacto"
            className="ml-2 px-4 py-2 rounded-full text-sm font-semibold bg-[#e63946] text-white hover:bg-[#c1121f] transition-colors">
            Contáctanos
          </Link>

          {/* Social icons */}
          <div className="flex items-center gap-1 ml-2 border-l border-white/10 pl-3">
            <a href="https://www.facebook.com/Drum-Shop-Costa-Rica-245831729369183" target="_blank" rel="noopener" aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/drumshopcr/?hl=es" target="_blank" rel="noopener" aria-label="Instagram"
              className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}/>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0b]/97 backdrop-blur-md border-b border-white/8 px-5 py-4 flex flex-col gap-1">
          {[
            { href: '/catalogo', label: 'Productos' },
            { href: '/#servicios', label: 'Servicios' },
            { href: '/#marcas', label: 'Marcas' },
            { href: '/#nosotros', label: 'Nosotros' },
            { href: '/#contacto', label: 'Contáctanos' },
          ].map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-sm font-medium text-[#888] hover:text-white rounded-lg hover:bg-white/6 transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
