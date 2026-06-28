# Сборка и деплой

Проект работает в режиме **SSR** через адаптер `@astrojs/node` (`mode: 'standalone'`). Сборка создаёт самостоятельный Node-сервер.

## Требования

- **Node.js >= 22.12.0** (см. `engines` в `package.json`).
- npm (lock-файл `package-lock.json`).

## Локальная разработка

```sh
npm install
npm run dev      # http://localhost:4321
```

> Согласно гайдлайнам проекта, dev-сервер можно запускать в фоне: `astro dev --background`, управлять — `astro dev stop|status|logs`.

## Production-сборка

```sh
npm run build    # сборка в ./dist
npm run preview  # локальный предпросмотр сборки
```

После сборки сервер запускается командой:

```sh
node ./dist/server/entry.mjs
```

## Конфигурация Astro

Ключевые настройки в `astro.config.mjs`:

```js
export default defineConfig({
    site: 'https://botsync.ru',     // базовый URL (используется sitemap)
    server: { host: true },          // слушать все сетевые интерфейсы
    adapter: node({ mode: 'standalone' }),
    integrations: [sitemap(), react()],
});
```

## Docker

В корне есть многоступенчатый `Dockerfile` (база `node:lts`):

```sh
docker build -t botsync .
docker run -p 4321:4321 botsync
```

Образ использует переменные окружения:

| Переменная | Значение по умолчанию | Назначение |
| :--------- | :-------------------- | :--------- |
| `HOST` | `0.0.0.0` | Интерфейс прослушивания |
| `PORT` | `4321` | Порт сервера |

Контейнер стартует с `node ./dist/server/entry.mjs` и слушает порт `4321`.

## SEO-артефакты

- `sitemap` генерируется автоматически: `https://botsync.ru/sitemap-index.xml`.
- `public/robots.txt` управляет индексацией.

Подробнее — в [seo/SEO_IMPLEMENTATION.md](../seo/SEO_IMPLEMENTATION.md).
