import type { POST_ACCESS_LEVEL } from '@prisma/client'
import type { SubscriptionPlan } from '../model/types'

export const canAccessPost = (accessLevel: POST_ACCESS_LEVEL, plan: SubscriptionPlan | null) => {
  if (accessLevel === 'FREE') return true
  if (accessLevel === 'BASIC') return plan === 'BASIC' || plan === 'PREMIUM'

  return plan === 'PREMIUM'
}
