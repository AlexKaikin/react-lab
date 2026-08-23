import { db } from '@/shared/api/db'
import type { SubscriptionPlan } from '../model/types'

export const getActiveSubscriptionPlan = async (userId: string): Promise<SubscriptionPlan | null> => {
  const subscription = await db.subscription.findUnique({
    where: { userId },
    select: { plan: true, status: true, currentPeriodEnd: true },
  })

  if (!subscription || subscription.status !== 'ACTIVE' || subscription.currentPeriodEnd <= new Date()) return null

  return subscription.plan
}
