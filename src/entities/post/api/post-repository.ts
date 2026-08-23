import type { Prisma } from '@prisma/client'
import { db } from '@/shared/api/db'
import { defaultLocale, type Locale } from '@/shared/lib/i18n'
import { POSTS_PAGE_SIZE } from '../model/constants'
import type { Post } from '../model/types'

export type PostsFilter = { categorySlug: string } | { tag: string }

const postInclude = (locale: Locale) => ({
  meta: true,
  category: { include: { translations: { where: { locale } } } },
  translations: { where: { locale }, include: { meta: true } },
})

type RawPost = Prisma.PostGetPayload<{ include: ReturnType<typeof postInclude> }>

const resolvePost = (post: RawPost): Post => {
  const translation = post.translations[0]
  const content = translation?.content ?? post.content

  return {
    id: post.id,
    slug: post.slug,
    title: translation?.title ?? post.title,
    ...(post.accessLevel === 'FREE' && { content }),
    accessLevel: post.accessLevel,
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

const getAvailablePost = async (slug: string, locale: Locale) => {
  const post = await db.post.findUnique({ where: { slug }, include: postInclude(locale) })

  if (!post || !post.isActive) return null
  if (locale !== defaultLocale && post.translations.length === 0) return null

  return post
}

const toWhere = (locale: Locale, filter?: PostsFilter): Prisma.PostWhereInput => {
  const activeWhere: Prisma.PostWhereInput = { isActive: true }
  const localeWhere: Prisma.PostWhereInput = locale === defaultLocale ? {} : { translations: { some: { locale } } }

  if (!filter) return { ...activeWhere, ...localeWhere }
  if ('categorySlug' in filter) return { ...activeWhere, ...localeWhere, category: { slug: filter.categorySlug } }

  const tagWhere: Prisma.PostWhereInput =
    locale === defaultLocale
      ? { tags: { has: filter.tag } }
      : { translations: { some: { locale, tags: { has: filter.tag } } } }

  return { ...activeWhere, ...localeWhere, ...tagWhere }
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
  const post = await getAvailablePost(slug, locale)

  if (!post) return null

  return resolvePost(post)
}

export const getPostContent = async (slug: string, locale: Locale) => {
  const post = await getAvailablePost(slug, locale)

  if (!post) return null

  return post.translations[0]?.content ?? post.content
}

const getTagLists = async (locale: Locale) => {
  if (locale === defaultLocale) {
    const posts = await db.post.findMany({ where: { isActive: true }, select: { tags: true } })
    return posts.map((post) => post.tags)
  }

  const translations = await db.postTranslation.findMany({
    where: { locale, post: { isActive: true } },
    select: { tags: true },
  })
  return translations.map((translation) => translation.tags)
}

export const getTags = async (locale: Locale) => [...new Set((await getTagLists(locale)).flat())]

export const getTopTags = async (locale: Locale, limit: number) => {
  const counts = new Map<string, number>()

  for (const tags of await getTagLists(locale)) {
    for (const tag of tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag)
}

const SEARCH_RESULTS_LIMIT = 5

const toSearchWhere = (locale: Locale, query: string): Prisma.PostWhereInput => {
  const condition = [
    { title: { contains: query, mode: 'insensitive' as const } },
    { content: { contains: query, mode: 'insensitive' as const } },
  ]

  const matchWhere: Prisma.PostWhereInput =
    locale === defaultLocale ? { OR: condition } : { translations: { some: { locale, OR: condition } } }

  return { isActive: true, ...matchWhere }
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
