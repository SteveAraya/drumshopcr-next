/**
 * Import products from drumshopcr Firebase → Supabase
 * Run: node scripts/import-firebase.mjs
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load .env.local manually
const env = readFileSync('.env.local', 'utf8')
const envVars = Object.fromEntries(
  env.split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
)

const SUPABASE_URL = envVars['NEXT_PUBLIC_SUPABASE_URL']
const SUPABASE_KEY = envVars['SUPABASE_SERVICE_ROLE_KEY'] || envVars['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY']

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Map Firebase "tipo" → our Category
const TIPO_MAP = {
  drum:     name => isElectronic(name) ? 'Baterías Electrónicas' : 'Baterías Acústicas',
  plato:    () => 'Platillos',
  redo:     () => 'Redoblantes',
  parche:   () => 'Parches',
  hardware: () => 'Hardware',
  guitarra: () => 'Guitarras',
  otros:    () => 'Otros',
}

const ELECTRONIC_KEYWORDS = ['roland', 'alesis', 'yamaha dtx', 'hart', 'electronic', 'electr', 'módulo', 'modulo', 'td-', 'td3', 'td4', 'td9', 'td11', 'td17', 'td25', 'td30', 'td50', 'nitro', 'surge', 'crimson']

function isElectronic(name) {
  const lower = name.toLowerCase()
  return ELECTRONIC_KEYWORDS.some(k => lower.includes(k))
}

function mapStatus(item) {
  if (item.vendido) return 'sold'
  if (item.stock === 'No Disponible') return 'sold'
  return 'available'
}

function mapCategory(item) {
  const fn = TIPO_MAP[item.tipo]
  return fn ? fn(item.name) : 'Otros'
}

function cleanDescription(desc, name) {
  if (!desc) return ''
  // Remove pure boilerplate-only descriptions
  const boilerplate = [
    'recuerda que aceptamos tus instrumentos musicales como parte de pago',
    'envíos a cualquier parte del país',
    'envios a cualquier parte del pais',
  ]
  let clean = desc.trim()
  const lower = clean.toLowerCase()
  const isOnlyBoilerplate = boilerplate.some(b => lower === b || lower === b + '.' || lower === b + ', ' + boilerplate[1] + '.')
  if (isOnlyBoilerplate) return ''

  // Remove trailing boilerplate sentences
  for (const b of boilerplate) {
    const regex = new RegExp('[,.]?\\s*' + b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[.]?', 'gi')
    clean = clean.replace(regex, '')
  }
  return clean.trim().replace(/^[,.\s]+/, '').trim()
}

function getImages(item) {
  return [item.img, item.img2, item.img3, item.img4]
    .filter(url => url && url.trim() !== '')
}

async function fetchFirebase(url) {
  const res = await fetch(url)
  const data = await res.json()
  return Array.isArray(data) ? data.filter(Boolean) : Object.values(data).filter(Boolean)
}

async function importProducts(items, source = '') {
  let inserted = 0, skipped = 0

  for (const item of items) {
    const name = item.name?.trim()
    if (!name) { skipped++; continue }

    const category  = mapCategory(item)
    const status    = mapStatus(item)
    const price     = item.precio && Number(item.precio) > 0 ? Number(item.precio) : null
    const description = cleanDescription(item.descripcion, name)
    const images    = getImages(item)
    const wa_text   = `Hola! Me interesa: ${name}${price ? ` (₡${Number(price).toLocaleString('es-CR')})` : ''}`

    // Insert product
    const { data: product, error } = await supabase
      .from('products')
      .insert({ name, description, category, status, price, wa_text, featured: false })
      .select('id')
      .single()

    if (error) {
      console.error(`  ✗ ${name}:`, error.message)
      skipped++
      continue
    }

    // Insert images
    if (images.length > 0) {
      await supabase.from('product_images').insert(
        images.map((url, order) => ({ product_id: product.id, url, order }))
      )
    }

    console.log(`  ✓ [${category}] ${name}${price ? ` — ₡${Number(price).toLocaleString('es-CR')}` : ''} (${status})`)
    inserted++
  }

  console.log(`\n${source}: ${inserted} importados, ${skipped} omitidos\n`)
}

async function main() {
  console.log('🥁 Iniciando importación desde Firebase...\n')

  // Main products
  console.log('📦 Jalando productos principales...')
  const productos = await fetchFirebase('https://drumshopcr.firebaseio.com/0/productos.json')
  console.log(`   ${productos.length} productos encontrados\n`)
  await importProducts(productos, 'Productos principales')

  // Murat cymbals
  console.log('📦 Jalando platillos Murat Diril...')
  const murat = await fetchFirebase('https://drumshopcr.firebaseio.com/2/murat.json')
  console.log(`   ${murat.length} productos encontrados\n`)
  await importProducts(murat, 'Murat Diril')

  console.log('✅ Importación completa!')
}

main().catch(console.error)
