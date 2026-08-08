import type { PostCategory, Post as PrismaPost } from '@prisma/client'

export type Post = PrismaPost & { category: PostCategory }
