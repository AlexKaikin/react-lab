import { getTranslations } from 'next-intl/server'
import { getPost, getPosts } from '@/entities/post'
import { buildMetadata } from '@/shared/lib/build-metadata'
import { locales } from '@/shared/lib/i18n'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { PostPage } from '@/views/post'

export async function generateStaticParams() {
  const posts = await getPosts()

  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })))
}

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/blog/[slug]'>) {
  const { locale, slug } = await params
  const post = await getPost(slug)

  if (!post) {
    const t = await getTranslations({ locale, namespace: 'shared.notFound' })

    return buildMetadata({ title: t('title'), description: t('description'), locale })
  }

  return buildMetadata({ meta: post.meta, locale })
}

export default PostPage
