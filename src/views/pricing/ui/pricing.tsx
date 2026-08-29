import { getTranslations } from 'next-intl/server'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { PricingContent } from './pricing-content'

export const PricingPage = async ({ params }: LocalePageProps<'/[locale]/pricing'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'subscription.pricing' })

  return (
    <div className="container flex flex-col items-center gap-8 py-8 animate-fade-in">
      <header className="flex max-w-2xl flex-col items-center gap-2 text-center">
        <h1>{t('title')}</h1>
        <p className="text-secondary">{t('description')}</p>
      </header>

      <PricingContent locale={locale} />
    </div>
  )
}
