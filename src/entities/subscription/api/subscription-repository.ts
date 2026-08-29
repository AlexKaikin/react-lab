import { db } from '@/shared/api/db'
import type { Subscription, SubscriptionPlan } from '../model/types'

export const getSubscription = async (userId: string): Promise<Subscription | null> =>
  db.subscription.findUnique({
    where: { userId },
    select: {
      plan: true,
      status: true,
      currentPeriodStart: true,
      currentPeriodEnd: true,
      autoRenew: true,
    },
  })

export const getActiveSubscriptionPlan = async (userId: string): Promise<SubscriptionPlan | null> => {
  const subscription = await getSubscription(userId)

  if (!subscription || subscription.status !== 'ACTIVE' || subscription.currentPeriodEnd <= new Date()) return null

  return subscription.plan
}

export const upsertSubscription = async (
  userId: string,
  plan: SubscriptionPlan,
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
) =>
  db.subscription.upsert({
    where: { userId },
    create: {
      userId,
      plan,
      status: 'ACTIVE',
      currentPeriodStart,
      currentPeriodEnd,
      autoRenew: false,
    },
    update: {
      plan,
      status: 'ACTIVE',
      currentPeriodStart,
      currentPeriodEnd,
      autoRenew: false,
      provider: null,
      providerSubscriptionId: null,
    },
  })

export const deleteSubscription = async (userId: string) => db.subscription.deleteMany({ where: { userId } })
