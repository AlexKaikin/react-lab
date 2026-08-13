import { getTranslations } from 'next-intl/server'
import { activateUser } from '@/entities/user'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export const ActivatePage = async ({ params }: LocalePageProps<'/[locale]/activate/[token]'>) => {
  const { locale, token } = await params
  const t = await getTranslations({ locale, namespace: 'shared.auth.activate' })
  const user = await activateUser(token)

  return (
    <div className="container flex flex-1 items-center justify-center animate-fade-in">
      <h1 className="text-center">{user ? t('success') : t('tokenExpired')}</h1>
    </div>
  )
}
