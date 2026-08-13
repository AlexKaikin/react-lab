import { getTranslations } from 'next-intl/server'
import { isResetTokenValid } from '@/entities/user'
import { ResetPasswordForm } from '@/features/profile-button'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export const ResetPasswordPage = async ({ params }: LocalePageProps<'/[locale]/reset-password/[token]'>) => {
  const { locale, token } = await params
  const t = await getTranslations({ locale, namespace: 'shared.auth.resetPassword' })
  const isValid = await isResetTokenValid(token)

  return (
    <div className="container flex flex-1 items-center justify-center animate-fade-in">
      <div className="flex w-full max-w-100 flex-col gap-4 items-center">
        <h1>{t('label')}</h1>
        {isValid ? <ResetPasswordForm token={token} /> : <p className="text-sm text-secondary">{t('tokenExpired')}</p>}
      </div>
    </div>
  )
}
