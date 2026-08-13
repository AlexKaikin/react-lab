'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { deletePost } from '@/entities/post'
import { authOptions } from '@/shared/api/auth/auth-options'

export async function deletePostAction(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user.roles.includes('ADMIN')) return { error: 'unauthorized' as const }

  await deletePost(id)

  revalidatePath('/admin/blog/posts')
  revalidatePath('/blog')

  return { success: true as const }
}
