import type { BreadcrumbItem } from '@/widgets/breadcrumbs'
import type { BlogParams } from '../model/types'

type BuildBreadcrumbsParams = {
  params: BlogParams
  homeLabel: string
  blogLabel: string
  title: string
  pageLabel?: string
}

export const buildBreadcrumbs = ({ params, homeLabel, blogLabel, title, pageLabel }: BuildBreadcrumbsParams) => {
  const items: BreadcrumbItem[] = [
    { label: homeLabel, href: '/' },
    { label: blogLabel, href: '/blog' },
  ]

  if ('category' in params) {
    items.push({ label: title, href: `/blog/category/${params.category}` })
  } else if ('tag' in params) {
    items.push({ label: title, href: `/blog/tag/${params.tag}` })
  }

  if (pageLabel) {
    items.push({ label: pageLabel })
  }

  return items
}
