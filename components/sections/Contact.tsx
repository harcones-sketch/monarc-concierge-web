'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, Instagram, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  'Private Jets', 'Luxury Villas', 'Luxury Cars', 'Nightlife & VIP',
  'Music Industry', 'Events & Experiences', 'Travel Planning', 'Security & Escort',
  'Yachts', 'Corporate Concierge', 'Other',
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from(rightRef.current, {
        x: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const inputClass = "w-full bg-transparent border-b border-[#C8BFA8] text-[#1C1A17] py-4 text-sm placeholder-[#6A5E55] focus:outline-none focus:border-[#B8965A] transition-colors duration-300"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-32 bg-[#EDE8DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left */}
          <div ref={leftRef}>
            <p className="text-[10px] tracking-[6px] uppercase text-[#C8A86E] mb-6">Contacto</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#1C1A17] leading-tight mb-8">
              Comenzamos<br />
              <span className="text-[#C8A86E]">con una</span><br />
              conversación.
            </h2>
            <div className="w-12 h-px bg-[#C8A86E]/40 mb-12" />

            <p className="text-[#3D3530] leading-relaxed mb-16 max-w-sm">
              Cuéntanos qué necesitas. Nuestro equipo te responderá en menos de 2 horas con una propuesta personalizada.
            </p>

            <div className="space-y-6">
              <a href="mailto:hello@monarconcierge.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-[#C8A86E]/20 flex items-center justify-center group-hover:border-[#C8A86E]/50 transition-colors">
                  <Mail className="w-4 h-4 text-[#C8A86E]" />
                </div>
                <span className="text-[#3D3530] group-hover:text-[#1C1A17] transition-colors text-sm">
                  hello@monarconcierge.com
                </span>
              </a>
              <a href="tel:+34600000000" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-[#C8A86E]/20 flex items-center justify-center group-hover:border-[#C8A86E]/50 transition-colors">
                  <Phone className="w-4 h-4 text-[#C8A86E]" />
                </div>
                <span className="text-[#3D3530] group-hover:text-[#1C1A17] transition-colors text-sm">
                  +34 600 000 000
                </span>
              </a>
              <a href="https://instagram.com/monarconcierge" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-[#C8A86E]/20 flex items-center justify-center group-hover:border-[#C8A86E]/50 transition-colors">
                  <Instagram className="w-4 h-4 text-[#C8A86E]" />
                </div>
                <span className="text-[#3D3530] group-hover:text-[#1C1A17] transition-colors text-sm">
                  @monarconcierge
                </span>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-px bg-[#C8A86E] mx-auto mb-8" />
                <h3 className="font-display text-3xl text-[#1C1A17] mb-4">Mensaje enviado</h3>
                <p className="text-[#3D3530] text-sm">Nuestro equipo se pondrá en contacto contigo en las próximas 2 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <input
                      type="text" placeholder="Nombre completo" required
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <input
                      type="email" placeholder="Email" required
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <input
                    type="tel" placeholder="Teléfono"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className={inputClass}
                  />
                  <select
                    value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                    className={cn(inputClass, 'cursor-pointer bg-[#EDE8DF]')}
                  >
                    <option value="" disabled>Servicio de interés</option>
                    {services.map(s => <option key={s} value={s} className="bg-[#EDE8DF]">{s}</option>)}
                  </select>
                </div>
                <textarea
                  placeholder="Cuéntanos qué necesitas..." rows={5} required
                  value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className={cn(inputClass, 'resize-none')}
                />
                <button
                  type="submit"
                  className="group flex items-center gap-3 bg-[#B8965A] text-white px-10 py-4 text-[11px] tracking-[3px] uppercase font-medium hover:bg-[#9E7D46] transition-colors duration-300"
                >
                  Enviar mensaje
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
