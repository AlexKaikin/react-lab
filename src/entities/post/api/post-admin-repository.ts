import { db } from '@/shared/api/db'

export type PostLocaleInput = {
  title: string
  content: string
  tags: string[]
  meta: { title: string; description: string; image: string | null }
}

export type PostAdminInput = {
  slug: string
  categoryId: string
  ru: PostLocaleInput
  en: PostLocaleInput | null
}

export const isSlugTaken = async (slug: string, excludeId?: string) => {
  const post = await db.post.findUnique({ where: { slug }, select: { id: true } })
  return !!post && post.id !== excludeId
}

export const getPostsTotalCount = () => db.post.count()

export const getPostsForAdmin = async () => {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, translations: { select: { locale: true } } },
  })

  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: { name: post.category.name },
    createdAt: post.createdAt,
    hasTranslation: post.translations.some((translation) => translation.locale === 'en'),
  }))
}

export const getPostForAdmin = async (slug: string) => {
  const post = await db.post.findUnique({
    where: { slug },
    include: { meta: true, translations: { include: { meta: true } } },
  })

  if (!post) return null

  const translation = post.translations.find((item) => item.locale === 'en')

  return {
    id: post.id,
    slug: post.slug,
    categoryId: post.categoryId,
    ru: {
      title: post.title,
      content: post.content,
      tags: post.tags,
      meta: { title: post.meta.title, description: post.meta.description, image: post.meta.image },
    },
    en: translation
      ? {
          title: translation.title,
          content: translation.content,
          tags: translation.tags,
          meta: {
            title: translation.meta.title,
            description: translation.meta.description,
            image: translation.meta.image,
          },
        }
      : null,
  }
}

export const createPost = (input: PostAdminInput) =>
  db.post.create({
    data: {
      slug: input.slug,
      title: input.ru.title,
      content: input.ru.content,
      tags: input.ru.tags,
      meta: { create: input.ru.meta },
      category: { connect: { id: input.categoryId } },
      ...(input.en
        ? {
            translations: {
              create: [
                {
                  locale: 'en',
                  title: input.en.title,
                  content: input.en.content,
                  tags: input.en.tags,
                  meta: { create: input.en.meta },
                },
              ],
            },
          }
        : {}),
    },
  })

export const updatePost = (id: string, input: PostAdminInput) =>
  db.$transaction(async (tx) => {
    const existing = await tx.post.findUniqueOrThrow({ where: { id }, include: { translations: true } })

    await tx.post.update({
      where: { id },
      data: {
        slug: input.slug,
        title: input.ru.title,
        content: input.ru.content,
        tags: input.ru.tags,
        category: { connect: { id: input.categoryId } },
        meta: { update: input.ru.meta },
      },
    })

    const existingTranslation = existing.translations.find((item) => item.locale === 'en')

    if (input.en && existingTranslation) {
      await tx.postTranslation.update({
        where: { id: existingTranslation.id },
        data: {
          title: input.en.title,
          content: input.en.content,
          tags: input.en.tags,
          meta: { update: input.en.meta },
        },
      })
    } else if (input.en) {
      await tx.postTranslation.create({
        data: {
          locale: 'en',
          title: input.en.title,
          content: input.en.content,
          tags: input.en.tags,
          meta: { create: input.en.meta },
          post: { connect: { id } },
        },
      })
    } else if (existingTranslation) {
      await tx.postTranslation.delete({ where: { id: existingTranslation.id } })
      await tx.meta.delete({ where: { id: existingTranslation.metaId } })
    }
  })

export const deletePost = (id: string) =>
  db.$transaction(async (tx) => {
    const post = await tx.post.findUniqueOrThrow({ where: { id }, include: { translations: true } })
    const metaIds = [post.metaId, ...post.translations.map((translation) => translation.metaId)]

    await tx.post.delete({ where: { id } })
    await tx.meta.deleteMany({ where: { id: { in: metaIds } } })
  })
