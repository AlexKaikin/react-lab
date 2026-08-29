import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getSubscription } from '@/entities/subscription'
import { SubscriptionOverview } from '@/features/subscription-overview'
import { getCurrentUser } from '@/shared/api/auth/get-current-user'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export const AccountSubscriptionPage = async ({ params }: LocalePageProps<'/[locale]/account/subscription'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'subscription.account' })
  const user = await getCurrentUser()

  if (!user) redirect(`/${locale}`)

  const subscription = await getSubscription(user.id)

  return (
    <div className="container animate-fade-in">
      <section className="mx-auto flex w-full max-w-100 flex-col gap-4">
        <h1>{t('title')}</h1>
        <SubscriptionOverview locale={locale} subscription={subscription} />
      </section>
    </div>
  )
}
