# Архитектура

BotSync построен на **Astro 7** с серверным рендерингом (SSR) через адаптер `@astrojs/node` в режиме `standalone`. Интерактивные части (виджет чата) реализованы на **React 19** как «острова» (Astro Islands).

## Принципы

- **FSD (Feature-Sliced Design)** — компоненты разделены по слоям и зонам ответственности.
- **CQRS** — в клиентском API чата чтение (queries) и изменение (commands) разнесены по разным модулям.
- **Переиспользуемость** — общие блоки лендингов вынесены в `components/Shared`.

## Структура каталогов

```text
src/
├── assets/                     # Статичные ресурсы (SVG, изображения)
├── components/
│   ├── Layout/                 # Каркас страницы
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Sidebar.astro
│   │   ├── Preloader.astro
│   │   ├── BackTop.astro
│   │   └── Scripts.astro
│   ├── Possibilities/          # Компоненты раздела «Возможности»
│   │   └── SidebarPossibilities.astro
│   └── Shared/                 # Переиспользуемые секции
│       ├── Hero.astro, About.astro, Faq.astro, Pricing.astro, Cta.astro …
│       └── react/AIChat/       # React-виджет чата (см. ai-chat.md)
├── content/
│   └── possibilities/          # Markdown-контент коллекции (см. content-collections.md)
├── layouts/
│   ├── Layout.astro            # Базовый layout
│   └── ServiceLayout.astro     # Layout для сервисных/посадочных страниц
├── pages/                      # Маршруты (см. routing.md)
└── content.config.ts           # Схемы коллекций (zod)
```

## Слои компонентов

| Слой | Каталог | Назначение |
| :--- | :------ | :--------- |
| Layout | `components/Layout` | Каркас страницы: шапка, подвал, сайдбар, прелоадер, скрипты |
| Shared | `components/Shared` | Переиспользуемые секции лендингов (Hero, About, FAQ, Pricing, CTA и др.) |
| Feature | `components/Shared/react/AIChat` | Интерактивная фича — чат-виджет на React |
| Page-specific | `components/Possibilities` | Компоненты, привязанные к конкретному разделу |

## Layouts

- **`Layout.astro`** — базовая обёртка: `<head>`, метатеги, подключение общих скриптов и стилей.
- **`ServiceLayout.astro`** — расширенный layout для посадочных и сервисных страниц (с дополнительными секциями/сайдбаром).

## Поток данных

1. Astro-страница рендерится на сервере (SSR) и отдаёт HTML.
2. Контент посадочных страниц берётся из контент-коллекции `possibilities`.
3. Виджет `AIChat` гидрируется на клиенте и общается с внешним API share-chat (см. [ai-chat.md](./ai-chat.md)).
