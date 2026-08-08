import type { Meta } from '@prisma/client'
import type { Metadata } from 'next'
import { type Locale, locales } from '@/shared/lib/i18n'

type BuildMetadataParams = ({ meta: Meta } | { title: string; description?: string }) & {
  locale: Locale
  pathname: string
  noindex?: boolean
}

export const buildMetadata = (params: BuildMetadataParams): Metadata => {
  const { locale, pathname, noindex } = params
  const title = 'meta' in params ? params.meta.title : params.title
  const description = 'meta' in params ? params.meta.description : params.description
  const image = 'meta' in params ? params.meta.image : undefined

  return {
    title,
    description,
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: `/${locale}${pathname}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}${pathname}`])),
    },
    openGraph: {
      title,
      description,
      locale,
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}
