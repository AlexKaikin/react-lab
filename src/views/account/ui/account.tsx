import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ChangeEmailForm } from '@/features/profile-change-email'
import { ChangePasswordForm } from '@/features/profile-change-password'
import { ProfileEditForm } from '@/features/profile-edit'
import { getCurrentUser } from '@/shared/api/auth/get-current-user'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export const AccountPage = async ({ params }: LocalePageProps<'/[locale]/account'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.account' })
  const user = await getCurrentUser()

  if (!user) redirect(`/${locale}`)

  return (
    <div className="container flex flex-col gap-8 animate-fade-in">
      <section className="mx-auto flex w-full max-w-100 flex-col gap-4">
        <h1>{t('profile.label')}</h1>
        <ProfileEditForm user={user} />
      </section>
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
