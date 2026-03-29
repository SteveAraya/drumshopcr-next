import { createClient } from '@/lib/supabase/server'
import { Product, CATEGORIES } from '@/types'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import ProductCard from '@/components/site/ProductCard'
import WaFloat from '@/components/site/WaFloat'
import CatalogFilters from '@/components/site/CatalogFilters'

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; status?: string; q?: string }>
}) {
  const params = await searchParams
  const { cat, status, q } = params

  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, images:product_images(*)')
    .order('created_at', { ascending: false })

  if (cat && CATEGORIES.includes(cat as never)) {
    query = query.eq('category', cat)
  }
  if (status === 'available' || status === 'limited' || status === 'sold') {
    query = query.eq('status', status)
  }
  if (q) {
    query = query.ilike('name', `%${q}%`)
  }

  const { data } = await query
  const products = (data as Product[]) ?? []

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen pt-16">
        {/* Page header */}
        <div className="bg-[#0d0d10] border-b border-white/8 py-12">
          <div className="max-w-[1200px] mx-auto px-5">
            <p className="text-[#e63946] text-xs font-semibold uppercase tracking-[0.25em] mb-3">Drum Shop CR</p>
            <h1 className="font-display text-4xl sm:text-5xl tracking-wider text-[#f0f0f0]">CATÁLOGO</h1>
            <p className="text-[#888] text-sm mt-2">
              {products.length} producto{products.length !== 1 ? 's' : ''}
              {cat ? ` en ${cat}` : ''}
              {q ? ` para "${q}"` : ''}
            </p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-5 py-8">
          <CatalogFilters
            categories={CATEGORIES}
            activeCat={cat}
            activeStatus={status}
            activeQ={q}
          />

          {products.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-[#888] mb-6">No se encontraron productos con esos filtros.</p>
              <a href="/catalogo"
                className="inline-block px-6 py-2.5 border border-white/20 text-sm text-[#888] hover:text-white rounded-full transition-colors">
                Ver todos los productos
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
      <WaFloat />
    </>
  )
}
