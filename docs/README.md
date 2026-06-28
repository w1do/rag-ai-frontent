# Документация BotSync

Технический справочник проекта **BotSync** — фронтенд-платформы для создания AI чат-ботов на базе RAG.

## Содержание

| Документ | Описание |
| :------- | :------- |
| [architecture.md](./architecture.md) | Архитектура приложения, структура каталогов, подход FSD и CQRS |
| [ai-chat.md](./ai-chat.md) | React-виджет `AIChat`: API, хук `useChat`, контракт share-chat |
| [content-collections.md](./content-collections.md) | Контент-коллекции, схема `possibilities`, добавление страниц |
| [routing.md](./routing.md) | Маршруты, статические и динамические страницы |
| [deployment.md](./deployment.md) | Сборка, переменные окружения, Docker, деплой |
| [seo](../seo/SEO_IMPLEMENTATION.md) | Sitemap и robots.txt |

## Стек

- **Astro 7** — SSR через адаптер `@astrojs/node` (standalone).
- **React 19** — интерактивный клиентский виджет чата.
- **Content Collections** — типизированный Markdown-контент.
- **Node.js >= 22.12.0**.

Подробное описание продукта и контакты — в корневом [README.md](../README.md), исходное описание проекта — в [PLAN.md](../PLAN.md).
