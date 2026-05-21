'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function VideoReel() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {

      // Parallax: vídeo sube más lento que el scroll (efecto profundidad)
      gsap.fromTo(
        videoWrapRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // Texto aparece al entrar en viewport
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      })

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#080808]"
      aria-label="MONARC lifestyle video"
    >
      {/* Video con parallax — ligeramente más grande que el contenedor */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 scale-[1.18]"
      >
        <video
          className="w-full h-full object-cover"
          src="/video/monarc-reel.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[#080808]/50" />

      {/* Gradientes top/bottom para fusionar con secciones adyacentes */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#080808] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080808] to-transparent" />

      {/* Contenido centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div ref={labelRef}>
          <span className="text-[10px] tracking-[8px] uppercase text-[#C8A86E] font-sans">
            MONARC · Experiencias Únicas
          </span>
        </div>
        <div ref={titleRef} className="mt-6">
          <h2
            className="font-display text-[#F5F2EC] leading-none"
            style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
          >
            Beyond<br />
            <span className="text-[#C8A86E]">Expectations.</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
