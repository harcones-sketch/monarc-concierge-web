import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MONARC Concierge',
    short_name: 'MONARC',
    description: 'Luxury Concierge Madrid — Life, Curated.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#1C1A17',
    theme_color: '#1C1A17',
    icons: [
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
