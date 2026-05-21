'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const partners = [
  { name: 'Four Seasons',       logo: 'https://logo.clearbit.com/fourseasons.com' },
  { name: 'Rolls-Royce',        logo: 'https://logo.clearbit.com/rolls-roycemotorcars.com' },
  { name: 'NetJets',            logo: 'https://logo.clearbit.com/netjets.com' },
  { name: 'Waldorf Astoria',    logo: 'https://logo.clearbit.com/waldorfastoria.com' },
  { name: 'Porsche',            logo: 'https://logo.clearbit.com/porsche.com' },
  { name: 'Mandarin Oriental',  logo: 'https://logo.clearbit.com/mandarinoriental.com' },
  { name: 'Emirates',           logo: 'https://logo.clearbit.com/emirates.com' },
  { name: 'Nobu',               logo: 'https://logo.clearbit.com/noburestaurants.com' },
  { name: 'Aston Martin',       logo: 'https://logo.clearbit.com/astonmartin.com' },
  { name: 'Pacha Group',        logo: 'https://logo.clearbit.com/pacha.com' },
  { name: 'Lamborghini',        logo: 'https://logo.clearbit.com/lamborghini.com' },
  { name: 'Cipriani',           logo: 'https://logo.clearbit.com/cipriani.com' },
]

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
      })
      gsap.from(gridRef.current!.children, {
        opacity: 0, y: 20, duration: 0.6, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="partners" className="py-28 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Nuestra Red</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F2EC]">
            Partners & <span className="text-[#C8A86E]">Collaborators</span>
          </h2>
          <p className="text-[#666] text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Trabajamos con las mejores marcas del mundo para garantizar experiencias sin igual.
          </p>
        </div>

        <div className="w-full h-px bg-[#C8A86E]/20 mb-16" />

        {/* Logo grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-0"
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group border border-[#C8A86E]/10 p-8 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:bg-[#C8A86E]/05 hover:border-[#C8A86E]/30 cursor-default"
            >
              {/* Logo */}
              <div className="w-10 h-10 flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    // Fallback: ocultar imagen si no carga
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              {/* Nombre */}
              <span className="font-sans text-[10px] tracking-[2px] text-[#888] group-hover:text-[#C8A86E] transition-colors duration-500 uppercase text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-[#C8A86E]/20 mt-16" />
      </div>
    </section>
  )
}
