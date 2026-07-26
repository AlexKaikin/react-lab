import { getTranslations } from 'next-intl/server'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
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
