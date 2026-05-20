'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const partners = [
  'Aston Martin', 'Four Seasons', 'Nobu', 'Pacha Group',
  'Rolls-Royce', 'Cipriani', 'Ibiza Gran Hotel', 'Emirates',
  'NetJets', 'Porsche', 'Waldorf Astoria', 'Hakkasan',
  'Mandarin Oriental', 'Bugatti', 'Ushuaïa Ibiza', 'Qatar Airways',
]

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })
      gsap.from(gridRef.current!.children, {
        duration: 0.6, stagger: 0.04, ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="partners" className="py-28 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Nuestra Red</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F2EC]">Partners & Collaborators</h2>
        </div>

        <div className="w-full h-px bg-[#C8A86E]/15 mb-16" />

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-4 gap-0">
          {partners.map((partner, i) => (
            <div
              key={partner}
              className="group border border-[#C8A86E]/08 p-8 text-center transition-all duration-500 hover:bg-[#C8A86E]/04 cursor-default"
            >
              <span className="font-display text-sm tracking-widest text-[#555] group-hover:text-[#C8A86E] transition-colors duration-500 uppercase">
                {partner}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-[#C8A86E]/15 mt-16" />
      </div>
    </section>
  )
}
