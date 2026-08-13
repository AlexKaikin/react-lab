'use server'

import { hashPassword, resetPassword as resetPasswordUser } from '@/entities/user'
import { resetPasswordSchema } from '../model/reset-password-schema'

export async function resetPassword(token: string, values: unknown) {
  const parsed = resetPasswordSchema.safeParse(values)
  if (!parsed.success) return { error: 'invalid' as const }

  const passwordHash = await hashPassword(parsed.data.password)
  const user = await resetPasswordUser(token, passwordHash)

  if (!user) return { error: 'tokenExpired' as const }

  return { success: true as const }
}
