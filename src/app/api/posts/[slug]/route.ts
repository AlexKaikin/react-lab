import type { NextRequest } from 'next/server'
import { getPostForAdmin } from '@/entities/post'
import { verifyApiSecret } from '@/shared/api/content-api/verify-api-secret'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!verifyApiSecret(request)) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const { slug } = await params
  const post = await getPostForAdmin(slug)
  if (!post) return Response.json({ error: 'notFound' }, { status: 404 })

  return Response.json(post)
}
