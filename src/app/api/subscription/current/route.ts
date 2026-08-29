import { type CurrentSubscriptionResponse, getSubscription } from '@/entities/subscription'
import { getCurrentUser } from '@/shared/api/auth/get-current-user'

export const GET = async () => {
  const user = await getCurrentUser()

  if (!user) return new Response(null, { status: 401, headers: { 'Cache-Control': 'private, no-store' } })

  const subscription = await getSubscription(user.id)
  const response: CurrentSubscriptionResponse = {
    subscription: subscription
      ? {
          ...subscription,
          currentPeriodStart: subscription.currentPeriodStart.toISOString(),
          currentPeriodEnd: subscription.currentPeriodEnd.toISOString(),
        }
      : null,
  }

  return Response.json(response, { headers: { 'Cache-Control': 'private, no-store' } })
}
