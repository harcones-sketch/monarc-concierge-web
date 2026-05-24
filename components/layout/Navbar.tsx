'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#F7F4EF]/95 backdrop-blur-md border-b border-[#B8965A]/15'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex-shrink-0">
            <Image
              src="/logos/monarc_horizontal.svg"
              alt="MONARC Concierge"
              width={160}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'text-[11px] tracking-[3px] uppercase transition-colors duration-300 font-sans',
                    scrolled ? 'text-[#3D3530] hover:text-[#1C1A17]' : 'text-[#F5F2EC]/70 hover:text-[#F5F2EC]'
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#membership')}
              className={cn(
                'hidden lg:flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-[3px] uppercase font-sans transition-all duration-300',
                scrolled
                  ? 'border border-[#B8965A]/50 text-[#B8965A] hover:bg-[#B8965A] hover:text-white'
                  : 'border border-[#C8A86E]/40 text-[#C8A86E] hover:bg-[#C8A86E]/10'
              )}
            >
              Become a Member
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn('lg:hidden p-1', scrolled ? 'text-[#1C1A17]' : 'text-[#F5F2EC]')}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-display text-3xl text-cream hover:text-gold transition-colors duration-300 tracking-[2px]"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
              >
                <button
                  onClick={() => scrollTo('#membership')}
                  className="mt-4 px-8 py-3 border border-gold/60 text-gold text-[11px] tracking-[4px] uppercase font-sans hover:bg-gold hover:text-dark transition-all duration-300"
                >
                  Become a Member
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
