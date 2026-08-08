import { getTranslations } from 'next-intl/server'
import { getPostsCount, getTags, POSTS_PAGE_SIZE, type PostsFilter } from '@/entities/post'
import { buildMetadata } from '@/shared/lib/build-metadata'
import { locales } from '@/shared/lib/i18n'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { BlogPage } from '@/views/blog'

export async function generateStaticParams() {
  return Promise.all(
    locales.map(async (locale) => {
      const tags = await getTags(locale)

      return Promise.all(
        tags.map(async (tag) => {
          const filter: PostsFilter = { tag }
          const count = await getPostsCount(locale, filter)
          const totalPages = Math.ceil(count / POSTS_PAGE_SIZE)
          const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

          return pages.map((page) => ({ locale, tag, page: String(page) }))
        }),
      ).then((results) => results.flat())
    }),
  ).then((results) => results.flat())
}

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/blog/tag/[tag]/page/[page]'>) {
  const { locale, tag, page } = await params
  const t = await getTranslations({ locale, namespace: 'shared.blog.meta' })
  const pageNumber = Number(page)

  return buildMetadata({
    title: pageNumber > 1 ? `${tag} / ${t('page', { page: pageNumber })}` : tag,
    description: t('description'),
    locale,
    pathname: `/blog/tag/${tag}/page/${page}`,
    noindex: true,
  })
}

export default BlogPage
