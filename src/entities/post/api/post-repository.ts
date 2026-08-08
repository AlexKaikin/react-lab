import type { Prisma } from '@prisma/client'
import { db } from '@/shared/api/db'
import { defaultLocale, type Locale } from '@/shared/lib/i18n'
import { POSTS_PAGE_SIZE } from '../model/constants'

export type PostsFilter = { categorySlug: string } | { tag: string }

const postInclude = (locale: Locale) => ({
  meta: true,
  category: { include: { translations: { where: { locale } } } },
  translations: { where: { locale }, include: { meta: true } },
})

type RawPost = Prisma.PostGetPayload<{ include: ReturnType<typeof postInclude> }>

const resolvePost = (post: RawPost) => {
  const translation = post.translations[0]

  return {
    id: post.id,
    slug: post.slug,
    title: translation?.title ?? post.title,
    content: translation?.content ?? post.content,
    tags: translation?.tags ?? post.tags,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    meta: translation?.meta ?? post.meta,
    category: {
      id: post.category.id,
      slug: post.category.slug,
      name: post.category.translations[0]?.name ?? post.category.name,
    },
  }
}

const toWhere = (locale: Locale, filter?: PostsFilter): Prisma.PostWhereInput => {
  const localeWhere: Prisma.PostWhereInput = locale === defaultLocale ? {} : { translations: { some: { locale } } }

  if (!filter) return localeWhere
  if ('categorySlug' in filter) return { ...localeWhere, category: { slug: filter.categorySlug } }

  const tagWhere: Prisma.PostWhereInput =
    locale === defaultLocale
      ? { tags: { has: filter.tag } }
      : { translations: { some: { locale, tags: { has: filter.tag } } } }

  return { ...localeWhere, ...tagWhere }
}

export const getPosts = async (locale: Locale) => {
  const posts = await db.post.findMany({
    where: toWhere(locale),
    orderBy: { createdAt: 'desc' },
    include: postInclude(locale),
  })

  return posts.map(resolvePost)
}

export const getPostsPage = async (page: number, locale: Locale, filter?: PostsFilter) => {
  const posts = await db.post.findMany({
    where: toWhere(locale, filter),
    orderBy: { createdAt: 'desc' },
    include: postInclude(locale),
    skip: (page - 1) * POSTS_PAGE_SIZE,
    take: POSTS_PAGE_SIZE,
  })

  return posts.map(resolvePost)
}

export const getPostsCount = (locale: Locale, filter?: PostsFilter) => db.post.count({ where: toWhere(locale, filter) })

export const getPost = async (slug: string, locale: Locale) => {
  const post = await db.post.findUnique({ where: { slug }, include: postInclude(locale) })

  if (!post) return null
  if (locale !== defaultLocale && post.translations.length === 0) return null

  return resolvePost(post)
}

export const getTags = async (locale: Locale) => {
  if (locale === defaultLocale) {
    const posts = await db.post.findMany({ select: { tags: true } })

    return [...new Set(posts.flatMap((post) => post.tags))]
  }

  const translations = await db.postTranslation.findMany({ where: { locale }, select: { tags: true } })

  return [...new Set(translations.flatMap((translation) => translation.tags))]
}

const SEARCH_RESULTS_LIMIT = 5

const toSearchWhere = (locale: Locale, query: string): Prisma.PostWhereInput => {
  const condition = [
    { title: { contains: query, mode: 'insensitive' as const } },
    { content: { contains: query, mode: 'insensitive' as const } },
  ]

  return locale === defaultLocale ? { OR: condition } : { translations: { some: { locale, OR: condition } } }
}

export const searchPosts = async (query: string, locale: Locale) => {
  const posts = await db.post.findMany({
    where: toSearchWhere(locale, query),
    orderBy: { createdAt: 'desc' },
    include: postInclude(locale),
    take: SEARCH_RESULTS_LIMIT,
  })

  return posts.map(resolvePost)
}
