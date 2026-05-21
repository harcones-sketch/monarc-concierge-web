'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pillars = [
  { icon: '⬛', label: 'Discreción Total', desc: 'Confidencialidad absoluta en cada gestión' },
  { icon: '◇', label: 'Acceso Ilimitado', desc: 'Puertas que no existen para otros' },
  { icon: '○', label: 'Disponibilidad 24/7', desc: 'Siempre disponibles, sin excepción' },
]

const values = [
  {
    title: 'Discreción',
    text: 'Tu privacidad es sagrada. Operamos bajo el más estricto código de confidencialidad.',
  },
  {
    title: 'Acceso',
    text: 'Puertas que no existen para otros. Nuestra red abre acceso al mundo que pocos conocen.',
  },
  {
    title: 'Excelencia',
    text: 'Cada detalle importa. No aceptamos nada menos que la perfección en cada gestión.',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Text animation
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Image animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      // Stats counter animation
      const statNumbers = sectionRef.current?.querySelectorAll('.stat-number')
      statNumbers?.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0')
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.from(
              { value: 0 },
              {
                value: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                  el.textContent = Math.round(this.targets()[0].value).toString()
                },
              }
            )
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="bg-[#080808] section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text column */}
          <div ref={textRef}>
            <span className="block text-[10px] tracking-[6px] uppercase text-gold font-sans mb-4">
              Nuestra Historia
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-cream tracking-widest mb-8 leading-tight">
              El Arte de<br />
              <span className="text-gradient-gold">Vivir Sin Límites</span>
            </h2>
            <div className="w-12 h-px bg-gold mb-8" />

            <div className="space-y-5 text-muted font-sans text-[15px] leading-relaxed mb-12">
              <p>
                MONARC nace de una pregunta simple: ¿por qué lo extraordinario debería ser complicado? Somos el puente entre quienes exigen lo mejor y las experiencias que pocos imaginan.
              </p>
              <p>
                Con raíces en Madrid y presencia activa en Ibiza, Dubai, Monaco, Mykonos y Miami, hemos construido una red de acceso que convierte lo imposible en tu próxima reserva.
              </p>
              <p>
                Trabajamos con artistas, ejecutivos de alto nivel y familias HNWI que entienden que el tiempo es el verdadero lujo. Nosotros lo gestionamos por ellos.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6">
              {values.map((v) => (
                <div key={v.title} className="flex gap-5">
                  <div className="flex-shrink-0 w-px bg-gold/30 relative">
                    <div className="absolute top-0 left-0 w-px h-6 bg-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-cream tracking-widest mb-1">{v.title}</h4>
                    <p className="text-muted text-sm font-sans leading-relaxed">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image + stats column */}
          <div ref={imageRef} className="space-y-10">
            {/* Image */}
            <div className="relative h-[420px] lg:h-[520px] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
                alt="Luxury concierge service"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
              {/* Gold frame accent */}
              <div className="absolute top-4 right-4 bottom-4 left-4 border border-gold/15 rounded-sm pointer-events-none" />
            </div>

            {/* Pillars */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className="text-center p-6 bg-[#0D0D0D] border border-[rgba(200,168,110,0.08)] rounded-sm group hover:border-[rgba(200,168,110,0.25)] transition-colors duration-500"
                >
                  <div className="font-display text-2xl text-gold mb-3">{p.icon}</div>
                  <p className="text-[10px] tracking-[2px] uppercase text-[#C8A86E] font-sans mb-2">
                    {p.label}
                  </p>
                  <p className="text-[10px] text-[#555] font-sans leading-relaxed hidden sm:block">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
