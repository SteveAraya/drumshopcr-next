export type ProductStatus = 'available' | 'limited' | 'sold'

export type Category =
  | 'Baterías Acústicas'
  | 'Baterías Electrónicas'
  | 'Redoblantes'
  | 'Platillos'
  | 'Parches'
  | 'Hardware'
  | 'Guitarras'
  | 'Otros'

export const CATEGORIES: Category[] = [
  'Baterías Acústicas',
  'Baterías Electrónicas',
  'Redoblantes',
  'Platillos',
  'Parches',
  'Hardware',
  'Guitarras',
  'Otros',
]

export interface ProductImage {
  id: string
  product_id: string
  url: string
  order: number
}

export interface Product {
  id: string
  name: string
  description: string
  category: Category
  status: ProductStatus
  featured: boolean
  badge: string | null
  wa_text: string | null
  price: number | null
  images: ProductImage[]
  created_at: string
  updated_at: string
}

export interface ProductFormData {
  name: string
  description: string
  category: Category
  status: ProductStatus
  featured: boolean
  badge: string
  wa_text: string
  price: string
}
