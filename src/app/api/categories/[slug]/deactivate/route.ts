import type { NextRequest } from 'next/server'
import { deactivateCategory } from '@/entities/post-category'
import { verifyApiSecret } from '@/shared/api/content-api/verify-api-secret'

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!verifyApiSecret(request)) return Response.json({ error: 'unauthorized' }, { status: 401 })

  const { slug } = await params
  const category = await deactivateCategory(slug)
  if (!category) return Response.json({ error: 'notFound' }, { status: 404 })

  return Response.json({ success: true })
}
