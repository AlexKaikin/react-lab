import { db } from '@/shared/api/db'
import type { Locale } from '@/shared/lib/i18n'

type RawCategory = {
  id: string
  slug: string
  name: string
  translations: { name: string }[]
}

const resolveCategory = (category: RawCategory) => ({
  id: category.id,
  slug: category.slug,
  name: category.translations[0]?.name ?? category.name,
})

export const getCategories = async (locale: Locale) => {
  const categories = await db.postCategory.findMany({
    include: { translations: { where: { locale } } },
  })

  return categories.map(resolveCategory).sort((a, b) => a.name.localeCompare(b.name))
}

export const getCategory = async (slug: string, locale: Locale) => {
  const category = await db.postCategory.findUnique({
    where: { slug },
    include: { translations: { where: { locale } } },
  })

  return category ? resolveCategory(category) : null
}
