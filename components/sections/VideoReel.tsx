'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function VideoReel() {
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const labelRef    = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const video = videoRef.current
    if (!video) return

    const ctx = gsap.context(() => {

      // --- Scrub video playback with scroll ---
      video.pause()

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: false,
        scrub: true,
        onUpdate: (self) => {
          if (!video.duration || isNaN(video.duration)) return
          const target = self.progress * video.duration
          // Only seek if meaningful diff (avoid thrashing)
          if (Math.abs(video.currentTime - target) > 0.05) {
            video.currentTime = target
          }
        },
      })

      // --- Scale + parallax effect ---
      gsap.fromTo(
        video,
        { scale: 1.1 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      )

      // --- Overlay opacity (darkens mid-scroll, lightens at end) ---
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.3 },
        {
          opacity: 0.65,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '60% bottom',
            scrub: true,
          },
        }
      )

      // --- Text reveal ---
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    // Tall section so the scrub has room to breathe
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-[#080808]"
      aria-label="MONARC lifestyle video"
    >
      {/* Sticky container — stays in viewport while scrolling through 250vh */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/2169880/2169880-uhd_3840_2160_25fps.mp4"
          muted
          playsInline
          preload="auto"
          loop={false}
        />

        {/* Dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#080808]"
          style={{ opacity: 0.3 }}
        />

        {/* Gradient bottom */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080808] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#080808] to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center">
          <div ref={labelRef}>
            <span className="text-[10px] tracking-[8px] uppercase text-[#C8A86E] font-sans">
              MONARC · Experiencias Únicas
            </span>
          </div>
          <div ref={titleRef} className="mt-6">
            <h2
              className="font-display text-[#F5F2EC] leading-none"
              style={{ fontSize: 'clamp(48px, 8vw, 110px)' }}
            >
              Beyond<br />
              <span className="text-[#C8A86E]">Expectations.</span>
            </h2>
          </div>
        </div>

      </div>
    </section>
  )
}
