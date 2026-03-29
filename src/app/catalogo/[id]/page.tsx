import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Product } from '@/types'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import WaFloat from '@/components/site/WaFloat'
import ProductGallery from '@/components/site/ProductGallery'

const STATUS = {
  available: { label: 'Disponible',    color: 'text-green-400',  dot: 'bg-green-400'  },
  limited:   { label: 'Última unidad', color: 'text-yellow-400', dot: 'bg-yellow-400' },
  sold:      { label: 'Vendido',       color: 'text-zinc-500',   dot: 'bg-zinc-500'   },
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('id', id)
    .single()

  if (!data) notFound()

  const product = data as Product
  const status = STATUS[product.status]
  const isSold = product.status === 'sold'
  const waText = product.wa_text || `Hola! Me interesa: ${product.name}`
  const waUrl  = `https://wa.me/50687963842?text=${encodeURIComponent(waText)}`
  const images = (product.images ?? []).sort((a, b) => a.order - b.order)

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen pt-16">
        <div className="max-w-[1100px] mx-auto px-5 py-10">

          {/* Back */}
          <Link href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#f0f0f0] transition-colors mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Volver al catálogo
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Gallery */}
            <ProductGallery images={images} name={product.name} isSold={isSold} />

            {/* Info */}
            <div className="flex flex-col gap-5">
              {product.badge && (
                <span className="self-start bg-[#e63946] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#e63946] mb-2">
                  {product.category}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl tracking-wider text-[#f0f0f0] leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price + Status */}
              <div className="flex items-center gap-4 flex-wrap">
                {product.price != null && (
                  <span className="text-3xl font-bold text-[#f0f0f0]">
                    ₡{product.price.toLocaleString('es-CR')}
                  </span>
                )}
                <span className={`flex items-center gap-2 text-sm font-semibold ${status.color}`}>
                  <span className={`w-2 h-2 rounded-full ${status.dot} ${!isSold ? 'animate-pulse' : ''}`}/>
                  {status.label}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-[#999] text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              )}

              <div className="border-t border-white/8 pt-5 flex flex-col gap-3">
                {isSold ? (
                  <>
                    <p className="text-sm text-[#666]">Este producto ya fue vendido. Si te interesa algo similar, escríbenos.</p>
                    <a
                      href={`https://wa.me/50687963842?text=${encodeURIComponent(`Hola! Me interesa ${product.name}, ¿tienen más disponibles?`)}`}
                      target="_blank" rel="noopener"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 border border-white/20 text-[#f0f0f0] font-semibold rounded-full hover:border-white/40 hover:bg-white/5 transition-all text-sm">
                      Consultar disponibilidad
                    </a>
                  </>
                ) : (
                  <a
                    href={waUrl}
                    target="_blank" rel="noopener"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25d366] text-white font-semibold rounded-full hover:bg-[#1da851] transition-colors text-sm">
                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Consultar por WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <WaFloat />
    </>
  )
}
