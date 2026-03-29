'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'

const STATUS = {
  available: { label: 'Disponible',    color: 'text-green-400',  dot: 'bg-green-400'  },
  limited:   { label: 'Última unidad', color: 'text-yellow-400', dot: 'bg-yellow-400' },
  sold:      { label: 'Vendido',       color: 'text-zinc-500',   dot: 'bg-zinc-500'   },
}

export default function ProductCard({ product }: { product: Product }) {
  const status = STATUS[product.status]
  const isSold = product.status === 'sold'
  const waText = product.wa_text || `Hola! Me interesa: ${product.name}`
  const waUrl  = `https://wa.me/50687963842?text=${encodeURIComponent(waText)}`
  const images = product.images ?? []

  const [idx, setIdx] = useState(0)

  function prev(e: React.MouseEvent) {
    e.preventDefault()
    setIdx(i => (i - 1 + images.length) % images.length)
  }

  function next(e: React.MouseEvent) {
    e.preventDefault()
    setIdx(i => (i + 1) % images.length)
  }

  return (
    <article className={`bg-[#16161a] border border-white/8 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col
      ${isSold ? 'opacity-60' : 'hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#e63946]/30'}`}>

      {/* Image — click goes to detail page */}
      <Link href={`/catalogo/${product.id}`} className="relative h-48 bg-[#1e1e24] flex items-center justify-center overflow-hidden group block">
        {images.length > 0 ? (
          <>
            <img
              src={images[idx].url}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-200"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10"
                  aria-label="Imagen anterior"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10"
                  aria-label="Imagen siguiente"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.preventDefault(); setIdx(i) }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/40'}`}
                      aria-label={`Imagen ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <span className="text-5xl opacity-30">🥁</span>
        )}

        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#e63946] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}
        {isSold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="font-display text-2xl text-white/50 tracking-widest">VENDIDO</span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#e63946]">{product.category}</p>
        <Link href={`/catalogo/${product.id}`} className="font-bold text-[#f0f0f0] leading-tight hover:text-[#e63946] transition-colors">
          {product.name}
        </Link>
        <p className="text-sm text-[#888] leading-relaxed flex-1">{product.description}</p>

        {product.price != null && (
          <p className="text-lg font-bold text-[#f0f0f0]">
            ₡{product.price.toLocaleString('es-CR')}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
          <span className={`flex items-center gap-1.5 text-xs font-semibold ${status.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${!isSold ? 'animate-pulse' : ''}`}/>
            {status.label}
          </span>
          {isSold ? (
            <a href={`https://wa.me/50687963842?text=${encodeURIComponent(`Hola! Me interesa ${product.name}, ¿tienen más disponibles?`)}`}
              target="_blank" rel="noopener"
              className="text-xs font-semibold border border-zinc-600 text-zinc-400 hover:text-zinc-200 hover:border-zinc-400 px-3 py-1.5 rounded-full transition-colors">
              ¿Más unidades?
            </a>
          ) : (
            <a href={waUrl} target="_blank" rel="noopener"
              className="text-xs font-semibold border border-[#e63946] text-[#e63946] hover:bg-[#e63946] hover:text-white px-3 py-1.5 rounded-full transition-colors">
              Consultar
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
