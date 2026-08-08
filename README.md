# React Lab

Экспериментальный проект на **Next.js 16** с **React 19**, **TypeScript**, **Tailwind CSS 4**, **Prisma 7** + **PostgreSQL**, **next-intl** (ru/en) и архитектурой **Feature-Sliced Design (FSD)** — подробности по слоям и конвенциям в [AGENTS.md](./AGENTS.md).

Из фич: блог со списком/категориями/тегами и пагинацией, поиск по постам, локализация контента (ru как базовый язык, en — перевод), SEO (sitemap, robots, JSON-LD, canonical/hreflang).

## Первый запуск

1. Скопировать `.env.example` в `.env` и заполнить `DATABASE_URL` и `NEXT_PUBLIC_SITE_URL`.
2. Поднять локальный PostgreSQL:
   ```bash
   npm run db:up
   ```
3. Прогнать миграции и заполнить БД тестовыми данными:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
4. Запустить дев-сервер:
   ```bash
   npm run dev
   ```

Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

## Storybook

В проекте используется [Storybook](https://storybook.js.org/) для изолированной разработки и тестирования UI-компонентов. Компоненты находятся в `src/shared/ui/`.

### Запуск Storybook

```bash
npm run storybook
```

Storybook будет доступен по адресу [http://localhost:6006](http://localhost:6006).

### Сборка Storybook

```bash
npm run build-storybook
```

Собранная статика сохраняется в `public/sb`.

## Скрипты

| Команда                   | Описание                                    |
| -------------------------- | -------------------------------------------- |
| `npm run dev`               | Запуск Next.js в режиме разработки           |
| `npm run build`              | Сборка проекта                               |
| `npm run start`              | Запуск собранного проекта                    |
| `npm run lint`               | Проверка кода (Biome)                        |
| `npm run format`             | Форматирование кода (Biome)                  |
| `npm run typecheck`          | Проверка типов (tsc)                         |
| `npm run storybook`          | Запуск Storybook                             |
| `npm run build-storybook`    | Сборка Storybook                             |
| `npm run db:up`              | Локальный PostgreSQL в Docker                |
| `npm run db:migrate`         | Применить миграции Prisma                    |
| `npm run db:generate`        | Сгенерировать Prisma Client                  |
| `npm run db:studio`          | Открыть Prisma Studio                        |
| `npm run db:seed`            | Заполнить БД тестовыми данными               |
| `npm run db:reset`           | Сбросить БД и накатить миграции заново       |
