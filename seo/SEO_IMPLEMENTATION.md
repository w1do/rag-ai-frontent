# SEO Документация

## Sitemap
Реализована автоматическая генерация карты сайта (sitemap) с использованием интеграции `@astrojs/sitemap`.

### Конфигурация
В `astro.config.mjs` добавлена интеграция и указан базовый URL сайта:
```javascript
export default defineConfig({
  site: 'https://botsync.ru',
  integrations: [sitemap()]
});
```
Файл карты сайта доступен по адресу: `https://botsync.ru/sitemap-index.xml`

## Robots.txt
В папке `public/` создан файл `robots.txt` для управления индексацией.

### Основные правила:
- Разрешена индексация всех страниц для всех роботов.
- Исключены из индекса служебные папки и временные файлы:
  - `/dist/`
  - `/node_modules/`
  - `/.astro/`
  - `/src/`
  - файлы логов, бэкапов и временные файлы.
- Указан путь к Sitemap.

### Содержимое robots.txt:
```text
User-agent: *
Allow: /

# Exclude trash and temporary files
Disallow: /dist/
Disallow: /node_modules/
Disallow: /.astro/
Disallow: /src/
Disallow: /public/assets/images/temp/
Disallow: /*?
Disallow: /*.json$
Disallow: /*.log$
Disallow: /*.tmp$
Disallow: /*.bak$

# Sitemap
Sitemap: https://botsync.ru/sitemap-index.xml
```
