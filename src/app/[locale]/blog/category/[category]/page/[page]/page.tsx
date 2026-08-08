import { getTranslations } from 'next-intl/server'
import { getPostsCount, POSTS_PAGE_SIZE, type PostsFilter } from '@/entities/post'
import { getCategories, getCategory } from '@/entities/post-category'
import { buildMetadata } from '@/shared/lib/build-metadata'
import { locales } from '@/shared/lib/i18n'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { BlogPage } from '@/views/blog'

export async function generateStaticParams() {
  const categories = await getCategories()

  return Promise.all(
    locales.flatMap((locale) =>
      categories.map(async (category) => {
        const filter: PostsFilter = { categorySlug: category.slug }
        const count = await getPostsCount(filter)
        const totalPages = Math.ceil(count / POSTS_PAGE_SIZE)
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

        return pages.map((page) => ({ locale, category: category.slug, page: String(page) }))
      }),
    ),
  ).then((results) => results.flat())
}

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/blog/category/[category]/page/[page]'>) {
  const { locale, category, page } = await params
  const t = await getTranslations({ locale, namespace: 'shared.blog.meta' })
  const found = await getCategory(category)
  const pageNumber = Number(page)
  const title = found?.name ?? t('title')

  return buildMetadata({
    title: pageNumber > 1 ? `${title} / ${t('page', { page: pageNumber })}` : title,
    description: t('description'),
    locale,
  })
}

export default BlogPage
