'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { updateProfile } from '@/entities/user'
import { authOptions } from '@/shared/api/auth/auth-options'
import { profileEditSchema } from '../model/profile-edit-schema'

export async function editProfile(values: unknown) {
  const session = await getServerSession(authOptions)
  if (!session?.user.id) return { error: 'unauthorized' as const }

  const parsed = profileEditSchema.safeParse(values)
  if (!parsed.success) return { error: 'invalid' as const }

  const { firstName, lastName, about, location, birthDate, avatarUrl } = parsed.data

  await updateProfile(session.user.id, {
    firstName,
    lastName,
    about,
    location,
    birthDate: birthDate ? new Date(birthDate) : null,
    avatarUrl: avatarUrl || null,
  })

  revalidatePath('/account')

  return { success: true as const }
}
