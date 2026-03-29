'use client'

import { useState } from 'react'
import { Product, CATEGORIES, ProductStatus } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import ProductModal from './ProductModal'

const STATUS_LABELS: Record<ProductStatus, string> = {
  available: 'Disponible',
  limited:   'Última unidad',
  sold:      'Vendido',
}

const STATUS_COLORS: Record<ProductStatus, string> = {
  available: 'text-green-400 bg-green-400/10',
  limited:   'text-yellow-400 bg-yellow-400/10',
  sold:      'text-zinc-400 bg-zinc-400/10',
}

export default function ProductsTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filter, setFilter] = useState<'all' | ProductStatus>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const filtered = filter === 'all' ? products : products.filter(p => p.status === filter)

  // Stats
  const stats = {
    total:     products.length,
    available: products.filter(p => p.status === 'available').length,
    limited:   products.filter(p => p.status === 'limited').length,
    sold:      products.filter(p => p.status === 'sold').length,
    featured:  products.filter(p => p.featured).length,
  }

  async function updateStatus(id: string, status: ProductStatus) {
    await supabase.from('products').update({ status }).eq('id', id)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p))
  }

  async function toggleFeatured(id: string, featured: boolean) {
    await supabase.from('products').update({ featured }).eq('id', id)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured } : p))
  }

  async function deleteProduct(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    await supabase.from('products').delete().eq('id', id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  function openAdd() { setEditing(null); setModalOpen(true) }
  function openEdit(p: Product) { setEditing(p); setModalOpen(true) }

  function onSaved(product: Product) {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      return exists
        ? prev.map(p => p.id === product.id ? product : p)
        : [product, ...prev]
    })
    setModalOpen(false)
    router.refresh()
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Disponibles',   value: stats.available, color: 'text-green-400' },
          { label: 'Última unidad', value: stats.limited,   color: 'text-yellow-400' },
          { label: 'Vendidos',      value: stats.sold,      color: 'text-[#e63946]' },
          { label: 'Destacados',    value: stats.featured,  color: 'text-purple-400' },
        ].map(s => (
          <div key={s.label} className="bg-[#16161a] border border-white/8 rounded-xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-lg font-bold text-white">Productos</h2>
        <button
          onClick={openAdd}
          className="bg-[#e63946] hover:bg-[#c1121f] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Agregar producto
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', 'available', 'limited', 'sold'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              filter === f
                ? 'bg-[#e63946] border-[#e63946] text-white'
                : 'border-white/8 text-zinc-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'Todos' : STATUS_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#16161a] border border-white/8 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1e1e24]">
              <th className="text-left text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">Producto</th>
              <th className="text-left text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">Categoría</th>
              <th className="text-left text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">Estado</th>
              <th className="text-left text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">Destacado</th>
              <th className="text-left text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 py-3">Fotos</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-zinc-500 py-12 text-sm">
                  No hay productos.
                </td>
              </tr>
            )}
            {filtered.map(p => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* Thumbnail */}
                    <div className="w-10 h-10 rounded-lg bg-[#1e1e24] flex-shrink-0 overflow-hidden">
                      {p.images?.[0] ? (
                        <img src={p.images[0].url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">🥁</div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{p.name}</p>
                      {p.badge && (
                        <span className="text-xs text-[#e63946]">{p.badge}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-400">{p.category}</td>
                <td className="px-4 py-3">
                  <select
                    value={p.status}
                    onChange={e => updateStatus(p.id, e.target.value as ProductStatus)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[p.status]} bg-transparent`}
                  >
                    <option value="available">Disponible</option>
                    <option value="limited">Última unidad</option>
                    <option value="sold">Vendido</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleFeatured(p.id, !p.featured)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${p.featured ? 'bg-[#e63946]' : 'bg-zinc-700'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${p.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-400">
                  {p.images?.length ?? 0}/3
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-xs text-zinc-400 hover:text-[#e63946] px-2 py-1 rounded hover:bg-white/5 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ProductModal
          product={editing}
          onClose={() => setModalOpen(false)}
          onSaved={onSaved}
        />
      )}
    </>
  )
}
