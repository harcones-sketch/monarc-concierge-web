'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const partners = [
  'Four Seasons',
  'Rolls-Royce',
  'NetJets',
  'Waldorf Astoria',
  'Porsche',
  'Mandarin Oriental',
  'Emirates',
  'Nobu',
  'Aston Martin',
  'Pacha Group',
  'Lamborghini',
  'Cipriani',
  'Ibiza Gran Hotel',
  'Bugatti',
  'Qatar Airways',
  'Hakkasan',
]

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const row1Ref    = useRef<HTMLDivElement>(null)
  const row2Ref    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
      })

      // Fila 1 → se mueve a la izquierda
      gsap.to(row1Ref.current, {
        x: '-10%',
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
        x: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const row1 = partners.slice(0, 8)
  const row2 = partners.slice(8, 16)

  return (
    <section ref={sectionRef} id="partners" className="py-28 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Nuestra Red</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F2EC]">
            Partners &amp; <span className="text-[#C8A86E]">Collaborators</span>
          </h2>
          <p className="text-[#888] text-sm mt-4 max-w-md mx-auto leading-relaxed font-sans">
            Trabajamos con las mejores marcas del mundo para garantizar experiencias sin igual.
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-[#C8A86E]/20 mb-14" />

      {/* Fila 1 */}
      <div ref={row1Ref} className="flex items-center gap-12 mb-8 px-8 whitespace-nowrap">
        {[...row1, ...row1].map((name, i) => (
          <div key={`r1-${i}`} className="flex items-center gap-12 flex-shrink-0">
            <span className="font-display text-xl md:text-2xl text-[#C8A86E]/70 tracking-widest uppercase hover:text-[#C8A86E] transition-colors duration-300 cursor-default">
              {name}
            </span>
            <span className="text-[#C8A86E]/20 text-lg">·</span>
          </div>
        ))}
      </div>

      {/* Fila 2 */}
      <div ref={row2Ref} className="flex items-center gap-12 px-8 whitespace-nowrap">
        {[...row2, ...row2].map((name, i) => (
          <div key={`r2-${i}`} className="flex items-center gap-12 flex-shrink-0">
            <span className="font-display text-xl md:text-2xl text-[#F5F2EC]/50 tracking-widest uppercase hover:text-[#F5F2EC] transition-colors duration-300 cursor-default">
              {name}
            </span>
            <span className="text-[#C8A86E]/20 text-lg">·</span>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-[#C8A86E]/20 mt-14" />
    </section>
  )
}
