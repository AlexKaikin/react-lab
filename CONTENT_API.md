# Content API

REST API для управления постами и категориями блога сторонним агентом (например, ИИ). Не связан с сессией пользователя — авторизация по общему секрету.

## Авторизация

Каждый запрос должен содержать заголовок:

```
Authorization: Bearer <CONTENT_API_SECRET>
```

Секрет задан в переменной окружения `CONTENT_API_SECRET`. Без валидного заголовка — `401 { "error": "unauthorized" }`.

## Базовый URL

`{NEXT_PUBLIC_SITE_URL}/api`

## Локали

Проект поддерживает `ru` (дефолтная) и `en`. Правила:

- `ru` в теле запроса **обязателен**.
- `en` — опционален только целиком: можно не передавать вовсе или передать `null`, если перевода нет. Но если объект `en` передан — он должен быть заполнен полностью, включая `meta.title`/`meta.description`, точно так же строго, как `ru`. Частично заполненный `en` (например, без меты) — невалидный запрос (`400`).
- Если у категории нет перевода на `en` — создать пост с `en`-контентом под неё нельзя (см. `localeNotSupportedByCategory` ниже). Сначала добавьте `en` категории.
- Список локалей заведён в одном месте (`shared/lib/i18n`), так что при добавлении нового языка в проект правила выше распространятся на него автоматически, без правок в этой апишке.

## Деактивация вместо удаления

У постов и категорий есть поле `isActive` (по умолчанию `true`). Деактивация — это `isActive: false`, а не удаление из БД: сущность пропадает с публичного сайта (страница отдаёт 404, не встречается в списках/поиске/тегах), но остаётся в базе и в ответах эндпоинтов из этого API (для истории). Обратной операции (реактивации) через API нет. Настоящее удаление — только вручную/через админку.

---

## Категории

### `GET /api/categories`

Список всех категорий (включая деактивированные).

**Ответ `200`:**

```json
[
  {
    "id": "1edcf279-25e6-4a8c-9af3-cd23a1178f2a",
    "slug": "deep-dive",
    "isActive": true,
    "ru": { "name": "Внутреннее устройство React" },
    "en": { "name": "React Internals" },
    "postsCount": 4
  }
]
```

### `POST /api/categories`

Создать категорию.

**Тело запроса:**

```json
{
  "slug": "deep-dive",
  "ru": { "name": "Внутреннее устройство React" },
  "en": { "name": "React Internals" }
}
```

| Поле       | Тип             | Обязательно | Примечание                              |
| ---------- | --------------- | ----------- | ---------------------------------------- |
| `slug`     | `string`        | да          | `^[a-z0-9-]+$`                           |
| `ru.name`  | `string`        | да          | непустая строка                          |
| `en`       | `object \| null`| нет         | опустить или `null`, если перевода нет   |
| `en.name`  | `string`        | да, если `en` передан |                                |

**Ответ `201`** — созданная категория (объект БД). **Ошибки:** `400 invalid` (не прошла валидация, в `issues` — детали от zod), `409 slugTaken`.

### `POST /api/categories/[slug]/deactivate`

Деактивировать категорию по `slug`. Тело запроса не требуется.

**Ответ:** `200 { "success": true }` или `404 { "error": "notFound" }`.

---

## Посты

### `GET /api/posts`

Список всех постов (включая деактивированные), сокращённые данные (для полного контента — см. ниже).

**Ответ `200`:**

```json
[
  {
    "id": "c57f2c36-db05-44bc-9c9b-100fff98b899",
    "slug": "kak-rabotaet-useeffect-pod-kapotom",
    "title": "Как работает useEffect под капотом",
    "category": { "name": "Внутреннее устройство React" },
    "createdAt": "2026-08-13T16:47:00.180Z",
    "isActive": true,
    "hasTranslation": true
  }
]
```

`hasTranslation` = есть ли перевод на `en`.

### `GET /api/posts/[slug]`

Полные данные одного поста (все локали, для чтения/подготовки к правкам).

**Ответ `200`:**

```json
{
  "id": "c57f2c36-db05-44bc-9c9b-100fff98b899",
  "slug": "kak-rabotaet-useeffect-pod-kapotom",
  "categoryId": "1edcf279-25e6-4a8c-9af3-cd23a1178f2a",
  "isActive": true,
  "ru": {
    "title": "Как работает useEffect под капотом",
    "content": "# ...markdown...",
    "tags": ["react", "hooks", "useeffect"],
    "meta": { "title": "...", "description": "...", "image": null }
  },
  "en": { "title": "...", "content": "...", "tags": [...], "meta": { ... } }
}
```

`en` — `null`, если перевода нет. **Ошибка:** `404 { "error": "notFound" }`.

### `POST /api/posts`

Создать пост.

**Тело запроса:**

```json
{
  "slug": "kak-rabotaet-useeffect-pod-kapotom",
  "categoryId": "1edcf279-25e6-4a8c-9af3-cd23a1178f2a",
  "ru": {
    "title": "Как работает useEffect под капотом",
    "content": "# Заголовок\n\nМаркдаун-текст поста.",
    "tags": ["react", "hooks"],
    "meta": {
      "title": "SEO-заголовок",
      "description": "SEO-описание",
      "image": null
    }
  },
  "en": {
    "title": "How useEffect works under the hood",
    "content": "# Heading\n\nMarkdown body.",
    "tags": ["react", "hooks"],
    "meta": { "title": "...", "description": "...", "image": null }
  }
}
```

| Поле                 | Тип              | Обязательно | Примечание                                        |
| -------------------- | ---------------- | ----------- | -------------------------------------------------- |
| `slug`                | `string`         | да          | `^[a-z0-9-]+$`, должен быть уникален                |
| `categoryId`          | `string`         | да          | id существующей категории                           |
| `ru.title`            | `string`         | да          | непустая строка                                     |
| `ru.content`          | `string`         | да          | markdown, непустая строка                            |
| `ru.tags`             | `string[]`       | нет         | по умолчанию `[]`                                    |
| `ru.meta.title`       | `string`         | да          |                                                       |
| `ru.meta.description` | `string`         | да          |                                                       |
| `ru.meta.image`       | `string \| null` | нет         | должен быть валидным URL, если передан               |
| `en`                  | `object \| null` | нет         | опустить/`null`, если перевода нет; та же форма, что `ru` |

**Ответ `201`** — созданный пост (объект БД, без вложенных переводов).

**Ошибки:**

- `400 { "error": "invalid", "issues": [...] }` — не прошла zod-валидация.
- `400 { "error": "categoryNotFound" }` — `categoryId` не существует.
- `400 { "error": "localeNotSupportedByCategory" }` — передан `en`, но у категории нет перевода на `en`.
- `409 { "error": "slugTaken" }` — такой `slug` уже занят.

### `POST /api/posts/[slug]/deactivate`

Деактивировать пост по `slug`. Тело запроса не требуется.

**Ответ:** `200 { "success": true }` или `404 { "error": "notFound" }`.

---

## Пример: полный цикл (curl)

```bash
SECRET="..."
BASE="https://your-site.example.com/api"

# 1. Узнать id категории
curl -s -H "Authorization: Bearer $SECRET" "$BASE/categories"

# 2. Создать пост
curl -s -X POST -H "Authorization: Bearer $SECRET" -H "Content-Type: application/json" \
  -d @post.json "$BASE/posts"

# 3. Деактивировать пост
curl -s -X POST -H "Authorization: Bearer $SECRET" "$BASE/posts/my-post-slug/deactivate"
```
