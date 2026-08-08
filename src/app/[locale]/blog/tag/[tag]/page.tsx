import { getTranslations } from 'next-intl/server'
import { getTags } from '@/entities/post'
import { buildMetadata } from '@/shared/lib/build-metadata'
import { locales } from '@/shared/lib/i18n'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { BlogPage } from '@/views/blog'

export async function generateStaticParams() {
  const tags = await getTags()

  return locales.flatMap((locale) => tags.map((tag) => ({ locale, tag })))
}

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/blog/tag/[tag]'>) {
  const { locale, tag } = await params
  const t = await getTranslations({ locale, namespace: 'shared.blog.meta' })

  return buildMetadata({ title: tag, description: t('description'), locale })
}

export default BlogPage
