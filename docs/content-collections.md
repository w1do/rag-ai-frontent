# Контент-коллекции

Контент посадочных страниц «Возможности» хранится в Markdown и типизируется через [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/).

- Файлы контента: `src/content/possibilities/*.md`
- Схема и загрузчик: `src/content.config.ts`

## Коллекция `possibilities`

Загрузчик берёт все `.md`-файлы (кроме начинающихся с `_`) из `src/content/possibilities`:

```ts
const possibilitiesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "src/content/possibilities" }),
  schema: z.object({ /* … */ }),
});
```

### Поля frontmatter

| Поле | Тип | Обяз. | Назначение |
| :--- | :-- | :---: | :--------- |
| `title` | string | да | Заголовок решения |
| `description` | string | да | Краткое описание (для SEO/превью) |
| `image` | string | нет | Путь к изображению |
| `icon` | string | нет | CSS-класс иконки (Font Awesome) |
| `features` | string[] | нет | Список ключевых возможностей |
| `category` | string | нет | Категория, по умолчанию `AI Solutions` |
| `order` | number | нет | Порядок сортировки, по умолчанию `0` |
| `benefits` | object[] | нет | Преимущества: `title`, `description`, `icon` |
| `faqs` | object[] | нет | Вопросы-ответы: `question`, `answer` |
| `whatWeDo` | string | нет | Блок «Что мы делаем» |
| `whatWeDoList` | string[] | нет | Список пунктов «Что мы делаем» |

### Пример файла

```markdown
---
title: "Голосовые ИИ агенты"
description: "Голосовые ИИ-агенты для звонков с поддержкой мультиязычности."
category: "Voice AI"
icon: "fa-solid fa-phone-volume"
order: 2
features:
  - "Входящие и исходящие звонки"
  - "Мультиязычная голосовая поддержка"
benefits:
  - title: "Интеграция ИИ"
    description: "Голосовой RAG агент для мгновенного ответа на базе знаний."
faqs:
  - question: "На каких языках говорит бот?"
    answer: "Поддерживается более 50 языков."
---

### Голосовой ИИ-агент для вашего бизнеса

Основной текст страницы в Markdown…
```

## Как добавить новую возможность

1. Создайте файл `src/content/possibilities/<slug>.md` (slug = имя файла станет частью URL).
2. Заполните frontmatter по схеме выше и добавьте тело в Markdown.
3. Задайте `order` для нужной позиции в списках.
4. Страница автоматически появится по адресу `/possibilities/<slug>` (см. [routing.md](./routing.md)).

> При изменении набора полей правьте zod-схему в `src/content.config.ts` — это обеспечивает типобезопасность и валидацию при сборке.
