import { getTranslations } from 'next-intl/server'
import type { LocalePageProps } from '@/shared/config/i18n/types'
import { Home } from '@/views/home'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.home.meta' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function Page() {
  return <Home />
}
