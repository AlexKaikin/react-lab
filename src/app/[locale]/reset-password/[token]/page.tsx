import { getTranslations } from 'next-intl/server'
import { buildMetadata } from '@/shared/lib/build-metadata'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { ResetPasswordPage } from '@/views/reset-password'

export async function generateMetadata({ params }: LocalePageProps<'/[locale]/reset-password/[token]'>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.auth.resetPassword' })

  return buildMetadata({ title: t('label'), locale, pathname: '/reset-password', noindex: true })
}

export default ResetPasswordPage
