import type { NextRequest } from 'next/server'
import { env } from '@/shared/lib/env'

export const verifyApiSecret = (request: NextRequest): boolean => {
  const header = request.headers.get('authorization') ?? ''
  const [scheme, token] = header.split(' ')

  return scheme === 'Bearer' && !!token && token === env('CONTENT_API_SECRET')
}
