import Link from 'next/link'
import BrandLogo from '@/components/site/BrandLogo'

export default function SiteFooter() {
  return (
    <footer className="bg-[#0a0a0b] border-t border-white/8 pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-5">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <BrandLogo className="w-40 mb-4" />
            <p className="text-sm text-[#888] leading-relaxed">
              Especialistas en baterías, percusión y platillos en Costa Rica. Tu tienda de confianza para hacer tus sueños realidad.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                { href: '/catalogo', label: 'Catálogo' },
                { href: '/#servicios', label: 'Servicios' },
                { href: '/#marcas', label: 'Marcas' },
                { href: '/#nosotros', label: 'Nosotros' },
                { href: '/#contacto', label: 'Contacto' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#888] hover:text-[#f0f0f0] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-[#888]">
              <li>
                <a href="https://wa.me/50687963842" target="_blank" rel="noopener"
                  className="flex items-center gap-2 hover:text-[#25d366] transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  +506 8796-3842
                </a>
              </li>
              <li>
                <a href="mailto:rmattei66@gmail.com" className="flex items-center gap-2 hover:text-[#f0f0f0] transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  rmattei66@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Costa Rica
              </li>
            </ul>

            {/* Social media */}
            <div className="mt-5 flex items-center gap-2">
              <a href="https://www.facebook.com/Drum-Shop-Costa-Rica-245831729369183" target="_blank" rel="noopener" aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#1e1e24] flex items-center justify-center text-[#666] hover:text-white hover:bg-[#1877f2]/20 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/drumshopcr/?hl=es" target="_blank" rel="noopener" aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#1e1e24] flex items-center justify-center text-[#666] hover:text-white hover:bg-[#e1306c]/20 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://wa.me/50687963842" target="_blank" rel="noopener" aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#1e1e24] flex items-center justify-center text-[#666] hover:text-white hover:bg-[#25d366]/20 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>

            {/* Payment methods */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-[#666]">Pagos:</span>
              <span className="bg-[#1a1a22] border border-white/10 rounded px-2 py-0.5 text-xs font-bold text-[#1a1aff]">VISA</span>
              <span className="bg-[#1a1a22] border border-white/10 rounded px-2 py-0.5 text-xs font-bold text-[#eb5f10]">MC</span>
              <span className="bg-[#1a1a22] border border-white/10 rounded px-2 py-0.5 text-xs text-[#888]">Sinpe</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#555]">
          <span>© {new Date().getFullYear()} Drum Shop CR. Todos los derechos reservados.</span>
          <Link href="/admin/login" className="hover:text-[#888] transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  )
}
