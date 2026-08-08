import { getTranslations } from 'next-intl/server'
import { getPost, getPosts } from '@/entities/post'
import { buildMetadata } from '@/shared/lib/build-metadata'
import { locales } from '@/shared/lib/i18n'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { PostPage } from '@/views/post'

export async function generateStaticParams() {
  return Promise.all(
    locales.map(async (locale) => {
      const posts = await getPosts(locale)

      return posts.map((post) => ({ locale, slug: post.slug }))
    }),
  ).then((results) => results.flat())
}

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/blog/[slug]'>) {
  const { locale, slug } = await params
  const post = await getPost(slug, locale)

  if (!post) {
    const t = await getTranslations({ locale, namespace: 'shared.notFound' })

    return buildMetadata({ title: t('title'), description: t('description'), locale, pathname: `/blog/${slug}` })
  }

  return buildMetadata({ meta: post.meta, locale, pathname: `/blog/${slug}` })
}

export default PostPage
