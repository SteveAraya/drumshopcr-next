/**
 * Migrate images from Firebase Storage → Supabase Storage
 * Run: node scripts/migrate-images.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
)

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY'])

async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = await res.arrayBuffer()
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  return { buffer, contentType }
}

function getExtension(contentType, url) {
  if (contentType.includes('png'))  return 'png'
  if (contentType.includes('webp')) return 'webp'
  if (contentType.includes('gif'))  return 'gif'
  // Try from URL
  const match = url.match(/\.(jpg|jpeg|png|webp|gif)/i)
  if (match) return match[1].toLowerCase()
  return 'jpg'
}

async function main() {
  // Get all Firebase images
  const { data: images, error } = await supabase
    .from('product_images')
    .select('id, url, product_id')
    .like('url', '%firebasestorage%')

  if (error) { console.error('Error:', error.message); return }

  console.log(`🔄 Migrando ${images.length} imágenes de Firebase → Supabase...\n`)

  let ok = 0, failed = 0

  for (let i = 0; i < images.length; i++) {
    const img = images[i]
    process.stdout.write(`[${i + 1}/${images.length}] `)

    try {
      // Download from Firebase
      const { buffer, contentType } = await downloadImage(img.url)
      const ext = getExtension(contentType, img.url)
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(path, buffer, { contentType, upsert: false })

      if (uploadError) throw new Error(uploadError.message)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path)

      // Update DB record
      const { error: updateError } = await supabase
        .from('product_images')
        .update({ url: publicUrl })
        .eq('id', img.id)

      if (updateError) throw new Error(updateError.message)

      console.log(`✓ ${img.id.slice(0, 8)}...`)
      ok++
    } catch (err) {
      console.log(`✗ ${img.id.slice(0, 8)}... — ${err.message}`)
      failed++
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100))
  }

  console.log(`\n✅ Migración completa: ${ok} exitosas, ${failed} fallidas`)

  if (failed > 0) {
    console.log('\nImágenes que fallaron siguen apuntando a Firebase.')
    console.log('Podés correr el script de nuevo para reintentar.')
  }
}

main().catch(console.error)
