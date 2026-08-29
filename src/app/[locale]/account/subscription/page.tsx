import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { AccountSubscriptionPage } from '@/views/account'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/account/subscription'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'subscription.account' })

  return buildMetadata({ title: t('title'), locale, pathname: '/account/subscription', noindex: true })
}

export default AccountSubscriptionPage
