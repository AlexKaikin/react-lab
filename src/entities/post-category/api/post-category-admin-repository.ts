import { db } from '@/shared/api/db'

export type CategoryLocaleInput = {
  name: string
}

export type CategoryAdminInput = {
  slug: string
  ru: CategoryLocaleInput
  en: CategoryLocaleInput | null
}

export const isCategorySlugTaken = async (slug: string, excludeId?: string) => {
  const category = await db.postCategory.findUnique({ where: { slug }, select: { id: true } })
  return !!category && category.id !== excludeId
}

export const getCategoriesTotalCount = () => db.postCategory.count()

export const getCategoriesForAdmin = async () => {
  const categories = await db.postCategory.findMany({
    orderBy: { name: 'asc' },
    include: { translations: true, _count: { select: { posts: true } } },
  })

  return categories.map((category) => {
    const translation = category.translations.find((item) => item.locale === 'en')

    return {
      id: category.id,
      slug: category.slug,
      isActive: category.isActive,
      ru: { name: category.name },
      en: translation ? { name: translation.name } : null,
      postsCount: category._count.posts,
    }
  })
}

export const createCategory = (input: CategoryAdminInput) =>
  db.postCategory.create({
    data: {
      slug: input.slug,
      name: input.ru.name,
      ...(input.en ? { translations: { create: [{ locale: 'en', name: input.en.name }] } } : {}),
    },
  })

export const updateCategory = (id: string, input: CategoryAdminInput) =>
  db.$transaction(async (tx) => {
    const existing = await tx.postCategory.findUniqueOrThrow({ where: { id }, include: { translations: true } })

    await tx.postCategory.update({
      where: { id },
      data: { slug: input.slug, name: input.ru.name },
    })

    const existingTranslation = existing.translations.find((item) => item.locale === 'en')

    if (input.en && existingTranslation) {
      await tx.postCategoryTranslation.update({ where: { id: existingTranslation.id }, data: { name: input.en.name } })
    } else if (input.en) {
      await tx.postCategoryTranslation.create({
        data: { locale: 'en', name: input.en.name, category: { connect: { id } } },
      })
    } else if (existingTranslation) {
      await tx.postCategoryTranslation.delete({ where: { id: existingTranslation.id } })
    }
  })

export const deactivateCategory = async (slug: string) => {
  const category = await db.postCategory.findUnique({ where: { slug }, select: { id: true } })
  if (!category) return null

  return db.postCategory.update({ where: { id: category.id }, data: { isActive: false } })
}

export const deleteCategory = async (id: string) => {
  const postsCount = await db.post.count({ where: { categoryId: id } })
  if (postsCount > 0) return { error: 'hasPosts' as const, postsCount }

  await db.postCategory.delete({ where: { id } })
  return { success: true as const }
}
