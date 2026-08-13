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
    { name: 'Внутреннее устройство React', slug: 'deep-dive', nameEn: 'React Internals' },
  ]

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

  const categoryId = (slug: string) => {
    const category = createdCategories.find((c) => c.slug === slug)
    if (!category) throw new Error(`Category not found: ${slug}`)
    return category.id
  }

  const posts = [
    {
      slug: 'react-19-actions-guide',
      title: 'React 19: полный гид по Actions, useActionState и useOptimistic',
      content: `## Что изменилось

React 19 вводит новую модель работы с формами и асинхронными обновлениями — **Actions**. Это функции, которые можно передать прямо в \`<form action={...}>\`, и React сам возьмёт на себя состояние загрузки, ошибки и оптимистичные обновления.

### Основные хуки

- \`useActionState\` — хранит результат и статус выполнения action
- \`useOptimistic\` — показывает промежуточное состояние до ответа сервера
- \`useFormStatus\` — читает статус ближайшей родительской формы

Пример:

\`\`\`tsx
const [state, formAction, isPending] = useActionState(updateName, null)

return (
  <form action={formAction}>
    <input name="name" />
    <button disabled={isPending}>Сохранить</button>
  </form>
)
\`\`\`

> Actions работают как в клиентских, так и в серверных компонентах — это главное, что делает их удобными для форм в Next.js.

Подробнее — в [официальной документации](https://react.dev/reference/react/useActionState).`,
      meta: {
        title: 'React 19 Actions — гид по useActionState и useOptimistic',
        description:
          'Разбираем новую модель работы с формами в React 19: Actions, useActionState, useOptimistic и useFormStatus на примерах.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'react-19', 'actions', 'forms', 'hooks'],
      translation: {
        title: 'React 19: A Complete Guide to Actions, useActionState and useOptimistic',
        content: `## What changed

React 19 introduces a new model for forms and async updates — **Actions**. These are functions you can pass directly to \`<form action={...}>\`, and React takes care of pending state, errors, and optimistic updates.

### Key hooks

- \`useActionState\` — stores the result and status of an action
- \`useOptimistic\` — shows an intermediate state before the server responds
- \`useFormStatus\` — reads the status of the nearest parent form

\`\`\`tsx
const [state, formAction, isPending] = useActionState(updateName, null)
\`\`\`

> Actions work in both client and server components — that's what makes them so convenient for forms in Next.js.

Read more in the [official docs](https://react.dev/reference/react/useActionState).`,
        meta: {
          title: 'React 19 Actions — a guide to useActionState and useOptimistic',
          description:
            'A deep dive into the new form model in React 19: Actions, useActionState, useOptimistic and useFormStatus with examples.',
        },
        tags: ['react', 'react-19', 'actions', 'forms', 'hooks'],
      },
    },
    {
      slug: 'server-components-vs-client-components',
      title: 'Server Components vs Client Components: когда что использовать',
      content: `Главный вопрос при работе с App Router — не "что круче", а "где должен жить этот код".

**Server Components** подходят, когда компоненту не нужны браузерные API, состояние или обработчики событий — получение данных, разметка, статичный контент.

**Client Components** нужны, если есть:

1. \`useState\`, \`useEffect\` и другие хуки состояния
2. Обработчики событий (\`onClick\`, \`onChange\`)
3. Браузерные API (\`window\`, \`localStorage\`)

Правило команды простое: по умолчанию — серверный компонент, \`'use client'\` добавляем только там, где реально нужна интерактивность, и стараемся опускать эту границу как можно ниже по дереву.`,
      meta: {
        title: 'Server vs Client Components — практическое руководство',
        description:
          'Когда использовать Server Components, а когда Client Components в Next.js App Router — практические правила для команды.',
      },
      categorySlug: 'reviews',
      tags: ['react', 'nextjs', 'rsc'],
      translation: {
        title: 'Server Components vs Client Components: When to Use Which',
        content: `The main question isn't "which is cooler" — it's "where should this code live".

**Server Components** are a good fit when a component doesn't need browser APIs, state, or event handlers — data fetching, markup, static content.

**Client Components** are needed when there's:

1. \`useState\`, \`useEffect\` or other state hooks
2. Event handlers (\`onClick\`, \`onChange\`)
3. Browser APIs (\`window\`, \`localStorage\`)

The team's rule is simple: server component by default, add \`'use client'\` only where interactivity is actually needed, and push that boundary as low in the tree as possible.`,
        meta: {
          title: 'Server vs Client Components — a practical guide',
          description:
            'When to use Server Components vs Client Components in the Next.js App Router — practical rules for teams.',
        },
        tags: ['react', 'nextjs', 'rsc'],
      },
    },
    {
      slug: 'react-compiler-explained',
      title: 'Как работает React Compiler и почему можно (почти) забыть про useMemo',
      content: `React Compiler автоматически мемоизирует компоненты и хуки на этапе сборки, анализируя граф зависимостей — без ручных \`useMemo\`/\`useCallback\`.

\`\`\`tsx
// было
const value = useMemo(() => computeExpensive(a, b), [a, b])

// стало — компилятор делает это сам
const value = computeExpensive(a, b)
\`\`\`

Компилятор работает как плагин Babel и встраивается в сборку через Vite, Webpack или встроенную поддержку в Next.js. Он не меняет поведение кода — только вставляет мемоизацию там, где безопасно.`,
      meta: {
        title: 'React Compiler объяснение — автоматическая мемоизация',
        description: 'Как React Compiler автоматически мемоизирует компоненты и заменяет ручные useMemo и useCallback.',
      },
      categorySlug: 'deep-dive',
      tags: ['react', 'react-compiler', 'performance', 'memoization', 'babel', 'vite', 'webpack', 'internals'],
      translation: {
        title: 'How React Compiler Works and Why You Can (Almost) Forget About useMemo',
        content: `React Compiler automatically memoizes components and hooks at build time by analyzing the dependency graph — no manual \`useMemo\`/\`useCallback\` required.

\`\`\`tsx
// before
const value = useMemo(() => computeExpensive(a, b), [a, b])

// after — the compiler does it for you
const value = computeExpensive(a, b)
\`\`\`

The compiler runs as a Babel plugin and integrates via Vite, Webpack, or built-in Next.js support. It doesn't change your code's behavior — it only inserts memoization where it's safe to do so.`,
        meta: {
          title: 'React Compiler explained — automatic memoization',
          description:
            'How React Compiler automatically memoizes components and replaces manual useMemo and useCallback.',
        },
        tags: ['react', 'react-compiler', 'performance', 'memoization', 'babel', 'vite', 'webpack', 'internals'],
      },
    },
    {
      slug: 'state-management-2026',
      title: 'Стейт-менеджмент в 2026: Zustand, Jotai, Redux Toolkit или просто useState?',
      content: `Выбор либы для стейта — вечный холивар, но на практике решение зависит от масштаба состояния и того, кто его читает.

### Когда хватает useState/Context

Если состояние локально для одной ветки дерева и обновляется нечасто — не тащите библиотеку, Context прекрасно справится.

### Когда нужен Zustand или Jotai

- Состояние читается в далёких друг от друга частях дерева
- Нужна персистентность (localStorage) "из коробки"
- Хочется избежать лишних ре-рендеров без мемоизации вручную

### Когда всё ещё нужен Redux Toolkit

1. Большая команда, нужна строгая структура и DevTools с тайм-тревелом
2. Сложная бизнес-логика с middleware (саги, thunks)
3. Уже есть legacy-код на Redux, миграция дороже пользы

> Универсального ответа нет — но если сомневаетесь, начните с самого простого решения и усложняйте по мере роста боли.

Полезные ссылки: [Zustand](https://zustand-demo.pmnd.rs/), [Jotai](https://jotai.org/), [Redux Toolkit](https://redux-toolkit.js.org/).`,
      meta: {
        title: 'Стейт-менеджмент в React 2026 — Zustand, Jotai, Redux Toolkit',
        description:
          'Сравнение подходов к управлению состоянием в React: когда хватает useState/Context, а когда нужны Zustand, Jotai или Redux Toolkit.',
      },
      categorySlug: 'reviews',
      tags: ['react', 'zustand', 'jotai', 'redux', 'state-management'],
      translation: null,
    },
    {
      slug: 'suspense-streaming-ssr',
      title: 'Suspense и потоковый SSR: как React рендерит страницу по частям',
      content: `Потоковый SSR позволяет отправлять HTML частями, не дожидаясь готовности всей страницы.

\`\`\`tsx
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
\`\`\`

Пока \`SlowComponent\` ждёт данные, остальная страница уже доходит до браузера и становится интерактивной. Это особенно заметно на страницах с медленными запросами к базе — пользователь видит контент раньше, чем при классическом SSR.`,
      meta: {
        title: 'Suspense и streaming SSR в React — как это работает',
        description: 'Разбираем механизм потокового SSR в React: как Suspense позволяет отправлять HTML по частям.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'suspense', 'ssr', 'streaming'],
      translation: {
        title: 'Suspense and Streaming SSR: How React Renders a Page in Chunks',
        content: `Streaming SSR lets you send HTML in chunks without waiting for the entire page to be ready.

\`\`\`tsx
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
\`\`\`

While \`SlowComponent\` waits for data, the rest of the page already reaches the browser and becomes interactive. This is especially noticeable on pages with slow database queries — users see content sooner than with classic SSR.`,
        meta: {
          title: 'Suspense and streaming SSR in React — how it works',
          description: 'Explaining the streaming SSR mechanism in React and how Suspense lets you send HTML in chunks.',
        },
        tags: ['react', 'suspense', 'ssr', 'streaming'],
      },
    },
    {
      slug: 'react-devtools-tips',
      title: '10 неочевидных фишек React DevTools, которые ускорят твой дебаг',
      content: `1. Вкладка **Profiler** показывает, какие компоненты и почему перерендерились
2. Чекбокс "Highlight updates" подсвечивает перерендеры прямо на странице
3. В настройках можно включить показ имён компонентов из \`displayName\`
4. Поиск по дереву компонентов работает по имени пропа и его значению
5. Можно кликнуть на компонент в дереве, и он подсветится в самой странице
6. "Record why each component rendered" в Profiler объясняет причину ре-рендера
7. Значения пропов и стейта можно редактировать прямо в панели, не трогая код
8. Хуки в дереве показываются в порядке вызова — удобно ловить нарушение правил хуков
9. Есть фильтр, скрывающий host-элементы (div, span) — остаётся только ваше дерево
10. DevTools работает и с React Native через отдельный standalone-режим`,
      meta: {
        title: '10 фишек React DevTools для быстрого дебага',
        description:
          'Подборка неочевидных возможностей React DevTools: Profiler, подсветка ре-рендеров, редактирование пропов и не только.',
      },
      categorySlug: 'news',
      tags: ['react', 'devtools', 'debugging'],
      translation: null,
    },
    {
      slug: 'rules-of-hooks-explained',
      title: 'Правила хуков: почему порядок вызова useState и useEffect так важен',
      content: `React связывает состояние хуков не с именем переменной, а с **порядковым номером вызова** внутри компонента. Поэтому хуки нельзя вызывать в условиях или циклах.

\`\`\`tsx
// ❌ так нельзя
if (isReady) {
  const [value, setValue] = useState(0)
}

// ✅ условие внутри хука, а не вокруг него
const [value, setValue] = useState(isReady ? 0 : null)
\`\`\`

> Если порядок вызовов хуков меняется между рендерами, React потеряет связь между хуком и его состоянием — и подставит не те данные не в тот хук.

Именно поэтому ESLint-плагин \`eslint-plugin-react-hooks\` — не формальность, а страховка от очень трудноуловимых багов.`,
      meta: {
        title: 'Правила хуков в React — почему важен порядок вызова',
        description:
          'Объясняем, почему React требует вызывать хуки в одном и том же порядке на каждом рендере и что будет при нарушении.',
      },
      categorySlug: 'news',
      tags: ['react', 'hooks', 'rules-of-hooks'],
      translation: {
        title: 'Rules of Hooks: Why Call Order for useState and useEffect Matters',
        content: `React ties hook state to the **call order** within a component, not to a variable name. That's why hooks can't be called inside conditions or loops.

\`\`\`tsx
// ❌ not allowed
if (isReady) {
  const [value, setValue] = useState(0)
}

// ✅ put the condition inside the hook instead
const [value, setValue] = useState(isReady ? 0 : null)
\`\`\`

> If the call order changes between renders, React loses track of which state belongs to which hook — and hands the wrong data to the wrong hook.

That's why the \`eslint-plugin-react-hooks\` linter isn't a formality — it's insurance against very hard-to-track bugs.`,
        meta: {
          title: 'Rules of Hooks in React — why call order matters',
          description:
            'Explaining why React requires hooks to be called in the same order on every render, and what happens if you break that rule.',
        },
        tags: ['react', 'hooks', 'rules-of-hooks'],
      },
    },
    {
      slug: 'typing-props-and-children-in-react',
      title: 'Пропсы и children в TypeScript: типизируем React-компоненты правильно',
      content: `Чаще всего для \`children\` достаточно типа \`ReactNode\` — он покрывает строки, числа, элементы и фрагменты.

Для компонентов с ограниченным набором дочерних элементов (например, только \`<Tab>\` внутри \`<Tabs>\`) полезнее сузить тип до \`ReactElement<TabProps>[]\`.`,
      meta: {
        title: 'Типизация props и children в React + TypeScript',
        description:
          'Как правильно типизировать children и пропсы React-компонентов: ReactNode, ReactElement и когда что использовать.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'typescript'],
      translation: {
        title: 'Typing Props and Children in React: Getting It Right',
        content: `Most of the time, \`ReactNode\` is enough for \`children\` — it covers strings, numbers, elements, and fragments.

For components with a restricted set of children (say, only \`<Tab>\` inside \`<Tabs>\`), it's more useful to narrow the type down to \`ReactElement<TabProps>[]\`.`,
        meta: {
          title: 'Typing props and children in React + TypeScript',
          description:
            'How to properly type children and props in React components: ReactNode, ReactElement, and when to use which.',
        },
        tags: ['react', 'typescript'],
      },
    },
    {
      slug: 'when-you-actually-need-useeffect',
      title: 'useEffect: когда он действительно нужен, а когда без него проще',
      content: `Частая ошибка — тащить в \`useEffect\` то, что можно вычислить прямо во время рендера.

- Вычисление производных данных из пропсов/стейта — эффект не нужен
- Синхронизация с внешней системой (DOM, подписка, таймер) — эффект нужен
- Реакция на изменение пропса ради обновления другого стейта — почти всегда лучше пересчитать значение при рендере

[В документации](https://react.dev/learn/you-might-not-need-an-effect) есть отдельный разбор этой темы.`,
      meta: {
        title: 'Когда useEffect действительно нужен',
        description:
          'Разбираем частые ошибки использования useEffect и когда эффект можно заменить обычным вычислением при рендере.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'hooks'],
      translation: null,
    },
    {
      slug: 'zod-with-react-hook-form',
      title: 'Zod + react-hook-form: валидация форм без боли',
      content: `Связка \`react-hook-form\` и \`zod\` через \`@hookform/resolvers\` позволяет описать схему один раз и получить и валидацию, и типы формы автоматически через \`z.infer\`.

Главное преимущество — ошибки валидации и TypeScript-типы никогда не расходятся, потому что берутся из одного источника.`,
      meta: {
        title: 'Валидация форм с Zod и react-hook-form',
        description:
          'Как связать react-hook-form и zod через zodResolver и получить единый источник правды для валидации и типов.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'forms', 'typescript'],
      translation: {
        title: 'Zod + react-hook-form: Painless Form Validation',
        content: `Combining \`react-hook-form\` with \`zod\` via \`@hookform/resolvers\` lets you describe a schema once and get both validation and form types automatically through \`z.infer\`.

The main benefit: validation errors and TypeScript types never drift apart, because they come from the same source.`,
        meta: {
          title: 'Form validation with Zod and react-hook-form',
          description:
            'How to connect react-hook-form and zod via zodResolver for a single source of truth for validation and types.',
        },
        tags: ['react', 'forms', 'typescript'],
      },
    },
    {
      slug: 'how-reconciliation-works',
      title: 'Как устроен reconciliation в React под капотом',
      content: `Reconciliation — это процесс сравнения нового дерева элементов со старым, чтобы понять, какие изменения применить к реальному DOM.

React использует эвристики: элементы одного типа на одной позиции считаются "тем же" узлом и переиспользуются, а \`key\` в списках помогает React не терять состояние при переупорядочивании.`,
      meta: {
        title: 'Reconciliation в React — как это работает',
        description:
          'Разбираем алгоритм сравнения деревьев в React: эвристики, роль key и переиспользование DOM-узлов.',
      },
      categorySlug: 'deep-dive',
      tags: ['react', 'internals', 'performance'],
      translation: null,
    },
    {
      slug: 'react-query-vs-nextjs-fetching',
      title: 'React Query vs встроенный fetching в Next.js: что выбрать',
      content: `В App Router кэширование запросов частично берёт на себя сам Next.js через \`fetch\` и серверные компоненты.

React Query остаётся нужен, когда есть клиентское состояние: повторные запросы по интервалу, оптимистичные обновления, мутации с инвалидацией кэша на клиенте.`,
      meta: {
        title: 'React Query или fetch в Next.js App Router',
        description: 'Сравниваем встроенное кэширование fetch в Next.js App Router и React Query — когда что выбрать.',
      },
      categorySlug: 'reviews',
      tags: ['react', 'nextjs', 'react-query'],
      translation: {
        title: 'React Query vs Built-in Next.js Fetching: Which to Choose',
        content: `In the App Router, request caching is partly handled by Next.js itself via \`fetch\` and server components.

React Query is still worth it when there's client-side state involved: polling, optimistic updates, mutations with client-side cache invalidation.`,
        meta: {
          title: 'React Query or fetch in the Next.js App Router',
          description:
            'Comparing built-in fetch caching in the Next.js App Router with React Query — when to choose which.',
        },
        tags: ['react', 'nextjs', 'react-query'],
      },
    },
    {
      slug: 'compound-components-pattern',
      title: 'Паттерн Compound Components на практике',
      content: `Compound Components позволяют собирать гибкий API из нескольких связанных компонентов, которые делят общее состояние через контекст.

Классический пример — \`<Select>\` с дочерними \`<Select.Option>\`: родитель хранит выбранное значение, а дети читают его через контекст, не получая пропсы напрямую.`,
      meta: {
        title: 'Compound Components в React',
        description:
          'Разбираем паттерн Compound Components: как собрать гибкий API из связанных компонентов на общем контексте.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'patterns'],
      translation: null,
    },
    {
      slug: 'lazy-loading-with-suspense',
      title: 'Ленивая загрузка компонентов через React.lazy и Suspense',
      content: `\`React.lazy\` откладывает загрузку кода компонента до момента его первого рендера — полезно для тяжёлых модалок, редакторов и графиков, которые нужны не всем пользователям сразу.

\`\`\`tsx
const Editor = lazy(() => import('./editor'))
\`\`\`

Компонент обязательно оборачивается в \`<Suspense fallback={...}>\`, иначе React не будет знать, что показать во время загрузки.`,
      meta: {
        title: 'React.lazy и Suspense — ленивая загрузка компонентов',
        description:
          'Как использовать React.lazy и Suspense для отложенной загрузки тяжёлых компонентов и уменьшения размера бандла.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'performance'],
      translation: {
        title: 'Lazy Loading Components with React.lazy and Suspense',
        content: `\`React.lazy\` defers loading a component's code until its first render — useful for heavy modals, editors, and charts that not every user needs right away.

\`\`\`tsx
const Editor = lazy(() => import('./editor'))
\`\`\`

The component must be wrapped in \`<Suspense fallback={...}>\`, otherwise React won't know what to show while it loads.`,
        meta: {
          title: 'React.lazy and Suspense — lazy loading components',
          description: 'How to use React.lazy and Suspense to defer loading heavy components and reduce bundle size.',
        },
        tags: ['react', 'performance'],
      },
    },
    {
      slug: 'what-is-fiber',
      title: 'Что такое Fiber и зачем React его переписал',
      content: `Fiber — внутренняя архитектура React, представляющая дерево компонентов как связный список узлов с возможностью прерывать и возобновлять рендер.

До Fiber рендер был синхронным и не прерываемым: если дерево большое, страница "зависала" до конца обхода. Fiber позволяет React распределять работу по кадрам и отдавать приоритет более важным обновлениям.`,
      meta: {
        title: 'React Fiber — зачем он нужен',
        description:
          'Объясняем архитектуру React Fiber: почему рендер стал прерываемым и как это влияет на отзывчивость интерфейса.',
      },
      categorySlug: 'deep-dive',
      tags: ['react', 'internals'],
      translation: null,
    },
    {
      slug: 'css-in-js-in-2026',
      title: 'CSS-in-JS в 2026: жив ли ещё styled-components',
      content: `После появления zero-runtime решений (Vanilla Extract, Panda CSS) и роста популярности Tailwind классический CSS-in-JS с рантайм-инъекцией стилей используется всё реже.

Основная причина — цена рантайма при серверном рендере: styled-components и emotion добавляют дополнительный проход по дереву на каждый запрос.`,
      meta: {
        title: 'CSS-in-JS в 2026 году — обзор подходов',
        description:
          'Разбираем текущее состояние CSS-in-JS: zero-runtime решения, Tailwind и почему классический рантайм теряет популярность.',
      },
      categorySlug: 'reviews',
      tags: ['react', 'css'],
      translation: {
        title: 'CSS-in-JS in 2026: Is styled-components Still Alive',
        content: `With the rise of zero-runtime solutions (Vanilla Extract, Panda CSS) and Tailwind's growing popularity, classic runtime CSS-in-JS is used less and less.

The main reason is the runtime cost during server rendering: styled-components and emotion add an extra pass over the tree on every request.`,
        meta: {
          title: 'CSS-in-JS in 2026 — an overview',
          description:
            'A look at the current state of CSS-in-JS: zero-runtime solutions, Tailwind, and why classic runtime styling is losing ground.',
        },
        tags: ['react', 'css'],
      },
    },
    {
      slug: 'testing-hooks-with-testing-library',
      title: 'Как тестировать хуки с помощью Testing Library',
      content: `\`@testing-library/react\` предлагает \`renderHook\` для изолированного тестирования кастомных хуков без обёртки в компонент.

\`\`\`tsx
const { result } = renderHook(() => useCounter())
act(() => result.current.increment())
expect(result.current.count).toBe(1)
\`\`\``,
      meta: {
        title: 'Тестирование хуков в React Testing Library',
        description:
          'Как использовать renderHook из Testing Library для изолированного тестирования кастомных React-хуков.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'testing'],
      translation: null,
    },
    {
      slug: 'react-memo-when-it-does-not-help',
      title: 'Оптимизация ре-рендеров: React.memo и когда он не помогает',
      content: `\`React.memo\` сравнивает пропсы по ссылке — если в пропсах есть объект или функция, создаваемые заново на каждом рендере родителя, мемоизация не сработает.

Без \`useMemo\`/\`useCallback\` на стороне родителя (или React Compiler) \`memo\` часто просто не даёт эффекта, оставаясь бесполезной обёрткой.`,
      meta: {
        title: 'React.memo — когда он реально помогает',
        description:
          'Разбираем ограничения React.memo: почему мемоизация компонента не срабатывает без стабильных ссылок в пропсах.',
      },
      categorySlug: 'deep-dive',
      tags: ['react', 'performance', 'memoization'],
      translation: {
        title: 'Optimizing Re-renders: React.memo and When It Does Not Help',
        content: `\`React.memo\` compares props by reference — if a prop is an object or function recreated on every parent render, memoization won't kick in.

Without \`useMemo\`/\`useCallback\` on the parent's side (or React Compiler), \`memo\` often has no effect at all, remaining a useless wrapper.`,
        meta: {
          title: 'React.memo — when it actually helps',
          description:
            "Exploring React.memo's limitations: why component memoization fails without stable prop references.",
        },
        tags: ['react', 'performance', 'memoization'],
      },
    },
    {
      slug: 'react-portals-explained',
      title: 'Порталы в React: рендерим модалки за пределами DOM-дерева',
      content: `\`createPortal\` рендерит React-детей в произвольный DOM-узел вне текущего родителя, сохраняя при этом React-дерево (контекст, события) нетронутым.

Типичный кейс — модалки и тултипы: визуально они должны быть поверх всего, а не зажаты внутри \`overflow: hidden\` родителя.`,
      meta: {
        title: 'Порталы в React (createPortal)',
        description:
          'Как работает createPortal в React и почему модалки и тултипы обычно рендерят именно через порталы.',
      },
      categorySlug: 'tutorials',
      tags: ['react'],
      translation: null,
    },
    {
      slug: 'context-without-extra-rerenders',
      title: 'Контекст без боли: избегаем лишних ре-рендеров через разделение стейта',
      content: `Любое изменение значения контекста ре-рендерит всех подписчиков, даже если их интересует только часть данных.

Решение — разделить контекст на несколько маленьких (например, отдельно значение и отдельно функция-сеттер), либо вынести часто меняющиеся данные в отдельный стор вроде Zustand.`,
      meta: {
        title: 'Context API без лишних ре-рендеров',
        description:
          'Как избежать лишних ре-рендеров при использовании React Context: разделение контекстов и альтернативы.',
      },
      categorySlug: 'tutorials',
      tags: ['react', 'performance', 'state-management'],
      translation: {
        title: 'Context Without the Pain: Avoiding Extra Re-renders by Splitting State',
        content: `Any change to a context value re-renders every subscriber, even if they only care about part of the data.

The fix is to split context into several smaller ones (for example, value and setter separately), or move frequently changing data into a separate store like Zustand.`,
        meta: {
          title: 'Context API without extra re-renders',
          description: 'How to avoid unnecessary re-renders with React Context: splitting contexts and alternatives.',
        },
        tags: ['react', 'performance', 'state-management'],
      },
    },
    {
      slug: 'server-actions-and-cache-revalidation',
      title: 'React Server Actions и ревалидация кэша в Next.js',
      content: `После выполнения Server Action изменения в базе не появятся на странице сами по себе — нужно явно инвалидировать кэш через \`revalidatePath\` или \`revalidateTag\`.

\`\`\`tsx
'use server'

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } })
  revalidatePath('/admin/posts')
}
\`\`\``,
      meta: {
        title: 'Server Actions и revalidatePath в Next.js',
        description:
          'Как правильно инвалидировать кэш после Server Action в Next.js: revalidatePath и revalidateTag на практике.',
      },
      categorySlug: 'news',
      tags: ['react', 'nextjs', 'actions'],
      translation: null,
    },
  ].map((post) => ({ ...post, categoryId: categoryId(post.categorySlug) }))

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
