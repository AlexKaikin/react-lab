export type SubscriptionPlan = 'BASIC' | 'PREMIUM'

export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'PAST_DUE'

export type Subscription = {
  plan: SubscriptionPlan
  status: SubscriptionStatus
  currentPeriodStart: Date
  currentPeriodEnd: Date
  autoRenew: boolean
}

export type SubscriptionDto = Omit<Subscription, 'currentPeriodStart' | 'currentPeriodEnd'> & {
  currentPeriodStart: string
  currentPeriodEnd: string
}

export type CurrentSubscriptionResponse = {
  subscription: SubscriptionDto | null
}
