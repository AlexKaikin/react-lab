import type { SubscriptionPlan } from '@/entities/subscription/model'

export type PricingPlan = 'FREE' | SubscriptionPlan

export type PricingPlanConfig = {
  id: PricingPlan
  monthlyPrice: number
  isFeatured?: boolean
}

export const PRICING_PLANS = [
  { id: 'FREE', monthlyPrice: 0, isFeatured: false },
  { id: 'BASIC', monthlyPrice: 299, isFeatured: false },
  { id: 'PREMIUM', monthlyPrice: 699, isFeatured: true },
] as const satisfies readonly PricingPlanConfig[]
