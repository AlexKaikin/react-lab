import type { Meta } from '@prisma/client'
import type { Metadata } from 'next'

type BuildMetadataParams = ({ meta: Meta } | { title: string; description?: string }) & { locale?: string }

export const buildMetadata = (params: BuildMetadataParams): Metadata => {
  const { locale } = params
  const title = 'meta' in params ? params.meta.title : params.title
  const description = 'meta' in params ? params.meta.description : params.description
  const image = 'meta' in params ? params.meta.image : undefined

  return {
    title,
    description,
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
