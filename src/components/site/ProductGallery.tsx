'use client'

import { useState } from 'react'
import { ProductImage } from '@/types'

interface Props {
  images: ProductImage[]
  name: string
  isSold: boolean
}

export default function ProductGallery({ images, name, isSold }: Props) {
  const [idx, setIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-[#16161a] border border-white/8 rounded-2xl flex items-center justify-center">
        <span className="text-7xl opacity-20">🥁</span>
      </div>
    )
  }

  function prev() { setIdx(i => (i - 1 + images.length) % images.length) }
  function next() { setIdx(i => (i + 1) % images.length) }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') setLightbox(false)
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div className="relative aspect-square bg-[#16161a] border border-white/8 rounded-2xl overflow-hidden group">
          <img
            src={images[idx].url}
            alt={`${name} — imagen ${idx + 1}`}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => setLightbox(true)}
          />

          {isSold && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
              <span className="font-display text-3xl text-white/50 tracking-widest">VENDIDO</span>
            </div>
          )}

          {images.length > 1 && (
            <>
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </>
          )}

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 bg-black/50 rounded-lg px-2 py-1 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Click para ampliar
          </div>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2.5 py-1 text-xs text-white/70">
              {idx + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button key={img.id} onClick={() => setIdx(i)}
                className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  i === idx ? 'border-[#e63946] opacity-100' : 'border-white/10 opacity-50 hover:opacity-80'
                }`}>
                <img src={img.url} alt={`${name} thumbnail ${i + 1}`} className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
          onKeyDown={handleKey}
          tabIndex={0}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </>
          )}

          <img
            src={images[idx].url}
            alt={`${name} — imagen ${idx + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                  className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
