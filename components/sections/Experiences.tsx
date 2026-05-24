'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, X, ChevronLeft, ChevronRight, Mail } from 'lucide-react'

// ─── WhatsApp icon SVG ────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
type Experience = {
  name: string
  subtitle: string
  image: string
  tag: string
  description: string
  details: string[]
  gallery: string[]
}

const experiences: Experience[] = [
  {
    name: 'Jets Privados',
    subtitle: 'Vuela en tus términos',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    tag: 'Aviación Privada',
    description:
      'Olvida los aeropuertos comerciales. Con Monarc accedes a una red de más de 7.000 aeronaves disponibles en 24 horas, con salida desde aeropuertos privados como Cuatro Vientos o Torrejón. Gestión completa del itinerario, cátering personalizado y traslado en vehículo de lujo incluido.',
    details: [
      'Charter confirmado o empty leg con ahorro de hasta 65%',
      'Cátering personalizado y servicio a bordo premium',
      'Traslado en vehículo de lujo al aeropuerto privado',
      'Disponibilidad 24/7 · Respuesta en menos de 2 horas',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1400&q=90',
      'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1400&q=90',
      'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1400&q=90',
    ],
  },
  {
    name: 'Hoteles de Lujo',
    subtitle: 'Alojamiento sin igual',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Hospitality Premium',
    description:
      'Suites en los mejores hoteles del mundo con upgrades garantizados y atención preferente desde el primer contacto. Desde el Aman Tokyo hasta el Hotel de Paris en Mónaco — si existe, lo conseguimos para ti.',
    details: [
      'Acceso a suites y villas no disponibles al público general',
      'Early check-in y late check-out garantizados',
      'Amenities especiales y trato VIP en recepción',
      'Red de más de 200 propiedades 5★ en Europa y Asia',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=90',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=90',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400&q=90',
    ],
  },
  {
    name: 'Supercoches',
    subtitle: 'Conduce lo extraordinario',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    tag: 'Luxury Cars',
    description:
      'Lamborghini, Ferrari, Rolls-Royce, Bentley. Disponibles en Madrid, Barcelona, Marbella e Ibiza. Para una tarde, un road trip europeo o simplemente llegar en otro nivel. Con chófer o sin él — tú decides.',
    details: [
      'Flota de más de 40 vehículos de lujo y superdeportivos',
      'Entrega directa en el hotel o aeropuerto',
      'Seguro a todo riesgo incluido en el servicio',
      'Chófer privado disponible bajo petición',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=90',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1400&q=90',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1400&q=90',
    ],
  },
  {
    name: 'Vida Nocturna',
    subtitle: 'Acceso VIP garantizado',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    tag: 'Nightlife & Clubbing',
    description:
      'Mesa en Ushuaïa, entrada en Hakkasan o reserva en Annabel\'s de Londres. Nuestra red de relaciones en los mejores clubs de Europa te garantiza el mejor servicio, sin esperas ni sorpresas, en Madrid, Ibiza, Marbella o Mónaco.',
    details: [
      'Mesas VIP en los clubs más exclusivos de España y Europa',
      'Botella y servicio privado incluidos en el paquete',
      'Coordinación con RRPP para entrada sin esperas',
      'Gestión de afterparties y eventos privados a medida',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=90',
      'https://images.unsplash.com/photo-1571266028253-6c0b2b5e4e22?w=1400&q=90',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1400&q=90',
    ],
  },
  {
    name: 'Yates',
    subtitle: 'El Mediterráneo es tuyo',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    tag: 'Charter Náutico',
    description:
      'Desde veleros clásicos hasta superyates de 50 metros. Ruta de las islas griegas, costa de Amalfi, Baleares o Mónaco. Tripulación completa, chef privado a bordo y todos los permisos gestionados por nosotros.',
    details: [
      'Charter desde 1 día hasta varias semanas por el Mediterráneo',
      'Tripulación profesional y chef privado a bordo',
      'Itinerario personalizado: Ibiza, Formentera, Capri, Mónaco…',
      'Aprovisionamiento, maridaje y servicios de lujo incluidos',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1400&q=90',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1400&q=90',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&q=90',
    ],
  },
  {
    name: 'Gastronomía',
    subtitle: 'Reservas imposibles',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    tag: 'Fine Dining',
    description:
      'DiverXO, Aponiente, El Celler de Can Roca. Conseguimos mesa donde otros dicen que es imposible. Cenas privadas, chef a domicilio, maridajes exclusivos o simplemente la mejor mesa del mejor restaurante de la ciudad.',
    details: [
      'Acceso prioritario a restaurantes con lista de espera de meses',
      'Cenas privadas y experiencias gastronómicas únicas',
      'Chef privado en villas, yates o eventos especiales',
      'Maridaje con sumiller y bodega de autor bajo petición',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=90',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=90',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1400&q=90',
    ],
  },
]

// ─── Modal ─────────────────────────────────────────────────────────────────────
const CONTACT_EMAIL = 'hello@monarconcierge.com'
const WHATSAPP_NUMBER = '34600000000' // reemplazar por número real

