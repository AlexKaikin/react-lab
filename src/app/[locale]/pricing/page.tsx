import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { PricingPage } from '@/views/pricing'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/pricing'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'subscription.pricing' })

  return buildMetadata({ title: t('title'), locale, pathname: '/pricing' })
}

export default PricingPage
