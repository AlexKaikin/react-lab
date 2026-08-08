import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { BlogPage } from '@/views/blog'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/blog'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.blog.meta' })

  return buildMetadata({ title: t('title'), description: t('description'), locale })
}

export default BlogPage
