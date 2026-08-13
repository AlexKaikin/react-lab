import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import proxy from 'next-intl/middleware'
import { env } from '@/shared/lib/env'
import { locales, routing } from '@/shared/lib/i18n'

const intlProxy = proxy(routing)

const localePattern = locales.join('|')
const protectedPattern = new RegExp(`^/(${localePattern})/(account|admin)(/|$)`)
const adminPattern = new RegExp(`^/(${localePattern})/admin(/|$)`)

export default async function appProxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (protectedPattern.test(pathname)) {
    const locale = pathname.split('/')[1]
    const token = await getToken({ req: request, secret: env('NEXTAUTH_SECRET') })

    if (!token) return NextResponse.redirect(new URL(`/${locale}`, request.url))

    if (adminPattern.test(pathname) && !token.roles.includes('ADMIN')) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }
  }

  return intlProxy(request)
}

export const config = {
  matcher: [
    // Match всё КРОМЕ статики
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\..*|api).*)',
  ],
}
