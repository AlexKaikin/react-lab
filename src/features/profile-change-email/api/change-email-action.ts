'use server'

import { getServerSession } from 'next-auth'
import { getUserByEmail, updateEmail, verifyPassword } from '@/entities/user'
import { authOptions } from '@/shared/api/auth/auth-options'
import { changeEmailSchema } from '../model/change-email-schema'

export async function changeEmail(values: unknown) {
  const session = await getServerSession(authOptions)
  if (!session?.user.id || !session.user.email) return { error: 'unauthorized' as const }

  const parsed = changeEmailSchema.safeParse(values)
  if (!parsed.success) return { error: 'invalid' as const }

  const { email, currentPassword } = parsed.data

  const currentUser = await getUserByEmail(session.user.email)
  if (!currentUser) return { error: 'unauthorized' as const }

  const isPasswordValid = await verifyPassword(currentPassword, currentUser.password)
  if (!isPasswordValid) return { error: 'invalidPassword' as const }

  const existing = await getUserByEmail(email)
  if (existing) return { error: 'emailTaken' as const }

  await updateEmail(session.user.id, email)

  return { success: true as const }
}
