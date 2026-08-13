import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { ActivatePage } from '@/views/activate'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/activate/[token]'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.auth.activate' })

  return buildMetadata({ title: t('label'), locale, pathname: '/activate', noindex: true })
}

export default ActivatePage
