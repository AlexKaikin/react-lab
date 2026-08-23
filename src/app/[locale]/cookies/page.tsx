import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { CookiesPage } from '@/views/cookies'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/cookies'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.legal.cookies' })

  return buildMetadata({ title: t('label'), locale, pathname: '/cookies' })
}

export default CookiesPage
