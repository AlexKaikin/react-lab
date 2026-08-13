import type { NextRequest } from 'next/server'
import type { CategoryAdminInput } from '@/entities/post-category'
import { createCategory, getCategoriesForAdmin, isCategorySlugTaken } from '@/entities/post-category'
import { verifyApiSecret } from '@/shared/api/content-api/verify-api-secret'
import { defaultLocale, locales } from '@/shared/lib/i18n'
import { createCategoryApiSchema } from './schema'

export async function GET(request: NextRequest) {
  if (!verifyApiSecret(request)) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const categories = await getCategoriesForAdmin()

  return Response.json(categories)
}

export async function POST(request: NextRequest) {
  if (!verifyApiSecret(request)) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const parsed = createCategoryApiSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: 'invalid', issues: parsed.error.issues }, { status: 400 })

  if (await isCategorySlugTaken(parsed.data.slug)) return Response.json({ error: 'slugTaken' }, { status: 409 })

  const translations = Object.fromEntries(
    locales.filter((locale) => locale !== defaultLocale).map((locale) => [locale, parsed.data[locale]]),
  )

  const category = await createCategory({
    slug: parsed.data.slug,
    ru: parsed.data[defaultLocale],
    ...translations,
  } as CategoryAdminInput)

  return Response.json(category, { status: 201 })
}
