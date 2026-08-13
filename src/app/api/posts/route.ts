import type { NextRequest } from 'next/server'
import type { PostAdminInput } from '@/entities/post'
import { createPost, getPostsForAdmin, isSlugTaken } from '@/entities/post'
import { getCategoryLocales } from '@/entities/post-category'
import { verifyApiSecret } from '@/shared/api/content-api/verify-api-secret'
import { defaultLocale, locales } from '@/shared/lib/i18n'
import { createPostApiSchema } from './schema'

export async function GET(request: NextRequest) {
  if (!verifyApiSecret(request)) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const posts = await getPostsForAdmin()

  return Response.json(posts)
}

export async function POST(request: NextRequest) {
  if (!verifyApiSecret(request)) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const parsed = createPostApiSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: 'invalid', issues: parsed.error.issues }, { status: 400 })

  const categoryLocales = await getCategoryLocales(parsed.data.categoryId)
  if (!categoryLocales) return Response.json({ error: 'categoryNotFound' }, { status: 400 })

  const hasUnsupportedLocale = locales.some(
    (locale) => locale !== defaultLocale && parsed.data[locale] && !categoryLocales.includes(locale),
  )
  if (hasUnsupportedLocale) return Response.json({ error: 'localeNotSupportedByCategory' }, { status: 400 })

  if (await isSlugTaken(parsed.data.slug)) return Response.json({ error: 'slugTaken' }, { status: 409 })

  const translations = Object.fromEntries(
    locales.filter((locale) => locale !== defaultLocale).map((locale) => [locale, parsed.data[locale]]),
  )

  const post = await createPost({
    slug: parsed.data.slug,
    categoryId: parsed.data.categoryId,
    ru: parsed.data[defaultLocale],
    ...translations,
  } as PostAdminInput)

  return Response.json(post, { status: 201 })
}
