import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { PrivacyPage } from '@/views/privacy'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/privacy'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.legal.privacy' })

  return buildMetadata({ title: t('label'), locale, pathname: '/privacy' })
}

export default PrivacyPage
