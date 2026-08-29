import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { AccountSettingsPage } from '@/views/account'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/account/settings'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'account.settings' })

  return buildMetadata({ title: t('label'), locale, pathname: '/account/settings', noindex: true })
}

export default AccountSettingsPage
