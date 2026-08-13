import { getTranslations } from 'next-intl/server'
import { getPostsForAdmin } from '@/entities/post'
import { PostList } from '@/features/post-editor'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { LinkButton } from '@/shared/ui/button'

export const AdminPostsPage = async ({ params }: LocalePageProps<'/[locale]/admin/blog/posts'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.admin.posts' })
  const posts = await getPostsForAdmin()

  return (
    <div className="container flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <h1>{t('label')}</h1>
        <LinkButton href="/admin/blog/posts/new" variant="contained" color="primary">
          {t('create')}
        </LinkButton>
      </div>
      <PostList posts={posts} />
    </div>
  )
}
