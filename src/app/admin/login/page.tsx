'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/admin/productos')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <svg className="w-12 h-12 text-[#e63946] mx-auto mb-3" viewBox="0 0 40 40" fill="none">
            <ellipse cx="20" cy="22" rx="16" ry="10" stroke="currentColor" strokeWidth="2.5"/>
            <ellipse cx="20" cy="22" rx="9" ry="5.5" stroke="currentColor" strokeWidth="2"/>
            <line x1="20" y1="12" x2="20" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="14" y1="13.5" x2="10" y2="6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="26" y1="13.5" x2="30" y2="6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            DRUM SHOP <span className="text-[#e63946]">CR</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Panel de Administración</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#16161a] border border-white/8 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
              Correo
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="admin@drumshopcr.com"
              className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-[#e63946] text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
