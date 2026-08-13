'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { isCategorySlugTaken, updateCategory } from '@/entities/post-category'
import { authOptions } from '@/shared/api/auth/auth-options'
import { buildCategoryInput } from '../lib/build-category-input'
import { categoryEditorSchema } from '../model/category-editor-schema'

export async function updateCategoryAction(id: string, values: unknown) {
  const session = await getServerSession(authOptions)
  if (!session?.user.roles.includes('ADMIN')) return { error: 'unauthorized' as const }

  const parsed = categoryEditorSchema.safeParse(values)
  if (!parsed.success) return { error: 'invalid' as const }

  if (await isCategorySlugTaken(parsed.data.slug, id)) return { error: 'slugTaken' as const }

  await updateCategory(id, buildCategoryInput(parsed.data))

  revalidatePath('/admin/blog/categories')
  revalidatePath('/blog')

  return { success: true as const }
}
