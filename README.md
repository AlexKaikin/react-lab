# React Lab

Экспериментальный проект на **Next.js 16** с **React 19**, **TypeScript**, **Tailwind CSS 4** и архитектурой **Feature-Sliced Design (FSD)**.

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

## Запуск проекта

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

## Скрипты

| Команда                | Описание                              |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Запуск Next.js в режиме разработки    |
| `npm run build`        | Сборка проекта                        |
| `npm run start`        | Запуск собранного проекта             |
| `npm run lint`         | Проверка кода (Biome)                 |
| `npm run format`       | Форматирование кода (Biome)           |
| `npm run storybook`    | Запуск Storybook                      |
| `npm run build-storybook` | Сборка Storybook                   |