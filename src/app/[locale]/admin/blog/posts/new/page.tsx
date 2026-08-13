import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { AdminPostFormPage } from '@/views/admin-post-form'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/admin/blog/posts/new'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.admin.posts' })

  return buildMetadata({ title: t('createLabel'), locale, pathname: '/admin/blog/posts/new', noindex: true })
}

export default AdminPostFormPage
