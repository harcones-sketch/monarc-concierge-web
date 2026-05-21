'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

export default function Hero() {
  const labelRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Parallax pronunciado — la imagen se queda atrás mientras scrolleas
      gsap.to(bgRef.current, {
        yPercent: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '100vh top',
          scrub: 0.5,
        },
      })

      const tl = gsap.timeline({ delay: 0.3 })

      tl.from(labelRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
        .from(
          line1Ref.current,
          { y: 60, opacity: 0, duration: 1, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          line2Ref.current,
          { y: 60, opacity: 0, duration: 1, ease: 'power3.out' },
          '-=0.7'
        )
        .from(
          subtitleRef.current,
          { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          ctasRef.current,
          { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          scrollIndicatorRef.current,
          { opacity: 0, duration: 0.8 },
          '-=0.2'
        )

      // Scroll indicator loop
      gsap.to('.scroll-line-inner', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.4,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.6,
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollToServices = () => {
    const el = document.querySelector('#services')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const scrollToMembership = () => {
    const el = document.querySelector('#membership')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Background image con parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 scale-[1.5]">
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=3840&q=100"
          alt="Luxury villa infinity pool"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/40 to-[#080808]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/30 via-transparent to-[#080808]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 pt-24 pb-32">
        {/* Label */}
        <div ref={labelRef} className="mb-8">
          <span className="text-[10px] tracking-[6px] uppercase text-gold font-sans font-light">
            Luxury Concierge · Est. 2026
          </span>
        </div>

        {/* H1 */}
        <h1 className="font-display leading-none mb-6">
          <div
            ref={line1Ref}
            style={{ fontSize: 'clamp(64px, 10vw, 140px)' }}
            className="text-cream block"
          >
            LIFE,
          </div>
          <div
            ref={line2Ref}
            style={{ fontSize: 'clamp(64px, 10vw, 140px)' }}
            className="text-gradient-gold block"
          >
            CURATED.
          </div>
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-12 max-w-xl">
          <p className="font-serif text-2xl italic text-muted leading-relaxed">
            Acceso exclusivo a las mejores experiencias del mundo.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctasRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={scrollToServices}
            className="px-8 py-3.5 border border-gold/50 text-gold text-[11px] tracking-[4px] uppercase font-sans hover:bg-gold/10 transition-all duration-300 min-w-[180px]"
          >
            Discover More
          </button>
          <button
            onClick={scrollToMembership}
            className="px-8 py-3.5 bg-gold text-dark text-[11px] tracking-[4px] uppercase font-sans hover:bg-gold-2 transition-all duration-300 min-w-[180px]"
          >
            Become a Member
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[4px] uppercase text-muted/60 font-sans">Scroll</span>
        <div className="w-px h-12 bg-gold/20 overflow-hidden">
          <div className="scroll-line-inner w-full h-full bg-gold/60" />
        </div>
      </div>
    </section>
  )
}
