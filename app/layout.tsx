import type { Metadata } from 'next'
import { Cinzel, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MONARC Concierge — Life, Curated.',
  description:
    'Acceso exclusivo a las mejores experiencias del mundo. Jets privados, villas de lujo, nightlife VIP y mucho más. El concierge de referencia para HNWI, artistas y ejecutivos.',
  keywords: [
    'luxury concierge',
    'private jets',
    'villas de lujo',
    'nightlife VIP',
    'Ibiza',
    'Dubai',
    'Monaco',
    'concierge Madrid',
    'music industry concierge',
  ],
  authors: [{ name: 'MONARC Concierge' }],
  openGraph: {
    title: 'MONARC Concierge — Life, Curated.',
    description: 'Acceso exclusivo a las mejores experiencias del mundo.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'MONARC Concierge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MONARC Concierge — Life, Curated.',
    description: 'Acceso exclusivo a las mejores experiencias del mundo.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
