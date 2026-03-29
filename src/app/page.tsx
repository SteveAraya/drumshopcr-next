import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Product, CATEGORIES } from '@/types'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import ProductCard from '@/components/site/ProductCard'
import WaFloat from '@/components/site/WaFloat'
import CategoryIcon from '@/components/site/CategoryIcon'

const BRANDS = [
  { name: 'Pearl', highlight: false },
  { name: 'Mapex', highlight: false },
  { name: 'Yamaha', highlight: false },
  { name: 'Zildjian', highlight: false },
  { name: 'Sabian', highlight: false },
  { name: 'Murat Diril', highlight: true },
  { name: 'Evans', highlight: false },
  { name: 'Remo', highlight: false },
  { name: 'DW', highlight: false },
  { name: 'Tama', highlight: false },
]

export default async function HomePage() {
  const supabase = await createClient()

  const { data: featured } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  const featuredProducts = (featured as Product[]) ?? []

  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0b]">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, #e63946 0%, transparent 50%), radial-gradient(circle at 75% 50%, #e63946 0%, transparent 50%)',
          }}/>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)',
          }}/>

          <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
            <p className="text-[#e63946] text-xs font-semibold uppercase tracking-[0.3em] mb-6">
              Costa Rica · Tienda especializada
            </p>
            <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] leading-none tracking-wider text-[#f0f0f0] mb-6">
              DRUM<br/>
              <span className="text-[#e63946]">SHOP</span> CR
            </h1>
            <p className="text-xl sm:text-2xl text-[#aaa] mb-4 font-light">
              Haz tus sueños realidad
            </p>
            <p className="text-[#666] text-sm mb-10 max-w-md mx-auto">
              Especialistas en baterías, percusión y platillos. Atención personalizada, tienda física y venta por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/catalogo"
                className="px-8 py-3.5 bg-[#e63946] text-white font-semibold rounded-full hover:bg-[#c1121f] transition-colors text-sm">
                Ver Catálogo
              </Link>
              <a href="https://wa.me/50687963842?text=Hola!%20Visité%20su%20sitio%20web%20y%20tengo%20una%20consulta."
                target="_blank" rel="noopener"
                className="px-8 py-3.5 border border-white/20 text-[#f0f0f0] font-semibold rounded-full hover:border-white/40 hover:bg-white/5 transition-all text-sm">
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs tracking-widest text-[#888]">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#888] to-transparent"/>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-[#0d0d10]" id="categorias">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="text-center mb-12">
              <p className="text-[#e63946] text-xs font-semibold uppercase tracking-[0.25em] mb-3">Lo que encontrarás</p>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#f0f0f0]">CATEGORÍAS</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map(cat => (
                <Link key={cat} href={`/catalogo?cat=${encodeURIComponent(cat)}`}
                  className="group bg-[#16161a] border border-white/8 rounded-2xl p-5 flex flex-col items-center gap-4 hover:border-[#e63946]/40 hover:bg-[#1a1a20] transition-all duration-300">
                  <CategoryIcon
                    category={cat}
                    className="w-10 h-10 text-[#888] group-hover:text-[#e63946] transition-colors duration-300"
                  />
                  <span className="text-sm font-semibold text-center text-[#ccc] group-hover:text-[#f0f0f0] transition-colors leading-tight">
                    {cat}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-[#0a0a0b]" id="servicios">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="text-center mb-12">
              <p className="text-[#e63946] text-xs font-semibold uppercase tracking-[0.25em] mb-3">Lo que hacemos</p>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#f0f0f0]">SERVICIOS</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                  ),
                  title: 'Reparación y Restauración',
                  desc: 'Servicio técnico especializado para tus instrumentos. Mantenimiento, reparación y restauración de baterías, platillos y más.',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" x2="21" y1="6" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  ),
                  title: 'Pedidos Especiales',
                  desc: 'Buscamos el instrumento que necesitas. Si no lo tenemos en stock, lo conseguimos. Contáctanos y cuéntanos qué buscas.',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                  title: 'Instrumentos como Pago',
                  desc: 'Aceptamos tu instrumento como parte del pago al adquirir cualquier producto. Valoramos tu equipo de forma justa.',
                },
              ].map(service => (
                <div key={service.title}
                  className="bg-[#16161a] border border-white/8 rounded-2xl p-7 flex flex-col gap-4">
                  <div className="text-[#e63946]">{service.icon}</div>
                  <h3 className="font-bold text-[#f0f0f0] text-lg">{service.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        {featuredProducts.length > 0 && (
          <section className="py-20 bg-[#0d0d10]" id="destacados">
            <div className="max-w-[1200px] mx-auto px-5">
              <div className="text-center mb-12">
                <p className="text-[#e63946] text-xs font-semibold uppercase tracking-[0.25em] mb-3">Selección especial</p>
                <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#f0f0f0]">DESTACADOS</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href="/catalogo"
                  className="inline-block px-8 py-3 border border-[#e63946] text-[#e63946] hover:bg-[#e63946] hover:text-white font-semibold rounded-full transition-colors text-sm">
                  Ver todo el catálogo
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Brands */}
        <section className="py-20 bg-[#0a0a0b]" id="marcas">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="text-center mb-12">
              <p className="text-[#e63946] text-xs font-semibold uppercase tracking-[0.25em] mb-3">Trabajamos con</p>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#f0f0f0]">MARCAS</h2>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {BRANDS.map(brand => (
                <span key={brand.name}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors
                    ${brand.highlight
                      ? 'bg-[#e63946]/10 border-[#e63946]/40 text-[#e63946]'
                      : 'bg-[#16161a] border-white/8 text-[#888] hover:text-[#f0f0f0] hover:border-white/20'
                    }`}>
                  {brand.name}
                  {brand.highlight && <span className="ml-1.5 text-[10px] uppercase tracking-wider opacity-70">Distribuidor</span>}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-20 bg-[#0d0d10]" id="nosotros">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <div>
                <p className="text-[#e63946] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Quiénes somos</p>
                <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#f0f0f0] mb-6">
                  NUESTRA<br/>HISTORIA
                </h2>
                <div className="space-y-4 text-[#888] text-sm leading-relaxed">
                  <p>
                    Drum Shop CR nació de la pasión por la música y la percusión. Somos la tienda especializada en baterías y percusión más comprometida de Costa Rica.
                  </p>
                  <p>
                    Ofrecemos una selección cuidadosa de instrumentos nuevos y usados, siempre con la mejor relación calidad-precio. Nuestro equipo te asesora para que encuentres exactamente lo que necesitas.
                  </p>
                  <p>
                    Contamos con tienda física y atendemos por WhatsApp. Porque tu comodidad es lo más importante.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '10+', label: 'Años de experiencia' },
                  { num: '100+', label: 'Marcas disponibles' },
                  { num: '500+', label: 'Clientes satisfechos' },
                  { num: '24/7', label: 'Atención WhatsApp' },
                ].map(stat => (
                  <div key={stat.label} className="bg-[#16161a] border border-white/8 rounded-2xl p-6 text-center">
                    <div className="font-display text-4xl text-[#e63946] mb-2">{stat.num}</div>
                    <div className="text-xs text-[#888] leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-[#0a0a0b]" id="contacto">
          <div className="max-w-[700px] mx-auto px-5 text-center">
            <p className="text-[#e63946] text-xs font-semibold uppercase tracking-[0.25em] mb-4">Estamos para ayudarte</p>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#f0f0f0] mb-6">CONTÁCTANOS</h2>
            <p className="text-[#888] text-sm leading-relaxed mb-10">
              ¿Tenés una consulta? ¿Buscás un instrumento específico? Escribinos por WhatsApp y te respondemos cuanto antes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a href="https://wa.me/50687963842?text=Hola!%20Visité%20su%20sitio%20web%20y%20tengo%20una%20consulta."
                target="_blank" rel="noopener"
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#25d366] text-white font-semibold rounded-full hover:bg-[#1da851] transition-colors text-sm">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
              <a href="mailto:rmattei66@gmail.com"
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 border border-white/20 text-[#f0f0f0] font-semibold rounded-full hover:border-white/40 hover:bg-white/5 transition-all text-sm">
                Correo electrónico
              </a>
            </div>

            <p className="text-xs text-[#555]">+506 8796-3842 · rmattei66@gmail.com · Costa Rica</p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WaFloat />
    </>
  )
}
