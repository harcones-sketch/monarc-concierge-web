'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

const experiences = [
  {
    name: 'Jets Privados',
    subtitle: 'Vuela en tus términos',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    tag: 'Aviación Privada',
  },
  {
    name: 'Hoteles de Lujo',
    subtitle: 'Alojamiento sin igual',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Hospitality Premium',
  },
  {
    name: 'Supercoches',
    subtitle: 'Conduce lo extraordinario',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    tag: 'Luxury Cars',
  },
  {
    name: 'Vida Nocturna',
    subtitle: 'Acceso VIP garantizado',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&q=80',
    tag: 'Nightlife & Clubbing',
  },
  {
    name: 'Yates',
    subtitle: 'El Mediterráneo es tuyo',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    tag: 'Charter Náutico',
  },
  {
    name: 'Gastronomía',
    subtitle: 'Reservas imposibles',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    tag: 'Fine Dining',
  },
]

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })
      gsap.from(scrollRef.current!.children, {
        x: 60, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: scrollRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experiences" className="py-32 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Lo que ofrecemos</p>
            <h2 className="font-display text-5xl md:text-7xl text-[#F5F2EC] leading-none">
              Curated<br />
              <span className="text-[#C8A86E]">Experiences</span>
            </h2>
            <div className="w-12 h-px bg-[#C8A86E]/40 mt-8" />
          </div>
          <p className="text-[#888] max-w-xs mt-8 lg:mt-0 text-sm leading-relaxed">
            Cada experiencia, diseñada a medida para quienes exigen lo mejor. Disponible en toda España.
          </p>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-6 lg:px-12 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {experiences.map((dest) => (
          <div
            key={dest.name}
            className="group relative min-w-[280px] sm:min-w-[360px] h-[500px] flex-shrink-0 snap-start overflow-hidden cursor-pointer"
          >
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="360px"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-[9px] tracking-[3px] uppercase text-[#C8A86E] mb-2">{dest.tag}</p>
              <h3 className="font-display text-3xl text-[#F5F2EC] mb-1">{dest.name}</h3>
              <p className="text-[#888] text-sm mb-6">{dest.subtitle}</p>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-[3px] uppercase text-[#C8A86E]">Explore</span>
                <ArrowRight className="w-3 h-3 text-[#C8A86E]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
