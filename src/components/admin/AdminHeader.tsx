'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminHeader() {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-[#16161a] border-b border-white/8 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#e63946]">
          <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none">
            <ellipse cx="20" cy="22" rx="16" ry="10" stroke="currentColor" strokeWidth="2.5"/>
            <ellipse cx="20" cy="22" rx="9" ry="5.5" stroke="currentColor" strokeWidth="2"/>
            <line x1="20" y1="12" x2="20" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="14" y1="13.5" x2="10" y2="6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="26" y1="13.5" x2="30" y2="6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span className="font-bold text-white text-sm tracking-wide">Admin Panel</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-zinc-400 hover:text-white border border-white/8 hover:border-white/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            Ver sitio →
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-zinc-400 hover:text-white border border-white/8 hover:border-white/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  )
}
