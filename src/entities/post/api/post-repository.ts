import type { Prisma } from '@prisma/client'
import { db } from '@/shared/api/db'
import { POSTS_PAGE_SIZE } from '../model/constants'

export type PostsFilter = { categorySlug: string } | { tag: string }

const toWhere = (filter?: PostsFilter): Prisma.PostWhereInput => {
  if (!filter) return {}
  if ('categorySlug' in filter) return { category: { slug: filter.categorySlug } }

  return { tags: { has: filter.tag } }
}

export const getPosts = () =>
  db.post.findMany({ orderBy: { createdAt: 'desc' }, include: { meta: true, category: true } })

export const getPostsPage = (page: number, filter?: PostsFilter) =>
  db.post.findMany({
    where: toWhere(filter),
    orderBy: { createdAt: 'desc' },
    include: { meta: true, category: true },
    skip: (page - 1) * POSTS_PAGE_SIZE,
    take: POSTS_PAGE_SIZE,
  })

export const getPostsCount = (filter?: PostsFilter) => db.post.count({ where: toWhere(filter) })

export const getPost = (slug: string) =>
  db.post.findUnique({ where: { slug }, include: { meta: true, category: true } })

export const getTags = async () => {
  const posts = await db.post.findMany({ select: { tags: true } })

  return [...new Set(posts.flatMap((post) => post.tags))]
}
