import { PrismaPg } from '@prisma/adapter-pg'
import { type Prisma, PrismaClient, ROLE } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { env } from '@/shared/lib/env'

const adapter = new PrismaPg({ connectionString: env('DATABASE_URL') })
const prisma = new PrismaClient({ adapter })

async function main() {
  const users = [
    {
      email: 'lex.kaikin@gmail.com',
      firstName: 'Lex',
      lastName: 'Kai',
      password: 'lex.kaikin@gmail.com',
      roles: [ROLE.ADMIN],
      isActive: true,
    },
  ]

  const getUserPromise = async (user: Prisma.UserCreateInput) => {
    const hashPassword = await bcrypt.hash(user.password, 3)

    const data = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: hashPassword,
        roles: user.roles,
        isActive: user.isActive,
      },
    })

    return data
  }

  await Promise.all(users.map((user) => getUserPromise(user)))

  const categories = [
    { name: 'Новости', slug: 'news' },
    { name: 'Туториалы', slug: 'tutorials' },
    { name: 'Обзоры', slug: 'reviews' },
  ]

  const tagsPool = ['react', 'nextjs', 'typescript', 'prisma', 'tailwind']

  await prisma.post.deleteMany()
  await prisma.meta.deleteMany()
  await prisma.postCategory.deleteMany()

  const createdCategories = await Promise.all(
    categories.map((category) => prisma.postCategory.create({ data: category })),
  )

  const posts = Array.from({ length: 21 }, (_, index) => {
    const number = index + 1

    return {
      slug: `post-${number}`,
      title: `Пост ${number}`,
      content: `Содержимое поста ${number}.`,
      meta: {
        title: `Пост ${number} — мета-заголовок`,
        description: `Мета-описание поста ${number}.`,
      },
      categoryId: createdCategories[number % createdCategories.length].id,
      tags: [tagsPool[number % tagsPool.length], tagsPool[(number + 1) % tagsPool.length]],
    }
  })

  await Promise.all(
    posts.map((post) =>
      prisma.post.create({
        data: {
          slug: post.slug,
          title: post.title,
          content: post.content,
          meta: { create: post.meta },
          category: { connect: { id: post.categoryId } },
          tags: post.tags,
        },
      }),
    ),
  )
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
