import { getTranslations } from 'next-intl/server'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { LegalPage } from '@/views/legal-page'

type LegalSection = { heading: string; body: string }

export const PrivacyPage = async ({ params }: LocalePageProps<'/[locale]/privacy'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.legal.privacy' })
  const sections = t.raw('sections') as LegalSection[]

  return <LegalPage title={t('label')} updated={t('updated')} sections={sections} />
}
