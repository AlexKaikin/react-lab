import { getTranslations } from 'next-intl/server'
import { getPostsCount, getTags, POSTS_PAGE_SIZE, type PostsFilter } from '@/entities/post'
import { buildMetadata } from '@/shared/lib/build-metadata'
import { locales } from '@/shared/lib/i18n'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { BlogPage } from '@/views/blog'

export async function generateStaticParams() {
  const tags = await getTags()

  return Promise.all(
    locales.flatMap((locale) =>
      tags.map(async (tag) => {
        const filter: PostsFilter = { tag }
        const count = await getPostsCount(filter)
        const totalPages = Math.ceil(count / POSTS_PAGE_SIZE)
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

        return pages.map((page) => ({ locale, tag, page: String(page) }))
      }),
    ),
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
  })
}

export default BlogPage
