import type { Prisma } from '@prisma/client'
import { db } from '@/shared/api/db'

const PUBLIC_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  about: true,
  location: true,
  avatarUrl: true,
  birthDate: true,
  isActive: true,
  roles: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect

export const getUser = (id: string) => db.user.findUnique({ where: { id }, select: PUBLIC_SELECT })

// Полная строка (с password) — только для внутренней auth-логики (логин, смена пароля/email).
export const getUserByEmail = (email: string) => db.user.findUnique({ where: { email } })

type CreateUserParams = {
  email: string
  firstName: string
  passwordHash: string
  activationToken: string
  activationExpires: Date
}

export const createUser = (params: CreateUserParams) =>
  db.user.create({
    data: {
      email: params.email,
      firstName: params.firstName,
      password: params.passwordHash,
      activationToken: params.activationToken,
      activationExpires: params.activationExpires,
    },
    select: PUBLIC_SELECT,
  })

export const activateUser = async (token: string) => {
  const user = await db.user.findUnique({ where: { activationToken: token } })

  if (!user) return null
  if (user.activationExpires && user.activationExpires < new Date()) return null

  return db.user.update({
    where: { id: user.id },
    data: { isActive: true, activationToken: null, activationExpires: null },
    select: PUBLIC_SELECT,
  })
}

export const setResetToken = (email: string, resetToken: string, resetTokenExpiry: Date) =>
  db.user.updateMany({ where: { email }, data: { resetToken, resetTokenExpiry } })

export const isResetTokenValid = async (token: string) => {
  const user = await db.user.findUnique({ where: { resetToken: token }, select: { resetTokenExpiry: true } })

  if (!user) return false
  return !user.resetTokenExpiry || user.resetTokenExpiry >= new Date()
}

export const resetPassword = async (token: string, passwordHash: string) => {
  const user = await db.user.findUnique({ where: { resetToken: token } })

  if (!user) return null
  if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) return null

  return db.user.update({
    where: { id: user.id },
    data: { password: passwordHash, resetToken: null, resetTokenExpiry: null },
    select: PUBLIC_SELECT,
  })
}

type UpdateProfileParams = {
  firstName?: string
  lastName?: string
  about?: string
  location?: string
  birthDate?: Date | null
  avatarUrl?: string | null
}

export const updateProfile = (id: string, data: UpdateProfileParams) =>
  db.user.update({ where: { id }, data, select: PUBLIC_SELECT })

export const updateEmail = (id: string, email: string) =>
  db.user.update({ where: { id }, data: { email }, select: PUBLIC_SELECT })

export const updatePassword = (id: string, passwordHash: string) =>
  db.user.update({ where: { id }, data: { password: passwordHash }, select: PUBLIC_SELECT })
