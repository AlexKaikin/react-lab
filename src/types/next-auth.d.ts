import type { ROLE } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    firstName: string
    roles: ROLE[]
    isActive: boolean
  }

  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    firstName: string
    roles: ROLE[]
    isActive: boolean
  }
}
