import type { NextRequest } from 'next/server'
import { hasLocale } from 'next-intl'
import { searchPosts } from '@/entities/post'
import { defaultLocale, locales } from '@/shared/lib/i18n'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
  const localeParam = request.nextUrl.searchParams.get('locale')
  const locale = hasLocale(locales, localeParam) ? localeParam : defaultLocale

  if (!query) return Response.json([])

  const posts = await searchPosts(query, locale)

  return Response.json(posts.map((post) => ({ slug: post.slug, title: post.title, category: post.category.name })))
}
