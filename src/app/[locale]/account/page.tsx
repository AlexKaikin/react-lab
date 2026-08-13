import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { AccountPage } from '@/views/account'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/account'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.account.profile' })

  return buildMetadata({ title: t('label'), locale, pathname: '/account', noindex: true })
}

export default AccountPage
