/** Сборка адресов API share-chat из базового URL и идентификатора чата. */
export function buildEndpoints(apiBase: string, chatId: number | string) {
    // Нормализуем базовый адрес: убираем завершающий слэш, чтобы не получить
    // двойной слэш (http://localhost//share-chat/...), который ломает запрос.
    const base = apiBase.replace(/\/+$/, "");
    return {
        message: `${base}/share-chat/${chatId}/message`,
        init: `${base}/share-chat/${chatId}/init`,
    };
}

export const REQUEST_TIMEOUT = 30000;
