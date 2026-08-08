import { notFound } from 'next/navigation'
import type { PostsFilter } from '@/entities/post'
import { getCategory } from '@/entities/post-category'
import type { BlogParams } from '../model/types'

type BlogView = {
  filter: PostsFilter | undefined
  basePath: string
  title?: string
}

export const getBlogView = async (params: BlogParams): Promise<BlogView> => {
  if ('category' in params) {
    const category = await getCategory(params.category)
    if (!category) notFound()

    return {
      filter: { categorySlug: params.category },
      basePath: `/blog/category/${params.category}`,
      title: category.name,
    }
  }

  if ('tag' in params) {
    return { filter: { tag: params.tag }, basePath: `/blog/tag/${params.tag}`, title: params.tag }
  }

  return { filter: undefined, basePath: '/blog' }
}
