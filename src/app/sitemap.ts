import type { MetadataRoute } from 'next'
import { getPosts } from '@/entities/post'
import { getCategories } from '@/entities/post-category'
import { env } from '@/shared/lib/env'
import { defaultLocale, type Locale, locales } from '@/shared/lib/i18n'

const buildEntry = (path: string, availableLocales: readonly Locale[], lastModified?: Date): MetadataRoute.Sitemap => {
  const baseUrl = env('NEXT_PUBLIC_SITE_URL').replace(/\/$/, '')

  return availableLocales.map((locale) => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified,
    alternates: {
      languages: Object.fromEntries(availableLocales.map((l) => [l, `${baseUrl}/${l}${path}`])),
    },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories(defaultLocale)
  const postsByLocale = await Promise.all(locales.map(async (locale) => ({ locale, posts: await getPosts(locale) })))

  const postsBySlug = new Map<string, { locales: Locale[]; updatedAt: Date }>()

  for (const { locale, posts } of postsByLocale) {
    for (const post of posts) {
      const entry = postsBySlug.get(post.slug) ?? { locales: [], updatedAt: post.updatedAt }
      entry.locales.push(locale)
      postsBySlug.set(post.slug, entry)
    }
  }

  return [
    ...buildEntry('', locales),
    ...buildEntry('/blog', locales),
    ...['/terms', '/privacy', '/cookies'].flatMap((path) => buildEntry(path, locales)),
    ...categories.flatMap((category) => buildEntry(`/blog/category/${category.slug}`, locales)),
    ...[...postsBySlug.entries()].flatMap(([slug, post]) => buildEntry(`/blog/${slug}`, post.locales, post.updatedAt)),
  ]
}
