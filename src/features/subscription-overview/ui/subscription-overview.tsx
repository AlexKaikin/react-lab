import { getTranslations } from 'next-intl/server'
import type { Subscription, SubscriptionStatus } from '@/entities/subscription'
import type { Locale } from '@/shared/lib/i18n'
import { LinkButton } from '@/shared/ui/button'

type SubscriptionOverviewProps = {
  locale: Locale
  subscription: Subscription | null
}

const STATUS_COLOR: Record<SubscriptionStatus, string> = {
  ACTIVE: 'bg-semantic-success/15 text-semantic-success',
  EXPIRED: 'bg-semantic-error/15 text-semantic-error',
  PAST_DUE: 'bg-semantic-warning/15 text-semantic-warning',
}

export const SubscriptionOverview = async ({ locale, subscription }: SubscriptionOverviewProps) => {
  const t = await getTranslations({ locale, namespace: 'subscription.account' })
  const plan = subscription?.plan ?? 'FREE'
  const status =
    subscription?.status === 'ACTIVE' && subscription.currentPeriodEnd <= new Date()
      ? 'EXPIRED'
      : (subscription?.status ?? 'ACTIVE')
  const planLabels = {
    FREE: t('plans.free'),
    BASIC: t('plans.basic'),
    PREMIUM: t('plans.premium'),
  }
  const statusLabels: Record<SubscriptionStatus, string> = {
    ACTIVE: t('statuses.active'),
    EXPIRED: t('statuses.expired'),
    PAST_DUE: t('statuses.pastDue'),
  }
  const periodEnd = subscription
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(subscription.currentPeriodEnd)
    : t('period.withoutExpiration')
  const renewal = subscription
    ? t(subscription.autoRenew ? 'renewal.automatic' : 'renewal.manual')
    : t('renewal.notRequired')

  return (
    <article className="paper flex flex-col gap-6 p-6">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="h4">{planLabels[plan]}</h2>
          <p className="text-secondary">{t(subscription ? 'description.paid' : 'description.free')}</p>
        </div>
        <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ${STATUS_COLOR[status]}`}>
          {statusLabels[status]}
        </span>
      </header>

      <dl className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-secondary">{t('period.label')}</dt>
          <dd className="text-right">{periodEnd}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-secondary">{t('renewal.label')}</dt>
          <dd className="text-right">{renewal}</dd>
        </div>
      </dl>

      <LinkButton href="/pricing" color="primary" className="w-full">
        {t('action')}
      </LinkButton>
    </article>
  )
}
