import { getTranslations } from 'next-intl/server'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export const PricingPage = async ({ params }: LocalePageProps<'/[locale]/pricing'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.subscription.pricing' })

  return (
    <div className="container flex flex-col items-center gap-4 py-12 text-center animate-fade-in">
      <h1>{t('title')}</h1>
      <p className="max-w-lg text-secondary">{t('description')}</p>
      <p className="paper mt-4 px-6 py-4 text-secondary">{t('comingSoon')}</p>
    </div>
  )
}
