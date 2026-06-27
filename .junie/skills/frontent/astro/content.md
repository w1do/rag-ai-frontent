### Контентная часть и Схемы (Markdown)

Инструкции по созданию контента и описание структур frontmatter для каждой коллекции.

#### 1. Общие правила

- Все файлы контента должны находиться в `src/content/{collection}/`.
- Имена файлов должны быть в формате `kebab-case.md`.
- Изображения должны храниться в `public/images/` или рядом с `.md` файлами.

#### 2. Коллекции и Схемы

**Локации (locations)**

```markdown
---
id: 'baikal'
title: 'Озеро Байкал'
type: 'Озеро'
description: 'Краткое описание для карточки'
image: '/images/locations/baikal.jpg'
mapUrl: 'https://...'
tags: ['#Рыбалка', '#Кемпинг']
---

Полный текст описания локации...
```

**Отчеты (reports)**

```markdown
---
title: 'Щука на спиннинг'
author: 'Иван Иванов'
date: 2024-06-15
locationId: 'baikal'
image: '/images/reports/catch-1.jpg'
tags: ['#Спининг', '#Щука']
---

Текст отчета о рыбалке...
```

**События (events)**

```markdown
---
title: 'Соревнования по подледному лову'
date: 2024-12-01
time: '09:00'
price: 'Бесплатно'
image: '/images/events/ice-fishing.jpg'
locationId: 'baikal'
---

Детали события...
```

**Барахолка (market)**

```markdown
---
title: 'Спиннинг Shimano'
price: 5000
category: 'Снасти'
city: 'Москва'
contact: '@telegram_user'
image: '/images/market/spinning.jpg'
---

Описание товара...
```

#### 3. FAQ (Вопросы и ответы)

Контент FAQ может храниться как один файл со списком или по категориям. Рекомендуется группировка в `src/content/faq/`:

- `general.md`
- `fishing.md`
- `market-rules.md`

#### 4. Блог (blog)

```markdown
---
title: 'Как выбрать палатку'
description: 'Гайд для начинающих туристов'
pubDate: 2024-06-10
author: 'Эксперт'
image: '/images/blog/tents.jpg'
---

Текст статьи...
```
