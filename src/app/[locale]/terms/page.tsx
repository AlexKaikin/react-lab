import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { TermsPage } from '@/views/terms'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/terms'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.legal.terms' })

  return buildMetadata({ title: t('label'), locale, pathname: '/terms' })
}

export default TermsPage
