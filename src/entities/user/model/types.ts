import type { ROLE } from '@prisma/client'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  about: string
  location: string
  avatarUrl: string | null
  birthDate: Date | null
  isActive: boolean
  roles: ROLE[]
  createdAt: Date
  updatedAt: Date
}
