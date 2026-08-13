'use server'

import { getServerSession } from 'next-auth'
import { getUserByEmail, hashPassword, updatePassword, verifyPassword } from '@/entities/user'
import { authOptions } from '@/shared/api/auth/auth-options'
import { changePasswordSchema } from '../model/change-password-schema'

export async function changePassword(values: unknown) {
  const session = await getServerSession(authOptions)
  if (!session?.user.id || !session.user.email) return { error: 'unauthorized' as const }

  const parsed = changePasswordSchema.safeParse(values)
  if (!parsed.success) return { error: 'invalid' as const }

  const { currentPassword, newPassword } = parsed.data

  const currentUser = await getUserByEmail(session.user.email)
  if (!currentUser) return { error: 'unauthorized' as const }

  const isPasswordValid = await verifyPassword(currentPassword, currentUser.password)
  if (!isPasswordValid) return { error: 'invalidPassword' as const }

  const passwordHash = await hashPassword(newPassword)
  await updatePassword(session.user.id, passwordHash)

  return { success: true as const }
}
