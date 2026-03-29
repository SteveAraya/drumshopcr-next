'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Category } from '@/types'

interface Props {
  categories: Category[]
  activeCat?: string
  activeStatus?: string
  activeQ?: string
}

export default function CatalogFilters({ categories, activeCat, activeStatus, activeQ }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  function buildUrl(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams()
    const merged = {
      cat: activeCat,
      status: activeStatus,
      q: activeQ,
      ...overrides,
    }
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    router.push(buildUrl({ q: (fd.get('q') as string) || undefined }))
  }

  const hasFilters = activeCat || activeStatus || activeQ

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          name="q"
          defaultValue={activeQ ?? ''}
          placeholder="Buscar productos..."
          className="flex-1 bg-[#16161a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f0f0f0] placeholder-[#555] outline-none focus:border-[#e63946]/50 transition-colors"
        />
        <button type="submit"
          className="px-4 py-2.5 bg-[#e63946] text-white rounded-xl text-sm font-semibold hover:bg-[#c1121f] transition-colors">
          Buscar
        </button>
      </form>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => router.push(buildUrl({ cat: undefined }))}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors
            ${!activeCat ? 'bg-[#e63946] border-[#e63946] text-white' : 'border-white/10 text-[#888] hover:text-[#f0f0f0] hover:border-white/25'}`}>
          Todos
        </button>
        {categories.map(cat => (
          <button key={cat} onClick={() => router.push(buildUrl({ cat: activeCat === cat ? undefined : cat }))}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors
              ${activeCat === cat ? 'bg-[#e63946] border-[#e63946] text-white' : 'border-white/10 text-[#888] hover:text-[#f0f0f0] hover:border-white/25'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-[#555] uppercase tracking-wider">Estado:</span>
        {[
          { value: undefined, label: 'Todos' },
          { value: 'available', label: 'Disponible' },
          { value: 'limited', label: 'Última unidad' },
          { value: 'sold', label: 'Vendido' },
        ].map(opt => (
          <button key={opt.label} onClick={() => router.push(buildUrl({ status: opt.value }))}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors
              ${activeStatus === opt.value || (!activeStatus && !opt.value)
                ? 'bg-white/10 border-white/20 text-[#f0f0f0]'
                : 'border-white/8 text-[#666] hover:text-[#aaa]'}`}>
            {opt.label}
          </button>
        ))}

        {hasFilters && (
          <button onClick={() => router.push(pathname)}
            className="ml-auto text-xs text-[#666] hover:text-[#e63946] transition-colors underline underline-offset-2">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}
