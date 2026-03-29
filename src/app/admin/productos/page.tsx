import { createClient } from '@/lib/supabase/server'
import ProductsTable from '@/components/admin/ProductsTable'
import AdminHeader from '@/components/admin/AdminHeader'
import { Product } from '@/types'

export default async function ProductosPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ProductsTable initialProducts={(products as Product[]) ?? []} />
      </main>
    </div>
  )
}
