# AI чат-виджет (AIChat)

Интерактивный виджет чата на React, который подключается к внешнему API **share-chat** и отвечает пользователю на основе RAG.

Расположение: `src/components/Shared/react/AIChat/`.

## Структура (FSD + CQRS)

```text
AIChat/
├── AIChat.tsx        # UI-компонент виджета
├── AIChat.css        # Стили
├── Test.tsx          # Демо/проверка компонента
├── api/
│   ├── endpoints.ts  # Сборка URL и константа таймаута
│   ├── queries.ts    # CQRS Query  — чтение (init)
│   └── commands.ts   # CQRS Command — изменение (отправка вопроса)
├── hooks/
│   └── useChat.ts    # Фасад: состояние + инициализация + отправка
└── model/
    └── types.ts      # Типы: ChatMessage, InitData, AIChatProps
```

## Props компонента

```ts
interface AIChatProps {
    title?: string;          // Заголовок виджета
    subtitle?: string;       // Подзаголовок
    inputPlaceholder?: string;
    greeting?: string;       // Приветствие до ответа от сервера
    apiBase?: string;        // Базовый адрес API (пусто = тот же origin)
    chatId?: number | string; // Идентификатор share-chat сессии
}
```

## Хук `useChat`

`useChat` инкапсулирует всю логику чата и отдаёт компоненту только данные и действия:

```ts
const { messages, busy, info, actions, send } = useChat({ apiBase, chatId, greeting });
```

- `messages` — список сообщений (`user` / `bot`).
- `busy` — флаг ожидания ответа.
- `info` — данные компании из `init` (`InitData`).
- `actions` — быстрые действия (кнопки-подсказки).
- `send(question)` — отправка вопроса ассистенту.

При монтировании хук вызывает `init` (query): подставляет `welcome_message` и `actions`. При отправке вопроса вызывает `message` (command) и добавляет ответ бота; ошибки и таймаут отображаются отдельным сообщением.

## Контракт API (share-chat)

Адреса формируются функцией `buildEndpoints(apiBase, chatId)`:

| Тип | Метод и путь | Назначение |
| :-- | :----------- | :--------- |
| Query | `GET /share-chat/{chatId}/init` | Приветствие, быстрые действия, данные компании |
| Command | `POST /share-chat/{chatId}/message` | Отправка вопроса, получение ответа бота |

### Init (ответ)

```ts
interface InitData {
    welcome_message?: string;
    actions?: string[];
    company_name?: string;
    phone?: string;
    description?: string;
    social_networks?: Record<string, string>;
}
```

### Message (запрос/ответ)

Запрос:

```json
{ "question": "Текст вопроса пользователя" }
```

Ответ — поле `answer` (или `message` как запасной вариант):

```json
{ "answer": "Ответ ассистента" }
```

- Таймаут запроса — `REQUEST_TIMEOUT = 30000` мс (`AbortController`).
- При таймауте/ошибке пользователю показывается понятное сообщение об ошибке.

## Подключение на странице

```astro
---
import AIChat from "../components/Shared/react/AIChat/AIChat.tsx";
---
<AIChat
  client:load
  title="Ассистент BotSync"
  greeting="Здравствуйте! Чем могу помочь?"
  apiBase="https://api.botsync.ru"
  chatId={123}
/>
```

> Директива `client:load` обязательна — без неё React-виджет не будет гидрирован на клиенте.
