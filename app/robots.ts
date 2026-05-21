import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://monarcconcierge.com/sitemap.xml',
    host: 'https://monarcconcierge.com',
  }
}
