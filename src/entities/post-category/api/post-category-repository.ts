import { db } from '@/shared/api/db'

export const getCategories = () => db.postCategory.findMany({ orderBy: { name: 'asc' } })

export const getCategory = (slug: string) => db.postCategory.findUnique({ where: { slug } })
