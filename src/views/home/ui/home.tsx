import { getTranslations } from 'next-intl/server'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { Hero } from './hero'

export const HomePage = async ({ params }: LocalePageProps<'/[locale]'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <div className="-mt-16 flex flex-1 flex-col gap-8">
      <Hero title={t('shared.home.title')} tagline={t('shared.home.tagline')} ctaLabel={t('shared.home.ctaLabel')} />
    </div>
  )
}
