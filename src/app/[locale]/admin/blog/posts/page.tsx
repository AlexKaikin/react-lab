import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { AdminPostsPage } from '@/views/admin-posts'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/admin/blog/posts'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.admin.posts' })

  return buildMetadata({ title: t('label'), locale, pathname: '/admin/blog/posts', noindex: true })
}

export default AdminPostsPage
