import { getActiveSubscriptionPlan } from '@/entities/subscription'
import { getCurrentUser } from '@/shared/api/auth/get-current-user'

export const GET = async () => {
  const user = await getCurrentUser()

  if (!user) return new Response(null, { status: 401 })

  const plan = await getActiveSubscriptionPlan(user.id)

  return Response.json({ plan })
}
