import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { AdminDashboardPage } from '@/views/admin-dashboard'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/admin'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.admin.dashboard' })

  return buildMetadata({ title: t('label'), locale, pathname: '/admin', noindex: true })
}

export default AdminDashboardPage
