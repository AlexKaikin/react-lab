'use client'

import { lazy } from 'react'
import type { AuthModalProps } from '@/features/profile-button'
import { SubscriptionPlans } from '@/features/subscription-plans'
import type { Locale } from '@/shared/lib/i18n'
import { useModalStore } from '@/shared/ui/modal'

const AuthModal = lazy(async () => {
  const module = await import('@/features/profile-button')
  return { default: module.AuthModal }
})

export const PricingContent = ({ locale }: { locale: Locale }) => {
  const openModal = useModalStore((state) => state.openModal)

  const handleLoginRequired = (onAuthenticated: NonNullable<AuthModalProps['onAuthenticated']>) => {
    openModal({ component: AuthModal, props: { initialMode: 'login', onAuthenticated } })
  }

  return <SubscriptionPlans locale={locale} onLoginRequired={handleLoginRequired} />
}
