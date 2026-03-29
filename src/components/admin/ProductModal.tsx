'use client'

import { useState, useRef } from 'react'
import { Product, ProductFormData, ProductStatus, CATEGORIES, ProductImage } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { X, Upload, Camera, Trash2 } from 'lucide-react'

interface Props {
  product: Product | null
  onClose: () => void
  onSaved: (product: Product) => void
}

const emptyForm: ProductFormData = {
  name: '',
  description: '',
  category: 'Baterías Acústicas',
  status: 'available',
  featured: false,
  badge: '',
  wa_text: '',
  price: '',
}

export default function ProductModal({ product, onClose, onSaved }: Props) {
  const [form, setForm] = useState<ProductFormData>(
    product
      ? {
          name: product.name,
          description: product.description,
          category: product.category,
          status: product.status,
          featured: product.featured,
          badge: product.badge ?? '',
          wa_text: product.wa_text ?? '',
          price: product.price != null ? String(product.price) : '',
        }
      : emptyForm
  )
  const [images, setImages] = useState<ProductImage[]>(product?.images ?? [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  function set<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleImageFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    if (images.length >= 3) {
      setError('Máximo 3 imágenes por producto.')
      return
    }

    const remaining = 3 - images.length
    const toUpload = Array.from(files).slice(0, remaining)
    setUploading(true)
    setError('')

    for (const file of toUpload) {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(path, file, { upsert: false })

      if (uploadError) { setError('Error al subir imagen.'); continue }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path)

      setImages(prev => [
        ...prev,
        { id: crypto.randomUUID(), product_id: product?.id ?? '', url: publicUrl, order: prev.length }
      ])
    }
    setUploading(false)
  }

  async function removeImage(img: ProductImage) {
    // Extract path from URL
    const path = img.url.split('/product-images/')[1]
    if (path) await supabase.storage.from('product-images').remove([path])

    if (product && img.id) {
      await supabase.from('product_images').delete().eq('id', img.id)
    }
    setImages(prev => prev.filter(i => i.url !== img.url))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      name:        form.name,
      description: form.description,
      category:    form.category,
      status:      form.status,
      featured:    form.featured,
      badge:       form.badge || null,
      wa_text:     form.wa_text || `Hola! Me interesa: ${form.name}`,
      price:       form.price !== '' ? parseInt(form.price, 10) : null,
    }

    let productId = product?.id

    if (product) {
      const { error } = await supabase.from('products').update(payload).eq('id', product.id)
      if (error) { setError('Error al guardar.'); setSaving(false); return }
    } else {
      const { data, error } = await supabase.from('products').insert(payload).select().single()
      if (error || !data) { setError('Error al crear producto.'); setSaving(false); return }
      productId = data.id
    }

    // Save new images (those without a real db id or product_id)
    const newImages = images.filter(img => !img.product_id || img.product_id === '')
    if (newImages.length > 0 && productId) {
      await supabase.from('product_images').insert(
        newImages.map((img, i) => ({
          product_id: productId,
          url: img.url,
          order: (product?.images?.length ?? 0) + i,
        }))
      )
    }

    // Fetch updated product with images
    const { data: updated } = await supabase
      .from('products')
      .select('*, images:product_images(*)')
      .eq('id', productId!)
      .single()

    if (updated) onSaved(updated as Product)
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#16161a] border border-white/8 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <h3 className="font-bold text-white">{product ? 'Editar producto' : 'Agregar producto'}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Nombre */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Nombre *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50"
              placeholder="Ej: Pearl Export Series 5pc"
            />
          </div>

          {/* Categoría y estado */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Categoría *</label>
              <select
                required
                value={form.category}
                onChange={e => set('category', e.target.value as typeof form.category)}
                className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Estado *</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as ProductStatus)}
                className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50"
              >
                <option value="available">Disponible</option>
                <option value="limited">Última unidad</option>
                <option value="sold">Vendido</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Descripción *</label>
            <textarea
              required
              rows={2}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50 resize-none"
              placeholder="Descripción corta del producto"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Precio (₡)</label>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={e => set('price', e.target.value)}
              className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50"
              placeholder="Ej: 250000"
            />
          </div>

          {/* Badge y WhatsApp */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Etiqueta</label>
              <input
                type="text"
                value={form.badge}
                onChange={e => set('badge', e.target.value)}
                className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50"
                placeholder="Ej: Nuevo, Popular"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Texto WhatsApp</label>
              <input
                type="text"
                value={form.wa_text}
                onChange={e => set('wa_text', e.target.value)}
                className="w-full bg-[#1e1e24] border border-white/8 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#e63946]/50"
                placeholder="Hola! Me interesa..."
              />
            </div>
          </div>

          {/* Destacado */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set('featured', !form.featured)}
              className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${form.featured ? 'bg-[#e63946]' : 'bg-zinc-700'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-white">Mostrar en destacados del sitio</span>
          </label>

          {/* Imágenes */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Fotos ({images.length}/3)
            </label>

            <div className="flex gap-2 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#1e1e24] group">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}

              {images.length < 3 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-20 h-20 rounded-lg border-2 border-dashed border-white/20 hover:border-[#e63946]/50 flex flex-col items-center justify-center gap-1 transition-colors disabled:opacity-50"
                >
                  {uploading ? (
                    <span className="text-xs text-zinc-400">Subiendo...</span>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-zinc-400" />
                      <span className="text-xs text-zinc-400">Agregar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              capture="environment"
              className="hidden"
              onChange={e => handleImageFiles(e.target.files)}
            />
            <p className="text-xs text-zinc-500 mt-1.5">Podés tomar foto con la cámara o elegir desde la galería. Máx. 3 imágenes.</p>
          </div>

          {error && <p className="text-[#e63946] text-sm">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-white/8">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-zinc-400 hover:text-white border border-white/8 px-4 py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="text-sm bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
