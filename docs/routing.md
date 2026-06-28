# Маршрутизация

Маршруты задаются файловой структурой в `src/pages/` ([file-based routing](https://docs.astro.build/en/guides/routing/)). Каждый `.astro`-файл = страница.

## Статические страницы

| Файл | URL | Назначение |
| :--- | :-- | :--------- |
| `index.astro` | `/` | Главная страница |
| `chat.astro` | `/chat` | Демонстрация чат-виджета |
| `pricing.astro` | `/pricing` | Тарифы |
| `faq.astro` | `/faq` | Частые вопросы |
| `contact.astro` | `/contact` | Контакты |
| `chatbot-ai.astro` | `/chatbot-ai` | Посадочная: AI чат-бот |
| `chatbot-integration.astro` | `/chatbot-integration` | Посадочная: интеграция чат-бота |
| `rag-systems.astro` | `/rag-systems` | Посадочная: RAG-системы |
| `knowledge-base-rag.astro` | `/knowledge-base-rag` | Посадочная: база знаний на RAG |
| `automated-answers-rag.astro` | `/automated-answers-rag` | Посадочная: автоответы на RAG |
| `avito-ai-agent.astro` | `/avito-ai-agent` | Посадочная: AI-агент для Avito |
| `car-service-ai.astro` | `/car-service-ai` | Посадочная: AI для автосервиса |

## Динамические маршруты

| Файл | URL | Источник данных |
| :--- | :-- | :-------------- |
| `possibilities/index.astro` | `/possibilities` | Список из коллекции `possibilities` |
| `possibilities/[slug].astro` | `/possibilities/:slug` | Конкретное решение из коллекции |
| `bots/index.astro` | `/bots` | Список ботов |
| `bots/[slug].astro` | `/bots/:slug` | Страница конкретного бота |

Динамические страницы используют `getStaticPaths()` (или SSR) для генерации путей на основе контент-коллекций (см. [content-collections.md](./content-collections.md)).

## Добавление страницы

1. Создайте `.astro`-файл в `src/pages/` — имя файла определяет URL.
2. Подключите нужный layout (`Layout.astro` или `ServiceLayout.astro`) и общие компоненты из `components/Shared`.
3. Для набора однотипных страниц используйте динамический роут `[slug].astro` + контент-коллекцию.
