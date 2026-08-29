import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ProfileEditForm } from '@/features/profile-edit'
import { getCurrentUser } from '@/shared/api/auth/get-current-user'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export const AccountProfilePage = async ({ params }: LocalePageProps<'/[locale]/account/profile'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'account.profile' })
  const user = await getCurrentUser()

  if (!user) redirect(`/${locale}`)

  return (
    <div className="container animate-fade-in">
      <section className="mx-auto flex w-full max-w-100 flex-col gap-4">
        <h1>{t('label')}</h1>
        <ProfileEditForm user={user} />
      </section>
    </div>
  )
}
