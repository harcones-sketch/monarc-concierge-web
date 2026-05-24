import Image from 'next/image'
import { Instagram, MessageCircle } from 'lucide-react'

const footerLinks = {
  Servicios: [
    'Private Jets',
    'Luxury Villas',
    'Luxury Cars',
    'Nightlife & VIP',
    'Music Industry',
    'Yachts',
  ],
  Experiencias: [
    'Ibiza',
    'Monaco',
    'Dubai',
    'Mykonos',
    'Madrid',
    'Miami',
  ],
  Contacto: [
    'info@monarconcierge.com',
    '+34 600 000 000',
    '@monarconcierge',
    'Madrid, España',
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#EDE8DF] border-t border-[#B8965A]/20">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Image
              src="/logos/monarc_horizontal.svg"
              alt="MONARC Concierge"
              width={140}
              height={36}
              className="h-7 w-auto mb-6"
            />
            <p className="text-muted text-sm font-sans leading-relaxed max-w-xs mb-8">
              El concierge de referencia para quienes exigen lo mejor. Acceso, discreción y excelencia en cada experiencia.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/monarconcierge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#B8965A]/30 hover:border-gold/40 hover:text-gold text-muted transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#B8965A]/30 hover:border-gold/40 hover:text-gold text-muted transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-[11px] tracking-[4px] uppercase text-[#1C1A17] mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-muted text-[13px] font-sans hover:text-gold transition-colors duration-300 cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(200,168,110,0.06)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#3D3530] text-[11px] tracking-[2px] font-sans">
            © 2026 MONARC Concierge. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[#3D3530]/70 text-[10px] tracking-[2px] uppercase font-sans hover:text-[#1C1A17] cursor-pointer transition-colors duration-300">
              Privacidad
            </span>
            <span className="text-[#3D3530]/70 text-[10px] tracking-[2px] uppercase font-sans hover:text-[#1C1A17] cursor-pointer transition-colors duration-300">
              Términos
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
              <span className="text-[10px] tracking-[2px] uppercase text-gold/40 font-sans">
                Life, Curated.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
