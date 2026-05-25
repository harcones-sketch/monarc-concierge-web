'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

// ─── Los 3 servicios core ─────────────────────────────────────────────────────
const services = [
  {
    numeral: 'I',
    name: 'Viaje Completo',
    tagline: 'Tú decides el destino. Nosotros nos encargamos de todo.',
    description:
      'Desde el jet privado hasta la suite del hotel, el coche esperándote en pista y el itinerario curado al detalle. Un solo punto de contacto, cero logística para ti.',
    includes: [
      'Jets privados y empty legs',
      'Alojamiento 5★ con upgrades garantizados',
      'Vehículos de lujo y chófer privado',
      'Itinerario y actividades a medida',
      'Coordinación completa de A a Z',
    ],
  },
  {
    numeral: 'II',
    name: 'Reservas & Experiencias',
    tagline: 'Lo que parece imposible, lo conseguimos.',
    description:
      'Restaurantes Michelin con lista de espera de meses, yates por un día, suites en hoteles sold-out, entradas a eventos privados. Servicios puntuales de alto valor, cuando los necesitas.',
    includes: [
      'Restaurantes de alta cocina y reservas imposibles',
      'Charter náutico por el Mediterráneo',
      'Acceso a eventos exclusivos y galas',
      'Experiencias gastronómicas privadas',
      'Gestión rápida · Propuesta en menos de 2h',
    ],
  },
  {
    numeral: 'III',
    name: 'Noche',
    tagline: 'Acceso VIP donde otros no llegan.',
    description:
      'Madrid, Ibiza, Marbella, Mónaco. Los mejores clubs, las mejores mesas, sin esperas ni sorpresas. Nuestra red de relaciones trabaja para que tu noche sea perfecta.',
    includes: [
      'Mesas VIP en los clubs más exclusivos',
      'Botella y servicio privado gestionados',
      'Coordinación con RRPP · Entrada sin espera',
      'Afterparties y eventos privados a medida',
      'Disponible en Madrid, Ibiza, Marbella y Mónaco',
    ],
  },
]

// ─── Pasos del proceso ────────────────────────────────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Cuéntanos qué necesitas',
    desc: 'Escríbenos por email o WhatsApp. Sin formularios, sin burocracia.',
  },
  {
    num: '02',
    title: 'Propuesta en menos de 2h',
    desc: 'Te enviamos opciones personalizadas con todos los detalles.',
  },
  {
    num: '03',
    title: 'Nosotros lo ejecutamos',
    desc: 'Gestionamos todo. Tú solo disfrutas.',
  },
]

export default function Membership() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)
  const processRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      })
      gsap.from(cardsRef.current!.children, {
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      })
      gsap.from(processRef.current!.children, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: processRef.current, start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} id="membership" className="py-32 bg-[#F5F1E8] relative overflow-hidden">
      {/* Línea dorada decorativa */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#C8A86E]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-20">
          <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Cómo Trabajamos</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="font-display text-5xl md:text-7xl text-[#1C1A17] leading-none">
              Tres servicios.<br />
              <span className="text-[#C8A86E]">Un solo contacto.</span>
            </h2>
            <p className="text-[#3D3530] max-w-sm leading-relaxed text-sm lg:pb-2">
              Sin cuotas mensuales. Sin contratos. Cada servicio es una propuesta a medida — solo pagas por lo que disfrutas.
            </p>
          </div>
          <div className="w-12 h-px bg-[#C8A86E]/40 mt-10" />
        </div>

        {/* ── 3 Servicios ── */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-28">
          {services.map((s) => (
            <div
              key={s.numeral}
              className="group bg-[#EDE8DF] border border-[#C8A86E]/10 hover:border-[#C8A86E]/30 p-10 flex flex-col transition-all duration-500 hover:shadow-sm"
            >
              {/* Número romano */}
              <span className="font-display text-6xl text-[#C8A86E]/20 group-hover:text-[#C8A86E]/35 transition-colors duration-500 leading-none mb-6 select-none">
                {s.numeral}
              </span>

              {/* Nombre */}
              <h3 className="font-display text-2xl text-[#1C1A17] mb-2">{s.name}</h3>

              {/* Tagline */}
              <p className="text-[10px] tracking-[2px] uppercase text-[#C8A86E] mb-5 font-sans">{s.tagline}</p>

              {/* Línea */}
              <div className="w-8 h-px bg-[#C8A86E]/30 mb-6" />

              {/* Descripción */}
              <p className="text-[#3D3530] text-sm leading-relaxed mb-8 flex-1">{s.description}</p>

              {/* Lo que incluye */}
              <ul className="space-y-2.5">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1 h-1 rounded-full bg-[#C8A86E] flex-shrink-0" />
                    <span className="text-[#3D3530] text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Separador ── */}
        <div className="w-full h-px bg-[#C8A86E]/15 mb-28" />

        {/* ── El proceso ── */}
        <div className="mb-20">
          <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-16 text-center">El Proceso</p>
          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center px-8">
                {/* Número */}
                <span className="font-display text-5xl text-[#C8A86E]/25 mb-4 leading-none">{step.num}</span>
                <h4 className="font-display text-lg text-[#1C1A17] mb-3">{step.title}</h4>
                <p className="text-[#3D3530] text-sm leading-relaxed">{step.desc}</p>

                {/* Flecha entre pasos (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-10 translate-x-1/2">
                    <ArrowRight className="w-4 h-4 text-[#C8A86E]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 bg-[#1C1A17] text-[#F5F2EC] px-12 py-5 text-[11px] tracking-[4px] uppercase font-sans hover:bg-[#B8965A] transition-colors duration-400"
          >
            Iniciar una consulta
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <p className="text-[#6A5E55] text-xs mt-4 tracking-wide">Respuesta garantizada en menos de 2 horas</p>
        </div>

      </div>
    </section>
  )
}
