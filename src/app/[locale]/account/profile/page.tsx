import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { AccountProfilePage } from '@/views/account'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/account/profile'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'account.profile' })

  return buildMetadata({ title: t('label'), locale, pathname: '/account/profile', noindex: true })
}

export default AccountProfilePage
