import proxy from 'next-intl/middleware'
import { routing } from '@/shared/config/i18n'

export default proxy(routing)

export const config = {
  matcher: [
    // Match всё КРОМЕ статики
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\..*|api).*)',
  ],
}
