'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { isSlugTaken, updatePost } from '@/entities/post'
import { getCategoryLocales } from '@/entities/post-category'
import { authOptions } from '@/shared/api/auth/auth-options'
import { buildPostInput } from '../lib/build-post-input'
import { isCategoryLocalesValid } from '../lib/is-category-locales-valid'
import { postEditorSchema } from '../model/post-editor-schema'

export async function updatePostAction(id: string, values: unknown) {
  const session = await getServerSession(authOptions)
  if (!session?.user.roles.includes('ADMIN')) return { error: 'unauthorized' as const }

  const parsed = postEditorSchema.safeParse(values)
  if (!parsed.success) return { error: 'invalid' as const }

  const categoryLocales = await getCategoryLocales(parsed.data.categoryId)
  if (!categoryLocales) return { error: 'invalid' as const }
  if (!isCategoryLocalesValid(parsed.data, categoryLocales)) return { error: 'invalid' as const }

  if (await isSlugTaken(parsed.data.slug, id)) return { error: 'slugTaken' as const }

  await updatePost(id, buildPostInput(parsed.data))

  revalidatePath('/admin/blog/posts')
  revalidatePath('/blog')

  return { success: true as const }
}
