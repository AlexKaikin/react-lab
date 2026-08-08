import { PrismaPg } from '@prisma/adapter-pg'
import { Locale, type Prisma, PrismaClient, ROLE } from '@prisma/client'
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
    { name: 'Новости', slug: 'news', nameEn: 'News' },
    { name: 'Туториалы', slug: 'tutorials', nameEn: 'Tutorials' },
    { name: 'Обзоры', slug: 'reviews', nameEn: 'Reviews' },
  ]

  const tagsPool = ['react', 'nextjs', 'typescript', 'prisma', 'tailwind']

  await prisma.post.deleteMany()
  await prisma.meta.deleteMany()
  await prisma.postCategory.deleteMany()

  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.postCategory.create({
        data: {
          name: category.name,
          slug: category.slug,
          translations: { create: [{ locale: Locale.en, name: category.nameEn }] },
        },
      }),
    ),
  )

  const posts = Array.from({ length: 21 }, (_, index) => {
    const number = index + 1
    const tags = [tagsPool[number % tagsPool.length], tagsPool[(number + 1) % tagsPool.length]]

    return {
      slug: `post-${number}`,
      title: `Пост ${number}`,
      content: `Содержимое поста ${number}.`,
      meta: {
        title: `Пост ${number} — мета-заголовок`,
        description: `Мета-описание поста ${number}.`,
      },
      categoryId: createdCategories[number % createdCategories.length].id,
      tags,
      // у части постов пока нет английского перевода — проверяем сценарий 404 для непереведённого контента
      translation:
        number % 2 === 0
          ? {
              title: `Post ${number}`,
              content: `Content of post ${number}.`,
              meta: {
                title: `Post ${number} — meta title`,
                description: `Meta description of post ${number}.`,
              },
              tags,
            }
          : null,
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
          ...(post.translation
            ? {
                translations: {
                  create: [
                    {
                      locale: Locale.en,
                      title: post.translation.title,
                      content: post.translation.content,
                      tags: post.translation.tags,
                      meta: { create: post.translation.meta },
                    },
                  ],
                },
              }
            : {}),
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
