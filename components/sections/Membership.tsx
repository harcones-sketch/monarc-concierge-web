'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Essential',
    price: '500',
    period: '/mes',
    description: 'La puerta de entrada a un mundo de privilegios curados.',
    features: [
      'Gestión de reservas en restaurantes premium',
      'Acceso a nightlife VIP seleccionado',
      'Traslados en vehículo de lujo',
      'Concierge disponible 12h/día',
      'Red de contactos en 5 destinos',
    ],
    cta: 'Apply Now',
    featured: false,
  },
  {
    name: 'Exclusive',
    price: '1.500',
    period: '/mes',
    description: 'Para quienes saben que la experiencia lo es todo.',
    features: [
      'Todo lo incluido en Essential',
      'Acceso a chárter de jets privados',
      'Reserva de villas y superyates',
      'Concierge personal 24/7',
      'Acceso a eventos y galas privadas',
      'Gestión de viajes internacionales',
      'Seguridad y escoltas bajo demanda',
      'Red de contactos en 15+ destinos',
    ],
    cta: 'Apply Now',
    featured: true,
  },
  {
    name: 'Private',
    price: 'A medida',
    period: '',
    description: 'Una relación sin límites. Diseñada exclusivamente para ti.',
    features: [
      'Todo lo incluido en Exclusive',
      'Gestor de cuenta dedicado exclusivo',
      'Acceso ilimitado a toda la red MONARC',
      'Gestión integral de propiedades',
      'Contratación de artistas y entretenimiento',
      'Seguridad privada 24/7',
      'Asesoría de imagen y protocolo',
      'Acceso a círculos privados y coleccionistas',
      'Gestión de inversiones en experiencias',
      'Todo lo que necesites, cuando lo necesites',
    ],
    cta: 'Contact Us',
    featured: false,
  },
]

export default function Membership() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })
      gsap.from(cardsRef.current!.children, {
        y: 60, duration: 0.9, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="membership" className="py-32 bg-[#080808] relative overflow-hidden">
      {/* Subtle gold gradient top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#C8A86E]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Acceso Exclusivo</p>
          <h2 className="font-display text-5xl md:text-7xl text-[#F5F2EC] mb-8">Membership</h2>
          <div className="w-12 h-px bg-[#C8A86E]/40 mx-auto mb-8" />
          <p className="text-[#888] max-w-xl mx-auto leading-relaxed">
            Elige el nivel de servicio que define tu estilo de vida. Cada membresía es una invitación a lo extraordinario.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C8A86E]/10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative p-10 flex flex-col transition-all duration-500',
                tier.featured
                  ? 'bg-[#0D0D0D] border-t-2 border-[#C8A86E]'
                  : 'bg-[#080808]'
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#C8A86E] text-[#080808] text-[9px] tracking-[3px] uppercase px-4 py-1 font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className={cn(
                  'font-display text-2xl mb-3',
                  tier.featured ? 'text-[#C8A86E]' : 'text-[#F5F2EC]'
                )}>
                  {tier.name}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-10">
                <span className={cn(
                  'font-display text-5xl',
                  tier.featured ? 'text-[#C8A86E]' : 'text-[#F5F2EC]'
                )}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-[#888] text-sm ml-1">{tier.period}</span>
                )}
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#C8A86E] mt-0.5 flex-shrink-0" />
                    <span className="text-[#888] text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                'w-full py-4 text-[11px] tracking-[3px] uppercase transition-all duration-300',
                tier.featured
                  ? 'bg-[#C8A86E] text-[#080808] hover:bg-[#B8965A]'
                  : 'border border-[#C8A86E]/30 text-[#C8A86E] hover:border-[#C8A86E] hover:bg-[#C8A86E]/5'
              )}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
