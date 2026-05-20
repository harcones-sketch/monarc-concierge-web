'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Plane, Home, Car, User, Music, Headphones,
  Star, Globe, Shield, Anchor, Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  { number: '01', icon: Plane,       title: 'Private Jets',          description: 'Aviación privada de primera categoría. Vuelos a cualquier destino, en tus términos y con total discreción.' },
  { number: '02', icon: Home,        title: 'Luxury Villas',         description: 'Residencias exclusivas en los destinos más codiciados del Mediterráneo, Medio Oriente y más allá.' },
  { number: '03', icon: Car,         title: 'Luxury Cars',           description: 'Flota premium: Rolls-Royce, Bentley, Ferrari, Lamborghini. Entrega en aeropuerto o en tu villa.' },
  { number: '04', icon: User,        title: 'Private Chauffeur',     description: 'Conductores profesionales y discretos disponibles 24/7. Seguridad y confort garantizados.' },
  { number: '05', icon: Music,       title: 'Nightlife & VIP',       description: 'Acceso prioritario a los mejores clubs del mundo. Reservas VIP, table service y experiencias únicas.' },
  { number: '06', icon: Headphones,  title: 'Music Industry',        description: 'Logística integral para artistas y equipo. Riders, producción, alojamiento y traslados exclusivos.' },
  { number: '07', icon: Star,        title: 'Events & Experiences',  description: 'Desde galas privadas a festivales exclusivos. Creamos experiencias que superan toda expectativa.' },
  { number: '08', icon: Globe,       title: 'Travel Planning',       description: 'Itinerarios de lujo personalizados. Cada detalle cuidado para que el viaje sea la experiencia.' },
  { number: '09', icon: Shield,      title: 'Security & Escort',     description: 'Seguridad privada discreta y profesional. Protección para personas y activos de alto valor.' },
  { number: '10', icon: Anchor,      title: 'Yachts',                description: 'Chárter de superyates en los mares más exclusivos. Tripulación, ruta y experiencia a medida.' },
  { number: '11', icon: Briefcase,   title: 'Corporate Concierge',   description: 'Gestión VIP para empresas y directivos. Eventos, viajes y logística corporativa de élite.' },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%', once: true },
      })

      // Cards stagger
      const cards = gsap.utils.toArray<HTMLElement>(gridRef.current!.children)
      gsap.from(cards, {
        y: 50, opacity: 0, duration: 0.7, ease: 'power3.out',
        stagger: { amount: 0.8, from: 'start' },
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-32 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
          <div>
            <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Lo que hacemos</p>
            <h2 className="font-display text-5xl md:text-7xl text-[#F5F2EC] leading-none">
              Our<br /><span className="text-[#C8A86E]">Services</span>
            </h2>
          </div>
          <p className="text-[#888] max-w-xs mt-8 lg:mt-0 text-sm leading-relaxed lg:pb-2">
            Cada servicio, diseñado para quienes exigen lo mejor sin compromisos.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#C8A86E]/08">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.number}
                className={cn(
                  'group relative p-8 bg-[#0D0D0D]',
                  'border-t border-[#C8A86E]/08',
                  'hover:bg-[#111] transition-colors duration-500 cursor-default',
                )}
              >
                {/* Gold line on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[#C8A86E] group-hover:w-full transition-all duration-500" />

                <span className="block text-[10px] tracking-[4px] text-[#C8A86E] mb-8 opacity-60">
                  {service.number}
                </span>

                <div className="mb-6 w-10 h-10 border border-[#C8A86E]/15 flex items-center justify-center group-hover:border-[#C8A86E]/40 transition-colors duration-300">
                  <Icon size={16} className="text-[#C8A86E]" />
                </div>

                <h3 className="font-display text-lg text-[#F5F2EC] mb-4 group-hover:text-[#C8A86E] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-[#666] text-sm leading-relaxed group-hover:text-[#888] transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
