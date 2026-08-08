import type { Meta } from '@prisma/client'

type BuildArticleJsonLdParams = {
  meta: Meta
  headline: string
  category: string
  tags: string[]
  datePublished: Date
  dateModified: Date
}

export const buildArticleJsonLd = ({
  meta,
  headline,
  category,
  tags,
  datePublished,
  dateModified,
}: BuildArticleJsonLdParams) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description: meta.description,
  ...(meta.image ? { image: meta.image } : {}),
  datePublished: datePublished.toISOString(),
  dateModified: dateModified.toISOString(),
  articleSection: category,
  ...(tags.length > 0 ? { keywords: tags.join(', ') } : {}),
})
