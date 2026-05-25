'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const partners = [
  { name: 'Four Seasons',      domain: 'fourseasons.com' },
  { name: 'Rolls-Royce',       domain: 'rolls-roycemotorcars.com' },
  { name: 'NetJets',           domain: 'netjets.com' },
  { name: 'Waldorf Astoria',   domain: 'waldorfastoria.com' },
  { name: 'Porsche',           domain: 'porsche.com' },
  { name: 'Mandarin Oriental', domain: 'mandarinoriental.com' },
  { name: 'Emirates',          domain: 'emirates.com' },
  { name: 'Nobu',              domain: 'noburestaurants.com' },
  { name: 'Aston Martin',      domain: 'astonmartin.com' },
  { name: 'Pacha',             domain: 'pacha.com' },
  { name: 'Lamborghini',       domain: 'lamborghini.com' },
  { name: 'Bulgari',           domain: 'bulgari.com' },
  { name: 'Bugatti',           domain: 'bugatti.com' },
  { name: 'Qatar Airways',     domain: 'qatarairways.com' },
  { name: 'Hakkasan',          domain: 'hakkasan.com' },
  { name: 'Cipriani',          domain: 'cipriani.com' },
]

/** Logo individual con fallback al nombre si Clearbit no carga */
function PartnerLogo({
  name,
  domain,
  size = 'desktop',
}: {
  name: string
  domain: string
  size?: 'desktop' | 'mobile'
}) {
  const [failed, setFailed] = useState(false)

  const containerClass =
    size === 'mobile'
      ? 'flex items-center justify-center w-full h-12 group'
      : 'flex items-center justify-center w-28 h-10 flex-shrink-0 group'

  const imgClass =
    size === 'mobile'
      ? 'object-contain max-h-7 w-auto max-w-[90px] opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500'
      : 'object-contain max-h-8 w-auto opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500'

  return (
    <div className={containerClass}>
      {!failed ? (
        <Image
          src={`https://logo.clearbit.com/${domain}?size=120`}
          alt={name}
          width={90}
          height={36}
          className={imgClass}
          onError={() => setFailed(true)}
          unoptimized
        />
      ) : (
        <span className="font-sans text-[10px] tracking-[2px] text-[#1C1A17]/60 uppercase group-hover:text-[#1C1A17]/90 transition-colors duration-300 font-light text-center leading-tight">
          {name}
        </span>
      )}
    </div>
  )
}

export default function Partners() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const row1Ref     = useRef<HTMLDivElement>(null)
  const row2Ref     = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null) // eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const isDesktop = window.innerWidth >= 768

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
      })

      if (isDesktop) {
        // Fila 1 → se mueve a la izquierda
        gsap.to(row1Ref.current, {
          x: '-8%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
        // Fila 2 → se mueve a la derecha
        gsap.to(row2Ref.current, {
          x: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
      // En móvil no animamos el grid — aparece directamente (evita quedarse en opacity:0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const row1 = partners.slice(0, 8)
  const row2 = partners.slice(8, 16)

  return (
    <section ref={sectionRef} id="partners" className="py-28 bg-[#EDE8DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Nuestra Red</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1C1A17]">
            Partners &amp; <span className="text-[#B8965A]">Collaborators</span>
          </h2>
          <p className="text-[#3D3530] text-sm mt-4 max-w-md mx-auto leading-relaxed font-sans">
            Trabajamos con las mejores marcas del mundo para garantizar experiencias sin igual.
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-[#C8A86E]/20 mb-12" />

      {/* ── MÓVIL: grid 4 columnas ── */}
      <div className="md:hidden px-6 mb-12">
        <div className="grid grid-cols-4 gap-x-2 gap-y-6">
          {partners.map((p) => (
            <PartnerLogo key={p.name} name={p.name} domain={p.domain} size="mobile" />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: filas con parallax ── */}
      <div className="hidden md:block">
        {/* Fila 1 */}
        <div ref={row1Ref} className="flex items-center gap-12 mb-8 px-8 whitespace-nowrap">
          {[...row1, ...row1].map((p, i) => (
            <div key={`r1-${i}`} className="flex items-center gap-12 flex-shrink-0">
              <PartnerLogo name={p.name} domain={p.domain} />
              <span className="text-[#C8A86E]/20 text-xs flex-shrink-0">◆</span>
            </div>
          ))}
        </div>

        {/* Fila 2 */}
        <div ref={row2Ref} className="flex items-center gap-12 px-8 whitespace-nowrap">
          {[...row2, ...row2].map((p, i) => (
            <div key={`r2-${i}`} className="flex items-center gap-12 flex-shrink-0">
              <PartnerLogo name={p.name} domain={p.domain} />
              <span className="text-[#C8A86E]/20 text-xs flex-shrink-0">◆</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-[#C8A86E]/20 mt-12" />
    </section>
  )
}
