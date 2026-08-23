import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPost, type Post, PostDetails } from '@/entities/post'
import { ProtectedPostContent } from '@/features/post-access'
import { buildArticleJsonLd } from '@/shared/lib/build-article-json-ld'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { Breadcrumbs } from '@/widgets/breadcrumbs'

export const PostPage = async ({ params }: LocalePageProps<'/[locale]/blog/[slug]'>) => {
  const { locale, slug } = await params
  const [t, post] = await Promise.all([getTranslations({ locale }), getPost(slug, locale)])

  if (!post) notFound()

  const { content, ...postDetails } = post
  const accessLevelLabels: Record<Post['accessLevel'], string> = {
    FREE: t('shared.subscription.plans.free'),
    BASIC: t('shared.subscription.plans.basic'),
    PREMIUM: t('shared.subscription.plans.premium'),
  }

  const breadcrumbs = [
    { label: t('shared.menu.home'), href: '/' },
    { label: t('shared.menu.blog'), href: '/blog' },
    { label: post.category.name, href: `/blog/category/${post.category.slug}` },
    { label: post.title },
  ]

  const jsonLd = buildArticleJsonLd({
    meta: post.meta,
    headline: post.title,
    category: post.category.name,
    tags: post.tags,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
  })

  return (
    <div className="container flex flex-col gap-4 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Breadcrumbs items={breadcrumbs} label={t('shared.breadcrumbs.label')} locale={locale} />
      <PostDetails
        post={postDetails}
        content={post.accessLevel === 'FREE' ? content : undefined}
        contentFallback={
          post.accessLevel !== 'FREE' && (
            <ProtectedPostContent
              slug={post.slug}
              locale={locale}
              paywallTitle={t('shared.subscription.paywall.title', { plan: accessLevelLabels[post.accessLevel] })}
              paywallDescription={post.meta.description}
              paywallActionLabel={t('shared.subscription.paywall.action')}
            />
          )
        }
      />
    </div>
  )
}
