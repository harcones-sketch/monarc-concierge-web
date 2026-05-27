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
  title: 'MONARC Concierge — Luxury Concierge Madrid | Life, Curated.',
  description:
    'Concierge de lujo en Madrid. Jets privados, yates, villas exclusivas, nightlife VIP, reservas imposibles y experiencias únicas. El concierge de referencia para artistas, ejecutivos y HNWI.',
  keywords: [
    'concierge de lujo Madrid',
    'luxury concierge Madrid',
    'jets privados España',
    'private jet Madrid Ibiza',
    'concierge VIP',
    'experiencias exclusivas Madrid',
    'nightlife VIP Madrid Ibiza',
    'reservas exclusivas restaurantes',
    'concierge artistas',
    'yates Mediterráneo',
    'villas lujo Ibiza',
    'concierge ejecutivos',
    'MONARC concierge',
    'lifestyle management Spain',
    'luxury travel Spain',
  ],
  authors: [{ name: 'MONARC Concierge' }],
  metadataBase: new URL('https://monarcconcierge.com'),
  alternates: {
    canonical: 'https://monarcconcierge.com',
  },
  openGraph: {
    title: 'MONARC Concierge — Luxury Concierge Madrid | Life, Curated.',
    description:
      'Concierge de lujo en Madrid. Jets privados, yates, nightlife VIP, reservas imposibles y experiencias únicas para artistas, ejecutivos y HNWI.',
    type: 'website',
    url: 'https://monarcconcierge.com',
    locale: 'es_ES',
    siteName: 'MONARC Concierge',
    images: [
      {
        url: 'https://www.monarcconcierge.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MONARC Concierge — Luxury Concierge Madrid | Life, Curated.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MONARC Concierge — Luxury Concierge Madrid',
    description:
      'Jets privados, yates, nightlife VIP y experiencias exclusivas. El concierge de lujo de referencia en España.',
    images: ['https://www.monarcconcierge.com/opengraph-image'],
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MONARC',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MONARC Concierge',
  url: 'https://monarcconcierge.com',
  logo: 'https://monarcconcierge.com/logos/monarc_transparent.svg',
  description:
    'Concierge de lujo en Madrid. Jets privados, yates, villas exclusivas, nightlife VIP, reservas imposibles y experiencias únicas para artistas, ejecutivos y HNWI.',
  areaServed: ['España', 'Europa', 'Ibiza', 'Madrid', 'Mónaco', 'Dubai'],
  serviceType: [
    'Luxury Concierge',
    'Private Jet Charter',
    'Yacht Charter',
    'VIP Nightlife',
    'Luxury Travel Planning',
    'Exclusive Experiences',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: ['https://www.instagram.com/monarcconcierge'],

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${cinzel.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
