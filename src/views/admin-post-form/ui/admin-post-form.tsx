import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPostForAdmin } from '@/entities/post'
import { getCategoriesWithLocales } from '@/entities/post-category'
import { PostForm } from '@/features/post-editor'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

type AdminPostFormPageProps =
  | LocalePageProps<'/[locale]/admin/blog/posts/[slug]/edit'>
  | LocalePageProps<'/[locale]/admin/blog/posts/new'>

export const AdminPostFormPage = async ({ params }: AdminPostFormPageProps) => {
  const resolvedParams = await params
  const { locale } = resolvedParams
  const slug = 'slug' in resolvedParams ? resolvedParams.slug : undefined

  const t = await getTranslations({ locale, namespace: 'shared.admin.posts' })
  const categories = await getCategoriesWithLocales()
  const initialPost = slug ? await getPostForAdmin(slug) : undefined

  if (slug && !initialPost) notFound()

  return (
    <div className="container flex flex-col gap-4 animate-fade-in">
      <h1>{t(slug ? 'editLabel' : 'createLabel')}</h1>
      <PostForm categories={categories} initialPost={initialPost ?? undefined} />
    </div>
  )
}
