import { getTranslations } from 'next-intl/server'
import { ChangeEmailForm } from '@/features/profile-change-email'
import { ChangePasswordForm } from '@/features/profile-change-password'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export const AccountSettingsPage = async ({ params }: LocalePageProps<'/[locale]/account/settings'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'account' })

  return (
    <div className="container flex flex-col gap-8 animate-fade-in">
      <h1 className="mx-auto w-full max-w-100">{t('settings.label')}</h1>
      <section className="mx-auto flex w-full max-w-100 flex-col gap-4">
        <h2>{t('changeEmail.label')}</h2>
        <ChangeEmailForm />
      </section>
      <section className="mx-auto flex w-full max-w-100 flex-col gap-4">
        <h2>{t('changePassword.label')}</h2>
        <ChangePasswordForm />
      </section>
    </div>
  )
}
