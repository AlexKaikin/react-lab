import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { BlogPage } from '@/views/blog'
//import { HomePage } from '@/views/home'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.home.meta' })

  return buildMetadata({ title: t('title'), description: t('description'), locale, pathname: '' })
}

export default BlogPage
