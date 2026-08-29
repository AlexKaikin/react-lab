import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPostsCount, getPostsPage, POSTS_PAGE_SIZE, type Post, PostCard } from '@/entities/post'
import { Pagination } from '@/shared/ui/pagination'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { buildBreadcrumbs } from '../lib/build-breadcrumbs'
import { getBlogView } from '../lib/get-blog-view'
import type { BlogPageProps } from '../model/types'

export const BlogPage = async (props: BlogPageProps) => {
  const params = await props.params
  const { locale } = params
  const page = 'page' in params ? Number(params.page) : 1

  const t = await getTranslations({ locale })

  const { filter, basePath, title = t('shared.blog.title') } = await getBlogView(params)

  const count = await getPostsCount(locale, filter)
  const totalPages = Math.ceil(count / POSTS_PAGE_SIZE)

  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound()

  const posts = await getPostsPage(page, locale, filter)
  const accessLevelLabels: Record<Post['accessLevel'], string> = {
    FREE: t('subscription.plans.free'),
    BASIC: t('subscription.badges.basic'),
    PREMIUM: t('subscription.badges.premium'),
  }

  const breadcrumbs = buildBreadcrumbs({
    params,
    homeLabel: t('shared.menu.home'),
    blogLabel: t('shared.menu.blog'),
    title,
    pageLabel: page > 1 ? t('shared.blog.meta.page', { page }) : undefined,
  })

  return (
    <div className="container flex flex-col gap-4 animate-fade-in">
      <Breadcrumbs items={breadcrumbs} label={t('shared.breadcrumbs.label')} locale={locale} />
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="grid grid-cols-1 gap-4 t:grid-cols-2 d:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} accessLevelLabel={accessLevelLabels[post.accessLevel]} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={basePath}
        label={t('shared.pagination.label')}
        prevLabel={t('shared.pagination.prev')}
        nextLabel={t('shared.pagination.next')}
      />
    </div>
  )
}
