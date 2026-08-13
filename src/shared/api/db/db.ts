import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { env } from '@/shared/lib/env'

const globalForDb = globalThis as unknown as { db?: PrismaClient }

// max ограничен, чтобы параллельные воркеры next build (каждый — свой процесс, свой пул)
// не выбирали лимит Postgres max_connections все вместе
const adapter = new PrismaPg({ connectionString: env('DATABASE_URL'), max: 5 })

export const db = globalForDb.db ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForDb.db = db
