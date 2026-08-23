import type { NextRequest } from 'next/server'
import { hasLocale } from 'next-intl'
import { getPost, getPostContent } from '@/entities/post'
import { canAccessPost, getActiveSubscriptionPlan } from '@/entities/subscription'
import { getCurrentUser } from '@/shared/api/auth/get-current-user'
import { locales } from '@/shared/lib/i18n'

export const GET = async (request: NextRequest, { params }: RouteContext<'/api/posts/[slug]/content'>) => {
  const user = await getCurrentUser()

  if (!user) return new Response(null, { status: 401 })

  const { slug } = await params
  const localeParam = request.nextUrl.searchParams.get('locale')

  if (!hasLocale(locales, localeParam)) return new Response(null, { status: 400 })

  const post = await getPost(slug, localeParam)

  if (!post) return new Response(null, { status: 404 })

  const subscriptionPlan = await getActiveSubscriptionPlan(user.id)

  if (!canAccessPost(post.accessLevel, subscriptionPlan)) return new Response(null, { status: 403 })

  const content = await getPostContent(slug, localeParam)

  if (!content) return new Response(null, { status: 404 })

  return Response.json({ content }, { headers: { 'Cache-Control': 'private, no-store' } })
}