function ExperienceModal({
  exp,
  onClose,
}: {
  exp: Experience
  onClose: () => void
}) {
  const [photoIdx, setPhotoIdx] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Entrada GSAP
  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
    )
    gsap.fromTo(
      panelRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 },
    )
  }, [])

  const prev = useCallback(() => setPhotoIdx(i => (i - 1 + exp.gallery.length) % exp.gallery.length), [exp.gallery.length])
  const next = useCallback(() => setPhotoIdx(i => (i + 1) % exp.gallery.length), [exp.gallery.length])

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=Consulta%20sobre%20${encodeURIComponent(exp.name)}&body=Hola%2C%20me%20interesa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20${encodeURIComponent(exp.name)}%20a%20trav%C3%A9s%20de%20Monarc%20Concierge.`
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20interesa%20obtener%20informaci%C3%B3n%20sobre%20${encodeURIComponent(exp.name)}%20a%20trav%C3%A9s%20de%20Monarc%20Concierge.`

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(15,13,10,0.80)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#F5F2EC] flex flex-col lg:flex-row"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-[#1C1A17]/10 hover:bg-[#1C1A17]/20 transition-colors"
        >
          <X className="w-4 h-4 text-[#1C1A17]" />
        </button>

        {/* ── Galería ── */}
        <div className="lg:w-1/2 flex-shrink-0">
          {/* Imagen principal */}
          <div className="relative h-72 lg:h-full min-h-[300px] lg:min-h-[520px] overflow-hidden">
            <Image
              key={photoIdx}
              src={exp.gallery[photoIdx]}
              alt={exp.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Gradiente sutil abajo */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0F0D0A]/50 to-transparent" />

            {/* Controles de galería */}
            {exp.gallery.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#F5F2EC]/80 hover:bg-[#F5F2EC] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-[#1C1A17]" />
                </button>
                <button
                  onClick={next}
                  aria-label="Foto siguiente"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#F5F2EC]/80 hover:bg-[#F5F2EC] transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-[#1C1A17]" />
                </button>
              </>
            )}

            {/* Indicadores de página */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {exp.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === photoIdx ? 'bg-[#C8A86E] w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Miniaturas */}
          <div className="flex gap-2 p-3 bg-[#EDE8DF]">
            {exp.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setPhotoIdx(i)}
                className={`relative w-20 h-14 flex-shrink-0 overflow-hidden transition-all duration-300 ${
                  i === photoIdx ? 'ring-2 ring-[#C8A86E]' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col">
          <p className="text-[9px] tracking-[4px] uppercase text-[#C8A86E] mb-4">{exp.tag}</p>
          <h3 className="font-display text-3xl lg:text-4xl text-[#1C1A17] mb-2">{exp.name}</h3>
          <p className="text-[#7A7269] text-sm mb-6 italic font-light">{exp.subtitle}</p>
          <div className="w-10 h-px bg-[#C8A86E]/40 mb-6" />

          <p className="text-[#4A4440] text-sm leading-relaxed mb-8">{exp.description}</p>

          {/* Bullets */}
          <ul className="space-y-3 mb-10 flex-1">
            {exp.details.map((d, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#C8A86E] flex-shrink-0" />
                <span className="text-[#7A7269] text-xs leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={mailtoHref}
              className="group flex items-center justify-center gap-2 bg-[#B8965A] text-white px-6 py-3.5 text-[10px] tracking-[3px] uppercase font-medium hover:bg-[#9E7D46] transition-colors duration-300 flex-1"
            >
              <Mail className="w-3.5 h-3.5" />
              Solicitar información
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 border border-[#1C1A17]/20 text-[#1C1A17] px-6 py-3.5 text-[10px] tracking-[3px] uppercase font-medium hover:border-[#1C1A17]/50 hover:bg-[#1C1A17]/5 transition-all duration-300 flex-1"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>

          <p className="text-[#A09588] text-[10px] mt-4 text-center">
            Respuesta garantizada en menos de 2 horas
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Section principal ─────────────────────────────────────────────────────────
export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Experience | null>(null)

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
    <>
      <section ref={sectionRef} id="experiences" className="py-32 bg-[#EDE8DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Lo que ofrecemos</p>
              <h2 className="font-display text-5xl md:text-7xl text-[#1C1A17] leading-none">
                Curated<br />
                <span className="text-[#C8A86E]">Experiences</span>
              </h2>
              <div className="w-12 h-px bg-[#C8A86E]/40 mt-8" />
            </div>
            <p className="text-[#7A7269] max-w-xs mt-8 lg:mt-0 text-sm leading-relaxed">
              Cada experiencia, diseñada a medida para quienes exigen lo mejor. Disponible en toda España.
            </p>
          </div>
        </div>

        {/* Scroll horizontal */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 px-6 lg:px-12 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experiences.map((exp) => (
            <button
              key={exp.name}
              onClick={() => setSelected(exp)}
              className="group relative min-w-[280px] sm:min-w-[360px] h-[500px] flex-shrink-0 snap-start overflow-hidden cursor-pointer text-left"
            >
              <Image
                src={exp.image}
                alt={exp.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="360px"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
              {/* Hover overlay sutil */}
              <div className="absolute inset-0 bg-[#C8A86E]/0 group-hover:bg-[#C8A86E]/10 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-[9px] tracking-[3px] uppercase text-[#C8A86E] mb-2">{exp.tag}</p>
                <h3 className="font-display text-3xl text-[#F5F2EC] mb-1">{exp.name}</h3>
                <p className="text-[#888] text-sm mb-6">{exp.subtitle}</p>
                <div className="flex items-center gap-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[10px] tracking-[3px] uppercase text-[#C8A86E]">Ver más</span>
                  <ArrowRight className="w-3 h-3 text-[#C8A86E]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <ExperienceModal exp={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
