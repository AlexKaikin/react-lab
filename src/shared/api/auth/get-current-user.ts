import { getServerSession } from 'next-auth'
import { getUser } from '@/entities/user'
import { authOptions } from './auth-options'

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user.id) return null

  return getUser(session.user.id)
}
