import { getTranslations } from 'next-intl/server'
import { Home } from '@/pages/home'

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
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
