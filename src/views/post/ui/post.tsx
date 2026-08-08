import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPost, PostDetails } from '@/entities/post'
import type { LocalePageProps } from '@/shared/lib/i18n/types'
import { Breadcrumbs } from '@/widgets/breadcrumbs'

export const PostPage = async ({ params }: LocalePageProps<'/[locale]/blog/[slug]'>) => {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const post = await getPost(slug)

  if (!post) notFound()

  const breadcrumbs = [
    { label: t('shared.menu.home'), href: '/' },
    { label: t('shared.menu.blog'), href: '/blog' },
    { label: post.category.name, href: `/blog/category/${post.category.slug}` },
  ]

  return (
    <div className="container flex flex-col gap-4 animate-fade-in">
      <Breadcrumbs items={breadcrumbs} label={t('shared.breadcrumbs.label')} />
      <PostDetails post={post} />
    </div>
  )
}
