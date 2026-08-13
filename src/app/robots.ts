import type { MetadataRoute } from 'next'
import { env } from '@/shared/lib/env'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env('NEXT_PUBLIC_SITE_URL').replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/*/admin', '/*/account', '/*/reset-password', '/*/activate'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
