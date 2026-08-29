'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { deleteSubscription, getNextSubscriptionPeriodEnd, upsertSubscription } from '@/entities/subscription'
import { authOptions } from '@/shared/api/auth/auth-options'

const subscriptionPlanSchema = z.enum(['FREE', 'BASIC', 'PREMIUM'])

export const applySubscriptionPlan = async (value: unknown) => {
  const session = await getServerSession(authOptions)
  if (!session?.user.id) return { error: 'unauthorized' as const }

  const parsed = subscriptionPlanSchema.safeParse(value)
  if (!parsed.success) return { error: 'invalid' as const }

  if (parsed.data === 'FREE') {
    await deleteSubscription(session.user.id)
  } else {
    const currentPeriodStart = new Date()
    const currentPeriodEnd = getNextSubscriptionPeriodEnd(currentPeriodStart)

    await upsertSubscription(session.user.id, parsed.data, currentPeriodStart, currentPeriodEnd)
  }

  revalidatePath('/[locale]/account/subscription', 'page')

  return { success: true as const }
}
