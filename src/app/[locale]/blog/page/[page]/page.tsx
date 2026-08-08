import { getTranslations } from 'next-intl/server'
import { getPostsCount, POSTS_PAGE_SIZE } from '@/entities/post'
import { buildMetadata } from '@/shared/lib/build-metadata'
import { locales } from '@/shared/lib/i18n'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { BlogPage } from '@/views/blog'

export async function generateStaticParams() {
  return Promise.all(
    locales.map(async (locale) => {
      const count = await getPostsCount(locale)
      const totalPages = Math.ceil(count / POSTS_PAGE_SIZE)
      const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

      return pages.map((page) => ({ locale, page: String(page) }))
    }),
  ).then((results) => results.flat())
}

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/blog/page/[page]'>) {
  const { locale, page } = await params
  const t = await getTranslations({ locale, namespace: 'shared.blog.meta' })
  const pageNumber = Number(page)
  const title = pageNumber > 1 ? `${t('title')} / ${t('page', { page: pageNumber })}` : t('title')

  return buildMetadata({ title, description: t('description'), locale, pathname: `/blog/page/${page}` })
}

export default BlogPage
