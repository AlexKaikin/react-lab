'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useCurrentSubscription } from '@/entities/subscription/model'
import type { Locale } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useToastStore } from '@/shared/ui/toast'
import { applySubscriptionPlan } from '../api/apply-subscription-plan-action'
import { PRICING_PLANS, type PricingPlan } from '../config/pricing-plans'

type SubscriptionPlansProps = {
  locale: Locale
  onLoginRequired: (onAuthenticated: () => void) => void
}

export const SubscriptionPlans = ({ locale, onLoginRequired }: SubscriptionPlansProps) => {
  const t = useTranslations('subscription')
  const addToast = useToastStore((state) => state.addToast)
  const { plan: paidPlan, isLoading, isError, isAuthenticated, refresh } = useCurrentSubscription()
  const [pendingPlan, setPendingPlan] = useState<PricingPlan | null>(null)
  const currentPlan: PricingPlan | undefined = isError ? undefined : (paidPlan ?? 'FREE')
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  })
  const planContent: Record<PricingPlan, { name: string; description: string; features: string[] }> = {
    FREE: {
      name: t('plans.free'),
      description: t('pricing.plans.free.description'),
      features: [
        t('pricing.plans.free.features.publicArticles'),
        t('pricing.plans.free.features.search'),
        t('pricing.plans.free.features.account'),
      ],
    },
    BASIC: {
      name: t('plans.basic'),
      description: t('pricing.plans.basic.description'),
      features: [
        t('pricing.plans.basic.features.free'),
        t('pricing.plans.basic.features.subscriberArticles'),
        t('pricing.plans.basic.features.newMaterials'),
      ],
    },
    PREMIUM: {
      name: t('plans.premium'),
      description: t('pricing.plans.premium.description'),
      features: [
        t('pricing.plans.premium.features.basic'),
        t('pricing.plans.premium.features.exclusiveArticles'),
        t('pricing.plans.premium.features.allMaterials'),
      ],
    },
  }
  const applyPlan = async (plan: PricingPlan) => {
    setPendingPlan(plan)

    try {
      const result = await applySubscriptionPlan(plan)

      if (result.error) {
        addToast({ variant: 'error', message: t('pricing.feedback.error') })
        return
      }

      refresh()
      addToast({ variant: 'success', message: t('pricing.feedback.updated', { plan: planContent[plan].name }) })
    } catch {
      addToast({ variant: 'error', message: t('pricing.feedback.error') })
    } finally {
      setPendingPlan(null)
    }
  }
  const handleSelectPlan = (plan: PricingPlan) => {
    if (!isAuthenticated) {
      onLoginRequired(() => void applyPlan(plan))
      return
    }

    void applyPlan(plan)
  }

  return (
    <ul className="grid w-full grid-cols-1 gap-4 t:grid-cols-3">
      {PRICING_PLANS.map((plan) => {
        const content = planContent[plan.id]
        const isCurrent = currentPlan === plan.id

        return (
          <li key={plan.id} className="paper relative flex overflow-hidden">
            {plan.isFeatured && (
              <>
                <span className="absolute inset-x-0 top-0 h-1 bg-semantic-info" aria-hidden="true" />
                <span className="absolute top-0 right-0 rounded-bl-md bg-semantic-info/15 px-2 py-1 text-xs font-medium text-semantic-info">
                  {t('pricing.featured')}
                </span>
              </>
            )}

            <article className="flex w-full flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl">{content.name}</h2>
                <p className="text-secondary">{content.description}</p>
              </div>

              <p className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{currencyFormatter.format(plan.monthlyPrice)}</span>
                <span className="text-sm text-secondary">{t('pricing.perMonth')}</span>
              </p>

              <ul className="flex flex-1 flex-col gap-4">
                {content.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Icon name="Check" size={20} className="mt-1 shrink-0 text-semantic-success" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                disabled={isLoading || pendingPlan !== null || isCurrent}
                loading={pendingPlan === plan.id}
                color={plan.isFeatured ? 'info' : 'primary'}
                className="w-full"
                aria-current={isCurrent ? 'true' : undefined}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-24 rounded-sm bg-skeleton animate-pulse" aria-hidden="true" />
                    <span className="sr-only">{t('pricing.actions.checking')}</span>
                  </>
                ) : isCurrent ? (
                  t('pricing.actions.current')
                ) : (
                  t('pricing.actions.select')
                )}
              </Button>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
