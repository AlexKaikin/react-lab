import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { AdminCategoriesPage } from '@/views/admin-categories'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/admin/blog/categories'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.admin.categories' })

  return buildMetadata({ title: t('label'), locale, pathname: '/admin/blog/categories', noindex: true })
}

export default AdminCategoriesPage
