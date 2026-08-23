type PostCategory = {
  id: string
  slug: string
  name: string
}

type PostMeta = {
  id: string
  title: string
  description: string
  image: string | null
}

export type Post = {
  id: string
  slug: string
  title: string
  content?: string
  accessLevel: POST_ACCESS_LEVEL
  createdAt: Date
  updatedAt: Date
  tags: string[]
  category: PostCategory
  meta: PostMeta
}

import type { POST_ACCESS_LEVEL } from '@prisma/client'
