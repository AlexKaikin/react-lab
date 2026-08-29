'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSubscriptionRefreshStore } from './subscription-refresh-store'
import type { CurrentSubscriptionResponse, SubscriptionDto, SubscriptionPlan, SubscriptionStatus } from './types'

type SubscriptionState = {
  userId: string | null
  subscription: SubscriptionDto | null
  isError: boolean
  version: number
}

const isSubscriptionPlan = (value: unknown): value is SubscriptionPlan => value === 'BASIC' || value === 'PREMIUM'

const isSubscriptionStatus = (value: unknown): value is SubscriptionStatus =>
  value === 'ACTIVE' || value === 'EXPIRED' || value === 'PAST_DUE'

const isDateString = (value: unknown): value is string => typeof value === 'string' && !Number.isNaN(Date.parse(value))

const isSubscriptionDto = (value: unknown): value is SubscriptionDto =>
  typeof value === 'object' &&
  value !== null &&
  'plan' in value &&
  isSubscriptionPlan(value.plan) &&
  'status' in value &&
  isSubscriptionStatus(value.status) &&
  'currentPeriodStart' in value &&
  isDateString(value.currentPeriodStart) &&
  'currentPeriodEnd' in value &&
  isDateString(value.currentPeriodEnd) &&
  'autoRenew' in value &&
  typeof value.autoRenew === 'boolean'

const isCurrentSubscriptionResponse = (value: unknown): value is CurrentSubscriptionResponse =>
  typeof value === 'object' &&
  value !== null &&
  'subscription' in value &&
  (value.subscription === null || isSubscriptionDto(value.subscription))

const getActivePlan = (subscription: SubscriptionDto | null): SubscriptionPlan | null => {
  if (!subscription || subscription.status !== 'ACTIVE' || Date.parse(subscription.currentPeriodEnd) <= Date.now()) {
    return null
  }

  return subscription.plan
}

export const useCurrentSubscription = () => {
  const { data: session, status } = useSession()
  const userId = session?.user.id ?? null
  const version = useSubscriptionRefreshStore((state) => state.version)
  const refresh = useSubscriptionRefreshStore((state) => state.refresh)
  const [state, setState] = useState<SubscriptionState>({
    userId: null,
    subscription: null,
    isError: false,
    version: 0,
  })

  useEffect(() => {
    if (status !== 'authenticated' || !userId) {
      setState({ userId: null, subscription: null, isError: false, version })
      return
    }

    const abortController = new AbortController()

    const getCurrentSubscription = async () => {
      try {
        const response = await fetch('/api/subscription/current', {
          cache: 'no-store',
          signal: abortController.signal,
        })

        if (!response.ok) throw new Error('Failed to get current subscription')

        const data: unknown = await response.json()
        if (!isCurrentSubscriptionResponse(data)) throw new Error('Invalid current subscription response')

        setState({ userId, subscription: data.subscription, isError: false, version })
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') return

        setState({ userId, subscription: null, isError: true, version })
      }
    }

    void getCurrentSubscription()

    return () => abortController.abort()
  }, [status, userId, version])

  const isLoading =
    status === 'loading' || (status === 'authenticated' && (state.userId !== userId || state.version !== version))
  const isResolvedSubscription = status === 'authenticated' && state.userId === userId && state.version === version
  const subscription = isResolvedSubscription ? state.subscription : null

  return {
    subscription,
    plan: getActivePlan(subscription),
    isLoading,
    isError: isResolvedSubscription && state.isError,
    isAuthenticated: status === 'authenticated',
    refresh,
  }
}
