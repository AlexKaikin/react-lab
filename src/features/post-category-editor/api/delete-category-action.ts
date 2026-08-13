'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { deleteCategory } from '@/entities/post-category'
import { authOptions } from '@/shared/api/auth/auth-options'

export async function deleteCategoryAction(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user.roles.includes('ADMIN')) return { error: 'unauthorized' as const }

  const result = await deleteCategory(id)
  if (result.error) return result

  revalidatePath('/admin/blog/categories')
  revalidatePath('/blog')

  return { success: true as const }
}
