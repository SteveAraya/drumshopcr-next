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
